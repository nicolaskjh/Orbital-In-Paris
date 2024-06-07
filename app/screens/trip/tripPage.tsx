import React from 'react';
import { View, ImageBackground } from 'react-native';
import TripHeader from '@/components/tripHeader';
import TripTabs from './components/tripTabs';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';

const background = require('@/assets/images/background.png')

const TripPage = () => {  
  return (
    <ImageBackground source={background} className="flex-1 flex-col justify-between bg-fixed bg-cover">
      <TripHeader city="Paris" country="France" startDate="14 Jun" endDate="30 Jun"/>
      <TripTabs/>
      <View className='flex items-center w-full'>
        <Button text="Edit Trip" type="plain" textType="bold" corners="rounded" size="lg"/>
      </View>
      <NavigationBar/>
    </ImageBackground>
  );
};

export default TripPage;