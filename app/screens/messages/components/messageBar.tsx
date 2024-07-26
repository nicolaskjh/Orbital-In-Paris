import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const placeholderProfilePicture = require('@/assets/images/profilepicture.jpg');

type MessageBarProps = {
  name: string,
  message: string
}

const MessageBar = ( {name, message}: MessageBarProps ) => {
  return (
    <View className="flex flex-row h-1/10 pl-4 py-1.5 border-b border-gray-500 items-center">
      <Image source={placeholderProfilePicture} className="w-14 h-14 rounded-full"/>
      <View className="flex flex-col h-full pl-2">
        <Text className="text-base font-bold">{name}</Text>
        <Text className="text-sm">{message}</Text>
      </View>
    </View>
  );
}

export default MessageBar;