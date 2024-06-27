import React from 'react';
import { View } from 'react-native';
import Header from '@/components/header';
import TripHeader from '@/components/tripHeader';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/functions/formatDate';

const AccommodationPage = () => {
  console.log("Rendered")
  const trip = useLocalSearchParams();

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <NavigationBar/>
    </View>
  );
};

export default AccommodationPage;
    