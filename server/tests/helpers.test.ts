import { describe, expect, test } from 'vitest'

import { capitalise, validateDay, eventDays } from '../routes/helpers.ts'

// TODO: Write these tests (remove .todo)
describe('capitalise', () => {
  test('returns a capitalised string', () => {
    expect(capitalise('tangle stage')).toBe('Tangle stage')
  })

  // TODO: Implement this functionality in helpers.js
  test('returns the same string if the first letter is already capitalised', () => {
    expect(capitalise('Tangle stage')).toBe('Tangle stage')
  })

  // TODO: Implement this functionality in helpers.js
  test('returns an empty string if the name argument is an empty string')
  expect(capitalise('a')).toBe('A')
})

// TODO: Write these tests (remove .todo)
describe('validateDay', () => {
  test("returns the day if it exists in the supplied 'days' array", () => {
    const eventDays = ['friday', 'saturday', 'sunday']
    expect(validateDay('friday', eventDays)).toBe('friday')
    expect(validateDay('saturday', eventDays)).toBe('saturday')
    expect(validateDay('sunday', eventDays)).toBe('sunday')
  })

  test("returns the first day from the supplied 'days' array if 'day' is not in that array", () => {
    const eventDays = ['friday', 'saturday', 'sunday']
    expect(validateDay('monday', eventDays)).toBe('friday')
    expect(validateDay('holiday', eventDays)).toBe('friday')
    expect(validateDay(undefined, eventDays)).toBe('friday')
  })

  test("returns the day from 'eventDays' if 'day' exists in 'eventDays' and no 'days' argument is provided", () => {
    expect(validateDay('friday')).toBe('friday')
    expect(validateDay('saturday')).toBe('saturday')
    expect(validateDay('sunday')).toBe('sunday')
  })

  test("returns 'friday' if 'day' does not exist in 'eventDays' and no 'days' argument is provided", () => {
    expect(validateDay('monday')).toBe('friday')
    expect(validateDay('holiday')).toBe('friday')
    expect(validateDay(undefined)).toBe('friday')
  })

  // TODO: Implement this functionality in helpers.js
  test("returns the matching lowercase day if 'day' is uppercase", () => {
    expect(validateDay('FRIDAY')).toBe('friday')
    expect(validateDay('SATURDAY')).toBe('saturday')
    expect(validateDay('SUNDAY')).toBe('sunday')
  })
  // TODO: Implement this functionality in helpers.js
  test('throws an error if the days argument is not an array of strings', () => {
    expect(() => validateDay('friday', Number as string)).toThrow()
    expect(() => validateDay('friday', Number as string)).toThrow()
  })
})
