import React from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/header';

type TotalExpensesProps = {
  groupTotal: number;
  userTotal: number;
};

const TotalExpenses = ({groupTotal, userTotal}: TotalExpensesProps) => {
  return (
    <View className="flex-1 w-full">
      <Header text="Total Expenses" size="md" padding="left"/>
      <View className="flex flex-row w-full justify-between px-8 pb-2">
        <Text className="text-base">Total Expenses:</Text>
        <Text className="text-base font-bold">$0</Text>
      </View>
      <View className="flex flex-row w-full justify-between px-8 pb-2">
        <Text className="text-base">Your total Expenses:</Text>
        <Text className="text-base font-bold">$0</Text>
      </View>
    </View>
  );
}

export default TotalExpenses;