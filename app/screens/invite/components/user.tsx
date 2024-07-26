import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Button from '@/components/button';

const placeholderProfilePicture = require('@/assets/images/profilepicture.jpg');

type UserProps = {
  name: string,
  age: number,
  interests: string,
  id: number,
  isPopupVisible: boolean,
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  invitee: number;
  setInvitee: React.Dispatch<React.SetStateAction<number>>;
}

const User = ( {name, age, interests, id, isPopupVisible, setPopupVisible, invitee, setInvitee}: UserProps ) => {
  const handleInvitePress = () => {
    setInvitee(id);
    setPopupVisible(!isPopupVisible);
    console.log(invitee);
  }

  return (
    <View className="flex flex-row h-1/10 px-4 py-1.5 border-b border-gray-500 items-center justify-between">
      <Image source={placeholderProfilePicture} className="w-14 h-14 rounded-full"/>
      <View className="flex-1 flex-col justify-center items-start">
        <Text className="text-base font-bold pl-4">{name}</Text>
        <Text className="text-sm pl-4">Age: {age}</Text>
        <Text className="text-sm pl-4">Interests: {interests}</Text>
      </View>
      <Button text="Invite" type="plain" textType="bold" corners="rounded" size="fitPadding" onPress={handleInvitePress}/>
    </View>
  );
}

export default User;