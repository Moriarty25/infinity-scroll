/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Character } from '../components/Character'

describe('renders character', () => {
	it('renders character details correctly', () => {
		render(
			<Character
				name="Rick Sanchez"
				id={1}
				gender="Male"
				image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
				species="Human"
				status="Alive"
				setActiveModal={jest.fn()}
				setCurrentId={jest.fn()}
				setModeModal={jest.fn()}
			/>
		)

		expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
		expect(screen.getByText('status: Alive')).toBeInTheDocument()
		expect(screen.getByText(/Human/i)).toBeInTheDocument()
		expect(screen.getByText(/Male/i)).toBeInTheDocument()
	})
})
