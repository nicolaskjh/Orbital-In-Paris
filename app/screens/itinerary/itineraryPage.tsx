import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import DateSlider from './components/dateSlider';
import NavigationBar from '@/components/navigationBar';

const ItineraryPage = () => {
  return (
    <View className="flex flex-col justify-between h-full bg-white">
      <TripHeader/>
      <DateSlider/>
      <NavigationBar/>
    </View>
  );
};

export default ItineraryPage;