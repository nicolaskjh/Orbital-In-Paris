import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/header';

const TotalExpenses = () => {
  return (
    <View className="flex-1">
      <ScrollView className="w-full">
        <Header text="Total Expenses" size="md" padding="left"/>
      </ScrollView>
    </View>
  );
}

export default TotalExpenses;