import type { FieldAccess } from 'payload'

export const isLoggedIn: FieldAccess = ({ req: { user } }) => {
  return !!user
}

export const isWriter: FieldAccess = ({ req: { user } }) => {
  return user?.roles?.includes('writer') ?? false
}

export const isAdmin: FieldAccess = ({ req: { user } }) => {
  return user?.roles?.includes('admin') ?? false
}
