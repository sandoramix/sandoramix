import { frame, motion, useScroll, useSpring, useTransform } from "motion/react";
import {
	type FC,
	type PropsWithChildren,
	type RefObject,
	useEffect,
	useRef,
} from "react";
import { FaCode } from "react-icons/fa";
import type {SpringOptions} from "motion";
import { ParticleField } from "~/components/motion/ParticleField";
import { ScrollContainerContext } from "~/components/layout/ScrollContext";

/**
 * Background gradient keyframes — interpolated as the page scrolls.
 * Keep every entry in the exact same format so motion can interpolate them.
 */
const BACKGROUND_STOPS = [
	"linear-gradient(to bottom, #0a0a0a 55%, #991b1b 130%)",
	"linear-gradient(to bottom, #0c0a0a 45%, #9f1239 120%)",
	"linear-gradient(to bottom, #0a0a0c 40%, #9a3412 115%)",
];

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
	const cursorRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const { x, y } = useFollowPointer(cursorRef);

	const { scrollYProgress } = useScroll({ container: scrollRef });
	const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
	const background = useTransform(smoothProgress, [0, 0.5, 1], BACKGROUND_STOPS);

	return (
		<motion.main style={{ background }} className="flex h-dvh w-dvw flex-col overflow-hidden text-neutral-200 select-none">
			<ParticleField className="pointer-events-none fixed inset-0 z-0" />
			<div className="noise-overlay pointer-events-none fixed inset-0 z-30" />
			<ScrollContainerContext.Provider value={scrollRef}>
				<div ref={scrollRef} className="z-20 flex w-full grow flex-col overflow-y-auto">
					{children}
				</div>
			</ScrollContainerContext.Provider>
			<motion.div
				className={`pointer-events-none fixed top-0 left-0 z-10 h-10 w-10 text-3xl`}
				ref={cursorRef}
				style={{ x, y }}
			>
				<FaCode className={"text-red-800/50"} />
			</motion.div>
		</motion.main>
	);
};

const spring: SpringOptions = { damping: 10, stiffness: 69, restDelta: 0.001 };

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
	const x = useSpring(0, spring);
	const y = useSpring(0, spring);

	useEffect(() => {
		if (!ref.current) return;

		const handlePointerMove = (event: MouseEvent | TouchEvent) => {
			let clientX = 0;
			let clientY = 0;
			if (event instanceof MouseEvent) {
				clientX = event.clientX;
				clientY = event.clientY;
			}
			if (event instanceof TouchEvent && event.touches.length > 0) {
				const ev = event.touches[0];
				if (!ev) return;
				clientX = ev.clientX;
				clientY = ev.clientY;
			}

			const element = ref.current!;

			frame.read(() => {
				x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
				y.set(clientY - element.offsetTop - element.offsetHeight / 2);
			});
		};

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("touchmove", handlePointerMove);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("touchmove", handlePointerMove);
		};
	}, []);

	return { x, y };
}
