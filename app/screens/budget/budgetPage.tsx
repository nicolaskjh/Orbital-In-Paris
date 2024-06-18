import React from 'react';
import { View, Text } from 'react-native';
import TripHeader from '@/components/tripHeader';
import BalancePreview from './components/balancePreview';
import BudgetTabs from './components/budgetTabs';
import Expenses from './components/expenses';
import Button from '@/components/button';
import NewExpense from './components/newExpense';
import NavigationBar from '@/components/navigationBar';
import { useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/functions/formatDate';
import { useState } from 'react';

const BudgetPage = () => {
  const trip = useLocalSearchParams();
  const [isPopupVisible, setPopupVisible] = useState(false);
  
  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <BalancePreview balance={10}/>
      <BudgetTabs/>
      <Expenses/>
      <View className="flex flex-row w-full px-8 py-2 justify-end">
        <Button text="+" type="black" textType="bold" size="circle" corners="rounded" onPress={() => setPopupVisible(!isPopupVisible)}/>
      </View>
      <NewExpense isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible}/>
      <NavigationBar/>
    </View>
  );
}

export default BudgetPage;