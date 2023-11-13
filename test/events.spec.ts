import { app } from '../src/app'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'

describe('Events routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('pnpm run knex migrate:rollback --all')
    execSync('pnpm run knex migrate:latest')
  })

  it('should be able to create a new event', async () => {
    await request(app.server)
      .post('/events')
      .send({
        title: 'New event test',
        description: 'a new description',
        start: '2023-11-12T17:43:34.704Z',
        end: '2023-11-12T17:43:34.704Z',
      })
      .expect(201)
  })

  it('should be able to list all events', async () => {
    await request(app.server).get('/events').expect(200)
  })

  it('should be able to get a specific event', async () => {
    await request(app.server)
      .post('/events')
      .send({
        title: 'Test',
        description: 'Test description',
        start: '2023-11-12T17:43:34.704Z',
        end: '2023-11-12T17:43:34.704Z',
      })
      .expect(201)

    const listEventsResponse = await request(app.server)
      .get('/events')
      .expect(200)

    const eventId = listEventsResponse.body[0].id

    const getEventResponse = await request(app.server)
      .get(`/events/${eventId}`)
      .expect(200)

    expect(getEventResponse.body).toEqual(
      expect.objectContaining({
        title: 'Test',
        description: 'Test description',
        start: '2023-11-12T17:43:34.704Z',
        end: '2023-11-12T17:43:34.704Z',
      }),
    )
  })

  it('should be able to update an event', async () => {
    await request(app.server)
      .post('/events')
      .send({
        title: 'Test',
        description: 'Test description',
        start: '2023-11-12T17:43:34.704Z',
        end: '2023-11-12T17:43:34.704Z',
      })
      .expect(201)

    const listEventsResponse = await request(app.server)
      .get('/events')
      .expect(200)

    const eventId = listEventsResponse.body[0].id

    await request(app.server)
      .put(`/events/${eventId}`)
      .send({
        title: 'Test updated',
        description: 'Test description',
        start: '2023-11-12T17:43:34.704Z',
        end: '2023-11-12T17:43:34.704Z',
      })
      .expect(200)

    const getEventResponse = await request(app.server)
      .get(`/events/${eventId}`)
      .expect(200)

    expect(getEventResponse.body).toEqual(
      expect.objectContaining({
        title: 'Test updated',
        description: 'Test description',
        start: '2023-11-12T17:43:34.704Z',
        end: '2023-11-12T17:43:34.704Z',
      }),
    )
  })

  it('should be able to delete an event', async () => {
    await request(app.server)
      .post('/events')
      .send({
        title: 'Test',
        description: 'Test description',
        start: '2023-11-12T17:43:34.704Z',
        end: '2023-11-12T17:43:34.704Z',
      })
      .expect(201)

    const listEventsResponse = await request(app.server)
      .get('/events')
      .expect(200)

    const eventId = listEventsResponse.body[0].id

    await request(app.server).delete(`/events/${eventId}`).expect(200)
  })
})
