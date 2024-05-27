import React from 'react';
import { View } from 'react-native';
import Background from '@/components/background';
import NavigationBar from '@/components/navigationBar';

const HomePage = () => {
  return (
    <View className="flex-1 flex-col justify-between items-center">
      <Background/>
      <NavigationBar/>
    </View>
  );
}

export default HomePage;