import React from "react";
import { View, ScrollView, Text } from "react-native";
import Button from "@/components/button";

const Activities = () => {


  return (
    <ScrollView className="flex flex-col w-full bg-white border-t">
      <View className="flex flex-row w-full items-center justify-between px-6 pt-2 bg-white">
        <View className="flex w-1/5 items-center border-r">
          <Text className="text-lg">08:00</Text>
        </View>
        <View className="flex w-3/5">
          <Text className="text-lg font-bold">Activity</Text>
        </View>
        <Button text="Edit" type="borderless" textType="normal" size="fit" corners="rounded"/>
      </View>
      <View className="flex flex-row w-full items-center justify-between px-6 pt-2 bg-white">
        <View className="flex w-1/5 items-center border-r">
          <Text className="text-lg">12:00</Text>
        </View>
        <View className="flex w-3/5">
          <Text className="text-lg font-bold">Activity</Text>
        </View>
        <Button text="Edit" type="borderless" textType="normal" size="fit" corners="rounded"/>
      </View>
    </ScrollView>
  );
};

export default Activities;