import { type FC, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { projects, type Project } from "~/data/projects";
import { getTagStyle } from "~/data/tags";
import { ProjectPreview } from "~/components/projects/ProjectPreview";
import { SectionHeading } from "~/components/sections/SectionHeading";
import { useScrollContainer } from "~/components/layout/ScrollContext";

export const ProjectShowcase: FC = () => {
	return (
		<section id="projects" className="w-full px-6 pb-24">
			<SectionHeading title="Projects" />
			<div className="mx-auto flex max-w-5xl flex-col gap-20 sm:gap-28">
				{projects.map((project, index) => (
					<ProjectRow key={project.title} project={project} flipped={index % 2 === 1} />
				))}
			</div>
		</section>
	);
};

const ProjectRow: FC<{ project: Project; flipped: boolean }> = ({ project, flipped }) => {
	const rowRef = useRef<HTMLDivElement>(null);
	const container = useScrollContainer();

	const { scrollYProgress } = useScroll({
		target: rowRef,
		container: container ?? undefined,
		offset: ["start end", "end start"],
	});
	const previewY = useTransform(scrollYProgress, [0, 1], [36, -36]);

	return (
		<div ref={rowRef} className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12`}>
			<motion.div style={{ y: previewY }} className={flipped ? "md:order-2" : ""}>
				<motion.div
					initial={{ opacity: 0, x: flipped ? 40 : -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.55, ease: "easeOut" }}
				>
					<ProjectPreview project={project} />
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: flipped ? -40 : 40 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
				className={`flex flex-col gap-3 text-left ${flipped ? "md:order-1 md:items-end md:text-right" : ""}`}
			>
				<span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: project.accent }}>
					{project.tagline}
				</span>
				<div className="flex items-center gap-3">
					<h3 className="text-2xl font-bold text-neutral-100">{project.title}</h3>
					<div className="flex gap-3 text-lg text-neutral-400">
						{project.githubUrl && (
							<Link href={project.githubUrl} target="_blank" aria-label={`${project.title} GitHub repository`}>
								<FaGithub className="transition-colors hover:text-white" />
							</Link>
						)}
						{project.liveUrl && (
							<Link href={project.liveUrl} target="_blank" aria-label={`${project.title} live site`}>
								<FaArrowUpRightFromSquare className="transition-colors hover:text-red-500" />
							</Link>
						)}
					</div>
				</div>
				<p className="text-sm leading-relaxed text-neutral-400">{project.description}</p>
				<div className={`mt-1 flex flex-wrap gap-2 ${flipped ? "md:justify-end" : ""}`}>
					{project.tags.map((tag) => (
						<span key={tag} className={`rounded-full px-2 py-0.5 text-xs ${getTagStyle(tag)}`}>
							{tag}
						</span>
					))}
				</div>
			</motion.div>
		</div>
	);
};
