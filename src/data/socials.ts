import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export type Social = {
	label: string;
	href: string;
	Icon: IconType;
};

export const socials: Social[] = [
	{ label: "GitHub", href: "https://github.com/sandoramix", Icon: FaGithub },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/oleksandr-dudniak/", Icon: FaLinkedin },
	{ label: "Instagram", href: "https://instagram.com/sandoramixer", Icon: FaInstagram },
	{ label: "YouTube", href: "https://www.youtube.com/@Sandoramixer", Icon: FaYoutube },
];

export const contactEmail = "sandoramix.dev@gmail.com";
