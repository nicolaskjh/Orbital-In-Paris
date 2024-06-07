import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import WelcomeMessage from './components/welcomeMessage';
import Header from '@/components/header';
import NavigationBar from '@/components/navigationBar';
import UpcomingTrips from './components/upcomingTrips';
import NewTrip from './components/newTrip';
import { useUser } from '@clerk/clerk-expo';

const background = require('@/assets/images/background.png')

const HomePage = () => {
  const [isPopupVisible, setPopupVisible] = React.useState(false);

  const handleNewTripPress = () => {
    setPopupVisible(!isPopupVisible);
  };


  const {user} = useUser();

  return (
    <ImageBackground source={background} className="flex-1 flex-col justify-between bg-fixed bg-cover">
      <WelcomeMessage name={`${user?.username}`}/>
      <Header text="Upcoming Trips" size="xl" padding="left"/>
      <UpcomingTrips isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible}/>
      <NewTrip isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible}/>
      <NavigationBar/>
    </ImageBackground>
  );
}

export default HomePage;