import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/header';
import Expense from './expense';

const Expenses = ({data}) => {
  return (
    <View className="flex-1">
      <ScrollView className="w-full">
        <Header text="Expenses" size="md" padding="left"/>
        <Expense expenseType="Accommodation" amount={100} date="2021-06-20"/>
        {data && (data.map((res) => <Expense expenseType={res.category} amount={res.amount} date={res.date} description = {res.profiles.name}/>))}
      </ScrollView>
    </View>
  );
}

export default Expenses;