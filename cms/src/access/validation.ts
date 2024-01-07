import { FieldAccess } from "payload/types";
import { Role } from "./roles";

export const isLoggedIn: FieldAccess = ({ req: { user }}) => {
  return !!user;
}

type EntityWithRoles = { roles: Role[] }; 

export const isCreator: FieldAccess<any, unknown, EntityWithRoles> = ({ req: { user }}) => {
  return user?.roles?.includes('creator') ?? false;
}

export const isAdmin: FieldAccess<any, unknown, EntityWithRoles> = ({ req: { user } }) => {
  return user?.roles?.includes('admin') ?? false;
}