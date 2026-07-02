export const about = {
	heading: "About Me",
	// Each string renders as its own paragraph.
	paragraphs: [
		"I'm Oleksandr — full-stack web & mobile developer and 42 Firenze student, based in Florence, Italy. Curious by default: whenever I learn something new, it usually ends up implemented in one of my repos.",
		"I joined 42 in 2023 and started working part-time as a developer that same year — so I split my time between peer-reviewed C projects with zero tolerance for memory leaks and real-world web & mobile codebases with real deadlines.",
		"Off the keyboard I mess with cybersecurity challenges and CTFs, and do very-newbie-level repair of consoles, laptops and motherboards. Things get opened. Most of them survive.",
	],
	stats: [
		{ value: "42", label: "Firenze student" },
		{ value: "2023", label: "working as a dev since" },
		{ value: "25+", label: "public repos" },
	],
};

export type SkillGroup = {
	group: string;
	items: string[];
};

export const skills: SkillGroup[] = [
	{ group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++"] },
	{ group: "Frontend", items: ["React", "Next.js", "Angular", "Vue", "Svelte", "TailwindCSS"] },
	{ group: "Backend", items: ["Spring Boot", "NestJS", "Express", "Fastify", "Flask", "Node.js"] },
	{ group: "Mobile", items: ["React Native", "Android"] },
	{ group: "Databases", items: ["PostgreSQL", "MySQL", "MariaDB", "SQLite"] },
	{ group: "DevOps & Security", items: ["Docker", "Jenkins", "Git", "Linux", "CTF & Challenges"] },
];

export type TimelineEntry = {
	year: string;
	title: string;
	description: string;
};

export const timeline: TimelineEntry[] = [
	{
		year: "2020",
		title: "First lines of code",
		description: "Self-taught beginnings — small scripts, web pages, and a fresh GitHub account. Breaking things to see how they work.",
	},
	{
		year: "2023",
		title: "Joined 42 Firenze",
		description: "Survived the Piscine, entered the core curriculum. C, algorithms and merciless peer evaluations became daily life.",
	},
	{
		year: "2023",
		title: "First dev job",
		description: "Started working part-time as a developer while studying — real codebases, real deadlines, web and mobile.",
	},
	{
		year: "2024",
		title: "Systems deep-dive",
		description: "Built minishell, cub3D and the rest of the core — shells, raycasters, threads, containers. All in C/C++, all leak-free.",
	},
	{
		year: "Now",
		title: "Building & exploring",
		description: "Full-stack web & mobile by day; CTFs, side tools and hardware repair experiments whenever an itch needs scratching.",
	},
];
