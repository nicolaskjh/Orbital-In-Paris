import React from "react";
import { View, Text } from "react-native";

const TripHeader = () => {
  return (
    <View className="flex flex-col h-1/2 pt-24 pl-8">
      <Text className="text-3xl font-bold">Paris, France</Text>
      <Text className="text-xl font-base">14 Jun - 30 Jun</Text>
    </View>
  );
}

export default TripHeader;