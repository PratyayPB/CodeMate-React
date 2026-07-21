/*
 * Resources.jsx
 * The main Resources page replicating the CodeMate design.
 * Features: Hero section, Three Ways to Go, Curated Content (with custom book mockup
 * and custom tech graphics), CTA section, responsive design, and interactive states.
 */
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";
import Button from "../components/Button";

const Resources = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-brand-dark text-zinc-800 font-sans selection:bg-brand-primary selection:text-black">
      {/* Background Glows */}
      <div className="orange-glow-top" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mb-20 mx-auto max-w-[80vw] px-4 pt-20 pb-16 sm:px-6 md:pt-32 md:pb-24 lg:px-8 text-center h-[75vh] flex flex-col justify-center">
        {/* Uppercase Tag */}
        <span className="inline-block text-xl font-semibold tracking-[0.25em] text-brand-primary font-display uppercase mb-4">
          Master Your Career
        </span>

        {/* Main Title */}
        <h1 className="font-heading text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl mx-auto leading-none mb-6">
          prepare for what <br className="hidden sm:inline" />
          <span className="text-brand-primary">comes next</span>
        </h1>

        {/* Subtitle Description */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed mb-10 px-2">
          Bridging the gap between education and high-impact work through
          curated roadmaps, mentorship, and industry-standard resources.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Explore
          </Button>
          <Button variant="secondary" size="lg">
            Join Us
          </Button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THREE WAYS TO GO SECTION */}
      {/* ========================================================================= */}

      {/* ========================================================================= */}
      {/* 3. WHAT OTHERS HAVE LEARNED SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto my-50 max-w-[80vw]  py-12 sm:px-6">
        <div className="rounded-3xl bg-zinc-50 p-8 sm:p-12 md:p-16 text-zinc-900 shadow-xl border border-zinc-200/50">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block font-sans text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-2">
              Curated Content
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
              what others have learned
            </h2>
          </div>

          {/* Articles Stack */}
          <div className="space-y-6">
            {/* Article 1: Resume Building Handbook */}
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-white border border-zinc-200/50 p-6 md:p-8 gap-8 items-center shadow-sm hover:shadow-md transition-shadow">
              {/* Left Column: Premium CSS Book Cover Mockup */}
              <div className="lg:col-span-4 flex justify-center py-4">
                <div className="relative w-44 h-60 bg-zinc-900 rounded-r-xl shadow-2xl flex flex-col justify-between p-5 border-l-8 border-zinc-950 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  {/* Subtle leather texture effect and spine glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/10 via-transparent to-white/5 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />

                  {/* Top Badge on book */}
                  <div className="text-[9px] font-sans tracking-[0.25em] text-amber-500/80 uppercase font-semibold">
                    CodeMate Press
                  </div>

                  {/* Book Title */}
                  <div className="my-auto space-y-2">
                    <div className="h-[2px] w-8 bg-amber-500/60" />
                    <h4 className="font-heading text-2xl font-bold tracking-tight text-white leading-none">
                      RESUME
                    </h4>
                    <h5 className="font-heading text-lg font-light tracking-[0.15em] text-amber-500 leading-none uppercase">
                      Handbook
                    </h5>
                    <div className="h-[2px] w-14 bg-amber-500/60" />
                  </div>

                  {/* Bottom details on book */}
                  <div className="text-[8px] font-sans tracking-wide text-zinc-500">
                    A STRATEGIC GUIDE
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Tags */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-semibold px-3 py-1 rounded-full uppercase">
                      Handbook
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      5 min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-3xl font-bold text-zinc-950 mb-3 tracking-tight">
                    Resume Building Handbook
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base text-zinc-650 leading-relaxed max-w-2xl">
                    A comprehensive guide to building resumes that beat the ATS
                    and catch the eye of the top hiring managers. Including
                    templates and keywords.
                  </p>
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-zinc-150 flex items-center justify-center font-heading text-sm font-bold text-zinc-800 border border-zinc-200 shadow-sm">
                      GR
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-800">
                        Gautam Rajbanshi
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        Alumni Coordinator
                      </p>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                  >
                    Read Now
                    <ChevronRight className="h-4 w-4 mt-[1px]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Article 2: System Design Fundamentals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-white border border-zinc-200/50 p-6 md:p-8 gap-8 items-center shadow-sm hover:shadow-md transition-shadow">
              {/* Left Column: Details */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6 order-2 lg:order-1">
                <div>
                  {/* Tags */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-semibold px-3 py-1 rounded-full uppercase">
                      System Design
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      12 min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-3xl font-bold text-zinc-950 mb-3 tracking-tight">
                    System Design Fundamentals
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base text-zinc-650 leading-relaxed max-w-2xl">
                    Deep dive into scalable architectures, load balancing,
                    databases, caching, and fundamental system design
                    principles.
                  </p>
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-zinc-150 flex items-center justify-center font-heading text-sm font-bold text-zinc-800 border border-zinc-200 shadow-sm">
                      GR
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-800">
                        Gautam Rajbanshi
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        Alumni Coordinator
                      </p>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                  >
                    Read Now
                    <ChevronRight className="h-4 w-4 mt-[1px]" />
                  </a>
                </div>
              </div>

              {/* Right Column: Tech Graphic Mockup */}
              <div className="lg:col-span-4 flex justify-center py-4 order-1 lg:order-2">
                <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl bg-[#09090b] border border-zinc-800/80 shadow-2xl flex items-center justify-center overflow-hidden">
                  {/* Cyber grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:14px_24px] opacity-40" />

                  {/* Radial neon glow */}
                  <div className="absolute w-28 h-28 rounded-full bg-cyan-500/10 blur-xl" />

                  {/* Network / Tech visual details */}
                  <svg
                    className="w-40 h-40 text-cyan-400/80"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="12"
                      className="stroke-2 fill-[#09090b] stroke-cyan-400"
                    />
                    <circle cx="50" cy="50" r="1" className="fill-cyan-400" />

                    {/* Node 1 */}
                    <circle
                      cx="20"
                      cy="30"
                      r="6"
                      className="stroke-1.5 fill-[#09090b] stroke-zinc-700"
                    />
                    <line
                      x1="26"
                      y1="33"
                      x2="39"
                      y2="44"
                      className="stroke-1 stroke-zinc-800"
                      strokeDasharray="3 3"
                    />

                    {/* Node 2 */}
                    <circle
                      cx="25"
                      cy="70"
                      r="6"
                      className="stroke-1.5 fill-[#09090b] stroke-zinc-700"
                    />
                    <line
                      x1="31"
                      y1="67"
                      x2="39"
                      y2="56"
                      className="stroke-1 stroke-zinc-800"
                    />

                    {/* Node 3 */}
                    <circle
                      cx="80"
                      cy="40"
                      r="7"
                      className="stroke-2 fill-[#09090b] stroke-cyan-500"
                    />
                    <line
                      x1="73"
                      y1="43"
                      x2="61"
                      y2="47"
                      className="stroke-1.5 stroke-cyan-500/50"
                    />

                    {/* Node 4 */}
                    <circle
                      cx="75"
                      cy="75"
                      r="5"
                      className="stroke-1.5 fill-[#09090b] stroke-zinc-700"
                    />
                    <line
                      x1="69"
                      y1="71"
                      x2="59"
                      y2="59"
                      className="stroke-1 stroke-zinc-800"
                    />

                    {/* Floating data dots */}
                    <circle
                      cx="45"
                      cy="40"
                      r="1.5"
                      className="fill-cyan-400 animate-pulse"
                    />
                    <circle cx="68" cy="45" r="1.5" className="fill-cyan-400" />
                    <circle cx="34" cy="62" r="1" className="fill-zinc-600" />
                  </svg>

                  {/* Cyber HUD elements */}
                  <div className="absolute bottom-3 right-3 text-[7px] font-mono text-cyan-500/60 uppercase tracking-widest">
                    sys_init // ok
                  </div>
                  <div className="absolute top-3 left-3 text-[7px] font-mono text-zinc-600 uppercase tracking-wider">
                    ping: 14ms
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Explore Button */}
          <div className="mt-8 flex justify-end">
            <Button
              variant="primary"
              size="md"
              icon={<LayoutGrid className="h-4 w-4" />}
            >
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
    </main>
  );
};

export default Resources;
