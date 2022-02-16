import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { Button, Text } from 'react-native-elements'
import axios from "axios"
import { useDispatch } from "react-redux"

import ScreenBox from "./core/ScreenBox"
import TaskItem from "./TaskItem"


const Task = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const { user } = route.params
  const { tasks } = user

  const [data, setData] = useState([]);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const handleTasks = (tasks) => {
    let promises = []
    for (let id of tasks) {
      promises.push(
        axios.get(`http://localhost:8000/api/task/${id}`)
          .then(res => res.data)
          .catch(err => console.log(err))
      )
    }
    return promises
  }

  // Handle delete mulitplde tasks
  const handleDeleteMult = () => {

    // Store all marked promised deleted tasks in an array
    let promises = [];
    for (const item of data) {
      let id = item._id;
      if (item.isCompleted) {
        promises.push(
          axios.delete(`http://localhost:8000/api/task/user/delete/${id}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        )
      }
    }

    Promise.all(promises).then((res) => {

      setData(data.filter((task) => !task.isCompleted))
      setShowDeleteBtn(false)

      axios.get(`http://localhost:8000/api/users`)
        .then(data => dispatch({ type: 'GETUSER_SUCCESS', users: data.data.users }))
        .catch(e => console.log(e))
    })
  }


  useEffect(() => {
    const tempTasks = handleTasks(tasks);
    Promise.all(tempTasks)
      .then(res => {
        setData(res)
        let completeCheck = res.filter((task) => task.isCompleted);
        if(completeCheck.length > 0 ) {
          setShowDeleteBtn(true)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <ScreenBox>
      <Button
        style={styles.createbtn}
        title="Create Task"

        onPress={() => navigation.navigate("CreateTask", { user, setData, data  })}
      />
      {data.length > 0 ?
        data.map((task, index) =>
          <TaskItem
            dataList={data}
            setData={setData}
            key={`tk-${index}`}
            data={task}
            navigation={navigation}
            styles={styles}
            setShowDeleteBtn={setShowDeleteBtn}
          />
        )
        :
        <Text style={styles.description}>No Task.</Text>
      }
      {
        showDeleteBtn &&
        <Button
          title="Delete Task(s)"
          style={styles.largeDelete}
          buttonStyle={{ backgroundColor: "red" }}
          onPress={handleDeleteMult}
        />
      }

    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  createbtn: {
    marginVertical: 20,
  },
  taskItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  checkBox: {
    width: "75%"
  },
  largeDelete: {
    marginVertical: 20,

  },
  deleteBtn: {
    marginRight: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
  }
})

export default Task