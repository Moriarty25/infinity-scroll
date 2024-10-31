import { fetchCharacters } from '../api/characters'

describe('fetchCharacters API function', () => {
	it('returns a non-empty array of characters', async () => {
		const response = await fetchCharacters(1)
		expect(Array.isArray(response.characters)).toBe(true)
		expect(response.characters.length).toBeGreaterThan(0)
	})

	it('returns characters with the required properties', async () => {
		const response = await fetchCharacters(1)
		expect(response.characters.length).toBeGreaterThan(0)

		const character = response.characters[0]
		expect(character).toHaveProperty('id')
		expect(character).toHaveProperty('name')
		expect(character).toHaveProperty('status')
		expect(character).toHaveProperty('species')
		expect(character).toHaveProperty('gender')
		expect(character).toHaveProperty('image')
	})

	it('each character has the expected data types', async () => {
		const response = await fetchCharacters(1)
		const character = response.characters[0]

		expect(typeof character.id).toBe('number')
		expect(typeof character.name).toBe('string')
		expect(['Alive', 'Dead', 'unknown']).toContain(character.status)
		expect(typeof character.species).toBe('string')
		expect(['Female', 'Male', 'Genderless', 'unknown']).toContain(character.gender)
		expect(typeof character.image).toBe('string')
	})

	it('returns the expected number of characters per page', async () => {
		const response = await fetchCharacters(1)
		const countCharacters = 20
		expect(response.characters.length).toBeLessThanOrEqual(countCharacters)
	})

	it('handles errors gracefully', async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error('API error'))
		const nonexistentPage = 999
		const response = await fetchCharacters(nonexistentPage)
		expect(response.characters).toEqual([])
		expect(response.error).toBe('API error')
	})
})
