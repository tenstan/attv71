import { Payload } from 'payload'

const seedDevApiKey = async (payload: Payload) => {
  const existingKeys = await payload.find({
    collection: 'api-keys',
    limit: 1,
  })

  if (existingKeys.totalDocs === 0) {
    payload.logger.info('Seeding the database with an initial development API key.')

    const keyName = 'development-api-key'
    payload.create({
      collection: 'api-keys',
      data: {
        name: keyName,
        apiKey: keyName,
      },
    })
  }
}

export const seedDevData = async (payload: Payload) => {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error(
      'Development database seeding can only be performed when NODE_ENV is "development".',
    )
  }

  await seedDevApiKey(payload)
}
