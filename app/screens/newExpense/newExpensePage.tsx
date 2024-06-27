import React from 'react';
import { View } from 'react-native';
import TripHeader from '@/components/tripHeader';
import { Dropdown } from 'react-native-element-dropdown';
import TextField from '@/components/textField';
import Split from './components/split';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { formatDate } from '@/functions/formatDate';
import { useAuth } from '@clerk/clerk-react';
import { addTransaction } from '@/utils/supabaseRequests';

const NewExpensePage = () => {
  const trip = useLocalSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [participants, setParticipants] = useState([]);
  const {userId, getToken} = useAuth();

  const handleSaveExpense = async () => {
    const token = await getToken({ template: 'supabase' });
    const transaction = {
      userId,
      category,
      description,
      amount,
      date,
      itinerary: trip.id,
      shares: participants
    }
    console.log(transaction)
    const iti = await addTransaction({token, transaction});
    router.replace({pathname: 'budget', params: trip});
  };

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <View className="flex-1 justify-center items-center px-8 py-2">
        <Dropdown 
          style={{width: '80%', borderWidth: 1, borderRadius: 32, borderColor: 'black', marginBottom: 4, paddingHorizontal: 8}}
          placeholderStyle={{color: 'grey', fontSize: 14, padding: 0}}
          selectedTextStyle={{color: 'black', fontSize: 14, padding: 0}}
          placeholder="Category" 
          value={category} 
          labelField="label"
          valueField="value"
          data={[
            {label: 'Accommodation', value: 'Accommodation'},
            {label: 'Transport', value: 'Transport'},
            {label: 'Food', value: 'Food'},
            {label: 'Shopping', value: 'Shopping'},
            {label: 'Settle Balances', value: 'Settle Balances'},
            {label: 'Others', value: 'Others'}
          ]}
          onChange={(item) => setCategory(item.value)}
        />
        <TextField placeholder="Description" value={description} onChangeText={(description) => setDescription(description)}/>
        <TextField placeholder="Amount" value={amount} onChangeText={(amount) => setAmount(amount)}/>
        <TextField placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={(date) => setDate(date)}/>
        <Button text="Split Expenses" type="plain" size="md" corners="rounded" onPress={() => setPopupVisible(!isPopupVisible)}/>
      </View>
      <Split trip={trip} isPopupVisible={isPopupVisible} setPopupVisible={setPopupVisible} participants={participants} setParticipants={setParticipants}/>
      <View className="flex w-full items-center px-8 py-2">
        <Button text="Save Expense" type="plain" size="lg" textType="bold" corners="rounded" onPress={handleSaveExpense}/>
      </View>
      <NavigationBar/>
    </View>
  );
};  

export default NewExpensePage;