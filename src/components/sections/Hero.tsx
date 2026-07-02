import { type FC } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Maitree, Edu_QLD_Beginner, Exo_2 } from "next/font/google";
import { ScatterText } from "~/components/motion/ScatterText";
import { Magnetic } from "~/components/motion/Magnetic";
import { socials } from "~/data/socials";

const usernameFont = Maitree({
	weight: "700",
	subsets: ["latin"],
});
const eduFont = Edu_QLD_Beginner({
	weight: "700",
	subsets: ["latin"],
});
const exo2Font = Exo_2({
	weight: "700",
	subsets: ["latin"],
});

export const Hero: FC = () => {
	return (
		<div className="relative flex min-h-[85dvh] w-full shrink-0 flex-col items-center justify-center gap-3 overflow-clip py-16 text-center capitalize [overflow-clip-margin:25vh]">
			<div className="hero-glow pointer-events-none absolute top-1/2 left-1/2 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2" />
			<ScatterText className={`text-shadow-lg text-shadow-black text-2xl text-neutral-600 uppercase ${exo2Font.className}`} text={"Oleksandr Dudniak"} automaticRestore={true} automaticRestoreDelay={4.5} />
			<motion.div
				initial={{ opacity: 0.25, scale: 0.25 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.5,
					scale: {
						type: "spring",
						visualDuration: 0.5,
						bounce: 0.4,
						power: 10,
					},
				}}
				className={`${usernameFont.className} text-3xl font-bold uppercase select-none`}
			>
				<h1>
					<ScatterText className={`text-shadow-lg text-shadow-red-950`} text={"Sandoramix"} automaticRestoreDelay={3} automaticRestore={true} />
				</h1>
			</motion.div>

			<h3 className={`text-shadow-lg text-shadow-black text-base text-neutral-300 ${eduFont.className}`}>
				<ScatterText text={"Software Developer"} automaticRestoreDelay={6} automaticRestore={true} />
			</h3>

			<div className={`mt-12 flex justify-center gap-4 text-4xl`}>
				{socials.map(({ href, label, Icon }) => (
					<Magnetic key={href}>
						<Link href={href} target={"_blank"} aria-label={label}>
							<motion.div tabIndex={-1} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
								<Icon className={"text-white"} />
							</motion.div>
						</Link>
					</Magnetic>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5, duration: 0.8 }}
				className="absolute bottom-8 text-neutral-500"
				aria-hidden="true"
			>
				<motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M12 5v14" />
						<path d="m19 12-7 7-7-7" />
					</svg>
				</motion.div>
			</motion.div>
		</div>
	);
};
