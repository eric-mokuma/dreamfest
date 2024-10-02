import express from 'express'
import * as db from '../db/index'

const router = express.Router()

// GET /api/v1/locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await db.getAllLocations()
    res.json({ locations })
  } catch (e) {
    next(e)
  }
})

// GET /api/v1/locations/:id
router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  try {
    const location = await db.getLocationById(id)
    if (location) {
      res.json({ location })
    } else {
      res.status(404).json({ error: 'Location not found' })
    }
  } catch (e) {
    next(e)
  }
})

// PUT /api/v1/locations
router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  const updateData: Partial<Location> = req.body

  try {
    const updatedLocation = await db.updateLocation({
      id,
      ...updateData,
    })

    if (updatedLocation.length > 0) {
      res.json({ location: updatedLocation[0] })
    } else {
      res.status(404).json({ error: 'Location not found' })
    }
  } catch (e) {
    next(e)
  }
})

export default router
