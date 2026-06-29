import { supabase } from '../lib/supabase'

export async function fetchUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return {
    ...data,
    totalXP:        data.total_xp        ?? 0,
    completedCount: data.completed_count  ?? 0,
    categories:     data.categories       ?? [],
    difficulty:     data.difficulty       ?? 'Mixed',
  }
}

export async function updateUserProfile(userId, { name, email }) {
  await supabase.from('profiles').upsert({ id: userId, name, email }, { onConflict: 'id' })
}

export async function fetchSavedChallenges(userId) {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('user_id', userId)
    .eq('saved', true)
    .order('created_at', { ascending: false })
  return error ? [] : data
}

export async function fetchHistory(userId) {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', true)
    .order('completed_at', { ascending: false })
  return error ? [] : data
}

export async function createChallengeRecord(userId, challenge) {
  const today = new Date().toISOString().slice(0, 10)
  const { data, error } = await supabase
    .from('challenges')
    .insert([{
      user_id: userId,
      title: challenge.title,
      category: challenge.category,
      difficulty: challenge.difficulty,
      xp: challenge.xp,
      time: challenge.time,
      description: challenge.description,
      date: today,
      type: challenge.source === 'custom' ? 'custom' : 'generated',
      completed: false,
      saved: false,
    }])
    .select()
    .single()
  if (error) return challenge
  return data
}

export async function completeChallenge(challengeId) {
  await supabase
    .from('challenges')
    .update({ completed: true, completed_at: new Date().toISOString() })
    .eq('id', challengeId)
}

export async function saveChallenge(challengeId) {
  await supabase.from('challenges').update({ saved: true }).eq('id', challengeId)
}

export async function unsaveChallenge(challengeId) {
  await supabase.from('challenges').update({ saved: false }).eq('id', challengeId)
}

export async function updateUserPoints(userId, xpEarned) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp, completed_count')
    .eq('id', userId)
    .single()
  await supabase.from('profiles').upsert({
    id: userId,
    total_xp: (profile?.total_xp || 0) + xpEarned,
    completed_count: (profile?.completed_count || 0) + 1,
  }, { onConflict: 'id' })
}

export async function deleteChallenge(challengeId) {
  await supabase.from('challenges').delete().eq('id', challengeId)
}

export async function deleteUserData(userId) {
  await supabase.from('challenges').delete().eq('user_id', userId)
  await supabase.from('profiles').delete().eq('id', userId)
}

