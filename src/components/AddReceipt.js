import React, { useState } from "react"
import { StyleSheet, View } from "react-native";
import { Button, Image, Input } from "react-native-elements"
import { launchImageLibrary } from 'react-native-image-picker'
import { useToast } from 'react-native-toast-notifications'
import axios from "axios"
import ScreenBox from "./core/ScreenBox"

const AddReceipt = ({ navigation, route }) => {

  const { job, callback } = route.params
  const [photo, setPhoto] = useState()
  const [price, setPrice] = useState("")
  const toast = useToast()
  
  const handleChoosePhoto = () => {

    launchImageLibrary({ noData: true, includeBase64: true }, (response) => {
      if (response.assets) {
        setPhoto(response.assets[0].base64);
      }
    })
  }

  const showToastErr = (message) => {
    return toast.show(message, {
      type: "warn",
      placement: "bottom",
      duration: 2000,
      animationType: "zoom-in"
    })
  }

  const validateTotalAmount = () => {

    let isValid = true;

    if (price.length < 1) {
      isValid = false;
    }
    if (isNaN(price)) {
      isValid = false;
    }
    return isValid;
  }

  const validatePhoto = () => {
    let isValid = true;

    if (!photo) {
      isValid = false;
    }

    return isValid;
  }

  const handleAdd = () => {

    if(!validateTotalAmount()) {
      return showToastErr("Invalid Total Amount")
    }
    if(!validatePhoto()) {
      return showToastErr("Photo Is Required")
    }
    
    const payload = {
      image: photo,
      jobSiteId: job._id,
      totalAmount: price,
    }
    axios.post(`http://localhost:8000/api/receipts`, payload)
      .then(res => {
        callback()
        navigation.goBack()
      })
      .catch(error => {
        const errorResponse = error.response?.data.errors || "Connection Error";
        const key = Object.keys(errorResponse)[0]
        const message = errorResponse[key].message;
        showToastErr(message)
      })
  }

  return (
    <ScreenBox>
      <View style={styles.Container}>
        {photo && (
          <Image
          source={{uri: `data:image/png;base64,${photo}`}} 
            style={styles.image}
          />
        )}
        <Button
          title={photo ? "Change Image" : "Choose Image"}
          type="outline"
          onPress={handleChoosePhoto}
        />
        <Input
          value={price}
          keyboardType='numeric'
          placeholder="Type Price.."
          leftIcon={{ type: 'ionicon', name: 'logo-usd' }}
          onChangeText={e => setPrice(e)}
        />
      </View>
      <Button title="ADD RECEIPT" onPress={handleAdd} />
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  Container: {
    marginVertical: 30,
    marginHorizontal: 50,
  }, 
  image: {
    height: 150,
    marginBottom: 10,
  }
})

export default AddReceipt