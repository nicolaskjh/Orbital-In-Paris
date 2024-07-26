import { supabaseClient } from "./supabaseClient";
import { parseISO, differenceInCalendarDays, addYears, format} from "date-fns";

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
        transaction: transactionId,
        itinerary: transaction.itinerary,
        category: transaction.category
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

    return transactionData;
}   

export const getExpenses = async ({token,trip, userId}) => {
    const supabase = await supabaseClient(token);
    const {data,error} = await supabase
        .from('transaction')
        .select('*,profiles(name)')
        .eq('itinerary',trip.id)
        .order('date', {ascending: false});
    const {data:user_id,error:erro2}  = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId);
    data.userId = user_id[0].id;
    return data;
}

export const getBalances = async ({token,trip,user}) => {
    const supabase = await supabaseClient(token);
    const {data:owe,error} = await supabase
        .from('dues')
        .select('id, lender, to:lender(name), owner, amount_due, transaction')
        .eq('itinerary',trip.id)
        .eq('owner',user)


    const {data:lend,error:erro2} = await supabase
        .from('dues')
        .select('id, lender, from:owner(name), owner, amount_due, transaction')
        .eq('itinerary',trip.id)
        .eq('lender',user)

    let overall = 0;
    let balances = {};

    lend.forEach((due) => {
        if (due.owner !== due.lender) {
            if (!balances[due.from.name]) {
                balances[due.from.name] = 0;
            }
            balances[due.from.name] += due.amount_due;
            overall += due.amount_due;
        }
    });

    owe.forEach((due) => {
        if (due.owner !== due.lender) {
            if (!balances[due.to.name]) {
                balances[due.to.name] = 0;
            }
            balances[due.to.name] -= due.amount_due;
            overall -= due.amount_due;
        }
    });

    console.log(balances, overall);

    return {
        'balances': balances,
        'overall': overall
    };
}

export const getTotalExpenses = async ({token, trip, user}) => {
    const supabase = await supabaseClient(token);
    const {data:totalExpenseofGroup,error:erro1} = await supabase
        .from('transaction')
        .select('amount.sum()')
        .eq('itinerary',trip.id)
        .neq('category', 'Settle Balances');
    const {data:totalPersonalExpense,error:erro2} = await supabase
        .from('dues')
        .select('amount_due.sum()')
        .eq('itinerary',trip.id)
        .eq('owner',user)
        .neq('category', 'Settle Balances');
   
    console.log(erro2);

    return {
        'totalExpenseofGroup': totalExpenseofGroup[0].sum,
        'totalPersonalExpense': totalPersonalExpense[0].sum
    }
}

export const setAccoms = async ({token, details, userId}) => {
    const supabase = await supabaseClient(token);
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId);
    const id = profileData[0].id;
    const {data, error:accomError} = await supabase
        .from('accommodations')
        .insert({
            "hotelName": details.name,
            "hotelAddress": details.address,
            "fromDate": details.checkin_date,
            "endDate": details.checkout_date,
            "owner": id,
            "itinerary": details.itinerary,
            "logo" : details.image
        }).select("*")
    console.log(data)
    return data;
}

export const setFlights = async ({token, details, userId}) => {
    const supabase = await supabaseClient(token);
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId);
    const id = profileData[0].id;
    const {data, error} = await supabase
        .from('flights')
        .insert({
            "owner": id,
            "itinerary": details.itinerary,
            "origin_outbound": details.origin_outbound,
            "destination_outbound": details.destination_outbound,
            "depature_outbound": details.depature_outbound,
            "arrival_outbound": details.arrival_outbound,
            "airline_outbound": details.airline_outbound,
            "logo_outbound" : details.logo_outbound,
            "origin_inbound": details.origin_inbound,
            "destination_inbound": details.destination_inbound,
            "depature_inbound": details.depature_inbound,
            "arrival_inbound": details.arrival_inbound,
            "airline_inbound": details.airline_inbound,
            "logo_inbound" : details.logo_inbound,
            "price" :details.price
        }).select("*")
    console.log(error)
    return data;
}

export const getFlightAndAccom = async ({token, trip, userId}) => {
    const supabase = await supabaseClient(token);
    const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userId);
    const id = profileData[0].id;
    const {data:flight,error:flightError} = await supabase
        .from('flights')
        .select('*')
        .eq('itinerary',trip.id)
        .eq('owner',id)
    const {data:accom,error:accomError} = await supabase
        .from('accommodations')
        .select('*')
        .eq('itinerary',trip.id)
        .eq('owner',id)
    return {'flight' : flight, 'accom' : accom};
}

export const getPeople = async ({token, userId, range}) => {
    const supabase = await supabaseClient(token);
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId);
    const id = profileData[0].id;
    const date = profileData[0].dateOfBirth;
    const country = profileData[0].country;
    const startDate = format(addYears(date, range), 'yyyy-MM-dd');
    const endDate = format(addYears(date, -1 * range), 'yyyy-MM-dd');
    const ranges = `${startDate}`
    const rangess = `${endDate}`
    const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('*')
        .ilike('country', `%${country}%`)
        .lt('dateOfBirth', startDate)
        .gt('dateOfBirth', endDate)
    console.log(profilesData)
    console.log(error)
    return profilesData;
}

export const sendInvites = async ({token, userId, id, message}) => {
    const supabase = await supabaseClient(token);
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId);
    const { data: user, error } = await supabase
        .from('invitation')
        .insert({
            "sender": profileData[0].id,
            "receiver": id,
            "message": message
        })
    return user;
}
