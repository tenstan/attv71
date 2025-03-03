import type { Field } from 'payload'
import { isAdmin, isLoggedIn } from './validation'

export const availableRoles = ['admin', 'author'] as const

export type Role = (typeof availableRoles)[number]

export const createRoleField = (): Field => {
  return {
    name: 'roles',
    type: 'select',
    hasMany: true,
    access: {
      read: isLoggedIn,
      create: isAdmin,
      update: isAdmin,
    },
    options: [...availableRoles],
  }
}
