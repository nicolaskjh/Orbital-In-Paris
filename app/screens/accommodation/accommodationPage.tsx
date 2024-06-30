import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import TripHeader from '@/components/tripHeader';
import Header from '@/components/header';
import Hotels from './components/hotels';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/functions/formatDate';
import { getHotelList } from '@/utils/hotelRequests';

const AccommodationPage = () => {
  const bookingDetails = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  console.log(bookingDetails)

  useEffect(() => {
    const getData = async () => {
      // fetch data from the backend
      const data = await getHotelList(bookingDetails);
      setData(data);
    }
    getData();
    setIsLoading(false);
  }, []);

  const metadata = {
    checkin_date: bookingDetails.checkin_date,
    checkout_date: bookingDetails.checkout_date,
    itinerary_id: bookingDetails.itinerary,
    city : bookingDetails.city,
    country : bookingDetails.country,
    start_date : bookingDetails.start_date,
    end_date : bookingDetails.end_date,
  }

  return (
    <View className="flex flex-col w-full h-full justify-between bg-white">
      <TripHeader city={bookingDetails.city} country={bookingDetails.country} startDate={formatDate(bookingDetails.start_date)} endDate={formatDate(bookingDetails.end_date)}/>
      <Text className="text-base font-bold text-center pt-4">Accommodation in {bookingDetails.city}</Text>
      <Text className="text-base text-center">{formatDate(bookingDetails.checkin_date)} - {formatDate(bookingDetails.checkout_date)}</Text>
      <Hotels hotels={data} metadata = {metadata}/>
      <NavigationBar/>
    </View>
  )
};

export default AccommodationPage;