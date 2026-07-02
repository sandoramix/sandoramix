import { type FC, useEffect, useRef } from "react";
import { splitText } from "motion-plus";
import { animate, hover } from "motion";
import { useMotionValue } from "motion/react";

type Props = {
	className?: string;
	text: string;
	automaticRestore?: boolean;
	automaticRestoreDelay?: number;
};

/** Chars never travel closer than this to the viewport edge. */
const VIEWPORT_MARGIN = 4;

export const ScatterText: FC<Props> = ({ text, className, automaticRestore = false, automaticRestoreDelay = 30 }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const velocityX = useMotionValue(0);
	const velocityY = useMotionValue(0);
	const prevEventTime = useRef(performance.now());
	const prevTouch = useRef({ x: 0, y: 0 });
	const charElements = useRef<HTMLElement[]>([]);
	const restoreTimeout = useRef<NodeJS.Timeout | null>(null);

	const RESTORE_DELAY = automaticRestoreDelay * 1000;

	useEffect(() => {
		if (!containerRef.current) return;

		const { chars } = splitText(containerRef.current);
		charElements.current = chars;
		const charSet = new Set<Element>(chars);

		// Layout position of each char at rest — used to clamp scatter targets
		// so a char can never land outside the viewport and grow the scroll area.
		const baseRects = new Map<HTMLElement, { left: number; top: number; right: number; bottom: number }>();
		const measureBaseRects = () => {
			for (const char of chars) {
				const rect = char.getBoundingClientRect();
				// Subtract the char's own translation so mid-scatter measurements
				// still yield the rest-position rect.
				const transform = getComputedStyle(char).transform;
				const { e: tx, f: ty } = transform === "none" ? { e: 0, f: 0 } : new DOMMatrix(transform);
				baseRects.set(char, { left: rect.left - tx, top: rect.top - ty, right: rect.right - tx, bottom: rect.bottom - ty });
			}
		};
		measureBaseRects();
		// Re-measure once fonts load and entrance animations (scale-in) settle.
		void document.fonts.ready.then(measureBaseRects);
		const settleTimeout = setTimeout(measureBaseRects, 1500);

		for (const char of chars) {
			char.style.willChange = "transform";
			char.style.display = "inline-block";
		}

		const updateVelocity = (deltaX: number, deltaY: number) => {
			const now = performance.now();
			const timeSinceLastEvent = (now - prevEventTime.current) / 1000;
			prevEventTime.current = now;

			if (timeSinceLastEvent > 0) {
				velocityX.set(deltaX / timeSinceLastEvent);
				velocityY.set(deltaY / timeSinceLastEvent);
			}
		};

		const triggerAnimation = (element: HTMLElement) => {
			const vx = velocityX.get();
			const vy = velocityY.get();
			const speed = Math.sqrt(vx * vx + vy * vy);
			if (speed < 1) return;

			const angle = Math.atan2(vy, vx);
			const distance = speed * 0.1;

			let dx = Math.cos(angle) * distance;
			let dy = Math.sin(angle) * distance;

			const base = baseRects.get(element);
			if (base) {
				dx = Math.min(Math.max(dx, VIEWPORT_MARGIN - base.left), window.innerWidth - VIEWPORT_MARGIN - base.right);
				dy = Math.min(Math.max(dy, VIEWPORT_MARGIN - base.top), window.innerHeight - VIEWPORT_MARGIN - base.bottom);
			}

			animate(element, { x: dx, y: dy }, { type: "spring", stiffness: 100, damping: 75 });

			resetRestoreTimer();
		};

		const resetRestoreTimer = () => {
			if (!automaticRestore) return;

			if (restoreTimeout.current) clearTimeout(restoreTimeout.current);

			restoreTimeout.current = setTimeout(() => {
				for (const char of charElements.current) {
					animate(char, { x: 0, y: 0 }, { type: "spring", stiffness: 80, damping: 20 });
				}
			}, RESTORE_DELAY);
		};

		hover(chars, (el) => triggerAnimation(el as HTMLElement));

		const handlePointerMove = (event: PointerEvent) => {
			updateVelocity(event.movementX, event.movementY);
		};

		const handleTouchStart = (event: TouchEvent) => {
			const touch = event.touches[0];
			if (touch) prevTouch.current = { x: touch.clientX, y: touch.clientY };
		};

		const handleTouchMove = (event: TouchEvent) => {
			const touch = event.touches[0];
			if (!touch) return;

			const deltaX = touch.clientX - prevTouch.current.x;
			const deltaY = touch.clientY - prevTouch.current.y;
			prevTouch.current = { x: touch.clientX, y: touch.clientY };
			updateVelocity(deltaX, deltaY);

			// Single hit-test instead of reading every char's bounding rect per event.
			for (const el of document.elementsFromPoint(touch.clientX, touch.clientY)) {
				if (charSet.has(el)) {
					triggerAnimation(el as HTMLElement);
					break;
				}
			}
		};

		const handleResize = () => {
			// Chars may be mid-scatter, but resizes are rare and the idle restore
			// re-aligns everything; a slightly stale base rect only loosens the clamp.
			measureBaseRects();
		};

		document.addEventListener("pointermove", handlePointerMove);
		document.addEventListener("touchstart", handleTouchStart, { passive: true });
		document.addEventListener("touchmove", handleTouchMove, { passive: true });
		window.addEventListener("resize", handleResize);

		return () => {
			document.removeEventListener("pointermove", handlePointerMove);
			document.removeEventListener("touchstart", handleTouchStart);
			document.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("resize", handleResize);
			clearTimeout(settleTimeout);
			if (restoreTimeout.current) clearTimeout(restoreTimeout.current);
		};
	}, [automaticRestore, RESTORE_DELAY]);

	return (
		<div className={className} ref={containerRef}>
			{text}
		</div>
	);
};
