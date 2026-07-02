import { type FC } from "react";
import { motion } from "motion/react";

export const SectionHeading: FC<{ title: string; className?: string }> = ({ title, className = "" }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.5 }}
			className={`mx-auto mb-10 flex max-w-5xl items-center gap-4 ${className}`}
		>
			<div className="h-px grow bg-gradient-to-r from-transparent to-red-900/70" />
			<h2 className="text-center text-2xl font-bold tracking-widest text-neutral-100 uppercase">{title}</h2>
			<div className="h-px grow bg-gradient-to-l from-transparent to-red-900/70" />
		</motion.div>
	);
};
