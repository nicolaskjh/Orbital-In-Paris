import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const placeholderProfilePicture = require('@/assets/images/profilepicture.jpg');

type MessageBarProps = {
  name: string,
  message: string
}

const MessageBar = ( {name, message}: MessageBarProps ) => {
  return (
    <TouchableOpacity className="flex flex-row h-1/10 pl-4 py-1.5 border-b items-center">
      <Image source={placeholderProfilePicture} className="w-12 h-12 rounded-full"/>
      <View className="flex flex-col h-fit justify-center pl-2">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-base">{message}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default MessageBar;