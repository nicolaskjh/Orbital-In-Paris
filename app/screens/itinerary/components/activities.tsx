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
      {!isLoading && activities && activities.length != 0 && (activities[differenceInCalendarDays(selectedDay, tripStart)].activities.map((trip) => 
        <Activity key = {trip.id} time = {trip.time} location = {trip.location} activity = {trip.activity}/>)) }
      </ScrollView>
    </View>
  );
};

export default Activities;