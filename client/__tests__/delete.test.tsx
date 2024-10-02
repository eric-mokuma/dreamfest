// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import { setupApp } from './setup.tsx'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
})

describe('editing and deleting events', () => {
  it('event is deleted', async () => {
    nock('http://localhost').get('/api/v1/events/1').reply(200, {
      id: 1,
      day: 'friday',
      time: '2pm - 3pm',
      name: 'TangleStage',
      description:
        'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
      locationId: 1,
      eventName: 'Slushie Apocalypse I',
      locationName: 'TangleStage',
    })

    nock('http://localhost')
      .get('/api/v1/schedule/friday')
      .reply(200, {
        day: 'friday',
        events: [
          { id: 1, eventName: 'Slushie Apocalypse I' },
          { id: 2, eventName: 'LEGO Builder Championships' },
        ],
      })
      .persist()

    nock('http://localhost').delete('/api/v1/events/1').reply(204)

    const { user, ...screen } = await setupApp('/events/1/edit')

    const deleteBtn = await screen.findByText('Delete event')
    expect(deleteBtn).toBeVisible()

    await user.click(deleteBtn)

    expect(await screen.findByText(/events/i)).toBeVisible()
  })
})
