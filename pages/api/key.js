import { supabase } from '../../lib/supabaseClient'

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'TJ-'
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export default async function handler(req, res) {
  const key = generateKey()

  const { error } = await supabase.from('keys').insert([{ key, used: false }])
  if (error) {
    console.error('Supabase error:', error)
    return res.status(500).json({ error: 'Failed to save key' })
  }

  res.status(200).json({ key })
}
