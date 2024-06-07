import React from "react";
import { View, ScrollView, Text } from "react-native";
import Activity from "./activity";

const Activities = () => {
  const itinerary = [
    {id: 0, time: "09:00", location: "Singapore", activity: "Flight from Singapore to Paris"},
    {id: 1, time: "18:00", location: "Paris", activity: "Check in at Hotel"},
  ]

  return (
    <View className="flex-1 border-t">
    <ScrollView className="flex flex-col w-full bg-white">
      {itinerary.map((item) => {
        return(
          <Activity key={item.id} time={item.time} location={item.location} activity={item.activity}/>
        )
      })}
    </ScrollView>
    </View>
  );
};

export default Activities;