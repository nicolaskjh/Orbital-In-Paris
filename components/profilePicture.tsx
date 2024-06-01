import React from 'react';
import { View, Image } from 'react-native';

const profilePicture = require('@/assets/images/profilepicture.jpg');

const ProfilePicture = () => {
  return (
    <View className="flex justify-center items-center">
      <Image source={profilePicture} className="w-24 h-24 rounded-full border border-black m-4"/>
    </View>
  );
}

export default ProfilePicture;