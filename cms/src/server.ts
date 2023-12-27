import express from 'express'
import payload from 'payload'
import { throwExpression } from './lib/utils'
import { seed } from './lib/database-seed'

require('dotenv').config()
const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.get('/robots.txt', (_, res) => {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /')
})

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' });
})

const start = async () => {  
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET ?? throwExpression('PAYLOAD_SECRET was not defined.'),
    express: app,
    onInit: async () => {
      await seed();
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  })

  app.listen(process.env.PORT || 3000)
}

start()
