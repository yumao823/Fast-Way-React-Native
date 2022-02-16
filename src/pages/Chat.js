import React, { useEffect, useState } from 'react'
import ScreenBox from '../components/core/ScreenBox'
import ChatGroup from '../components/ChatGroup'
import CreateChat from '../components/CreateChat'
import axios from 'axios';
import { useSelector } from 'react-redux';


const Chat = (props) => {

  const { showCreateChat, setShowCreateChat } = props;
  const auth = useSelector(state => state.state.auth);
  const { userId } = auth;

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const handleData = (chat) => {
    setData([...data, chat]);
    setShowCreateChat(false);
  }

  const addMessageToChat = (message) => {
    let tempData = [...data];
    let affectedChat = {};
    tempData = tempData.map((chat) => {
      let tempChat = { ...chat };
      if (tempChat._id === message.chatId[0]) {
        let tempMessages = [...tempChat.messages, message._id, ];
        tempChat.messages = tempMessages;
        affectedChat = tempChat;
        return tempChat
      } else {
        return chat
      }
    })


    setData([...tempData])
  }

  const handleChats = (chats) => {

    let promises = [];
    for (let id of chats) {
      promises.push(
        axios.get(`http://localhost:8000/api/chats/${id}`)
          .then(res => res.data)
          .catch(err => console.log(err))
      )
    }
    return promises
  }


  useEffect(() => {
    const getUserChats = async () => {

      try {
        let userResults = await axios.get(`http://localhost:8000/api/users/${userId}`)
        const { data: userData } = userResults;
        setUser(userData);

        const tempChats = handleChats(userData.chats);

        let results = await Promise.all(tempChats)
        setData(results)

      } catch (err) {
        console.log(err);
      }

    }
    getUserChats()


  }, [])

  return (
    <ScreenBox>
      {
        showCreateChat &&
        <CreateChat handleData={handleData} />
      }
      {data.map((item, index) => <ChatGroup addMessageToChat={addMessageToChat} key={`cg-${index}`} chat={item} />)}
    </ScreenBox>
  )
}

export default Chat