import { type FC, useRef } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import type { Project } from "~/data/projects";

const MAX_TILT = 5;

/** Shared window chrome + 3D tilt & cursor spotlight around either preview type. */
export const ProjectPreview: FC<{ project: Project }> = ({ project }) => {
	const ref = useRef<HTMLDivElement>(null);

	const spotlightX = useMotionValue(-500);
	const spotlightY = useMotionValue(-500);
	const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
	const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
	const spotlight = useMotionTemplate`radial-gradient(280px circle at ${spotlightX}px ${spotlightY}px, ${project.accent}1f, transparent 70%)`;

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const element = ref.current;
		if (!element) return;
		const rect = element.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		spotlightX.set(x);
		spotlightY.set(y);
		rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * MAX_TILT);
		rotateX.set(-((y - rect.height / 2) / (rect.height / 2)) * MAX_TILT);
	};

	const handleMouseLeave = () => {
		spotlightX.set(-500);
		spotlightY.set(-500);
		rotateX.set(0);
		rotateY.set(0);
	};

	return (
		<motion.div
			ref={ref}
			style={{ rotateX, rotateY, transformPerspective: 900 }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className="group relative w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/80 shadow-2xl shadow-black/50 backdrop-blur-sm"
		>
			<motion.div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: spotlight }} />
			{project.preview.type === "browser" && <BrowserScene project={project} url={project.preview.url} monogram={project.preview.monogram} />}
			{project.preview.type === "terminal" && <TerminalScene project={project} command={project.preview.command} output={project.preview.output} />}
		</motion.div>
	);
};

/** Windows-style caption buttons: minimize, maximize, close. */
const WindowControls: FC = () => (
	<div className="flex items-center text-neutral-400">
		<span className="flex h-6 w-8 items-center justify-center rounded-sm transition-colors group-hover:text-neutral-300 hover:bg-neutral-700/60">
			<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
				<line x1="0" y1="5" x2="10" y2="5" />
			</svg>
		</span>
		<span className="flex h-6 w-8 items-center justify-center rounded-sm transition-colors group-hover:text-neutral-300 hover:bg-neutral-700/60">
			<svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
				<rect x="0.5" y="0.5" width="9" height="9" />
			</svg>
		</span>
		<span className="flex h-6 w-8 items-center justify-center rounded-sm transition-colors group-hover:text-neutral-300 hover:bg-red-600 hover:text-white">
			<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
				<line x1="0" y1="0" x2="10" y2="10" />
				<line x1="10" y1="0" x2="0" y2="10" />
			</svg>
		</span>
	</div>
);

const BrowserScene: FC<{ project: Project; url: string; monogram?: string }> = ({ project, url, monogram: monogramOverride }) => {
	const monogram =
		monogramOverride ??
		project.title
			.split(/[\s-]+/)
			.map((word) => word[0])
			.join("")
			.slice(0, 3)
			.toUpperCase();

	return (
		<div className="flex h-64 flex-col sm:h-72">
			<div className="flex items-center gap-3 border-b border-neutral-800 bg-neutral-900/80 py-1.5 pr-2 pl-4">
				<div className="flex-1 truncate rounded-md bg-neutral-800/80 px-3 py-1 text-center text-xs text-neutral-400">{url}</div>
				<WindowControls />
			</div>

			<div className="relative flex-1 overflow-hidden">
				<div
					className="absolute inset-0 opacity-60"
					style={{ background: `radial-gradient(ellipse at 30% 20%, ${project.accent}33, transparent 60%), radial-gradient(ellipse at 80% 90%, ${project.accent}22, transparent 55%)` }}
				/>
				<div
					className="absolute inset-0 opacity-[0.25]"
					style={{
						backgroundImage: `radial-gradient(${project.accent}55 1px, transparent 1px)`,
						backgroundSize: "22px 22px",
					}}
				/>

				<div className="absolute inset-0 flex items-center justify-center">
					<motion.span
						className="text-6xl font-black tracking-tight opacity-90 transition-transform duration-500 group-hover:scale-110 sm:text-7xl"
						style={{ color: project.accent, textShadow: `0 0 40px ${project.accent}66` }}
					>
						{monogram}
					</motion.span>
				</div>

				{/* Floating ui-card shapes, drift apart on hover */}
				<div
					className="absolute top-6 left-6 h-14 w-24 rounded-lg border transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:rotate-[-4deg]"
					style={{ borderColor: `${project.accent}44`, background: `${project.accent}0d` }}
				/>
				<div
					className="absolute right-8 bottom-8 h-16 w-28 rounded-lg border transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:rotate-[4deg]"
					style={{ borderColor: `${project.accent}44`, background: `${project.accent}0d` }}
				/>
				<div
					className="absolute top-10 right-12 h-10 w-10 rounded-full border transition-transform duration-500 group-hover:-translate-y-2"
					style={{ borderColor: `${project.accent}44`, background: `${project.accent}0d` }}
				/>
			</div>
		</div>
	);
};

const TerminalScene: FC<{ project: Project; command: string; output: string[] }> = ({ project, command, output }) => {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<div ref={ref} className="flex h-64 flex-col font-mono text-[13px] leading-relaxed sm:h-72">
			<div className="flex items-center gap-3 border-b border-neutral-800 bg-neutral-900/80 py-1.5 pr-2 pl-4">
				<span className="flex-1 truncate text-left text-xs text-neutral-500">sandoramix@dev — {project.title.toLowerCase()}</span>
				<WindowControls />
			</div>

			<div className="flex-1 space-y-1.5 overflow-hidden p-4 text-left">
				<motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.3 }} className="flex flex-wrap gap-x-2">
					<span style={{ color: project.accent }}>$</span>
					<span className="text-neutral-200">{command}</span>
				</motion.div>

				{output.map((line, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: -6 }}
						animate={inView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.25, delay: 0.5 + index * 0.35 }}
						className="whitespace-pre-wrap text-neutral-400"
					>
						{line}
					</motion.div>
				))}

				<motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 + output.length * 0.35 }} className="flex gap-2">
					<span style={{ color: project.accent }}>$</span>
					<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="inline-block h-4 w-2 self-center" style={{ background: project.accent }} />
				</motion.div>
			</div>
		</div>
	);
};
