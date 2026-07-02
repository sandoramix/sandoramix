export const about = {
	heading: "About Me",
	// Each string renders as its own paragraph.
	paragraphs: [
		"I'm Oleksandr — Ukrainian, living in Florence, Italy. Full-stack web & mobile developer and 42 Firenze student. Curious by default: whenever I learn something new, it usually ends up implemented in one of my repos.",
		"Since 2023 I've been living a double life: part-time Software Developer at Magenta srl by day, 42 Firenze student the rest of the time — real-world web & mobile codebases on one side, peer-reviewed C projects with zero tolerance for memory leaks on the other.",
		"Off the keyboard I mess with cybersecurity challenges and CTFs, and do very-newbie-level repair of consoles, laptops and motherboards. Things get opened. Most of them survive.",
	],
	stats: [
		{ value: "42", label: "Firenze student" },
		{ value: "2023", label: "working as a dev since" },
		{ value: "25+", label: "public repos" },
	],
	languages: {
		items: [
			{ flag: "🇮🇹", name: "Italian" },
			{ flag: "🇬🇧", name: "English" },
			{ flag: "🇺🇦", name: "Ukrainian" },
		],
		note: "none perfect — all understood",
	},
};

export type SkillGroup = {
	group: string;
	items: string[];
};

export const skills: SkillGroup[] = [
	{ group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++", "PHP", "Bash"] },
	{ group: "Frontend", items: ["React", "Next.js", "Angular", "Vue", "Svelte", "TailwindCSS", "HTML & CSS"] },
	{ group: "Backend", items: ["Spring Boot", "NestJS", "Express", "Fastify", "Flask", "Node.js"] },
	{ group: "Mobile", items: ["React Native", "Android"] },
	{ group: "Databases", items: ["PostgreSQL", "MySQL", "MariaDB", "SQLite", "SQL"] },
	{ group: "Systems, DevOps & Security", items: ["Linux", "Unix", "Docker", "Jenkins", "Git", "SSH", "Networking", "Virtualization", "CTF & Challenges"] },
];

export type TimelineEntryKind = "work" | "education" | "milestone";

export type TimelineEntry = {
	year: string;
	title: string;
	/** Shown as a small badge next to the year. */
	kind: TimelineEntryKind;
	/** Company / school / context line. */
	place?: string;
	description: string;
};

export const timeline: TimelineEntry[] = [
	{
		year: "2017 – 2023",
		title: "IT & Telecommunications",
		kind: "education",
		place: "I.I.S. Leonardo Da Vinci · Florence",
		description: "High school specialized in IT and telecommunications — first structured programming with PHP and Java.",
	},
	{
		year: "2020",
		title: "First personal projects",
		kind: "milestone",
		place: "GitHub",
		description: "Self-taught side projects beyond school — small scripts, web pages, breaking things to see how they work.",
	},
	{
		year: "Mar 2023",
		title: "Software Developer",
		kind: "work",
		place: "Magenta srl · Florence (part-time, hybrid)",
		description: "Full-stack web & mobile development alongside my studies — React Native, Java and everything in between. Still going.",
	},
	{
		year: "Oct 2023",
		title: "Joined 42 Firenze",
		kind: "education",
		place: "42 Firenze",
		description: "Survived the Piscine, entered the core curriculum. C, algorithms and merciless peer evaluations became daily life.",
	},
	{
		year: "2024",
		title: "Systems deep-dive",
		kind: "milestone",
		place: "42 core curriculum",
		description: "Built minishell, cub3D and the rest of the core — shells, raycasters, threads, containers. All in C/C++, all leak-free.",
	},
	{
		year: "Now",
		title: "Building & exploring",
		kind: "milestone",
		description: "Full-stack web & mobile by day; CTFs, side tools and hardware repair experiments whenever an itch needs scratching.",
	},
];
