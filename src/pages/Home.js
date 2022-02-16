import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Avatar} from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ScreenBox from '../components/core/ScreenBox'
import { AVATAR } from '../constants'

const Home = () => {
  const role = 1;
  // const role = 2;

  const dispatch = useDispatch();

  const auth = useSelector(state => state.state.auth);
  const { userId } = auth;

  const [user, setUser] = useState({});



  useEffect(() => {
    axios.get(`http://localhost:8000/api/users`)
      .then(res => {
        dispatch({ type: 'GETUSER_SUCCESS', users: res.data.users })
      })
      .catch(err => console.log(err));

    axios.get(`http://localhost:8000/api/users/${userId}`)
      .then(({ data }) => setUser(data))
      .catch(err => console.log(err))


  }, []);

  return (
    <ScreenBox>
      <View style={styles.container}>
        <Text h2 style={styles.title}>Hello {user.name}!</Text>

          <Avatar
            containerStyle={styles.img}
            size="xlarge"
            rounded
            source={{uri: user.photo !== undefined ? `data:image/png;base64,${user.photo}` : AVATAR}} 
          />

        {role === 1 && <Text style={styles.description}>Signed in as Admin</Text>}
      </View>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    textAlign: 'center'
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#2288dd',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: 20,
  },
  img: {
    alignSelf: "center",
    marginBottom: 30,
  }
})

export default Home