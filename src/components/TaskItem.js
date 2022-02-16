import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Button, CheckBox, Input } from 'react-native-elements'
import { useToast } from 'react-native-toast-notifications'
import { View } from "react-native"
import axios from "axios"




const TaskItem = ({ data, dataList, setData, styles, setShowDeleteBtn }) => {

    const dispatch = useDispatch()
    const toast = useToast();

    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState(data.tasks);

    // Handle Delete One
    const handleDelete = (id = data._id) => {

        axios.delete(`http://localhost:8000/api/task/user/delete/${id}`)
            .then(res => {

                let oneCompleted = false;

                setData(dataList.filter(task => {

                    if (task.isCompleted && task._id !== id) {
                        oneCompleted = true;
                    }

                    return task._id !== id
                }))

                setShowDeleteBtn(oneCompleted)

                axios.get(`http://localhost:8000/api/users`)
                    .then(data => {
                        dispatch({ type: 'GETUSER_SUCCESS', users: data.data.users })
                    })
                    .catch(e => console.log(e))
            })
            .catch(err => console.log(err))
    }

    const handleEdit = (id = data._id) => {

        if (name.length < 1) {
            return (
                toast.show("Name Is Required", {
                    type: "warn",
                    placement: "bottom",
                    duration: 2000,
                    animationType: "zoom-in"
                })
            )
        }

        axios.put(`http://localhost:8000/api/task/${id}`, { tasks: name })
            .then(res => res.data)
            .then(data => {
                setShowEdit(false)
            })
            .catch(err => console.log(err))
    }

    const handleUpdateIsCompleted = async (id = data._id) => {
        try {

            let dataCopy = { ...data };
            let dataListCopy = [ ...dataList ];
            await axios.put(`http://localhost:8000/api/task/${id}`, { isCompleted: !dataCopy.isCompleted })

            let oneCompleted = false;
            dataListCopy = dataListCopy.map((task) => {
                if (task._id === id) {
                    let taskCopy = { ...task };
                    if (!taskCopy.isCompleted) {
                        oneCompleted = true;
                    }
                    taskCopy.isCompleted = !taskCopy.isCompleted
                    return taskCopy;
                }
                if (task.isCompleted) {
                    oneCompleted = true;
                }
                return task
            })
            setShowDeleteBtn(oneCompleted)
            setData(dataListCopy)
        } catch (err) {
            console.log(err);
        } 
    }


    useEffect(() => {
        setName(data.tasks);
        setShowEdit(false)
    }, [dataList])

    return (
        <View style={styles.taskItem}>
            <View style={styles.checkBox}

            >

                {
                    showEdit ?

                        <Input
                            value={name}
                            autoCapitalize='none'
                            placeholder="Enter Task Name"
                            leftIcon={{ type: 'ionicon', name: 'clipboard-outline' }}
                            onChangeText={e => setName(e)}

                        />

                        :

                        <CheckBox
                            title={name}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={data.isCompleted}
                            onLongPress={() => setShowEdit(true)}
                            onPress={() => handleUpdateIsCompleted()}
                        />
                }

            </View>

            {
                showEdit ?
                    <Button
                        title="Edit Task"
                        onPress={() => handleEdit()}
                        buttonStyle={{ backgroundColor: "green" }}

                    />

                    :

                    <Button
                        title="Delete"
                        style={styles.deleteBtn}
                        onPress={() => handleDelete()}
                    />
            }


        </View>
    )
}

export default TaskItem