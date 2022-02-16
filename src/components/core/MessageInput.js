import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState()

  const handleSend= () => {
    onSend(message)
    setMessage('')
  }

  return (
    <Input
      value={message}
      autoCapitalize='none'
      placeholder="New Message..."
      leftIcon={{ type: 'ionicon', name: 'chatbubbles-outline' }}
      rightIcon={<Button title="Send" onPress={handleSend} />}
      onChangeText={e => setMessage(e)}
    />
  )
}

export default MessageInput