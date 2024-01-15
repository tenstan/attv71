import { env } from '$env/dynamic/private'

const keys = [
  'CMS_BASE_URL',
  'CMS_API_KEY',
] as const;

type EnvKey = typeof keys[number]

export const getServerConfiguration = (): Record<EnvKey, string | undefined> => {
  const configuration = keys.reduce((result, key) => {
    result[key] = env[key]
    return result;
  }, {} as Record<EnvKey, string | undefined>)

  return configuration;
}