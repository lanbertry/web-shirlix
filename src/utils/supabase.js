import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSuccessMessage: '',
}

// Check if the session exists and is valid; Return false if there's an error
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session:', error.message)
    return false
  }

  return !!data.session
}

//Retrieve user information and set it in userData
export const getUserInformation = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return { email: '', firstname: '', lastname: '', is_admin: false }
  }

  const { user } = data
  const { user_metadata = {}, email = '' } = user

  return { email, is_admin: false, ...user_metadata }
}
