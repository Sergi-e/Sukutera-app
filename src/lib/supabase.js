import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function isValidHttpUrl(str) {
  try {
    const url = new URL(str)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

const isReady = supabaseUrl && isValidHttpUrl(supabaseUrl) && supabaseAnonKey

export const supabase = isReady ? createClient(supabaseUrl, supabaseAnonKey) : null

export const TABLES = {
  COLLECTORS: 'collectors',
  COLLECTIONS: 'collections',
  DISTRICTS: 'districts',
}
