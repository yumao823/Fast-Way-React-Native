import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Button, Input, Text, Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import ScreenBox from '../../components/core/ScreenBox'
import { useToast } from 'react-native-toast-notifications'
import { launchImageLibrary } from 'react-native-image-picker'


const Signup = () => {

  const navigation = useNavigation()
  const toast = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [photo, setPhoto] = useState();

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

  const handleSignUp = () => {

    if (name.length < 1) {
      return showToastErr("Name Is Required")
    }

    if (email.length < 1) {
      return showToastErr("Email Is Required")
    }

    if (password.length < 6) {
      return showToastErr("Password Must Be At Least 6 Characters")
    }

    axios.post('http://localhost:8000/api/users/signup',
      { name, email, password, photo }
    )
      .then(res => navigation.navigate('Success'))
      .catch(err => {
        const errorResponse = err.response?.data.msg || "Connection Error";
        showToastErr(errorResponse)
      })
  }

  return (
    <ScreenBox type="center">
      <View style={styles.container}>
        <Text h4 style={styles.title}>Sign Up</Text>
        <View style={styles.imageHolder} >
          {photo && (
            <Avatar 
            rounded
            source={{uri: `data:image/png;base64,${photo}`}} 
            />
          )}
          <Button
            title={photo ? "Change Avatar" : "Choose Avatar"}
            type="outline"
            onPress={handleChoosePhoto}
          />
        </View>
        <Input
          value={name}
          autoCapitalize='none'
          placeholder="Enter your Name"
          leftIcon={{ type: 'ionicon', name: 'person' }}
          onChangeText={e => setName(e)}
        />

        <Input
          value={email}
          autoCapitalize='none'
          placeholder="Enter your Email"
          leftIcon={{ type: 'ionicon', name: 'mail' }}
          onChangeText={e => setEmail(e)}
        />
        <Input
          value={password}
          secureTextEntry={true}
          placeholder="Enter your Password"
          leftIcon={{ type: 'ionicon', name: 'lock-closed' }}
          onChangeText={e => setPassword(e)}
        />
        <Button title="SignUp" onPress={handleSignUp} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.haveAccount}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#2288dd',
    borderWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#2288dd',
    fontWeight: 'bold',
  },
  forgetPassword: {
    marginBottom: 20,
    fontSize: 12,
    textAlign: 'center',
  },
  haveAccount: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
  },
  imageHolder: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

})

export default Signup;