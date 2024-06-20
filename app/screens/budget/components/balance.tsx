import React from 'react';
import { View, Text } from 'react-native';
import ProfilePicture from '@/components/profilePicture';

type BalanceProps = {
  user: string;
  amount: number;
};

const Balance = ({user, amount}: BalanceProps) => {
  return (
    <View className="flex flex-row w-full items-center pl-8 pb-2">
      <ProfilePicture size="sm"/>
      {amount < 0 ? (
        <View className="flex flex-row pl-2">
          <Text>You owe {user} </Text>
          <Text className='text-red-500'>${Math.abs(amount)}</Text>
        </View>
      ) : amount > 0 ? (
        <View className="flex flex-row pl-2">
          <Text>{user} owes you </Text>
          <Text className='text-green-500'>${amount}</Text>
        </View>
      ) : (
        <Text className='pl-2'>You owe user ${amount}</Text>
      )}
    </View>
  );
};

export default Balance;