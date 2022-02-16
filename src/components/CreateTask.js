import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { useToast } from 'react-native-toast-notifications'
import axios from 'axios'
import ScreenBox from './core/ScreenBox'

const CreateTask = ({ navigation, route}) => {
  const dispatch = useDispatch()
  const toast = useToast();
  const { user, data, setData } = route.params
  const [name, setName] = useState("")

  const handleCreate = () => {

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

    axios.post("http://localhost:8000/api/task/user", {tasks: name, users: [user._id]})
    .then((res) => {
      setData([...data, res.data ])
      axios.get(`http://localhost:8000/api/users`)
      .then(data => {
        dispatch({ type: 'GETUSER_SUCCESS', users: data.data.users })
        navigation.goBack()
      })
      .catch(e => console.log(e))
    })
    .catch((err) => {
      console.log(err)
    });
  }

  return (
    <ScreenBox>
      <Input
        value={name}
        autoCapitalize='none'
        placeholder="Enter Task Name"
        leftIcon={{ type: 'ionicon', name: 'clipboard-outline'}}
        onChangeText={e => setName(e)}
      />
      <Button title="Create Task" onPress={handleCreate} />
    </ScreenBox>
  )
}

export default CreateTask