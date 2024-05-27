import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type TripButtonProps = {
  city: string,
  country: string,
  duration: string,
};

const TripButton = ( {city, country, duration}: TripButtonProps ) => {
  const router = useRouter();

  return (
    <View className="flex flex-row w-full justify-center m-1">
      <LinearGradient 
        className="w-3/4 rounded-full border border-black" 
        colors = {["#94afed", "#E4EFE9"]} start = {[0, 0]} end = {[1, 1]} locations = {[0.25, 1]}
      >
        <TouchableOpacity className="flex flex-row w-full items-center pl-4 py-2.5">
          <FontAwesome name="plane" size={25} color="black"/>
          <View className="flex flex-col pl-2">
            <Text className="text-base font-bold">{city}, {country}</Text>
            <Text className="text-sm">{duration}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

export default TripButton;