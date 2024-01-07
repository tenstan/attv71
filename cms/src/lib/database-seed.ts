import payload from 'payload';
import { getConfiguration } from './configuration';

export const seed = async () => {
  payload.logger.info('Starting database seed...')
  await seedInitialAdmin();
  payload.logger.info('Finished seeding database.');
}

const seedInitialAdmin = async () => {
  const { INIT_ADMIN_EMAIL, INIT_ADMIN_PASSWORD } = getConfiguration('INIT_ADMIN_EMAIL', 'INIT_ADMIN_PASSWORD');

  if (!INIT_ADMIN_EMAIL && !INIT_ADMIN_PASSWORD) {
    return;
  }

  if (!INIT_ADMIN_EMAIL) {
    payload.logger.warn('INIT_ADMIN_EMAIL was set, but there is no associated INIT_ADMIN_PASSWORD. Skipping default admin creation.');
    return;
  }

  if (!INIT_ADMIN_PASSWORD) {
    payload.logger.warn('INIT_ADMIN_PASSWORD was set, but there is no associated INIT_ADMIN_EMAIL. Skipping default admin creation.');
    return;
  }

  const getUsersQuery = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: INIT_ADMIN_EMAIL
      }
    }
  })

  const usersAlreadyInitialized = getUsersQuery.docs.length > 0;
  if (usersAlreadyInitialized) {
    return;
  }

  payload.logger.info('There are no available user accounts. Seeding database with initial admin...')

  payload.create({
    collection: 'users',
    data: {
      email: INIT_ADMIN_EMAIL,
      password: INIT_ADMIN_PASSWORD,
      roles: [
        'admin'
      ]
    },
  })

  payload.logger.info('Finished seeding initial admin.')
}