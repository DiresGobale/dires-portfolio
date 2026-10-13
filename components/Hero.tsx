"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail, Download, MapPin } from "lucide-react";
import { personalInfo } from "@/lib/data";

/* Each phrase has its own gradient color */
const TYPING_PHRASES: { text: string; gradient: string }[] = [
  {
    text: "Hello I am Dires",
    gradient: "from-primary-600 via-primary-500 to-accent",
  },
  {
    text: "I am Full Stack Developer",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    text: "I am UI/UX Designer",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
  },
  {
    text: "I am Freelancer",
    gradient: "from-rose-500 via-red-500 to-orange-500",
  },
  {
    text: "Life is better with coding",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
];

export default function Hero() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 3D tilt state — tracks cursor position relative to hero center
  const heroRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  /* ---------- Auto-typing effect ---------- */
  useEffect(() => {
    const current = TYPING_PHRASES[phraseIndex].text;
    const typingSpeed = isDeleting ? 40 : 90;
    const pauseAtEnd = 1400;

    if (!isDeleting && text === current) {
      const t = setTimeout(() => setIsDeleting(true), pauseAtEnd);
      return () => clearTimeout(t);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      return;
    }

    const t = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(t);
  }, [text, isDeleting, phraseIndex]);

  /* ---------- 3D mouse tracking ---------- */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Disable 3D on touch devices for performance
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;   // -0.5 → 0.5
      const dy = (e.clientY - cy) / rect.height;  // -0.5 → 0.5
      setTilt({ x: dx, y: dy });
    };

    const handleLeave = () => setTilt({ x: 0, y: 0 });

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const currentGradient = TYPING_PHRASES[phraseIndex].gradient;

  // Rotate up to ±8° based on cursor
  const rotateY = tilt.x * 16;
  const rotateX = -tilt.y * 16;

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-12 sm:pt-16 md:pt-20 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background decoration — parallax layer */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-16 w-32 h-32 sm:w-64 sm:h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${-tilt.x * 40}px, ${-tilt.y * 40}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-1/4 -right-16 w-40 h-40 sm:w-80 sm:h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${tilt.x * 60}px, ${tilt.y * 60}px, 0)`,
          }}
        />
      </div>

      <div
        ref={heroRef}
        className="section-container grid md:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-center py-6 sm:py-12 md:py-16"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Text */}
        <div
          className="animate-fade-up order-2 md:order-1 text-center md:text-left"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Availability badge */}
          {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 sm:mb-4 rounded-full bg-green-50 border border-green-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-green-700">
              Available for opportunities
            </span>
          </div> */}

          {/* Auto-typing headline */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 sm:mb-4 md:mb-5 min-h-[1.3em]">
            <span
              className={`bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent transition-all duration-500`}
            >
              {text}
            </span>
            <span
              className={`inline-block w-[3px] sm:w-1 h-[0.85em] ml-1 align-middle animate-pulse bg-gradient-to-b ${currentGradient}`}
            />
          </h1>

          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-700 mb-3 sm:mb-5">
            {personalInfo.title}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 max-w-md mx-auto md:mx-0">
            {personalInfo.intro}
          </p>

          {/* Location + role chips — 3D tilt on hover */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start mb-5 sm:mb-8">
            <span
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-slate-600 bg-slate-100 px-2 sm:px-2.5 py-1 rounded-full transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
              style={{ transform: "translateZ(30px)" }}
            >
              <MapPin size={11} />
              {personalInfo.location}
            </span>
            <span
              className="inline-flex items-center text-[10px] sm:text-xs font-medium text-purple-700 bg-purple-50 px-2 sm:px-2.5 py-1 rounded-full border border-purple-100 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
              style={{ transform: "translateZ(35px)" }}
            >
              💻 Full Stack
            </span>
            <span
              className="inline-flex items-center text-[10px] sm:text-xs font-medium text-amber-700 bg-amber-50 px-2 sm:px-2.5 py-1 rounded-full border border-amber-100 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
              style={{ transform: "translateZ(40px)" }}
            >
              🎨 UI/UX
            </span>
            <span
              className="inline-flex items-center text-[10px] sm:text-xs font-medium text-rose-700 bg-rose-50 px-2 sm:px-2.5 py-1 rounded-full border border-rose-100 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
              style={{ transform: "translateZ(45px)" }}
            >
              🚀 Freelancer
            </span>
          </div>

          {/* CTA buttons — 3D lift on hover */}
          <div className="flex flex-col min-[420px]:flex-row flex-wrap gap-2.5 sm:gap-3 justify-center md:justify-start">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 text-white text-xs sm:text-base font-medium rounded-full shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:shadow-2xl active:scale-95 transition-all duration-300 w-full min-[420px]:w-auto"
              style={{ transform: "translateZ(50px)" }}
            >
              View My Projects
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-slate-300 text-slate-700 text-xs sm:text-base font-medium rounded-full hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50 hover:shadow-xl active:scale-95 transition-all duration-300 w-full min-[420px]:w-auto"
              style={{ transform: "translateZ(45px)" }}
            >
              <Mail size={14} />
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 text-slate-600 text-sm font-medium rounded-full hover:text-primary-600 hover:bg-slate-100 transition-all duration-300"
            >
              <Download size={14} />
              Resume
            </a>
          </div>
        </div>

        {/* Profile image — 3D pop-out + floating */}
        <div
          className="order-1 md:order-2 flex justify-center animate-fade-in"
          style={{
            transform: `translateZ(80px) translateX(${tilt.x * 20}px) translateY(${tilt.y * 20}px)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <div className="relative group animate-[float_6s_ease-in-out_infinite]">
            {/* Glow */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-accent rounded-full blur-3xl opacity-30 group-hover:opacity-60 group-hover:scale-125 transition-all duration-500"
              style={{ transform: `translateZ(-40px)` }}
            />
            {/* Rotating ring behind the photo */}
            <div
              className="absolute -inset-4 rounded-full border-2 border-dashed border-primary-300/50 animate-[spin_20s_linear_infinite]"
              style={{ transform: "translateZ(-20px)" }}
            />
            <div className="relative w-32 h-32 min-[420px]:w-40 min-[420px]:h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-[3px] sm:border-4 border-white shadow-2xl hover:scale-105 transition-all duration-500">
              <Image
                src={personalInfo.profileImage}
                alt={`${personalInfo.name}'s profile`}
                fill
                sizes="(max-width: 420px) 128px, (max-width: 640px) 160px, (max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-slate-400 hover:text-primary-600 transition-colors"
      >
        <span className="text-[10px] tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-5 h-9 border-2 border-current rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-current rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
}