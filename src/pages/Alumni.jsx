/*
 * Alumni.jsx
 * The main Alumni page replicating the CodeMate design.
 * Features: Hero section with group photo, Get to Know section (stats + interactive vertical tabs),
 * Meet the Club Alumni section (member profile cards with navigation link triggers), and an
 * interactive Ask & Get Answers chatbot mockup with real stateful answers.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  placementList,
  higherStudiesIndiaList,
} from "../components/data/alumniData";
import {
  Briefcase,
  GraduationCap,
  Terminal,
  Globe,
  Award,
  ChevronRight,
  ArrowRight,
  Send,
  Paperclip,
  Sparkles,
} from "lucide-react";

import Button from "../components/Button";

// Fixed alumni to feature in the "Meet the Club Alumni" section
const featuredNames = ["Abhi Nitnaware", "Harsh Pandey", "Abhishek Kumar Rai"];
const alumniData = [...placementList, ...higherStudiesIndiaList]
  .filter((al) => featuredNames.includes(al.name))
  .map((al) => ({
    ...al,
    role: al.currentRole || al.program,
  }));

const Alumni = () => {
  const navigate = useNavigate();
  // Tab State for "Get to Know" section
  const [activeTab, setActiveTab] = useState("tech");

  const tabContents = {
    tech: {
      title: "Tech leaders in the making",
      description:
        "World-class developers, product managers, and tech leaders building systems that scale, from early-stage startups to Fortune 500 companies.",
      icon: <Terminal className="h-6 w-6 text-white" />,
    },
    studies: {
      title: "Pioneering academic careers",
      description:
        "Alumni pursuing Masters and PhDs at top-ranked universities worldwide.",
      icon: <GraduationCap className="h-6 w-6 text-white" />,
    },

    entrepreneurs: {
      title: "Disruptive founders",
      description:
        "Entrepreneurs who built scalable products, launched tech startups, and secured venture funding to address modern real-world challenges.",
      icon: <Briefcase className="h-6 w-6 text-white" />,
    },
    global: {
      title: "Global presence & network",
      description:
        "Our alumni chapters span across the globe, fostering a strong network of professionals, innovators, and mentors who continue to support and inspire the CodeMate community.",
      icon: <Globe className="h-6 w-6 text-white" />,
    },
  };

  // Chat State for "Ask & Get Answers" section
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi student! I'm CodeMate's AI Alumni coordinator. How can I help you connect with our alumni? What do you want to know?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputVal,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal("");
    setIsTyping(true);

    // Simulated responses from alumni / AI coordinator
    setTimeout(() => {
      let replyText =
        "That's a great question! I'd recommend reaching out to Rahul Mishra (Software Engineer at Google) or Ananya Sen (Product Manager at Meta). They are active mentors in our Slack workspace.";

      const lowerInput = userMessage.text.toLowerCase();
      if (
        lowerInput.includes("google") ||
        lowerInput.includes("software") ||
        lowerInput.includes("tech")
      ) {
        replyText =
          "Rahul Mishra (SWE @ Google) mentions: 'Focus heavily on data structures, algorithms, and system design. Make sure to participate in open source projects to make your resume stand out.'";
      } else if (
        lowerInput.includes("abroad") ||
        lowerInput.includes("studies") ||
        lowerInput.includes("mit") ||
        lowerInput.includes("ms")
      ) {
        replyText =
          "Vikram Singh (Research @ MIT) shares: 'Start working on research publications early. Strong recommendation letters from professors who know your work personally are crucial for top universities.'";
      } else if (
        lowerInput.includes("startup") ||
        lowerInput.includes("founder") ||
        lowerInput.includes("business")
      ) {
        replyText =
          "Priya Sharma (Co-founder @ Decent) advises: 'Don't wait for the perfect idea. Build a simple MVP, launch it to actual users, collect feedback, and iterate. Community support is everything.'";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "ai",
          text: replyText,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-brand-dark text-zinc-800 font-sans selection:bg-brand-primary selection:text-black">
      {/* Background Radial Glows */}
      <div className="orange-glow-top" aria-hidden="true" />
      <div className="orange-glow-bottom" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 md:pt-28 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6  text-left">
            <h1 className="font-heading text-6xl font-extrabold tracking-tight text-brand-primary sm:text-4xl lg:text-6xl leading-none">
              Pathways connect
            </h1>
            <p className="font-sans text-base sm:text-lg text-zinc-650 leading-relaxed max-w-xl">
              The CodeMate Alumni Network is a community of graduates who
              continue to inspire, mentor, and support the next generation of
              innovators. From sharing industry insights to fostering meaningful
              connections, our alumni remain an integral part of CodeMate's
              journey—strengthening a culture of learning, collaboration, and
              lifelong growth.
            </p>
          </div>

          {/* Right Image Mockup */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative p-2.5 bg-white rounded-2xl border border-zinc-200/60 shadow-2xl shadow-brand-primary/5 max-w-[500px] w-full transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/Codemate-group-picture.jpg"
                alt="SCET Alumni Network Group"
                loading="lazy"
                className="rounded-xl w-full h-auto object-cover aspect-[3/2] filter grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. GET TO KNOW (STATS & TABS) SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-50 p-8 sm:p-12 md:p-16 text-zinc-900 shadow-xl border border-zinc-200/50">
          {/* Top Row: Stats Header & Stat Box Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-12 border-b border-zinc-200">
            {/* Intro text */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-block font-sans text-xs font-bold tracking-[0.2em] text-brand-primary uppercase">
                Our Stats
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
                get to know
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-650 leading-relaxed max-w-md">
                Our alumni community is growing rapidly across the globe. Our
                graduates are building the future at top-tier tech firms,
                startups, and research institutes.
              </p>
            </div>

            {/* Stat Boxes */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {[
                { value: "30+", label: "alumni" },
                { value: "15+", label: "tech leaders" },
                { value: "20+", label: "pursuing higher studies" },

                { value: "15+", label: "exploring global opportunities" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-center items-center p-4 rounded-xl bg-white border border-brand-primary/20 shadow-sm text-center"
                >
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-primary">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[11px] font-medium text-zinc-500 uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Tab System */}
          <div className="pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Vertical tab list */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                {[
                  { id: "tech", label: "Tech" },
                  { id: "studies", label: "Higher Studies" },
                  { id: "entrepreneurs", label: "Entrepreneurs" },
                  { id: "global", label: "Global" },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left font-sans text-sm sm:text-base font-semibold py-3.5 px-5 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                        isActive
                          ? "bg-white text-brand-primary shadow-md border-l-4 border-brand-primary"
                          : "text-zinc-650 hover:bg-zinc-100/80 hover:text-zinc-950"
                      }`}
                    >
                      {tab.label}
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isActive
                            ? "translate-x-1 text-brand-primary"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-zinc-400"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Dynamic Orange Tab Content Card */}
              <div className="lg:col-span-8 rounded-2xl bg-brand-orange-bg p-8 sm:p-10 text-black shadow-lg flex flex-col justify-between items-start min-h-[260px] relative overflow-hidden">
                {/* Decorative background shape */}
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full translate-x-10 translate-y-10 pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Icon Box */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black shadow-md">
                    {tabContents[activeTab].icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-heading text-3xl font-extrabold tracking-tight">
                      {tabContents[activeTab].title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-zinc-950/80 leading-relaxed max-w-xl">
                      {tabContents[activeTab].description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 relative z-10">
                  <button
                    onClick={() => navigate("/alumniViewAll")}
                    className="bg-black text-white hover:bg-zinc-900 transition-colors duration-200 text-xs font-bold px-6 py-2.5 rounded-full shadow-md cursor-pointer"
                  >
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MEET THE CLUB ALUMNI SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-zinc-200/80 p-8 sm:p-12 md:p-16 shadow-2xl">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-zinc-200/60 mb-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-brand-primary/10 border border-brand-primary/30 rounded flex items-center justify-center">
                  <div className="h-2 w-2 rounded-sm bg-brand-primary" />
                </div>
                <span className="font-heading text-sm font-bold tracking-wider text-zinc-700 uppercase">
                  Meet the Club Alumni
                </span>
              </div>
              <p className="font-sans text-sm text-zinc-500 leading-relaxed">
                The alumni who built CodeMate. They work at different companies,
                different roles. Check out their profiles to understand how they
                can help you grow in your career, community, and opportunity.
              </p>
            </div>
            <div>
              <Button
                variant="light"
                size="sm"
                onClick={() => navigate("/AlumniViewAll")}
                icon={<ArrowRight className="h-4 w-4" />}
              >
                View All
              </Button>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {alumniData.map((alumnus, idx) => (
              <div
                key={idx}
                onClick={() => window.open(alumnus.linkedin, '_blank')}
                className="group flex flex-col gap-4 cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200/60 shadow-sm aspect-square">
                  <img
                    src={alumnus.image}
                    alt={`${alumnus.name} portrait`}
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-zinc-900 leading-tight">
                    {alumnus.name}
                  </h4>
                  <p className="font-sans text-xs text-brand-primary mt-1">
                    {alumnus.role} at {alumnus.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ASK & GET ANSWERS SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-zinc-200/80 p-8 sm:p-12 md:p-16 shadow-2xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 uppercase">
              Ask & Get Answers
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-500 leading-relaxed">
              Ask a question and get answers from our alumni network. You can
              also explore answers to questions asked by other students.
            </p>
          </div>

          {/* Interactive Chat Mockup Container */}
          <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden shadow-2xl flex flex-col h-[480px]">
            {/* macOS Styling Header Bar */}
            <div className="bg-zinc-100 border-b border-zinc-200 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-xs font-semibold text-zinc-650 font-sans tracking-wide">
                CodeMate Alumni Assistant
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm">
              {messages.map((msg) => {
                const isAi = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${isAi ? "self-start" : "self-end ml-auto flex-row-reverse"}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isAi
                          ? "bg-brand-primary text-black"
                          : "bg-zinc-200 text-zinc-700"
                      }`}
                    >
                      {isAi ? "CM" : "ME"}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-4 rounded-2xl leading-relaxed ${
                        isAi
                          ? "bg-white border border-zinc-200 text-zinc-700 rounded-tl-sm"
                          : "bg-brand-primary text-black font-medium rounded-tr-sm shadow-md shadow-brand-primary/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] self-start">
                  <div className="h-8 w-8 rounded-full bg-brand-primary text-black flex items-center justify-center shrink-0 text-xs font-bold">
                    CM
                  </div>
                  <div className="bg-white border border-zinc-200 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <div
                      className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Footer Form */}
            <form
              onSubmit={handleSendMessage}
              className="bg-zinc-100 border-t border-zinc-200 px-4 py-3 flex items-center gap-3"
            >
              <button
                type="button"
                className="text-zinc-500 hover:text-zinc-800 transition-colors p-1"
                aria-label="Attach file"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask a question (e.g. 'How to get into Google?', 'Higher studies abroad')"
                className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-800 placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:border-brand-primary/60 font-sans"
              />

              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="bg-brand-primary disabled:opacity-40 text-black hover:bg-brand-primary-dark transition-all duration-200 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Ask Alumni</span>
                <Send className="h-3 w-3" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Alumni;
