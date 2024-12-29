
import { createClient } from '@supabase/supabase-js'
import { env } from '~/env'
import { type Database } from '~/types/supabase'

const supabaseUrl = 'https://apgocrdmogioaftcgkeh.supabase.co'
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_KEY
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    }
})
