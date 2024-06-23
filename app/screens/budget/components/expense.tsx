import React from 'react';
import { View, Text, Image } from 'react-native';
import { parseISO, format } from 'date-fns';

const accommodation = require('@/assets/images/budget-page/accommodation.png');
const transport = require('@/assets/images/budget-page/transport.png');
const food = require('@/assets/images/budget-page/food.png');
const shopping = require('@/assets/images/budget-page/shopping.png');
const others = require('@/assets/images/budget-page/other.png');
const settle = require('@/assets/images/budget-page/settle.png');

type ExpenseProps = {
  expenseType: string;
  amount: number;
  date: string;
  description: string;
  payer: string;
}

const Expense = ( {expenseType, amount, date, description, payer}: ExpenseProps ) => {
  const icon = expenseType === 'Accommodation' ? accommodation : expenseType === 'Transport' ? transport : expenseType === 'Food' ? food : expenseType === 'Shopping' ? shopping : expenseType === 'Settle Balances' ? settle : others;
  const parsedDate = parseISO(date);

  return (
    <View className="flex flex-row h-12 w-full items-center justify-between px-8 pb-2 bg-white">
      <View className="flex flex-col w-8 items-center justify-cetner">
        <Text className="text-sm">{format(parsedDate, 'MMM')}</Text>
        <Text className="text-base">{format(parsedDate, 'dd')}</Text>
      </View>
      <View className="flex flex-row w-2/3 h-full justify-start items-center">
        <Image source={icon} className="w-10 h-10 m-1"/>
        <View className="flex flex-col justify-center">
          <Text className="text-base">{description}</Text>
          <Text className="text-xs text-gray-500">{payer} paid SGD {amount}</Text>
        </View>
      </View>
      <View className="flex flex-col h-full w-1/4 items-end justify-center">
        <Text className="text-xs">You owe</Text>
        <Text className="text-sm">SGD {amount}</Text>
      </View>
    </View>
  );
}

export default Expense;