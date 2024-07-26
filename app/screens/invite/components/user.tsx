import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Button from '@/components/button';

const placeholderProfilePicture = require('@/assets/images/profilepicture.jpg');

type UserProps = {
  name: string,
  age: number,
  interests: string,
  isPopupVisible: boolean,
  id: number,
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const User = ( {name, age, interests, isPopupVisible, setPopupVisible}: UserProps ) => {
  return (
    <View className="flex flex-row h-1/10 px-4 py-1.5 border-b border-gray-500 items-center justify-between">
      <Image source={placeholderProfilePicture} className="w-14 h-14 rounded-full"/>
      <View className="flex-1 flex-col justify-center items-start">
        <Text className="text-base font-bold pl-4">{name}</Text>
        <Text className="text-sm pl-4">Age: {age}</Text>
        <Text className="text-sm pl-4">Interests: {interests}</Text>
      </View>
      <Button text="Invite" type="plain" textType="bold" corners="rounded" size="fitPadding" onPress={() => setPopupVisible(!isPopupVisible)}/>
      <InvitePopup isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible} tripCode= {trip.invite_code} invitation = {key}/>
    </View>
  );
}

export default User;