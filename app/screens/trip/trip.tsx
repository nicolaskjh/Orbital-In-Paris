import React from 'react';
import { View, ImageBackground ,Text} from 'react-native';
import TripHeader from '@/components/tripHeader';
import TripTabs from './components/tripTabs';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams } from 'expo-router';
import { parseISO, format } from "date-fns";

const background = require('@/assets/images/background.png')

const TripPage = () => { 
  const trip = useLocalSearchParams();

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'd MMM');
  };
  
  return (
    <ImageBackground source={background} className="flex-1 flex-col justify-between bg-fixed bg-cover">
      <TripHeader city={trip.city} country= {trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <TripTabs trips = {trip}/>
      <View className='flex items-center w-full'>
        <Button text="Edit Trip" type="plain" textType="bold" corners="rounded" size="lg"/>
      </View>
      <NavigationBar/>
    </ImageBackground>
  );
};

export default TripPage;