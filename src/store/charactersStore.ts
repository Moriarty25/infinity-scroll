import { makeAutoObservable } from 'mobx'
import { TCharacter, fetchCharacters } from '../api/characters'

class CharacterStore {
	characters: TCharacter[] = []
	page = 1
  statusFilter = 'all'
	anchor: null | number = null
	isLoading = false
	hasMore = true
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	loadCharacters = async () => {
		if (this.isLoading || !this.hasMore) return

		this.isLoading = true
		try {
			const { characters: newCharacters } = await fetchCharacters(this.page, this.statusFilter)
			if (newCharacters.length > 0) {
				this.characters.push(...newCharacters)
				this.anchor = newCharacters[newCharacters.length - 1].id
				this.page += 1
			} else {
				this.hasMore = false
			}
		} catch (error) {
			this.error = `Ошибка при загрузке данных: ${error}`
		} finally {
			this.isLoading = false
		}
	}

	removeCharacter(id: number) {
		this.characters = this.characters.filter((character) => character.id !== id)
	}

	editCharacterName(id: number, newName: string) {
		const character = this.characters.find((character) => character.id === id)
		if (character) {
			character.name = newName
		}
	}

  setFilter(status: string) {
    this.statusFilter = status;
    this.characters = []; // Сбрасываем старые данные
    this.page = 1;
    this.hasMore = true;
    this.loadCharacters(); // Загружаем с новым фильтром
  }
}

export const characterStore = new CharacterStore()
