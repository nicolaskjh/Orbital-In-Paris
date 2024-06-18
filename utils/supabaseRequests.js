import { supabaseClient } from "./supabaseClient";
import { parseISO, differenceInCalendarDays} from "date-fns";

export const getItineraries = async ({userId,token}) => {
    const supabase = await supabaseClient(token);
    const {data,error}  = await supabase
        .from('groups')
        .select('itinerary(*)')
        .eq('user_id', userId)
    return data;
}

export const getItinerariesFromId = async ({id,token}) => {
    const supabase = await supabaseClient(token);
    const {data,error}  = await supabase
        .from('itinerary')
        .select('*')
        .eq('id', id)
        .order('start_date', {ascending: true});
    return data;
}

export const createItinerary = async ({userId,token,itinerary}) => {
    function createRandomString() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const invitecode = createRandomString();
      
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('itinerary')
        .insert(
            {"country" : itinerary.country,
            "city" : itinerary.city,
            "start_date" : itinerary.startDate,
            "end_date" : itinerary.endDate,
            "owner" : userId,
            "invite_code" : invitecode
            }
        ).select('id');

    const numberOfDays = differenceInCalendarDays(parseISO(itinerary.endDate),parseISO(itinerary.startDate));
    for (let i =0; i < numberOfDays + 1; i++){
        await supabase.from('days').insert({
            "itinerary" : data[0].id,
            "day": i
        })
    }

    const {data:data2,error:error2} = await supabase
        .from('groups')
        .insert({
            "user_id" : userId,
            "itinerary" : data[0].id
        })
    return data;
}

export const createNewActivity = async ({token,newActivity}) => {
    const supabase = await supabaseClient(token);
    const Day = differenceInCalendarDays(parseISO(newActivity.date),parseISO(newActivity.trip.start_date));
    console.log(newActivity.trip.id)
    const {data:number, error:error1} = await supabase.from('days').select('id').eq('itinerary',newActivity.trip.id).eq('day',Day);
    console.log(number[0].id);
    const {data,error:error2} = await supabase
        .from('activities')
        .insert(
            {"activity" : newActivity.activity,
            "location" : newActivity.location,
            "time" : newActivity.time,
            "date" : newActivity.date,
            "day" : number[0].id
            }
        ).select('*');
    console.log(error2);
    return data;
}

export const getActivities = async ({token,trip}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('days')
        .select('activities(*)')
        .eq('itinerary',trip);
    return data;
}

export const createProfile = async ({token,profile}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('profiles')
        .insert({
            "name" : profile.name,
            "country" : profile.country,
            "interests" : profile.interests,
            "dateOfBirth" : profile.dateOfBirth,
            "user_id" : profile.userId
        }).select("*")
    return data;
}

export const getProfile = async ({userId,token}) => {
    const supabase = await supabaseClient(token);
    const {data,error}  = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId);
    return data;
}

export const joinInviteCode = async ({token,inviteCode,userId}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('itinerary')
        .select('id')
        .eq('invite_code',inviteCode);
    if (data.length === 0){
        return "Invalid invite code";
    }
    const {data:data2,error:error2} = await supabase
        .from('groups')
        .insert({
            "user_id" : userId,
            "itinerary" : data[0].id
        });
    return data;
}

export const getMembers = async ({token,trip}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('groups')
        .select('profiles(*)')
        .eq('itinerary',trip.id);
    return data;
}

export const addTransaction = async ({token,transaction}) => {
    const supabase = await supabaseClient(token);
    
    const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', transaction.userId);

    const payerId = profileData[0].id;

    const { data: transactionData, error: transactionError } = await supabase
        .from('transaction')
        .insert({
            payer: payerId,
            category: transaction.category,
            amount: transaction.amount,
            description: transaction.description,
            date: transaction.date,
            itinerary: transaction.itinerary
        })
        .select('*');
    
    const transactionId = transactionData[0].id;

    const duesEntries = transaction.shares.map(share => ({
        lender: payerId,
        owner: share.user_id,
        amount_due: share.amount,
        transaction: transactionId
    }));

    console.log(duesEntries)

    try {
        const insertPromises = duesEntries.map(entry =>
            supabase
                .from('dues')
                .insert(entry)
                .select('*')
        );
            const insertResults = await Promise.all(insertPromises);

        insertResults.forEach(result => {
            if (result.error) {
                console.error('Error inserting dues:', result.error.message);
            } else {
                console.log('Successfully inserted dues:', result.data);            
            }
        });
    } catch (error) {
    console.error('Error inserting dues:', error.message);
    }

    return duesData;
}   

export const getExpenses = async ({token,trip}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('transaction')
        .select('*,profiles(name)')
        .eq('itinerary',trip.id);
    console.log(data)
    return data;
}

export const getBalances = async ({token,trip,user}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('dues')
        .select('id, lender, owner, amount, transaction_id')
        .eq('itinerary',trip.id);
    console.log(data)

    let amountOwedByUser = {};
    let amountOwedToUser = {};

    data.forEach((due) => {
        if (due.owner === user) {
            if (due.owner === personA) {
                if (!amountOwedByUser[due.lender]) {
                    amountOwedByUser[due.lender] = 0;
                }
                amountOwedByUser[due.lender] += due.amount;
            }
            if (due.lender === personA) {
                if (!amountOwedToUser[due.owner]) {
                    amountOwedToUser[due.owner] = 0;
                }
                amountOwedToUser[due.owner] += due.amount;
            }
        }});

    return {
        amountOwedByUser,
        amountOwedToUser
    };
}