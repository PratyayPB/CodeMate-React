import React from "react";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import ContactForm from "../components/Contact/ContactForm";

const ContactPage = () => {
  return (
    <main className="relative min-h-screen w-full bg-[#FBFBFB] text-zinc-900 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-orange-500 selection:text-white">
      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            Get in touch <br className="hidden sm:block" />
            with us!
          </h1>
          {/* Accent Orange Bar */}
          <div className="w-16 h-1.5 bg-orange-500 rounded-full mx-auto" />
        </div>

        {/* Main Form Container Card */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-zinc-200/60 border border-zinc-200/60 mb-10">
          <ContactForm />
        </div>

        {/* Bottom Metric Cards Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Email Us */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/70 shadow-sm flex flex-col items-center text-center group hover:shadow-md hover:border-orange-500/40 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 font-bold">
              @
            </div>
            <span className="font-sans text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase mb-1">
              EMAIL US
            </span>
            <a
              href="mailto:codemate.nehu@gmail.com"
              className="font-sans text-xs sm:text-sm font-bold text-zinc-900 hover:text-orange-500 transition-colors"
            >
              codemate.nehu@gmail.com
            </a>
          </div>

          {/* Card 2: Visit Us */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/70 shadow-sm flex flex-col items-center text-center group hover:shadow-md hover:border-orange-500/40 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
              <MapPin size={20} />
            </div>
            <span className="font-sans text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase mb-1">
              VISIT US
            </span>
            <span className="font-sans text-xs sm:text-sm font-bold text-zinc-900">
              SoT, NEHU, Shillong
            </span>
          </div>

          {/* Card 3: Community */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/70 shadow-sm flex flex-col items-center text-center group hover:shadow-md hover:border-orange-500/40 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
              <MessageSquare size={20} />
            </div>
            <span className="font-sans text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase mb-1">
              COMMUNITY
            </span>
            <a
              href="https://linktr.ee/codemate_club_nehu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs sm:text-sm font-bold text-zinc-900 hover:text-orange-500 transition-colors"
            >
              Discord & Slack
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
