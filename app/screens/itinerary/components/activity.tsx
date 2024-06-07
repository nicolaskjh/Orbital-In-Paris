import React from "react";
import { View, Text } from "react-native";
import Button from "@/components/button";

type ActivityProps = {
  time: String,
  activity: String
}

const Activity = ( {time, activity} : ActivityProps ) => {
  return (
    <View className="flex flex-row w-full items-center justify-between px-6 pt-2 bg-white">
      <View className="flex w-1/5 items-center border-r">
        <Text className="text-base">{time}</Text>
      </View>
      <View className="flex w-3/5">
        <Text className="text-base">{activity}</Text>
      </View>
      <Button text="Edit" type="borderless" textType="normal" size="fit" corners="rounded"/>
  </View>
  );
};  

export default Activity;
