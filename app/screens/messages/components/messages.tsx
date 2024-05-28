import React from 'react';
import { ScrollView, Text } from 'react-native';
import MessageBar from './messageBar';

const Messages = () => {
  const messages = [
    { id:0, name: 'Jerry', message: 'Hello!' },
    { id:1, name: 'Tom', message: 'Hi!' },
  ]

  return (
    <ScrollView className="flex flex-col w-full h-4/5 bg-white border-t">
      {messages.map((message) => {
        return (
          <MessageBar key={message.id} name={message.name} message={message.message}/>
      )})}
      <Text className="text-lg font-bold text-black">Placeholder</Text>
    </ScrollView>
  );
}

export default Messages;