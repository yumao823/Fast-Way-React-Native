import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import ScreenBox from '../components/core/ScreenBox'
import StopWatch from '../components/StopWatch'

const TimeClock = ({ navigation }) => {
  const isAdmin = true
  // const isAdmin = false
  const dispatch = useDispatch()
  const [viewUsers, setViewUsers] = useState(false)
  const users = useSelector(state => state.state.users)

  const handleUser = user => {
    navigation.navigate('TimeHistory', { user })
  }

  return (
    <ScreenBox>
      <View style={styles.container}>
        <StopWatch />
        {isAdmin &&
          <View>
            <Button
              title={viewUsers ? 'Hide History' : 'Show History'}
              onPress={() => setViewUsers(!viewUsers)}
            />
            {viewUsers &&
              <View style={styles.viewHistory}>
                {users.map((user, index) => (
                  <TouchableOpacity key={`user-${index}`} onPress={() => handleUser(user)}>
                    <View style={styles.users} >
                      <Text>{user.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            }
          </View>
        }
      </View>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  viewHistory: {
    borderWidth: 1,
    borderColor: '#2288dd',
    borderBottomWidth: 0,
  },
  users: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#2288dd',
  }
})

export default TimeClock