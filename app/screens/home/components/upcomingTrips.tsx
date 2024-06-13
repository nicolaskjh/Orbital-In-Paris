import React from "react";
import { View, ScrollView } from "react-native";
import TripButton from "./tripButton";
import Button from "@/components/button";
import { useRouter } from 'expo-router';
import { getItineraries } from "@/utils/supabaseRequests";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { parseISO, compareAsc } from "date-fns";

type UpcomingTripsProps = {
  isPopupVisible: boolean;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type Itinerary = {
  id: number;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  owner: string;
};

type Itineraries = {
  itinerary: Itinerary;
};

const UpcomingTrips = ({ isPopupVisible, setPopupVisible }: UpcomingTripsProps) => {
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const [itineraries, setItineraries] = useState<Itineraries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortItinerariesByStartDate = (itineraries: Itineraries[]) => {
    return (
      itineraries.sort((a, b) => compareAsc(parseISO(a.itinerary.start_date), parseISO(b.itinerary.start_date)))
    );
  };

  useEffect(() => {
    const fetchItineraries = async () => {
      setIsLoading(true);
      try {
      const token = await getToken({ template: 'supabase' });
      const fetchedItineraries: Itineraries[] = await getItineraries({userId, token});
      const sortedItineraries = sortItinerariesByStartDate(fetchedItineraries);
      setItineraries(sortedItineraries);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItineraries();
    console.log(itineraries);
    setIsLoading(false);
  }, []);

  return (
    <View className="flex flex-col h-1/3 w-full justify-start items-center pb-3">
      <ScrollView className="flex w-full">
        {!isLoading && itineraries && (itineraries.map((trip) => <TripButton key = {trip.itinerary.id} city = {trip.itinerary.city} country = {trip.itinerary.country} startDate = {trip.itinerary.start_date} endDate={trip.itinerary.end_date} trip={trip.itinerary}/>))}
      </ScrollView>
      <Button text="Add a new trip!" textType="bold" type="plain" size="lg" corners="rounded" onPress={() => setPopupVisible(!isPopupVisible)}/>
    </View>
  );
}

export default UpcomingTrips;