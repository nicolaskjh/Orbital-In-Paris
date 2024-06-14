import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import GroupMember from './groupMember';
import {useAuth} from '@clerk/clerk-react';
import { getMembers } from '@/utils/supabaseRequests';

const GroupMembers = ({trip}) => {
  const memberss = [
    { id:0, name: 'Jerry' },
    { id:1, name: 'Tom' },
  ]
  const [isLoading, setIsLoading] = React.useState(true);
  const [members, setMembers] = React.useState([]);
  const {userId, getToken} = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
      const token = await getToken({ template: 'supabase' });
      const members = await getMembers({token,trip});
      setMembers(members);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMembers();
    setIsLoading(false);
  }, []);

  return (
    <ScrollView className="flex flex-col w-full bg-white border-t">
      {members.map((member) => {
        return (
          <GroupMember key={member.profiles.id} name={member.profiles.name}/>
      )})}
    </ScrollView>
  );
}

export default GroupMembers;