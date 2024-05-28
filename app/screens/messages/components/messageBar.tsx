import React from 'react';
import { View, Text, Image } from 'react-native';

const placeholderProfilePicture = require('@/assets/images/profilepicture.jpg');

type MessageBarProps = {
  name: string,
  message: string
}

const MessageBar = ( {name, message}: MessageBarProps ) => {
  return (
    <View className="flex flex-row h-1/10 pl-4 py-1.5 border-y">
      <Image source={placeholderProfilePicture} className="w-24 h-24 rounded-full m-1"/>
      <View className="flex flex-col">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-base">{message}</Text>
      </View>
    </View>
  );
}

export default MessageBar;