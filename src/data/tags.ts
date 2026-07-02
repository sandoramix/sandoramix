export type TagCategory = "language" | "framework" | "infra" | "school" | "domain";

/**
 * Assign a category to a tag to control its color.
 * Unlisted tags fall back to the neutral "domain" style.
 */
const TAG_CATEGORIES: Record<string, TagCategory> = {
	C: "language",
	"C++": "language",
	JavaScript: "language",
	TypeScript: "language",
	Python: "language",

	"Next.js": "framework",
	React: "framework",
	TailwindCSS: "framework",

	Vercel: "infra",
	PostgreSQL: "infra",
	Docker: "infra",
	"Local Network": "infra",
	"Background Service": "infra",

	"42 School": "school",
};

const TAG_STYLES: Record<TagCategory, string> = {
	language: "bg-amber-900/30 text-amber-300",
	framework: "bg-sky-900/30 text-sky-300",
	infra: "bg-emerald-900/30 text-emerald-300",
	school: "bg-red-900/30 text-red-300",
	domain: "bg-neutral-800/70 text-neutral-300",
};

export const getTagStyle = (tag: string): string => TAG_STYLES[TAG_CATEGORIES[tag] ?? "domain"];
