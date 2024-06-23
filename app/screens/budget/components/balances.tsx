import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Header from '@/components/header';
import Balance from './balance';
import { useAuth } from '@clerk/clerk-react';

type BalancesProps = {
  trip: any;
  user: any;
  balances: Record<string, number>;
  overall: number;
};

const Balances = ({trip, user, balances, overall}: BalancesProps) => {
  const {getToken} = useAuth();

  const balanceEntries = Object.entries(balances);

  return (
    <View className="flex-1">
      <Header text="Balances" size="md" padding="left"/>
      <ScrollView className="w-full">
        {balanceEntries.map(([user, amount], index) => (
          <Balance key={index} user={user} amount={amount} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Balances;