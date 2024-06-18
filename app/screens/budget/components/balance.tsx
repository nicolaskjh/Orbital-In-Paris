import React from 'react';
import { View, Text } from 'react-native';
import ProfilePicture from '@/components/profilePicture';

type BalanceProps = {
  name: string;
  payee: string;
  amount: number;
};

const Balance = ({name, payee, amount}: BalanceProps) => {
  return (
    <View className="flex flex-row w-full justify-between items-center px-4 py-1.5">
      <ProfilePicture size="sm"/>
      <Text className="text-base">{name} owes {payee} SGD {amount}</Text>
    </View>
  );
};

export default Balance;