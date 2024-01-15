const keys = [
  'INIT_ADMIN_EMAIL',
  'INIT_ADMIN_PASSWORD',
  'AZURE_STORAGE_CONNECTION_STRING',
  'AZURE_STORAGE_CONTAINER_NAME',
  'AZURE_STORAGE_ACCOUNT_BASE_URL',
  'NODE_ENV',
  'DATABASE_URI',
  'DATABASE_NAME',
  'PORT',
  'PAYLOAD_SECRET'
] as const;

type EnvKey = typeof keys[number];

export const getConfiguration = () => {
  const configuration = keys.reduce((result, key) => {
    result[key] = process.env[key]
    return result;
  }, {} as Record<EnvKey, string | undefined>)

  return configuration;
}
