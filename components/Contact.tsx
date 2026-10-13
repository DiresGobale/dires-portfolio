"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

/* ---------- Custom brand icons (lucide doesn't ship these) ---------- */

type BrandIconProps = { size?: number; className?: string };

function TelegramIcon({ size = 18, className }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function TikTokIcon({ size = 18, className }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.3z" />
    </svg>
  );
}

/* ------------------------------------------------------------------- */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: undefined,
    },
  ];

  const socials = [
    { icon: Github, href: personalInfo.socials.github, label: "GitHub" },
    // { icon: Linkedin, href: personalInfo.socials.linkedin, label: "LinkedIn" },
    // { icon: Twitter, href: personalInfo.socials.twitter, label: "Twitter" },
    { icon: TelegramIcon, href: personalInfo.socials.telegram, label: "Telegram" },
    { icon: TikTokIcon, href: personalInfo.socials.tiktok, label: "TikTok" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section-padding bg-slate-50 overflow-hidden">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-primary-600 font-medium tracking-wide uppercase text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2">
            Let's talk
          </p>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-6">
            Get In Touch
          </h2>
          <div className="w-14 sm:w-20 h-1 bg-gradient-to-r from-primary-600 to-accent mx-auto rounded-full mb-3 sm:mb-6" />
          <p className="text-slate-600 text-xs sm:text-base md:text-lg">
            I'm open to internship opportunities, freelance projects, and
            collaborations. Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-14">
          {contactItems.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto rounded-lg sm:rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-2 sm:mb-3 md:group-hover:bg-primary-600 md:group-hover:text-white transition-all duration-300 shrink-0">
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={20} className="hidden sm:block" />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 mb-0.5 sm:mb-1">
                  {label}
                </p>
                <p className="font-medium text-slate-900 text-xs sm:text-sm md:text-base break-anywhere">
                  {value}
                </p>
              </>
            );
            const baseClass =
              "group bg-white p-3 sm:p-5 md:p-6 rounded-lg sm:rounded-2xl border border-slate-200 text-center transition-all duration-300 md:hover:shadow-2xl md:hover:-translate-y-2 md:hover:border-primary-300";
            return href ? (
              <a key={label} href={href} className={baseClass}>
                {content}
              </a>
            ) : (
              <div key={label} className={baseClass}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-3xl border border-slate-200 shadow-sm md:hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-slate-900 mb-1.5 text-center">
              Send Me a Message
            </h3>
            <p className="text-slate-500 text-center mb-4 sm:mb-8 text-[11px] sm:text-sm">
              I'll get back to you within 24 hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3.5 sm:mb-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            <div className="mb-3.5 sm:mb-5">
              <label
                htmlFor="subject"
                className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="w-full px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all duration-300"
              />
            </div>

            <div className="mb-3.5 sm:mb-5">
              <label
                htmlFor="message"
                className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="w-full px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group w-full inline-flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3 bg-primary-600 text-white text-xs sm:text-base font-medium rounded-lg sm:rounded-xl shadow-lg shadow-primary-600/20 hover:bg-primary-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
            >
              {status === "sending" ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>

            {status === "success" && (
              <div className="mt-3.5 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-2.5 rounded-lg text-[11px] sm:text-sm animate-fade-in">
                <CheckCircle size={14} />
                Message sent successfully! I'll reply soon.
              </div>
            )}
            {status === "error" && (
              <div className="mt-3.5 flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-3 py-2.5 rounded-lg text-[11px] sm:text-sm animate-fade-in">
                <AlertCircle size={14} />
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>

        {/* Socials — now includes Telegram + TikTok */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 md:hover:bg-primary-600 md:hover:text-white md:hover:border-primary-600 md:hover:scale-110 md:hover:-translate-y-1 transition-all duration-300"
            >
              <Icon size={16} className="sm:hidden" />
              <Icon size={18} className="hidden sm:block" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}