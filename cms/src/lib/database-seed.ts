import payload from 'payload';
import { getConfiguration } from './configuration';

export const seed = async () => {
  payload.logger.info('Starting database seed...')
  await seedDefaultAdmin();
  payload.logger.info('Finished seeding database.');
}

const seedDefaultAdmin = async () => {
  const { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } = getConfiguration('DEFAULT_ADMIN_EMAIL', 'DEFAULT_ADMIN_PASSWORD');

  if (!DEFAULT_ADMIN_EMAIL && !DEFAULT_ADMIN_PASSWORD) {
    return;
  }

  if (!DEFAULT_ADMIN_EMAIL) {
    payload.logger.warn('DEFAULT_ADMIN_EMAIL was set, but there is no associated DEFAULT_ADMIN_PASSWORD. Skipping default admin creation.');
    return;
  }

  if (!DEFAULT_ADMIN_PASSWORD) {
    payload.logger.warn('DEFAULT_ADMIN_PASSWORD was set, but there is no associated DEFAULT_ADMIN_EMAIL. Skipping default admin creation.');
    return;
  }

  const findDefaultAdminQuery = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: DEFAULT_ADMIN_EMAIL
      }
    }
  })

  const defaultAdminExists = findDefaultAdminQuery.docs[0] !== undefined;
  if (defaultAdminExists) {
    return;
  }

  payload.logger.info('Default admin account was not be found. Seeding database with new account...')

  payload.create({
    collection: 'users',
    data: {
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD,
    },
  })

  payload.logger.info('Finished seeding default admin.')
}