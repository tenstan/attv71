import { Field, FieldAccess } from "payload/types"
import { isAdmin, isLoggedIn } from "./access-validation"

export const availableRoles = [ 'admin', 'creator' ] as const

export type Role = typeof availableRoles[number]

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
    options: [
      ...availableRoles
    ]
  }
}