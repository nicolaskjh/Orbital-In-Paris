import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const placeholderProfilePicture = require('@/assets/images/profilepicture.jpg');

type GroupMemberProps = {
  name: string,
}

const GroupMember = ( {name}: GroupMemberProps ) => {
  return (
    <TouchableOpacity className="flex flex-row h-1/10 pl-4 py-1.5 border-b border-gray-500 items-center">
      <Image source={placeholderProfilePicture} className="w-14 h-14 rounded-full"/>
      <Text className="text-base pl-4">{name}</Text>
    </TouchableOpacity>
  );
}

export default GroupMember;