import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import WelcomeMessage from './components/welcomeMessage';
import Header from '@/components/header';
import NavigationBar from '@/components/navigationBar';
import UpcomingTrips from './components/upcomingTrips';
import { useUser } from '@clerk/clerk-expo';

const background = require('@/assets/images/background.png')

const HomePage = () => {

  const {user} = useUser();

  return (
    <ImageBackground source={background} className="flex-1 flex-col justify-between bg-fixed bg-cover">
      <WelcomeMessage name={`${user?.username}`}/>
      <Header text="Upcoming Trips" size="xl" padding="left"/>
      <UpcomingTrips/>
      <NavigationBar/>
    </ImageBackground>
  );
}

export default HomePage;