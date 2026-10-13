import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          {/* <p className="text-primary-600 font-medium tracking-wide uppercase text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2">
            Recent work
          </p> */}
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-6">
            Projects
          </h2>
          <div className="w-14 sm:w-20 h-1 bg-gradient-to-r from-primary-600 to-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group bg-white border border-slate-200 rounded-lg sm:rounded-2xl p-3.5 sm:p-5 md:p-6 md:hover:shadow-2xl md:hover:-translate-y-2 md:hover:border-primary-300 transition-all duration-300 flex flex-col"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-white font-bold text-xs sm:text-base md:text-lg mb-2.5 sm:mb-4 md:mb-5 shrink-0">
                {project.title.charAt(0)}
              </div>

              <h3 className="font-display text-sm sm:text-lg md:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2 md:group-hover:text-primary-600 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-sm leading-relaxed mb-2.5 sm:mb-4 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] sm:text-xs font-medium text-slate-600 bg-slate-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 border-t border-slate-100">
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1 text-[10px] sm:text-sm font-medium text-primary-600 hover:text-primary-700 active:scale-95 transition-all duration-300"
                >
                  <ExternalLink size={11} className="sm:hidden" />
                  <ExternalLink size={13} className="hidden sm:block" />
                  Live Demo
                </a>
                <a
                  href={project.repo}
                  className="inline-flex items-center gap-1 text-[10px] sm:text-sm font-medium text-slate-600 hover:text-slate-900 active:scale-95 transition-all duration-300"
                >
                  <Github size={11} className="sm:hidden" />
                  <Github size={13} className="hidden sm:block" />
                  Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}