import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type TripButtonProps = {
  city: string,
  country: string,
  startDate: string,
  endDate: string
};

const TripButton = ( {city, country, startDate,endDate}: TripButtonProps ) => {
  const router = useRouter();

  return (
    <View className="flex flex-row w-full justify-center m-1">
      <LinearGradient 
        className="w-3/4 rounded-full border border-black" 
        colors = {["#94afed", "#E4EFE9"]} start = {[0, 0]} end = {[1, 1]} locations = {[0.25, 1]}
      >
        <TouchableOpacity className="flex flex-row w-full items-center pl-4 py-1.5" onPress={() => router.replace('trip')}>
          <FontAwesome name="plane" size={25} color="black"/>
          <View className="flex flex-col pl-2">
            <Text className="text-base font-bold">{city}, {country}</Text>
            <Text className="text-sm">{startDate}</Text>
            <Text className="text-sm">{endDate}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

export default TripButton;