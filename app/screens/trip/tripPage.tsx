import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import TripHeader from './components/tripHeader';
import TripTabs from './components/tripTabs';
import NavigationBar from '@/components/navigationBar';

const background = require('@/assets/images/background.png')

const TripPage = () => {  
  return (
    <ImageBackground source={background} className="flex-1 flex-col justify-between bg-fixed bg-cover">
      <TripHeader/>
      <TripTabs/>
      <NavigationBar/>
    </ImageBackground>
  );
};

export default TripPage;