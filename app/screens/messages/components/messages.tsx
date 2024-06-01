import React from 'react';
import { ScrollView, Text } from 'react-native';
import MessageBar from './messageBar';

const Messages = () => {
  const messages = [
    { id:0, name: 'Jerry', message: 'Hello!' },
    { id:1, name: 'Tom', message: 'Hi!' },
  ]

  return (
    <ScrollView className="flex flex-col w-full bg-white border-t border-grey">
      {messages.map((message) => {
        return (
          <MessageBar key={message.id} name={message.name} message={message.message}/>
      )})}
    </ScrollView>
  );
}

export default Messages;