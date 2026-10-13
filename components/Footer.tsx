import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-4 sm:py-8">
      <div className="section-container text-center">
        <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">{personalInfo.name}</span>
          . Built with Next.js, TypeScript & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}