import SkillOrbit, { type OrbitItem } from "./SkillOrbit";
import { aboutContent } from "@/lib/data";

const skillItems: OrbitItem[] = [
  { label: "TypeScript", icon: "Braces" },
  { label: "React", icon: "Code2" },
  { label: "Next.js", icon: "Layers" },
  { label: "Node.js", icon: "Server" },
  { label: "Tailwind", icon: "Palette" },
  { label: "SQL", icon: "Database" },
];

const toolItems: OrbitItem[] = [
  { label: "Git", icon: "GitBranch" },
  { label: "VS Code", icon: "Terminal" },
  { label: "Figma", icon: "Figma" },
  { label: "Docker", icon: "Docker" },
  { label: "Postman", icon: "Wrench" },
  { label: "Vercel", icon: "Cpu" },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          {/* <p className="text-primary-600 font-medium tracking-wide uppercase text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2">
            Get to know me
          </p> */}
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-6">
            {aboutContent.heading}
          </h2>
          <div className="w-14 sm:w-20 h-1 bg-gradient-to-r from-primary-600 to-accent mx-auto rounded-full" />
        </div>

        <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16 md:mb-20">
          {aboutContent.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed md:hover:text-slate-800 md:hover:translate-x-2 transition-all duration-300"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-10 lg:gap-16 place-items-center">
          <SkillOrbit
            title="Skills"
            items={skillItems}
            duration={26}
            direction="clockwise"
            accent={{
              ring: "from-primary-400 via-primary-600 to-accent",
              glow: "shadow-primary-500/40",
              text: "text-primary-600",
              bg: "bg-primary-50",
              border: "border-primary-200",
            }}
          />
          <SkillOrbit
            title="Tools"
            items={toolItems}
            duration={30}
            direction="counterclockwise"
            accent={{
              ring: "from-yellow-400 via-amber-500 to-yellow-400",
              glow: "shadow-yellow-400/50",
              text: "text-yellow-600",
              bg: "bg-yellow-50",
              border: "border-yellow-200",
            }}
          />
        </div>
      </div>
    </section>
  );
}