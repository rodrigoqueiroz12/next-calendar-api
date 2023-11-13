import { randomUUID as uuid } from 'crypto'
import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function eventsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const events = await knex('events').select('*')

    return events
  })

  app.get(
    '/:id',

    async (req) => {
      const getEventParamSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getEventParamSchema.parse(req.params)

      const event = await knex('events')
        .where({
          id,
        })
        .first()

      return event
    },
  )

  app.post('/', async (req, reply) => {
    const createEventBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      start: z.string(),
      end: z.string(),
    })

    const { title, description, start, end } = createEventBodySchema.parse(
      req.body,
    )

    await knex('events').insert({
      id: uuid(),
      title,
      description,
      start,
      end,
    })

    return reply.status(201).send()
  })

  app.put('/:id', async (req, reply) => {
    const getEventParamSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getEventParamSchema.parse(req.params)

    const createEventBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      start: z.string(),
      end: z.string(),
    })

    const { title, description, start, end } = createEventBodySchema.parse(
      req.body,
    )

    await knex('events').where({ id }).update({
      title,
      description,
      start,
      end,
    })

    return reply.status(200).send()
  })

  app.delete('/:id', async (req, reply) => {
    const getEventParamSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getEventParamSchema.parse(req.params)

    await knex('events').where({ id }).delete()

    return reply.status(200).send()
  })
}
