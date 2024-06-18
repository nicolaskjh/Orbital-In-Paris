import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/header';

const Balances = () => {
  return (
    <View className="flex-1">
      <ScrollView className="w-full">
        <Header text="Balances" size="md" padding="left"/>
      </ScrollView>
    </View>
  );
}

export default Balances;