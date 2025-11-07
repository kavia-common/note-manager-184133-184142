import { getSupabaseClient } from '../utils/supabaseClient'

/**
 * Notes service backed by Supabase public.notes table with open access (no RLS).
 * If Supabase env vars are missing, these functions return fallbacks,
 * allowing the app to continue using localStorage paths unaffected.
 */

const TABLE = 'notes'
const supabase = getSupabaseClient()

export async function listNotes() {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') }
  return await supabase.from(TABLE)
    .select('*')
    .order('updated_at', { ascending: false })
}

export async function createNote({ title, content, tags = [], pinned = false }) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') }
  const insert = { title, content, tags, pinned }
  return await supabase.from(TABLE).insert(insert).select('*').single()
}

export async function updateNote(id, patch) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') }
  return await supabase.from(TABLE).update(patch).eq('id', id).select('*').single()
}

export async function deleteNote(id) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') }
  return await supabase.from(TABLE).delete().eq('id', id)
}
