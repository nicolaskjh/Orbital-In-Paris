import React from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/header';
import TextField from '@/components/textField';
import Messages from '../messages/components/messages';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';

const MessagesPage = () => {
  return (
    <View className="flex-1 flex-col justify-between items-center pt-16 bg-white">
      <Header text="Chats" size="lg"/>
      <Text>Coming soon!</Text>
      <NavigationBar/>
    </View>
  );
}

export default MessagesPage;