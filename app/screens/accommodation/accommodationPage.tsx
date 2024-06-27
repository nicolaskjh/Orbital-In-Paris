import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
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
      const res = getHotelList(bookingDetails);
      setData(res)
    }
    getData();
    setIsLoading(false);
  }, []);

  return (
    <View className="flex flex-col w-full h-full justify-between bg-white">

      <NavigationBar/>
    </View>
  )
};

export default AccommodationPage;