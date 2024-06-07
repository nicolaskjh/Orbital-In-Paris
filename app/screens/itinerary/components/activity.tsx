import React from "react";
import { View, Text } from "react-native";
import Button from "@/components/button";

type ActivityProps = {
  time: String,
  location: String,
  activity: String
}

const Activity = ( {time, location, activity} : ActivityProps ) => {
  return (
    <View className="flex flex-row w-full items-center justify-between px-4 pt-2 bg-white">
      <View className="flex w-1/6 items-center border-r">
        <Text className="text-base font-bold">{time}</Text>
      </View>
      <View className="flex flex-col w-2/3">
        <Text className="text-base font-bold">{location}</Text>
        <Text className="text-sm">{activity}</Text>
      </View>
      <Button text="Edit" type="borderless" textType="normal" size="fit" corners="rounded"/>
  </View>
  );
};  

export default Activity;
