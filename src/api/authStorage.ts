import type { AuthResponse, RegisterPayload } from '../types'

const USERS_KEY = 'northstar-auth-users'
const SESSION_KEY = 'northstar-auth-session'

type StoredUser = RegisterPayload & { id: number }

const defaultUsers: StoredUser[] = []

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getStoredUsers() {
  if (!canUseStorage()) {
    return defaultUsers
  }

  const value = window.localStorage.getItem(USERS_KEY)

  if (!value) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
    return defaultUsers
  }

  return JSON.parse(value) as StoredUser[]
}

export function saveStoredUsers(users: StoredUser[]) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function saveAuthSession(session: AuthResponse) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getAuthSession() {
  if (!canUseStorage()) {
    return null
  }

  const value = window.localStorage.getItem(SESSION_KEY)
  return value ? (JSON.parse(value) as AuthResponse) : null
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(SESSION_KEY)
}
