import React from 'react';
import { View } from 'react-native';
import NavigationBar from '@/components/navigationBar';
import Messages from '../messages/components/messages';

const MessagesPage = () => {
  return (
    <View className="flex-1 flex-col justify-between items-center pt-24 bg-white">
      <Messages/>
      <NavigationBar/>
    </View>
  );
}

export default MessagesPage;