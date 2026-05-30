export function setAuthTokenCookie(token: string) {
  if (typeof document === 'undefined') return
  document.cookie = `auth_token=${token}; path=/; SameSite=Lax; max-age=86400`
}

export function setLoginOtpCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `login_otp=true; path=/; SameSite=Lax; max-age=86400`
}

export function setPhoneNumberCookie(phone: string) {
  if (typeof document === 'undefined') return
  document.cookie = `phone_number=${encodeURIComponent(phone)}; path=/; SameSite=Lax; max-age=3600`
}

export function clearAuthCookies() {
  if (typeof document === 'undefined') return
  document.cookie = 'auth_token=; Max-Age=0; path=/'
  document.cookie = 'login_otp=; Max-Age=0; path=/'
  document.cookie = 'phone_number=; Max-Age=0; path=/'
}

export function getClientCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}
