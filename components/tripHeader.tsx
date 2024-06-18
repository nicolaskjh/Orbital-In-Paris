import React from "react";
import { View, Text } from "react-native";

type TripHeaderProps = {
  city: string,
  country: string,
  startDate: string,
  endDate: string
};

const TripHeader = ( {city, country, startDate, endDate}: TripHeaderProps ) => {
  return (
    <View className="flex flex-col pt-20 pl-8">
      <Text className="text-3xl font-bold">{city}, {country}</Text>
      <Text className="text-xl font-base">{startDate} - {endDate}</Text>
    </View>
  );
}

export default TripHeader;