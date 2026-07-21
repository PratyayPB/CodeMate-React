/*
 * AlumniViewAll.jsx
 * Comprehensive directory of alumni categorized by career pathways.
 * Features: Back navigation button, categorized list grids matching the design,
 * custom card templates (light vs. highlighted orange, text detail layouts), and icon indicators.
 */
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Briefcase,
  Globe,
  Rocket,
  Atom,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  placementList,
  higherStudiesIndiaList,
  abroadList,
  entrepreneurList,
} from "../components/data/alumniData";

const AlumniViewAll = () => {
  const navigate = useNavigate();
  // Categorized Alumni Groups matching the reference image categories
  const categories = [
    {
      id: "leaders",
      tag: "OUR PEOPLE",
      title: "the industry leaders",
      alumni: placementList.map((al) => ({
        ...al,
        role: `${al.currentRole} at ${al.company}`,
      })),
    },
    {
      id: "higher-studies-india",
      tag: "OUR PEOPLE",
      title: "pursuing higher studies in india",
      alumni: higherStudiesIndiaList.map((al) => ({
        ...al,
        role: `${al.program} at ${al.institution}`,
      })),
    },
    {
      id: "abroad",
      tag: "OUR PEOPLE",
      title: "exploring global opportunities",
      alumni: abroadList.map((al) => ({
        ...al,
        role: `${al.program} at ${al.institution}`,
      })),
    },
    {
      id: "entrepreneurs",
      tag: "OUR PEOPLE",
      title: "the entrepreneurs",
      alumni: entrepreneurList.map((al) => ({
        ...al,
        role: `${al.role} at ${al.company}`,
      })),
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-brand-dark text-zinc-800 font-sans selection:bg-brand-primary selection:text-black">
      {/* Background Radial Glow */}
      <div className="orange-glow-top" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors duration-200 text-sm font-semibold mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Alumni Dashboard
        </button>

        <div className="space-y-2">
          <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] text-brand-primary uppercase">
            SCET Directory
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 uppercase leading-none">
            Alumni Networks
          </h1>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DIRECTORY CATEGORIES */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 space-y-16">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-6">
            {/* Category Header */}
            <div className="relative py-8 px-6 overflow-hidden rounded-2xl border border-zinc-200/40 bg-zinc-50/20">
              <div className="relative z-10">
                <span className="inline-block font-sans text-xs font-bold tracking-widest text-brand-primary uppercase">
                  {cat.tag}
                </span>
                <h2 className="font-heading text-4xl font-extrabold text-zinc-900 leading-tight uppercase mt-1">
                  {cat.id === "leaders" ? "Tech Leaders" : cat.title}
                </h2>
                {cat.id === "leaders" && (
                  <p className="font-sans text-sm text-zinc-500 mt-2 font-normal">
                    who laid the vision behind the community
                  </p>
                )}
              </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.alumni.map((alumnus, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] shadow-md border bg-zinc-50 border-zinc-200/80 text-black"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 mb-4 border-zinc-300">
                    <img
                      src={alumnus.image}
                      alt={alumnus.name}
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-bold leading-tight">
                    {alumnus.name}
                  </h3>
                  <p className="text-xs mt-1 font-semibold text-zinc-500">
                    {alumnus.role}
                  </p>

                  {/* Social Actions */}
                  <div className="flex gap-3 mt-3 justify-center items-center">
                    <p className="font-sans text-xs font-semibold tracking-wide text-black/75 ">
                      {alumnus.engineeringDegree}
                    </p>
                    {alumnus.linkedin && (
                      <a
                        href={alumnus.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 rounded-full border transition-colors border-zinc-300 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center"
                        aria-label="LinkedIn"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default AlumniViewAll;
