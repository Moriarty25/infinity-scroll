export type TCharacterProps = {
    id: number
    name: string
	image: string
	status: 'Alive' | 'Dead' | 'unknown'
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
	species: string
    origin?: string
	setActiveModal: (arg: 'modal' | null) => void
	setModeModal: (arg: 'edit' | 'delete') => void
	setCurrentId: (arg: number | null) => void
}
