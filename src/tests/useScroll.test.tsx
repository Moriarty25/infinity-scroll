/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react'
import { useScroll } from '../hooks/useScroll'

describe('useScroll', () => {
	let mockCallback: jest.Mock
	let parentRef: React.RefObject<HTMLDivElement>
	let childRef: React.RefObject<HTMLDivElement>

	beforeEach(() => {
		mockCallback = jest.fn()

		parentRef = { current: document.createElement('div') }
		childRef = { current: document.createElement('div') }

		if (childRef.current) {
			parentRef.current?.appendChild(childRef.current)
		}

		global.IntersectionObserver = jest.fn((callback) => {
			return {
				observe: jest.fn(() => callback([{ isIntersecting: true } as IntersectionObserverEntry])),
				unobserve: jest.fn(),
				disconnect: jest.fn()
			}
		}) as jest.Mock
	})

	it('calls callback at the intersection', () => {
		renderHook(() => useScroll(parentRef, childRef, mockCallback))

		expect(mockCallback).toHaveBeenCalled()
	})

	it('does not call callback if not intersecting', () => {
		global.IntersectionObserver = jest.fn((callback) => {
			return {
				observe: jest.fn(() => callback([{ isIntersecting: false } as IntersectionObserverEntry])),
				unobserve: jest.fn(),
				disconnect: jest.fn()
			}
		}) as jest.Mock

		renderHook(() => useScroll(parentRef, childRef, mockCallback))

		expect(mockCallback).not.toHaveBeenCalled()
	})
})
