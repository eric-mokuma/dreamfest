import knexFile from './knexfile'
import knex from 'knex'
import type { Location } from '../../models/Location'
import type { Event, EventData } from '../../models/Event'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations(): Promise<Location[]> {
  return connection('locations').select('*')
}

export async function getEventsByDay(
  day: string,
): Promise<(Location & Event)[]> {
  return connection('events')
    .join('locations', 'events.location_id', '=', 'locations.id')
    .where('events.day', day)
    .select(
      'locations.id as id',
      'locations.name',
      'locations.description',
      'events.id as eventId',
      'events.location_id as locationId',
      'events.time',
      'events.name as eventName',
    )
}

export async function getLocationById(
  id: number,
): Promise<Location | undefined> {
  return connection('locations').where('id', id).first()
}

export async function getEventById(id: number): Promise<Event | undefined> {
  return connection('events').where('id', id).first()
}

export async function updateLocation(
  updatedLocation: Partial<Location>,
): Promise<number[]> {
  const { id, name, description } = updatedLocation
  return connection('locations')
    .where('id', id)
    .update({ name, description }, ['id'])
}

export async function addNewEvent(newEvent: EventData): Promise<number[]> {
  const [insertedEventId] = await connection('events').insert(newEvent, ['id'])
  return insertedEventId
}

export async function deleteEvent(id: number): Promise<number> {
  return connection('events').where('id', id).del()
}

export async function updateEvent(updatedEvent: Event): Promise<number[]> {
  const { id, name, location_id, time, day } = updatedEvent
  return connection('events')
    .where('id', id)
    .update({ name, location_id, time, day }, ['id'])
}
