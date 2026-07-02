import { type FC, type PropsWithChildren, useRef } from "react";
import { motion, useSpring } from "motion/react";

type Props = PropsWithChildren<{
	/** How strongly the element chases the cursor (0..1). */
	strength?: number;
	className?: string;
}>;

/** Wrapper that magnetically pulls its children toward the cursor while hovered. */
export const Magnetic: FC<Props> = ({ children, strength = 0.35, className }) => {
	const ref = useRef<HTMLDivElement>(null);
	const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.1 });
	const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.1 });

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const element = ref.current;
		if (!element) return;
		const rect = element.getBoundingClientRect();
		x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
		y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div ref={ref} className={className} style={{ x, y }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			{children}
		</motion.div>
	);
};
