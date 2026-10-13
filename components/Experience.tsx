import { Briefcase, GraduationCap } from "lucide-react";
import { education, experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-slate-50 overflow-hidden">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-6">
            Education & Experience
          </h2>
          <p className="text-primary-600 font-medium tracking-wide uppercase text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2">
            My journey
          </p>
          <div className="w-14 sm:w-20 h-1 bg-gradient-to-r from-primary-600 to-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-3 bg-primary-100 text-primary-600 rounded-md sm:rounded-xl shrink-0">
                <GraduationCap size={16} className="sm:hidden" />
                <GraduationCap size={22} className="hidden sm:block" />
              </div>
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                Education
              </h3>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {education.map((item, i) => <TimelineCard key={i} {...item} />)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-3 bg-accent/10 text-accent-dark rounded-md sm:rounded-xl shrink-0">
                <Briefcase size={16} className="sm:hidden" />
                <Briefcase size={22} className="hidden sm:block" />
              </div>
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                Experience
              </h3>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {experience.map((item, i) => (
                <TimelineCard
                  key={i}
                  degree={item.role}
                  institution={item.company}
                  period={item.period}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type TimelineCardProps = {
  degree: string;
  institution: string;
  period: string;
  description: string;
};

function TimelineCard({ degree, institution, period, description }: TimelineCardProps) {
  return (
    <div className="relative pl-4 sm:pl-6 border-l-2 border-slate-200 md:hover:border-primary-400 transition-colors duration-300">
      <div className="absolute -left-[6px] sm:-left-[9px] top-1.5 w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-primary-500" />
      <div className="bg-white p-3 sm:p-5 md:p-6 rounded-lg sm:rounded-2xl shadow-sm border border-slate-100 md:hover:shadow-2xl md:hover:-translate-y-2 transition-all duration-300">
        <span className="inline-block text-[9px] sm:text-xs font-semibold text-primary-600 bg-primary-50 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-2">
          {period}
        </span>
        <h4 className="font-display text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug">
          {degree}
        </h4>
        <p className="text-[11px] sm:text-sm font-medium text-slate-500 mb-1.5 sm:mb-2">
          {institution}
        </p>
        <p className="text-slate-600 text-[11px] sm:text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}