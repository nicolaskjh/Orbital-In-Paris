import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';

type TripTabProps = {
  text: string,
  icon: any,
  path: string,
}

const TripTab = ( {text, icon, path} : TripTabProps ) => {
  const router = useRouter();

  return (
    <View className="flex flex-row w-full justify-center m-1">
      <TouchableOpacity className="flex flex-row items-center w-4/5 rounded border border-black bg-white px-1" onPress={() => router.replace(path)}>
        <Image source={icon} className="w-10 h-10 m-1"/>
        <Text className="text-base font-bold">{text}</Text>
      </TouchableOpacity> 
    </View>
  );
}

export default TripTab;