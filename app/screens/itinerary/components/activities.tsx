import React from "react";
import { View, ScrollView, Text } from "react-native";
import Activity from "./activity";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { getActivities } from "@/utils/supabaseRequests";
import { differenceInCalendarDays } from 'date-fns';

type ActivitiesProps = {
  trips: any;
  selectedDay: Date;
  tripStart: Date;
  refreshToken: number;
};

const Activities = ({trips, selectedDay, tripStart, refreshToken}: ActivitiesProps) => {
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
      console.log(activity);
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
      {!isLoading && activities && activities[differenceInCalendarDays(selectedDay, tripStart)].activities.length != 0 ? (
        activities[differenceInCalendarDays(selectedDay, tripStart)].activities.sort((a, b) => {
          const [hoursA, minutesA, secondsA] = a.time.split(":").map(Number);
          const [hoursB, minutesB, secondsB] = b.time.split(":").map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          } else if (minutesA !== minutesB) {
            return minutesA - minutesB;
          } else {
            return secondsA - secondsB;
          }
        }).map((trip) => 
        <Activity key = {trip.id} time = {trip.time} location = {trip.location} activity = {trip.activity}/>)
        ) : !isLoading ? (
        <Text className="text-center text-gray-500 mt-4">No activities planned for the day</Text>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Activities;