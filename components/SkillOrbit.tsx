"use client";

import {
  Code2, Database, Layout, GitBranch, Server, Braces,
  Wrench, Figma, Terminal, Layers, Palette, Cpu,
} from "lucide-react";

type IconProps = { size?: number; className?: string };

function DockerIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="10" width="3" height="3" />
      <rect x="7" y="10" width="3" height="3" />
      <rect x="11" y="10" width="3" height="3" />
      <rect x="7" y="6.5" width="3" height="3" />
      <rect x="11" y="6.5" width="3" height="3" />
      <path d="M15 13h3.5a3.5 3.5 0 0 1-3.5 3.5H9a7 7 0 0 1-7-7V9" />
      <path d="M17 6c1.5 0 3 1 3.5 2.5" />
    </svg>
  );
}

export const ICONS = {
  Code2, Database, Layout, GitBranch, Server, Braces,
  Wrench, Figma, Terminal, Layers, Palette, Cpu,
  Docker: DockerIcon,
} as const;

export type IconName = keyof typeof ICONS;
export type OrbitItem = { label: string; icon: IconName };

type SkillOrbitProps = {
  title: string;
  items: OrbitItem[];
  duration?: number;
  direction?: "clockwise" | "counterclockwise";
  accent?: {
    ring: string;
    glow: string;
    text: string;
    bg: string;
    border: string;
  };
};

const defaultAccent = {
  ring: "from-yellow-400 via-amber-500 to-yellow-400",
  glow: "shadow-yellow-400/40",
  text: "text-yellow-600",
  bg: "bg-yellow-50",
  border: "border-yellow-200",
};

export default function SkillOrbit({
  title,
  items,
  duration = 24,
  direction = "clockwise",
  accent = defaultAccent,
}: SkillOrbitProps) {
  const total = items.length;

  return (
    <div className="flex flex-col items-center group/orbit w-full overflow-hidden">
      {/*
        Mobile-first circle scale:
        - base (320–419):   200px circle, 70px radius
        - 420px+:           240px circle, 86px radius
        - sm (640px):       280px circle, 102px radius
        - md (768px):       320px circle, 118px radius
        - lg (1024px):      380px circle, 140px radius
      */}
      <div
        className="relative shrink-0
          w-[200px] h-[200px] [--orbit-radius:70px]
          min-[420px]:w-[240px] min-[420px]:h-[240px] min-[420px]:[--orbit-radius:86px]
          sm:w-[280px] sm:h-[280px] sm:[--orbit-radius:102px]
          md:w-[320px] md:h-[320px] md:[--orbit-radius:118px]
          lg:w-[380px] lg:h-[380px] lg:[--orbit-radius:140px]"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${accent.ring} opacity-20 blur-3xl group-hover/orbit:opacity-40 transition-opacity duration-700`}
        />
        <div className="absolute inset-0 rounded-full border border-dashed border-slate-200" />

        <div
          className={`absolute inset-0 ${
            direction === "clockwise" ? "animate-orbit-cw" : "animate-orbit-ccw"
          }`}
          style={{ animationDuration: `${duration}s` }}
        >
          {items.map((item, i) => {
            const angle = (360 / total) * i;
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.label}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, calc(var(--orbit-radius) * -1)) rotate(-${angle}deg)`,
                }}
              >
                <div
                  className={`animate-orbit-${
                    direction === "clockwise" ? "ccw" : "cw"
                  }`}
                  style={{ animationDuration: `${duration}s` }}
                >
                  <div
                    className={`group/chip flex flex-col items-center gap-0.5 px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5 rounded-md sm:rounded-lg md:rounded-xl bg-white border ${accent.border} shadow-sm transition-all duration-300 cursor-default`}
                  >
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-md sm:rounded-lg ${accent.bg} ${accent.text} flex items-center justify-center transition-all duration-300`}
                    >
                      <Icon size={10} className="sm:hidden" />
                      <Icon size={12} className="hidden sm:block md:hidden" />
                      <Icon size={16} className="hidden md:block" />
                    </div>
                    <span className="text-[7px] sm:text-[8px] md:text-[10px] lg:text-[11px] font-semibold text-slate-700 whitespace-nowrap leading-tight">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center hub — smaller on mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`relative w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br ${accent.ring} flex items-center justify-center shadow-xl ${accent.glow} transition-transform duration-500 md:group-hover/orbit:scale-110`}
          >
            <span
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${accent.ring} animate-ping-slow opacity-40`}
            />
            <div className="relative w-[88%] h-[88%] rounded-full bg-white flex flex-col items-center justify-center">
              <span
                className={`text-[6px] sm:text-[7px] md:text-[9px] lg:text-[10px] uppercase tracking-wider font-semibold ${accent.text} mb-0.5`}
              >
                {total} items
              </span>
              <span className="font-display text-[10px] sm:text-xs md:text-base lg:text-lg font-bold text-slate-900">
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}