import { createClient } from '@supabase/supabase-js'

/**
 * Create a Supabase client using environment variables.
 * Returns null if not configured (app can fall back to localStorage).
 */
export const getSupabaseClient = () => {
  const url = process.env.REACT_APP_SUPABASE_URL
  const key = process.env.REACT_APP_SUPABASE_KEY

  if (!url || !key) return null
  try {
    return createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  } catch {
    return null
  }
}
