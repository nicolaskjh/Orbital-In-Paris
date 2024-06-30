import React from 'react';
import { View, Text } from 'react-native'; 
import TripHeader from '@/components/tripHeader';
import FlightsDisplay from './components/flightsDisplay';
import AccommodationDisplay from './components/accommodationDisplay';
import FlightSearch from './components/flightSearch';
import AccomsSearch from './components/accomsSearch';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/functions/formatDate';
import { useAuth } from '@clerk/clerk-react';
import { getFlightAndAccom } from '@/utils/supabaseRequests';
import { set } from 'date-fns';

const FlightPage = () => {
  const trip = useLocalSearchParams();
  const [isFlightSearchVisible, setFlightSearchVisible] = useState(false);
  const [isAccomsSearchVisible, setAccomsSearchVisible] = useState(false);
  const [flights, setFlights] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {userId, getToken} = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getToken({ template: 'supabase' });
        const data = await getFlightAndAccom({ token, userId, trip });
        console.log(data);

        setFlights(data.flight);
        setAccommodations(data.accom);
        console.log('Flights:', data.flight);
        console.log(!flights);
        console.log('Accommodations:', data.accom);
        console.log(!accommodations);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
        console.log('Loading:', false);
      }
    };
    getData();
  }, []);

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      {!isLoading && (flights.length === 0 && accommodations.length > 0) &&
        <View className="flex-1 justify-center">
          <FlightsDisplay isPopupVisible={isFlightSearchVisible} setPopupVisible={setFlightSearchVisible}/>
          <AccommodationDisplay booking={accommodations} isPopupVisible={isAccomsSearchVisible} setPopupVisible={setAccomsSearchVisible}/>
        </View>
      }
      {!isLoading && (flights.length > 0 && accommodations.length === 0) &&
        <View className="flex-1 justify-center">
          <FlightsDisplay booking={flights} isPopupVisible={isFlightSearchVisible} setPopupVisible={setFlightSearchVisible}/>
          <AccommodationDisplay isPopupVisible={isAccomsSearchVisible} setPopupVisible={setAccomsSearchVisible}/>
        </View>
      }
      {!isLoading && (flights.length > 0 && accommodations.length > 0) &&
        <View className="flex-1 justify-center">
          <FlightsDisplay booking={flights} isPopupVisible={isFlightSearchVisible} setPopupVisible={setFlightSearchVisible}/>
          <AccommodationDisplay booking={accommodations} isPopupVisible={isAccomsSearchVisible} setPopupVisible={setAccomsSearchVisible}/>
        </View>
      }
      {isLoading || (flights.length === 0 && accommodations.length === 0) &&
        <View className="flex-1 justify-center">
          <FlightsDisplay isPopupVisible={isFlightSearchVisible} setPopupVisible={setFlightSearchVisible}/>
          <AccommodationDisplay isPopupVisible={isAccomsSearchVisible} setPopupVisible={setAccomsSearchVisible}/>
        </View>
      } 
      <FlightSearch isPopupVisible={isFlightSearchVisible} setPopupVisible={setFlightSearchVisible}/>
      <AccomsSearch isPopupVisible={isAccomsSearchVisible} setPopupVisible={setAccomsSearchVisible}/>
      <NavigationBar/>
    </View>
  );
}

export default FlightPage;