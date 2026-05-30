import { cookies } from 'next/headers'

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get('auth_token')?.value
}

export async function getLoginOtp() {
  const cookieStore = await cookies()
  return cookieStore.get('login_otp')?.value
}