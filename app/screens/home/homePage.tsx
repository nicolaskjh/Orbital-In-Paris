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
      <View className="flex pl-4">
        <Header text="Upcoming Trips" size="xl"/>
      </View>
      <UpcomingTrips/>
      <NavigationBar/>
    </ImageBackground>
  );
}

export default HomePage;