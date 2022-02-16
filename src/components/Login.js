import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

const Login = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {});
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {});

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.headerText}>Fast Way</Text>
      <Text style={style.status}>Username</Text>
      <TextInput
        style={style.input}
        placeholder="username..."
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={style.status}>Password</Text>
      <TextInput
        style={style.input}
        placeholder="password..."
        onSubmitEditing={Keyboard.dismiss}
      />
      <TouchableOpacity style={style.btn}>
        <Text style={style.btnText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    width: '80%',
  },
  status: {
    padding: 2,
    paddingTop: 20,
  },
  headerText: {
    paddingTop: 70,
    paddingBottom: 30,
    fontSize: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 15,
    marginBottom: 10,
    marginTop: 50,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
  },
});

export default Login;
