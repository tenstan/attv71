import { throwExpression } from "./utils";

const keys = [
  'INIT_ADMIN_EMAIL',
  'INIT_ADMIN_PASSWORD',
  'AZURE_STORAGE_CONNECTION_STRING',
  'AZURE_STORAGE_CONTAINER_NAME',
  'AZURE_STORAGE_ACCOUNT_BASE_URL',
  'NODE_ENV',
  'DATABASE_URI'
] as const;

type Key = typeof keys[number]

export const getConfiguration = <T extends Key[]>(...keys: T): Record<T[number], string | undefined> => {
  const configuration = keys.reduce((result, key) => {
    result[key] = process.env[key]
    return result;
  }, {} as Record<string, string | undefined>)

  return configuration;
}

export const getCheckedConfiguration = <T extends Key[]>(...keys: T): Record<T[number], string> => {
  const configuration = keys.reduce((result, key) => {
    result[key] = process.env[key] ?? throwExpression(`${key} is not defined.`);
    return result;
  }, {} as Record<string, string>)

  return configuration;
}