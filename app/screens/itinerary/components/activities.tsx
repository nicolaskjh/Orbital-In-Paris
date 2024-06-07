import React from "react";
import { View, ScrollView, Text } from "react-native";
import Activity from "./activity";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";

import { getActivities } from "@/utils/supabaseRequests";

const Activities = ({trips, refreshToken}) => {
  const itinerary = [
    {id: 0, time: "09:00", location: "Singapore", activity: "Flight from Singapore to Paris"},
    {id: 1, time: "18:00", location: "Paris", activity: "Check in at Hotel"},
  ]
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  console.log(refreshToken)

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
      const token = await getToken({ template: 'supabase' });
      const trip = trips.id
      const activity = await getActivities({token, trip});
      setActivities(activity);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchActivities();
  }, [refreshToken]);

  return (
    <View className="flex-1 border-t">
    <ScrollView className="flex flex-col w-full bg-white">
      {!isLoading && activities && activities.length != 0 && (activities[0].activities.map((trip) => <Activity key = {trip.id} time = {trip.time} location = {trip.location} activity = {trip.activity}/>)) }
    </ScrollView>
    </View>
  );
};

export default Activities;