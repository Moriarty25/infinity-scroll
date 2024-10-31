const BASE_URL = 'https://rickandmortyapi.com/api'

export interface TCharacter {
	id: number
	name: string
	image: string
	status: 'Alive' | 'Dead' | 'unknown'
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
	species: string
	origin: string
}

interface CharactersResponse {
	info: {
		count: number
		pages: number
		next: string | null
		prev: string | null
	}
	results: TCharacter[]
}

interface FetchCharactersState {
	characters: TCharacter[]
	isLoading: boolean
	error: string | null
}

export async function fetchCharacters(
	page: number,
	status: string = 'all'
): Promise<FetchCharactersState> {
	const state: FetchCharactersState = {
		characters: [],
		isLoading: true,
		error: null
	}

	try {
		const statusFilter = status !== 'all' ? `&status=${status}` : ''
		const response = await fetch(`${BASE_URL}/character/?page=${page}${statusFilter}`)
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`)
		}

		const data: CharactersResponse = await response.json()
		state.characters = data?.results || []
	} catch (error) {
		state.error = error instanceof Error ? error.message : 'An unknown error occurred'
	} finally {
		state.isLoading = false
	}

	return state
}
