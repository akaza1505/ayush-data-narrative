import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Project } from "@/components/sections/Project";
import { Education } from "@/components/sections/Education";
import { Languages } from "@/components/sections/Languages";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayush Kumar Singh — Business Analytics & Consulting Portfolio" },
      { name: "description", content: "Portfolio of Ayush Kumar Singh — MBA candidate in Business Analytics. Data analysis, Power BI, process optimization, and AI-assisted analytics." },
      { property: "og:title", content: "Ayush Kumar Singh — Business Analytics Portfolio" },
      { property: "og:description", content: "Bridging business needs with data-driven solutions." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="relative min-h-screen bg-paper text-ink">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Project />
        <Education />
        <Languages />
        <Contact />
      </main>
    </div>
  );
}
