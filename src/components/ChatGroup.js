import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar, ListItem, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { AVATAR } from '../constants'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ChatGroup = (props) => {
  const navigation = useNavigation();
  const [allUsers, setAllUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const auth = useSelector(state => state.state.auth);
  const { userId } = auth;

  const { chat, addMessageToChat } = props;

  useEffect(() => {

    const getAllUsers = async () => {
      setIsLoaded(false);
      let promises = []
      for (const id of chat.users) {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/users/${id}`)
            promises.push(data)
        } catch (err) {
          console.log(err);
        }
      }
      setAllUsers(promises)
      setIsLoaded(true)
    }

    getAllUsers()

  }, [])

  const chatName = () => {
    let chatNameStr = "";
    let tempAll = allUsers.filter(user => user._id !== userId);

    tempAll.map((user, i) => {
      if(i === tempAll.length - 1) {
        chatNameStr += `${user.name}`;
      } else {
        chatNameStr += `${user.name}, `;
      }
    })
    return chatNameStr
  }

  return (
    isLoaded &&
    <TouchableOpacity onPress={() => navigation.navigate('Message', { chat, allUsers, addMessageToChat })}>
      <ListItem bottomDivider>
        {/* <Avatar
          rounded
          source={{ uri: AVATAR }}
          source={{uri: allUsers[0].photo !== undefined ? `data:image/png;base64,${ allUsers[0].photo}` : AVATAR}}
        /> */}

        <ListItem.Content >
              <ListItem.Title>{chatName()}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  )
}

export default ChatGroup