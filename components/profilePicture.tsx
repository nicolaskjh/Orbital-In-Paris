import React from 'react';
import { View, Image } from 'react-native';

const profilePicture = require('@/assets/images/profilepicture.jpg');

type ProfilePictureProps = {
  size: "lg" | "default" | "sm",
};

const ProfilePicture = ({size}: ProfilePictureProps) => {
  const imageSize = size === "lg" ? "w-36 h-36" : size === "default" ? "w-24 h-24": "w-12 h-12";
  const margin = size === "sm" ? "" : "m-4"

  return (
    <View className="flex justify-center items-center">
      <Image source={profilePicture} className={`${imageSize} rounded-full border border-black ${margin}`}/>
    </View>
  );
}

export default ProfilePicture;