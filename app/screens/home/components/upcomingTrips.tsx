import React from "react";
import { View, ScrollView } from "react-native";
import TripButton from "./tripButton";
import Button from "@/components/button";
import { useRouter } from 'expo-router';
import { getItineraries } from "@/utils/supabaseRequests";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

type UpcomingTripsProps = {
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpcomingTrips = ({ isPopupVisible, setPopupVisible }: UpcomingTripsProps) => {
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      setIsLoading(true);
      try {
      const token = await getToken({ template: 'supabase' });
      const itineraries = await getItineraries({userId, token});
      setItineraries(itineraries);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItineraries();
    setIsLoading(false);
    console.log(itineraries);
  }, []);

  const trips = [
    { key: 1, city: "Paris", country: "France", duration: "14 Jun - 30 Jun" },
    { key: 2, city: "Tokyo", country: "Japan", duration: "7 Jul - 21 Jul" },
    { key: 3, city: "Los Angeles", country: "USA", duration: "10 Aug - 21 Aug" },
    { key: 4, city: "Seoul", country: "South Korea", duration: "1 Sep - 9 Sep" } , 
  ]

  return (
    <View className="flex flex-col h-1/3 w-full justify-start items-center pb-3">
      <ScrollView className="flex w-full">
        {!isLoading && (itineraries.map((trip) => <TripButton key = {trip.key} city = {trip.city} country = {trip.country} startDate = {trip.start_date} endDate={trip.end_date}/>))}
      </ScrollView>
      <Button text="Plan a new trip!" textType="bold" type="plain" size="lg" corners="rounded" onPress={() => setPopupVisible(!isPopupVisible)}/>
    </View>
  );
}

export default UpcomingTrips;