import React , { useEffect, useState }from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/functions/formatDate';
import { getFlightList } from '@/utils/flightRequests';

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
    end_date: flightDetails.end_date
  }

  useEffect(() => {
    const getData = async () => {
      // fetch data from the backend
      const res = getFlightList(details);
      setData(res)
    }
    getData();
    setIsLoading(false);
  }, []);

  return (
    <View className="flex flex-col w-full h-full justify-between bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <NavigationBar/>
    </View>
  )
};

export default FlightsPage;