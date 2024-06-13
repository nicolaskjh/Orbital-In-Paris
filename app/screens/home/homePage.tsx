import React, { useEffect } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import WelcomeMessage from './components/welcomeMessage';
import Header from '@/components/header';
import NavigationBar from '@/components/navigationBar';
import UpcomingTrips from './components/upcomingTrips';
import NewTrip from './components/newTrip';
import { useUser } from '@clerk/clerk-expo';
import {useAuth} from '@clerk/clerk-react';
import { getProfile } from '@/utils/supabaseRequests';

const background = require('@/assets/images/background.png')

const HomePage = () => {
  const [isPopupVisible, setPopupVisible] = React.useState(false);
  const [ profile, setProfile ] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleNewTripPress = () => {
    setPopupVisible(!isPopupVisible);
  };

  const {userId, getToken} = useAuth();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
      const token = await getToken({ template: 'supabase' });
      const profile = await getProfile({userId, token});
      setProfile(profile);
      setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, []);

  return (
    <ImageBackground source={background} className="flex-1 flex-col justify-between bg-fixed bg-cover">
      {!isLoading && (<WelcomeMessage name={`${profile[0].name}`}/>)}
      <Header text="Upcoming Trips" size="xl" padding="left"/>
      <UpcomingTrips isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible}/>
      <NewTrip isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible}/>
      <NavigationBar/>
    </ImageBackground>
  );
}

export default HomePage;