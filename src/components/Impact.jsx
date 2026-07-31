import React from "react";
import { Users, Calendar, Globe, Award } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const Impact = () => {
  useScrollReveal();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty("--mouse-x", "-999px");
    e.currentTarget.style.setProperty("--mouse-y", "-999px");
  };

  return (
    <section id="impact" className="impact section">
      <div className="container flex flex-col items-center">
        <div className="section-header text-center">
          <span className="section-tagline self-center !ml-0">
            we don't just promise
          </span>
          <h2 className="section-title">
            let our <span className="accent">impact</span> speak for us
          </h2>
          <p className="section-subtitle-impact">
            with 250+ members and steady growth, we're constantly pushing
            ourselves to become a stronger, better community.
          </p>
        </div>

        <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {/* Item 1: Community */}
          <div
            className="bento-item"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bento-icon">
              <Users size={24} />
            </div>
            <div className="bento-content">
              <span className="bento-number">250+</span>
              <h3 className="bento-title">Members Community</h3>
              <p className="bento-desc">
                A vibrant ecosystem of developers, designers, and tech
                enthusiasts building the future together.
              </p>
            </div>
          </div>

          {/* Item 2: Events */}
          <div
            className="bento-item"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bento-icon">
              <Calendar size={24} />
            </div>
            <div className="bento-content">
              <span className="bento-number">30+</span>
              <h3 className="bento-title">Events</h3>
              <p className="bento-desc">Workshops, hackathons, and webinars.</p>
            </div>
          </div>

          {/* Item 3: Reach */}
          <div
            className="bento-item"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bento-icon">
              <Globe size={24} />
            </div>
            <div className="bento-content">
              <span className="bento-number">5+</span>
              <h3 className="bento-title">Institutions</h3>
              <p className="bento-desc">Connecting students across campuses.</p>
            </div>
          </div>

          {/* Item 4: Mentors */}
          <div
            className="bento-item"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bento-icon">
              <Award size={24} />
            </div>
            <div className="bento-content">
              <span className="bento-number">10+</span>
              <h3 className="bento-title">Expert Mentors & Coordinators</h3>
              <p className="bento-desc">
                Industry professionals guiding the next generation of tech
                talent through hands-on coordination and mentorship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
