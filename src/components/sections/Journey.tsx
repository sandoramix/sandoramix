import { type FC, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { timeline } from "~/data/about";
import { SectionHeading } from "~/components/sections/SectionHeading";
import { useScrollContainer } from "~/components/layout/ScrollContext";

export const Journey: FC = () => {
	const listRef = useRef<HTMLDivElement>(null);
	const container = useScrollContainer();

	const { scrollYProgress } = useScroll({
		target: listRef,
		container: container ?? undefined,
		offset: ["start 80%", "end 60%"],
	});
	const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

	return (
		<section id="journey" className="w-full px-6 pb-24">
			<SectionHeading title="Journey" />
			<div ref={listRef} className="relative mx-auto max-w-3xl">
				{/* Spine: static track + scroll-driven red fill */}
				<div className="absolute top-0 bottom-0 left-4 w-px bg-neutral-800 sm:left-1/2" />
				<motion.div style={{ scaleY: lineScale }} className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-red-500 to-red-900 sm:left-1/2" />

				<div className="flex flex-col gap-12">
					{timeline.map((entry, index) => {
						const left = index % 2 === 0;
						return (
							<motion.div
								key={`${entry.year}-${entry.title}`}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-80px" }}
								transition={{ duration: 0.5 }}
								className={`relative pl-12 sm:w-1/2 sm:pl-0 ${left ? "sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"}`}
							>
								<span className={`absolute top-1.5 left-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-red-500 bg-neutral-950 ${left ? "sm:left-full sm:translate-x-[calc(-50%+0.5px)]" : "sm:left-0 sm:translate-x-[calc(-50%+0.5px)]"}`} />
								<div className="text-sm font-black tracking-widest text-red-400">{entry.year}</div>
								<h3 className="mt-1 font-bold text-neutral-100">{entry.title}</h3>
								<p className="mt-1 text-sm leading-relaxed text-neutral-400">{entry.description}</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
