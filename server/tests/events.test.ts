import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import server from '../server'
import { connection } from '../db'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('deleting events server side', () => {
  it('removes that resource', async () => {
    const res = await request(server).get('/api/v1/events/1')
    expect(res.status).toBe(StatusCodes.OK)

    const res1 = await request(server).delete('/api/v1/events/1')
    expect(res1.status).toBe(StatusCodes.NO_CONTENT)

    const res2 = await request(server).get('/api/v1/events/1')
    expect(res2.status).toBe(StatusCodes.NOT_FOUND)
  })
})
