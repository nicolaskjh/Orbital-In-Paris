import React from "react";
import { View, ScrollView, Text } from "react-native";
import Activity from "./activity";

const Activities = () => {
  const itinerary = [
    {id: 0, time: "09:00", activity: "Flight from Singapore to Paris"},
    {id: 1, time: "18:00", activity: "Check in at Hotel"},
  ]

  return (
    <ScrollView className="flex flex-col w-full bg-white border-t">
      {itinerary.map((item) => {
        return(
          <Activity key={item.id} time={item.time} activity={item.activity}/>
        )
      })}
    </ScrollView>
  );
};

export default Activities;