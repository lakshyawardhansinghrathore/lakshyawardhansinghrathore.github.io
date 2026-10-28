import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Terminal } from "@/components/sections/terminal";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { GithubStats } from "@/components/sections/github-stats";
import { Experience } from "@/components/sections/experience";
import { Certifications } from "@/components/sections/certifications";
import { Blog } from "@/components/sections/blog";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { ScrollVelocityRibbon } from "@/components/scroll-velocity-ribbon";

/* Re-render hourly so the GitHub/LeetCode/Codeforces stats stay fresh */
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollVelocityRibbon />
      <About />
      <Terminal />
      <Skills />
      <Projects />
      <GithubStats />
      <Experience />
      <Certifications />
      <Blog />
      <Testimonials />
      <Contact />
    </>
  );
}
