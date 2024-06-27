import React from 'react';
import { View, Text } from 'react-native'; 
import TripHeader from '@/components/tripHeader';
import FlightsDisplay from './components/flightsDisplay';
import AccommodationDisplay from './components/accommodationDisplay';
import FlightSearch from './components/flightSearch';
import AccomsSearch from './components/accomsSearch';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/functions/formatDate';

const FlightPage = () => {
  const trip = useLocalSearchParams();
  const [isFlightSearchVisible, setFlightSearchVisible] = useState(false);
  const [isAccomsSearchVisible, setAccomsSearchVisible] = useState(false);

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <View className="flex-1 justify-end">
        <FlightsDisplay isPopupVisible={isFlightSearchVisible} setPopupVisible={setFlightSearchVisible}/>
        <AccommodationDisplay isPopupVisible={isAccomsSearchVisible} setPopupVisible={setAccomsSearchVisible}/>
      </View>
      <FlightSearch isPopupVisible={isFlightSearchVisible} setPopupVisible={setFlightSearchVisible}/>
      <AccomsSearch isPopupVisible={isAccomsSearchVisible} setPopupVisible={setAccomsSearchVisible}/>
      <NavigationBar/>
    </View>
  );
}

export default FlightPage;