import { type FC } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Magnetic } from "~/components/motion/Magnetic";
import { socials, contactEmail } from "~/data/socials";

export const Footer: FC = () => {
	return (
		<footer className="w-full px-6 pb-12">
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ duration: 0.5 }}
				className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 px-6 py-10 text-center backdrop-blur-sm"
			>
				<h2 className="text-2xl font-bold text-neutral-100">Let&apos;s build something</h2>
				<p className="max-w-md text-sm text-neutral-400">Open to interesting projects, collaborations and good conversations about software.</p>
				<Magnetic strength={0.25}>
					<a
						href={`mailto:${contactEmail}`}
						className="inline-block rounded-full border border-red-800/70 bg-red-900/30 px-6 py-2.5 text-sm font-semibold text-red-200 transition-colors hover:bg-red-900/60 hover:text-white"
					>
						{contactEmail}
					</a>
				</Magnetic>
				<div className="flex gap-4 text-2xl text-neutral-400">
					{socials.map(({ href, label, Icon }) => (
						<Magnetic key={href}>
							<Link href={href} target="_blank" aria-label={label}>
								<Icon className="transition-colors hover:text-white" />
							</Link>
						</Magnetic>
					))}
				</div>
				<p className="text-xs text-neutral-600">© {new Date().getFullYear()} Oleksandr Dudniak · Sandoramix</p>
			</motion.div>
		</footer>
	);
};
