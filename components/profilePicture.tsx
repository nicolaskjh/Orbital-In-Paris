import React from 'react';
import { View, Image } from 'react-native';

const profilePicture = require('@/assets/images/profilepicture.jpg');

type ProfilePictureProps = {
  size: "lg" | "default",
};

const ProfilePicture = ({size}: ProfilePictureProps) => {
  const imageSize = size === "lg" ? "w-36 h-36" : "w-24 h-24";

  return (
    <View className="flex justify-center items-center">
      <Image source={profilePicture} className={`${imageSize} rounded-full border border-black m-4`}/>
    </View>
  );
}

export default ProfilePicture;