// NOTE: placeholder copy & dates — edit freely, components render whatever is here.

export const about = {
	heading: "About Me",
	// Each string renders as its own paragraph.
	paragraphs: [
		"I'm Oleksandr — a software developer who likes building things from the ground up, whether that's a POSIX shell in raw C or a full-stack web app used by a gaming community.",
		"Trained at 42 Firenze, where the curriculum is 100% project-based, peer-reviewed and merciless about memory leaks. That shaped how I work: understand the layer below, then build on it.",
	],
	stats: [
		{ value: "42", label: "Firenze student" },
		{ value: "C → TS", label: "low-level to web" },
		{ value: "0", label: "memory leaks tolerated" },
	],
};

export type TimelineEntry = {
	year: string;
	title: string;
	description: string;
};

// TODO: adjust years/entries to your real story.
export const timeline: TimelineEntry[] = [
	{
		year: "2021",
		title: "First lines of code",
		description: "Started self-teaching programming — small scripts, automation, breaking things to see how they work.",
	},
	{
		year: "2022",
		title: "Joined 42 Firenze",
		description: "Survived the Piscine, entered the core curriculum. C, algorithms, and peer evaluations became daily life.",
	},
	{
		year: "2023",
		title: "Systems programming deep-dive",
		description: "Built minishell, cub3D and the rest of the core — shells, raycasters, threads, containers. All in C/C++, all leak-free.",
	},
	{
		year: "2024",
		title: "Shipping for real users",
		description: "Moved up the stack: 42-findmypeer for campus, then RF4 Interactive Tools — a live app serving a game community.",
	},
	{
		year: "Now",
		title: "Building & exploring",
		description: "Full-stack TypeScript by day, side tools whenever an itch needs scratching. Open to interesting problems.",
	},
];
