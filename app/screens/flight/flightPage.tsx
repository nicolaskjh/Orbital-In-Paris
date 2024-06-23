import React from 'react';
import { View, Text } from 'react-native'; 
import TripHeader from '@/components/tripHeader';
import Flights from './components/flights';
import Accommodation from './components/accommodation';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/functions/formatDate';

const FlightPage = () => {
  const trip = useLocalSearchParams();

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <View className="flex-1 justify-center">
        <Flights/>
        <Accommodation/>
      </View>
      <NavigationBar/>
    </View>
  );
}

export default FlightPage;