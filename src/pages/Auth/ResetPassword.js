import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useToast } from 'react-native-toast-notifications'
import ScreenBox from '../../components/core/ScreenBox'

const Success = () => {
  const navigation = useNavigation()
  return (
    <ScreenBox type="center">
      <View style={styles.container}>
        <Text h2 style={styles.title}>Success!</Text>
        <Button title="Go to LogIn" onPress={() => navigation.navigate('Login')} />
      </View>
    </ScreenBox>
  )
}

const EnterCode = () => {

  const navigation = useNavigation()
  const toast = useToast()

  // TODO 
  // HANDLE RESEND CODE 

  const handleResend = () => {
    toast.show("Sent!", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      animationType: "zoom-in"
    })
  }


  // TODO 
  // HANDLE CONFIRM CODE 
  const handleConfirmCode = () => {
    navigation.navigate("Success")
  }

  return (
    <ScreenBox type="center">
      <View style={styles.container}>
        <Text h4 style={styles.title}>Enter Code</Text>
        <Input
          placeholder="Enter Code"
          leftIcon={{ type: 'ionicon', name: 'key' }}
        />
        <Button title="Confirm" onPress={handleConfirmCode} />
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resend}>Didn't get code? Resend</Text>
        </TouchableOpacity>
      </View>
    </ScreenBox>
  )
}

const ConfirmMail = () => {

  const navigation = useNavigation()


    // TODO 
  // HANDLE SEND

  const handleSend = () => {
    navigation.navigate('EnterCode')
  }
  
  return (
    <ScreenBox type="center">
      <View style={styles.container}>
        <Text h4 style={styles.title}>Confirm Your Email</Text>
        <Input
          placeholder="Enter your Email"
          leftIcon={{ type: 'ionicon', name: 'mail' }}
        />
        <Button title="Send Code" onPress={handleSend} />
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
  resend: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  }
})

export {
  Success,
  EnterCode,
  ConfirmMail
}