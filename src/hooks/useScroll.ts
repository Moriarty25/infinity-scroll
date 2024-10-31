import { RefObject, useCallback, useEffect, useRef } from 'react'

export function useScroll(
	parentRef: RefObject<HTMLElement>,
	childRef: RefObject<HTMLElement>,
	callback: () => void
) {
	const observer = useRef<IntersectionObserver>()

	const memoizedCallback = useCallback(() => {
		callback()
	}, [callback])

	useEffect(() => {
		if (!parentRef.current || !childRef.current) return;
		const options = {
			root: parentRef.current,
			rootMargin: '0px',
			threshold: [0]
		}

		observer.current = new IntersectionObserver(([target]) => {
			if (target.isIntersecting) {
				memoizedCallback()
			}
		}, options)

		const currentChild = childRef.current; 

		observer.current.observe(currentChild)

		return () => {
			if (observer.current) {
				observer.current.unobserve(currentChild);
			}
		};
	}, [memoizedCallback, parentRef, childRef])
}
