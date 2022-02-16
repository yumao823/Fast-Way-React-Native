import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useToast } from 'react-native-toast-notifications'
import { useNavigation } from '@react-navigation/native'
import ScreenBox from '../../components/core/ScreenBox'

const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const showToastErr = (message) => {
    return toast.show(message, {
      type: "warn",
      placement: "bottom",
      duration: 2000,
      animationType: "zoom-in"
    })
  }

  const handleLogin = () => {

    if (email.length < 1) {
      return showToastErr("Email Is Required")
    }

    if (password.length < 1) {
      return showToastErr("Password Is Required")
    }

    axios.post(
      "http://localhost:8000/api/users/login",
      { email, password },
    )
    .then(res => {
      dispatch({ type: "LOGIN_SUCCESS", auth: res.data })
    })
    .catch(error => {
      const errorResponse = error.response?.data.msg || "Connection Error";
      showToastErr(errorResponse)
    })
  }

  return (
    <ScreenBox type="center">
      <View style={styles.container}>
        <Text h4 style={styles.title}>Log In</Text>
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
          autoCapitalize='none'
          placeholder="Enter your Password"
          leftIcon={{ type: 'ionicon', name: 'lock-closed' }}
          onChangeText={e => setPassword(e)}
        />
        <TouchableOpacity onPress={() => navigation.navigate('ConfirmMail')}>
          <Text style={styles.forgetPassword}>Forget Password?</Text>
        </TouchableOpacity>
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.haveAccount}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
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
  }
})

export default Login