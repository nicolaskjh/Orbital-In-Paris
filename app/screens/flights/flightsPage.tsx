import React , { useEffect, useState }from 'react';
import { View, Text } from 'react-native';
import TripHeader from '@/components/tripHeader';
import Flights from './components/flights';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/functions/formatDate';
import { getFlightList } from '@/utils/flightRequests';
import { id } from 'date-fns/locale';

const FlightsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const flightDetails = useLocalSearchParams();

  const details = {
    from : flightDetails.from,
    to : flightDetails.to,
    flightDate : flightDetails.flightDate,
    returnDate : flightDetails.returnDate,
  }

  const trip = {
    city: flightDetails.city,
    country: flightDetails.country,
    start_date: flightDetails.start_date,
    end_date: flightDetails.end_date,
    id: flightDetails.itinerary
  }
  console.log(trip)
  useEffect(() => {
    const getData = async () => {
      // fetch data from the backend
      const res = await getFlightList(details);
      setData(res);
      console.log(data);
    }
    getData();
    setIsLoading(false);
  }, []);

  return (
    <View className="flex flex-col w-full h-full justify-between bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <Text className="text-base font-bold text-center pt-4">Round Trips from {details.to} to {details.from}</Text>
      <Text className="text-base text-center">{formatDate(details.flightDate)} - {formatDate(details.returnDate)}</Text>
      <Flights flights={data} trip = {trip}/>
      <NavigationBar/>
    </View>
  )
};

export default FlightsPage;