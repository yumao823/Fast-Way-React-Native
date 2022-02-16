import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { useSelector } from 'react-redux'
import ScreenBox from '../components/core/ScreenBox'
import { AVATAR } from '../constants'

const Tasks = ({ navigation }) => {
  const users = useSelector(state => state.state.users)
  return (
    <ScreenBox>
      {users.map(user => (
        <TouchableOpacity key={`ta-${user._id}`} onPress={() => navigation.navigate('Task', { user })}>
          <ListItem bottomDivider>
            <Avatar
              rounded
              source={{ uri: user.photo !== undefined ? `data:image/png;base64,${user.photo}` : AVATAR }}
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
    </ScreenBox>
  )
}

export default Tasks