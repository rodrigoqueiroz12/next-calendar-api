import fastify from 'fastify'
import cors from '@fastify/cors'

import { eventsRoutes } from './routes/events'
import { env } from './env'

export const app = fastify()

app.register(cors, {
  origin: env.NODE_ENV !== 'production' ? '*' : env.CLIENT_ORIGIN_URL,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
})

app.register(eventsRoutes, {
  prefix: 'events',
})
