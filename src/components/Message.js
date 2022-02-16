import React, { useEffect, useState } from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import ScreenBox from './core/ScreenBox';
import MessageInput from './core/MessageInput';
import { AVATAR } from '../constants';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Message = ({ route, ...props }) => {

  const { chat, allUsers, addMessageToChat } = route.params;

  const auth = useSelector(state => state.state.auth);
  const { userId } = auth;
  const [messages, setMessages] = useState(chat.messages);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userObj, setUserObj] = useState({});

  useEffect(() => {

    const getAllMessages = async () => {
      setIsLoaded(false);
      let promises = []
      for (const id of chat.messages) {
        try {
          const { data: messageData } = await axios.get(`http://localhost:8000/api/messages/${id}`);

          let tempObj = { ...userObj };
          let tempUsers = [...allUsers];
          if (Object.keys(tempObj).length < tempUsers.length) {
            let senderAry = tempUsers.filter((user) => user._id === messageData.sender[0]);
            let oneUser = senderAry[0];
            if (!tempObj.hasOwnProperty(oneUser._id)) {
              tempObj[oneUser._id] = oneUser;
              setUserObj(tempObj);
            }
          }

          promises.push(messageData);
        } catch (err) {
          console.log(err);
        }
      }
      setMessages(promises.reverse());
      setIsLoaded(true)
    }

    getAllMessages();

  }, [])

  const handleSend = async contents => {

    try {

    let { data } = await axios.post(`http://localhost:8000/api/messages`, {
      contents,
      sender: userId,
      chatId: chat._id
    });




    addMessageToChat(data)

    let tempObj = { ...userObj };
    let tempUsers = [...allUsers];
    if (Object.keys(tempObj).length < tempUsers.length) {
      let senderAry = tempUsers.filter((user) => user._id === data.sender[0]);
      let oneUser = senderAry[0];
      if (!tempObj.hasOwnProperty(oneUser._id)) {
        tempObj[oneUser._id] = oneUser;
        setUserObj(tempObj);
      }
    }

    let tempMessages = [...messages];
    setMessages([data, ...tempMessages]);

  } catch (err) {
    console.log(err);
  }

  }

  return (
    isLoaded
    &&
    <ScreenBox>
      <MessageInput onSend={handleSend} />
      {messages.map((item, index) => (
        <ListItem key={`mi-${index}`} bottomDivider>
          {/* <Avatar
            rounded
            source={{ uri: userObj[item.sender].photo !== undefined ? `data:image/png;base64,${userObj[item.sender].photo}` : AVATAR }}
          /> */}
          <ListItem.Content>
            <ListItem.Title>{userObj[item.sender].name}</ListItem.Title>
            <ListItem.Subtitle>{item.contents}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScreenBox>

  )
}

export default Message