import { BasePayload } from 'payload'

export const seed = async (payload: BasePayload) => {
  payload.logger.info('Starting database seed...')
  await seedInitialAdmin(payload)
  payload.logger.info('Finished seeding database.')
}

const seedInitialAdmin = async (payload: BasePayload) => {
  const INIT_ADMIN_EMAIL = process.env.INIT_ADMIN_EMAIL
  const INIT_ADMIN_PASSWORD = process.env.INIT_ADMIN_PASSWORD

  if (!INIT_ADMIN_EMAIL && !INIT_ADMIN_PASSWORD) {
    return
  }

  if (!INIT_ADMIN_EMAIL) {
    payload.logger.warn(
      'INIT_ADMIN_EMAIL was set, but there is no associated INIT_ADMIN_PASSWORD. Skipping default admin creation.',
    )
    return
  }

  if (!INIT_ADMIN_PASSWORD) {
    payload.logger.warn(
      'INIT_ADMIN_PASSWORD was set, but there is no associated INIT_ADMIN_EMAIL. Skipping default admin creation.',
    )
    return
  }

  const getUsersQuery = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: INIT_ADMIN_EMAIL,
      },
    },
  })

  const usersAlreadyInitialized = getUsersQuery.docs.length > 0
  if (usersAlreadyInitialized) {
    return
  }

  payload.logger.info(
    'There are no available user accounts. Seeding database with initial admin...',
  )

  payload.create({
    collection: 'users',
    data: {
      email: INIT_ADMIN_EMAIL,
      password: INIT_ADMIN_PASSWORD,
      roles: ['admin'],
    },
  })

  payload.logger.info('Finished seeding initial admin.')
}
