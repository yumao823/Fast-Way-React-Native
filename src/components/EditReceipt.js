import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Image, Input } from "react-native-elements"
import { launchImageLibrary } from 'react-native-image-picker'
import { useToast } from "react-native-toast-notifications"
import axios from "axios"
import ScreenBox from "./core/ScreenBox"

const EditReceipt = ({ navigation, route }) => {
  const { data, callBack } = route.params
  const toast = useToast()
  const [photo, setPhoto] = useState(data.image)
  const [price, setPrice] = useState(`${data.totalAmount}`)

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true, includeBase64: true }, (response) => {
      if (response.assets) {
        setPhoto(response.assets[0].base64)
      }
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

  const handleUpdate = () => {

    if(!validateTotalAmount()) {
      return toast.show("Invalid Total Amount", {
        type: "warn",
        placement: "bottom",
        duration: 2000,
        animationType: "zoom-in"
      })
    }

    const payload = {
      ...data,
      image: photo,
      totalAmount: price,
    }
    axios.put(`http://localhost:8000/api/receipts/${data._id}`, payload)
      .then(res => {
        callBack()
        navigation.goBack()
      })
      .catch(err => console.log(err))
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
          keyboardType="numeric"
          placeholder="Type Price.."
          leftIcon={{ type: 'ionicon', name: 'logo-usd' }}
          onChangeText={e => setPrice(e)}
        />
      </View>
      <Button title="Update" onPress={handleUpdate} />
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

export default EditReceipt