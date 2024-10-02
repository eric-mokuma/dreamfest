import express from 'express'
import { validateDay } from './helpers'
import * as db from '../db/index'

const router = express.Router()

// GET api/v1/schedule/friday
router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const events = await db.getEventsByDay(day)
    res.json({ day, events })
  } catch (e) {
    next(e)
  }
})

// GET api/v1/schedule/location/:id
router.get('/location/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID parameter' })
    }

    const location = await db.getLocationById(id)

    if (!location) {
      res.status(404).json({ message: 'Location not found' })
    } else {
      res.json(location)
    }
  } catch (e) {
    next(e)
  }
})

// PUT api/v1/schedule/location
router.put('/location', async (req, res, next) => {
  try {
    const updatedLocation = req.body

    if (!updatedLocation || !updatedLocation.id) {
      return res.status(400).json({ error: 'Invalid location data' })
    }

    const updatedIds = await db.updateLocation(updatedLocation)

    res.json({ updatedIds })
  } catch (e) {
    next(e)
  }
})

export default router
