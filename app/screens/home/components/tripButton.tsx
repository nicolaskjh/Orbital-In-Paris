import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { parseISO, format } from "date-fns";

type TripButtonProps = {
  city: string,
  country: string,
  startDate: string,
  endDate: string,
  trip: any
};

const TripButton = ( {city, country, startDate, endDate, trip}: TripButtonProps ) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'd MMM');
  };

  return (
    <View className="flex flex-row w-full justify-center m-1">
      <LinearGradient 
        className="w-3/4 rounded-full border border-black" 
        colors = {["#94afed", "#E4EFE9"]} start = {[0, 0]} end = {[1, 1]} locations = {[0.25, 1]}
      >
        <TouchableOpacity className="flex flex-row w-full items-center pl-4 py-1.5" onPress={() => router.replace({pathname:`trip`, params: trip})}>
          <FontAwesome name="plane" size={25} color="black"/>
          <View className="flex flex-col pl-2">
            <Text className="text-base font-bold">{city}, {country}</Text>
            <Text className="text-sm">{formatDate(startDate)} - {formatDate(endDate)}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

export default TripButton;