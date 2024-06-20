import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/header';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { getBalances } from '@/utils/supabaseRequests';

const Balances = ({trip,user}) => {
  const {getToken} = useAuth();
  const [data,setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const token = await getToken({ template: 'supabase' });
      const data = await getBalances({token, trip, user});
      setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    console.log(data)
    setIsLoading(false);
  }, []);
  return (
    <View className="flex-1">
      <ScrollView className="w-full">
        <Header text="Balances" size="md" padding="left"/>
      </ScrollView>
    </View>
  );
}

export default Balances;