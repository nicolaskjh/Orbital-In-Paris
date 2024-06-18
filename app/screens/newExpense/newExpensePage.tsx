import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import TextField from '@/components/textField';
import Split from './components/split';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { formatDate } from '@/functions/formatDate';

const NewExpensePage = () => {
  const trip = useLocalSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleSaveExpense = () => {
    // Save expense
    router.replace({pathname: 'budget', params: trip});
  };

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <View className="flex-1 justify-center items-center px-8 py-2">
        <TextField placeholder="Category" value={category} onChangeText={(category) => setCategory(category)}/>
        <TextField placeholder="Description" value={description} onChangeText={(description) => setDescription(description)}/>
        <TextField placeholder="Amount" value={amount} onChangeText={(amount) => setAmount(amount)}/>
        <Button text="Split Expense" type="plain" size="md" corners="rounded" onPress={() => setPopupVisible(!isPopupVisible)}/>
      </View>
      <Split trip={trip} isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible}/>
      <View className="flex w-full items-center px-8 py-2">
        <Button text="Save Expense" type="plain" size="lg" corners="rounded" onPress={handleSaveExpense}/>
      </View>
      <NavigationBar/>
    </View>
  );
};  

export default NewExpensePage;