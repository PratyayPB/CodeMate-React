import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { resourceList } from "../components/data/resourceData";

const ResourcesViewAll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const uniqueCategories = Array.from(
    new Set(resourceList.map((item) => item.category)),
  );

  const [activeFilter, setActiveFilter] = useState("All Resources");

  useEffect(() => {
    const queryCat =
      new URLSearchParams(location.search).get("category") ||
      location.state?.category;
    if (queryCat) {
      const matched = uniqueCategories.find(
        (cat) => cat.toLowerCase() === queryCat.toLowerCase()
      );
      if (matched) {
        setActiveFilter(matched);
      }
    }
  }, [location]);
  const filters = [
    { label: "All Resources", value: "All Resources" },
    ...uniqueCategories.map((cat) => ({
      label:
        cat === "R&D"
          ? "R&D"
          : cat
              .toLowerCase()
              .split(" ")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
      value: cat,
    })),
  ];

  const displayedResources =
    activeFilter === "All Resources"
      ? resourceList
      : resourceList.filter((item) => item.category === activeFilter);

  const handleMouseMove = (e, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className=" max-w-[80vw] text-on-surface font-sans selection:bg-primary-container/30 min-h-screen">
      {/* Main Content */}
      <main className="pt-24 kinetic-grid">
        {/* Hero Section */}
        <section className="max-w-screen-2xl mx-auto px-8 pt-20 pb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-block py-1 px-3 mb-6 bg-primary-container/10 border border-primary-container/20 rounded-full">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                The Knowledge Base
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-tight mb-8">
              explore. <span className="text-primary-container">learn.</span>{" "}
              <br />
              build.
            </h1>
            <p className="text-xl md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl">
              Curated resources for placements, higher studies, and career
              growth, handpicked for students. Editorial engineering for the
              modern developer.
            </p>
          </div>
          {/* Decorative Accent */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"></div>
        </section>
        {/* Resources Grid */}
        <section className="max-w-screen-2xl mx-auto px-8 pb-32">
          {/* Filter Bar (Auxiliary) */}
          <div className="flex flex-wrap items-center gap-4 mb-12 border-b border-outline-variant/10 pb-8">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 rounded-full font-bold text-sm tracking-tight transition-all cursor-pointer ${
                  activeFilter === filter.value
                    ? "bg-on-surface text-surface"
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-primary-container/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* The Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {displayedResources.map((resource) => (
              <article
                key={resource.id}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                className={`hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow ${!Array.isArray(resource.link) ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (Array.isArray(resource.link)) return;
                  window.open(resource.link, "_blank");
                }}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">
                    {resource.category}
                  </span>
                </div>
                <div className="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={resource.title}
                    src={resource.image}
                  />
                </div>
                <h3 className="text-3xl font-heading font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-on-surface-variant mb-auto text-lg leading-relaxed">
                  {resource.description}
                </p>
                <div className="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">
                      {resource.authorInitials}
                    </div>
                    <span className="text-sm font-bold">
                      {resource.authorName}
                    </span>
                  </div>
                  {Array.isArray(resource.link) ? (
                    <div className="flex flex-wrap items-center gap-6 justify-end">
                      {resource.link.map((l, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(l.url, "_blank");
                          }}
                          className="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:text-primary-container transition-colors cursor-pointer"
                        >
                          {l.label} <Download className="w-5 h-5" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container">
                      {resource.type === "Download" ? (
                        <>
                          Download <Download className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Read Now <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Pagination/Load More */}
          {/* <div className="mt-20 flex justify-center">
            <button className="group flex items-center gap-4 bg-on-surface text-surface py-4 px-10 rounded-full font-bold transition-all hover:pr-14 cursor-pointer">
              Load More Resources
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </button>
          </div> */}
        </section>
      </main>
    </div>
  );
};

export default ResourcesViewAll;
