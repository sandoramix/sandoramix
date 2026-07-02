import { type FC } from "react";
import { motion } from "motion/react";
import { about, skills } from "~/data/about";
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

					<motion.div
						initial={{ opacity: 0, x: 24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.45, delay: about.stats.length * 0.1 }}
						className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-left backdrop-blur-sm"
					>
						<div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-neutral-200">
							{about.languages.items.map((language) => (
								<span key={language.name}>
									{language.flag} {language.name}
								</span>
							))}
						</div>
						<div className="mt-1.5 text-xs text-neutral-500 italic">{about.languages.note}</div>
					</motion.div>
				</div>
			</div>

			<div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{skills.map((skillGroup, index) => (
					<motion.div
						key={skillGroup.group}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.4, delay: index * 0.06 }}
						className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-left backdrop-blur-sm"
					>
						<h3 className="mb-3 text-xs font-bold tracking-widest text-red-400 uppercase">{skillGroup.group}</h3>
						<div className="flex flex-wrap gap-1.5">
							{skillGroup.items.map((item) => (
								<span key={item} className="rounded-full bg-neutral-800/80 px-2.5 py-0.5 text-xs text-neutral-300">
									{item}
								</span>
							))}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};
