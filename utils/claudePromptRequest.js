import axios from 'axios';
import Anthropic from '@anthropic-ai/sdk';
import { createNewActivity } from './supabaseRequests';

export const claudePromptRequest = async ({trip,token}) => {
    const anthropic = new Anthropic({apiKey: process.env.EXPO_PUBLIC_CLAUDE_API_KEY});
    
    const input = 'Create a trip to ' + trip.city + ', ' + trip.country + ' from ' + trip.start_date + ' to ' + trip.end_date;
    const responseTemplate = 'Create a trip to ' + trip.city + ', ' + trip.country + ' from ' + trip.start_date + ' to ' + trip.end_date + ` with 
    the following keys "day", and each day have multiple activities with the following keys "name", "location","date" in the following format YYYY-MM-DD, and time with the following format HH:MM
      skip the preable and remove the footer information.`;
    const message = await anthropic.messages.create({
        max_tokens: 2048,
        messages: [{ role: 'user', content: responseTemplate }],
        model: 'claude-3-haiku-20240307',
    })
    .catch(async (err) => {
        if (err instanceof Anthropic.APIError) {
          console.log(err.status); // 400
          console.log(err.name); // BadRequestError
          console.log(err.headers); // {server: 'nginx', ...}
        } else {
          throw err;
        }
      });
      

    const obj = JSON.parse(message.content[0].text);

    for (var keys in obj) {
        for (res in obj[keys]){
            const activity = obj[keys][res].name;
            const location = obj[keys][res].location;
            const time = obj[keys][res].time;
            const date = obj[keys][res].date;
            const newActivity = {
                activity,
                location,
                time,
                date,
                trip
              }
            await createNewActivity({token,newActivity});
        }
    }
}