
import { createClient } from '@supabase/supabase-js'
import { env } from '~/env'

const supabaseUrl = 'https://apgocrdmogioaftcgkeh.supabase.co'
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)