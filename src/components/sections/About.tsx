import { type FC } from "react";
import { motion } from "motion/react";
import { about } from "~/data/about";
import { SectionHeading } from "~/components/sections/SectionHeading";

export const About: FC = () => {
	return (
		<section id="about" className="w-full px-6 pb-24">
			<SectionHeading title={about.heading} />
			<div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-[1.5fr_1fr]">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.5 }}
					className="space-y-4 text-left text-sm leading-relaxed text-neutral-300 sm:text-base"
				>
					{about.paragraphs.map((paragraph) => (
						<p key={paragraph.slice(0, 24)}>{paragraph}</p>
					))}
				</motion.div>

				<div className="flex flex-col gap-3">
					{about.stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, x: 24 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.45, delay: index * 0.1 }}
							className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-left backdrop-blur-sm"
						>
							<div className="text-2xl font-black text-red-400">{stat.value}</div>
							<div className="text-xs tracking-wide text-neutral-400 uppercase">{stat.label}</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
