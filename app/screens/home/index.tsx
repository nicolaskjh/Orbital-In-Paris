import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import WelcomeMessage from './components/welcomeMessage';
import Header from '@/components/header';
import NavigationBar from '@/components/navigationBar';
import UpcomingTrips from './components/upcomingTrips';

const background = require('@/assets/images/background.png')

const HomePage = () => {
  return (
    <ImageBackground source={background} className="flex-1 flex-col justify-between bg-fixed bg-cover">
      <WelcomeMessage name="Javier"/>
      <View className="flex pl-4">
        <Header text="Upcoming Trips" size="xl"/>
      </View>
      <UpcomingTrips/>
      <NavigationBar/>
    </ImageBackground>
  );
}

export default HomePage;