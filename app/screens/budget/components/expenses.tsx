import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/header';
import Expense from './expense';

type ExpensesProps = {
  data: any;
};

const Expenses = ({data}: ExpensesProps) => {
  return (
    <View className="flex-1">
      <Header text="Expenses" size="md" padding="left"/>
      <ScrollView className="w-full">
        {data && (data.map((res) => <Expense key={res.id} expenseType={res.category} amount={res.amount} date={res.date} description={res.description} payer={res.profiles.name}/>))}
      </ScrollView>
    </View>
  );
}

export default Expenses;