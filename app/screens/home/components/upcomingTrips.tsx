import React from "react";
import { View, ScrollView } from "react-native";
import TripButton from "./tripButton";
import Button from "@/components/button";
import { useRouter } from 'expo-router';

const UpcomingTrips = () => {
  const router = useRouter();

  const trips = [
    { key: 1, city: "Paris", country: "France", duration: "14 Jun - 30 Jun" },
    { key: 2, city: "Tokyo", country: "Japan", duration: "7 Jul - 21 Jul" },
    { key: 3, city: "Los Angeles", country: "USA", duration: "10 Aug - 21 Aug" },
    { key: 4, city: "Seoul", country: "South Korea", duration: "1 Sep - 9 Sep" } , 
  ]

  return (
    <View className="flex flex-col h-1/3 w-full justify-start items-center pb-3">
      <ScrollView className="flex w-full">
        {trips.map((trip) => <TripButton key = {trip.key} city = {trip.city} country = {trip.country} duration = {trip.duration}/>)}
      </ScrollView>
      <Button text="Plan a new trip!" textType="bold" type="plain" size="lg" corners="rounded" onPress={() => router.replace('start')}/>
    </View>
  );
}

export default UpcomingTrips;