import express from 'express'
import { validateDay } from './helpers'
import * as db from '../db/index'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId, day } = req.body
    const validatedDay = validateDay(day)
    const newEvent = {
      name,
      location_id: locationId,
      time,
      day: validatedDay,
    }
    const id = await db.addNewEvent(newEvent)
    const url = `/api/v1/events/${id}`
    res.setHeader('Location', url)
    res.status(201).json({ location: url })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }
    const success = await db.deleteEvent(id)
    if (success) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const event = await db.getEventById(id)
    if (event) {
      res.json(event)
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, time, day, locationId } = req.body
    const id = Number(req.params.id)
    const validatedDay = validateDay(day)
    const updateEvent = await db.updateEvent({
      id,
      name,
      description,
      time,
      day: validatedDay,
      location_id: locationId,
    })

    if (updateEvent.length > 0) {
      res.sendStatus(204)
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (e) {
    next(e)
  }
})

export default router
