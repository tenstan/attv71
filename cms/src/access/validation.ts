import type { FieldAccess } from 'payload'

export const isLoggedIn: FieldAccess = ({ req: { user } }) => {
  return !!user
}

export const isAuthor: FieldAccess = ({ req: { user } }) => {
  return user?.roles?.includes('author') ?? false
}

export const isAdmin: FieldAccess = ({ req: { user } }) => {
  return user?.roles?.includes('admin') ?? false
}
