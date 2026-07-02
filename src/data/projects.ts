export type ProjectPreview =
	| {
			/** Stylized browser window with an abstract scene in the accent color. */
			type: "browser";
			/** Address shown in the fake URL bar. */
			url: string;
			/** Big center text; defaults to the initials of the project title. */
			monogram?: string;
	  }
	| {
			/** Animated terminal window that "types" when scrolled into view. */
			type: "terminal";
			/** Command shown after the prompt. */
			command: string;
			/** Output lines revealed one by one. */
			output: string[];
	  };

export type Project = {
	title: string;
	/** Short punchline shown above the title. */
	tagline: string;
	description: string;
	tags: string[];
	githubUrl?: string;
	liveUrl?: string;
	/** Accent color (hex) used for the preview glow and highlights. */
	accent: string;
	preview: ProjectPreview;
};

export const projects: Project[] = [
	{
		title: "RF4 Interactive Tools",
		tagline: "Community companion app",
		description:
			"Companion web app for Russian Fishing 4 — an interactive, zoomable map pinning suggested fishing spots per lake, paired with a constantly updated fish database and lure/bait suggestions for the community.",
		tags: ["Next.js", "TypeScript", "Interactive Map", "Game Companion App", "Vercel", "PostgreSQL", "Community Tool"],
		liveUrl: "https://rf4it.sandoramix.dev",
		accent: "#2dd4bf",
		preview: { type: "browser", url: "rf4it.sandoramix.dev", monogram: "RF4IT" },
	},
	{
		title: "42-findmypeer",
		tagline: "Campus radar",
		description:
			"42Firenze's local web app for instantly seeing which peers are on campus and where — built to cut the wandering-the-building time before a peer evaluation or a quick study group.",
		tags: ["JavaScript", "TailwindCSS", "Real-time", "Local Network", "Web App", "Campus Tool", "42 School"],
		githubUrl: "https://github.com/Sandoramix/42-findmypeer",
		accent: "#a78bfa",
		preview: { type: "browser", url: "findmypeer.42firenze.local" },
	},
	{
		title: "cub3D",
		tagline: "Raycasting engine from scratch",
		description:
			"Wolfenstein-style raycasting 3D engine written in C from scratch — custom renderer, texture mapping, minimap and collision detection with zero external graphics libraries beyond MinilibX.",
		tags: ["C", "Raycasting", "Computer Graphics", "Game Engine", "Low-Level Programming", "Linear Algebra", "42 School"],
		githubUrl: "https://github.com/Sandoramix/42-cub3D",
		accent: "#fb923c",
		preview: {
			type: "terminal",
			command: "make && ./cub3D maps/castle.cub",
			output: ["[mlx]  window 1280x720 created", "[map]  32x24 grid parsed, 4 textures loaded", "[core] raycaster running · 60 fps", "[core] minimap + collisions active"],
		},
	},
	{
		title: "minishell",
		tagline: "Bash, rebuilt in C",
		description:
			"A POSIX-compliant shell built in C from the ground up — handles pipes, redirections, environment variables, builtins, quoting and signal handling, mirroring real bash behavior.",
		tags: ["C", "Unix", "Process Management", "Signals", "Lexing & Parsing", "Systems Programming", "42 School"],
		githubUrl: "https://github.com/Sandoramix/42-minishell",
		accent: "#4ade80",
		preview: {
			type: "terminal",
			command: "./minishell",
			output: ['minishell$ echo "hello world" | wc -w', "2", "minishell$ cat < infile | grep 42 > outfile", "minishell$ exit"],
		},
	},
	{
		title: "42cursus",
		tagline: "The whole core curriculum",
		description:
			"The full 42Firenze core curriculum, project by project — from low-level C and algorithmic data structures to containerized services, each one solved solo with strict norm and zero memory leaks.",
		tags: ["C", "C++", "Docker", "Algorithms", "Data Structures", "Systems Programming", "42 School"],
		githubUrl: "https://github.com/Sandoramix/42cursus",
		accent: "#f87171",
		preview: {
			type: "terminal",
			command: "ls projects/",
			output: ["libft/      ft_printf/  get_next_line/  push_swap/", "pipex/      philosophers/  minishell/   cub3D/", "cpp_modules/  inception/  ft_containers/", "norminette: OK · valgrind: 0 leaks"],
		},
	},
	{
		title: "SpotiShortcut",
		tagline: "Spotify without window focus",
		description:
			"A lightweight Python background tool that binds global keyboard shortcuts to Spotify actions — like/save, skip, play/pause — so playback control never needs window focus.",
		tags: ["Python", "Productivity Tool", "OS Automation", "Spotify API", "Background Service", "Desktop Utility"],
		githubUrl: "https://github.com/Sandoramix/spotishortcut",
		accent: "#22c55e",
		preview: {
			type: "terminal",
			command: "python spotishortcut.py",
			output: ["[init]   connected to Spotify API", "[hotkey] ctrl+alt+l  →  like current track", "[hotkey] ctrl+alt+→  →  next track", "[daemon] running in background..."],
		},
	},
];
