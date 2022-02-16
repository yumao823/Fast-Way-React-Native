import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { useToast } from 'react-native-toast-notifications'
import axios from 'axios'
import ScreenBox from './core/ScreenBox'

const CreateJobSite = ({ navigation, route }) => {
  
  const toast = useToast()
  const [siteName, setSiteName] = useState('')

  const { setJobSites, jobSites } = route.params

  const showToastErr = (message) => {
    return toast.show(message, {
      type: "warn",
      placement: "bottom",
      duration: 2000,
      animationType: "zoom-in"
    })
  }


  
  const handleCreate = () => {

    if (siteName.length < 3) {
      return showToastErr("Name Must Be At Least 3 Characters")
    }

    axios.post(`http://localhost:8000/api/jobsites`, {
      name: siteName
    })
    .then(res => {
      toast.show("Created Successfully", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        animationType: "zoom-in"
      })
      setJobSites([...jobSites, res.data])
      navigation.goBack()
    })
    .catch(error => {
      const errorResponse = error.response?.data.errors.name.message || "Connection Error";
      showToastErr(errorResponse)
    })
  }

  return (
    <ScreenBox type="center">
      <Input
        value={siteName}
        placeholder="Enter your Site Name"
        leftIcon={{ type: 'ionicon', name: 'globe' }}
        onChangeText={e => setSiteName(e)}
      />
      <Button title="Create" onPress={handleCreate} />
    </ScreenBox>
  )
}

export default CreateJobSite