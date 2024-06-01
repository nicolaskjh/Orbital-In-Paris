import { createClient } from '@supabase/supabase-js'

export const supabaseClient = async (supabasetoken) => {
    const supabase = createClient(
        process.env.EXPO_PUBLIC_REACT_NATIVE_SUPABASE_URL,
        process.env.EXPO_PUBLIC_REACT_NATIVE_SUPABASE_ANON_KEY,
        {
            global: {headers: {
                Authorization: `Bearer ${supabasetoken}`,
            },
        }
    }
    )
    return supabase;
}