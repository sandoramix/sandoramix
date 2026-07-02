import { BaseLayout } from "~/components/layout/BaseLayout";
import { Hero } from "~/components/sections/Hero";
import { About } from "~/components/sections/About";
import { ProjectShowcase } from "~/components/sections/ProjectShowcase";
import { Journey } from "~/components/sections/Journey";
import { Footer } from "~/components/sections/Footer";

export default function Home() {
	return (
		<BaseLayout>
			<Hero />
			<About />
			<ProjectShowcase />
			<Journey />
			<Footer />
		</BaseLayout>
	);
}
