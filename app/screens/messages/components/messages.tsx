import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import MessageBar from './messageBar';
import { useAuth } from '@clerk/clerk-react';
import { getInvites } from '@/utils/supabaseRequests';

const Messages = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [messages, setMessages] = React.useState([]);

  const {userId, getToken} = useAuth();
  useEffect(() => {
    const fetchMessage = async () => {
      setIsLoading(true);
      try {
      const token = await getToken({ template: 'supabase' });
      const data = await getInvites({token,userId});
      setMessages(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMessage();
    console.log(messages)
    setIsLoading(false);
  }, []);

  return (
    <ScrollView className="flex flex-col w-full bg-white border-t border-grey">
      {messages.map((message) => {
        return (
          <MessageBar key={message.id} name={message.sender.name} message={message.message}/>
      )})}
    </ScrollView>
  );
}

export default Messages;