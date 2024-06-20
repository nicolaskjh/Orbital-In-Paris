import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import TripHeader from '@/components/tripHeader';
import BalancePreview from './components/balancePreview';
import BudgetTabs from './components/budgetTabs';
import Expenses from './components/expenses';
import Balances from './components/balances';
import TotalExpenses from './components/totalExpenses';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { formatDate } from '@/functions/formatDate';
import { useAuth } from '@clerk/clerk-react';
import { getExpenses, getBalances } from '@/utils/supabaseRequests';

const BudgetPage = () => {
  const trip = useLocalSearchParams();
  const router = useRouter();
  const [display, setDisplay] = useState('expenses');
  const [data, setData] = useState([]);
  const [balances, setBalances] = React.useState({});
  const [overall, setOverall] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const {userId, getToken} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
      const token = await getToken({ template: 'supabase' });
      const data = await getExpenses({token, trip, userId});
      setData(data);
      const user = data.userId
      const balance = await getBalances({token, trip, user});
      setBalances(balance.balances);
      setOverall(balance.overall);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    console.log(balances)
    setIsLoading(false);
  }, []);

  return (
    <View className="flex flex-col justify-between h-full w-full bg-white">
      <TripHeader city={trip.city} country={trip.country} startDate={formatDate(trip.start_date)} endDate={formatDate(trip.end_date)}/>
      <BalancePreview balance={overall}/>
      <BudgetTabs display={display} setDisplay={setDisplay}/>
      {!isLoading && display === 'expenses' ? (
        <Expenses data={data}/>
      ) : display === 'balances' ? (
        <Balances trip={trip} user={data.userId} balances={balances} overall={overall}/>
      ) : (
        <TotalExpenses/>
      )}
      <View className="flex flex-row w-full px-8 py-2 justify-end">
        <Button text="+" type="plain" textType="bold" size="circle" corners="rounded" onPress={() => router.replace({pathname: 'newExpense', params: trip})}/>
      </View>
      <NavigationBar/>
    </View>
  );
}

export default BudgetPage;