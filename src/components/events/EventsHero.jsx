import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const EventsHero = ({ onExploreClick }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const drawGrid = (stroke = "rgba(180,180,180,0.12)", w = 50, h = 50, hi = [[2, 2], [5, 4], [8, 2], [3, 7], [11, 4], [14, 7]]) => {
      const svg = svgRef.current;
      if (!svg) return;
      const W = window.innerWidth;
      const H = svg.parentElement?.offsetHeight || 800;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      let s = `<defs><pattern id="g_hero-grid" width="${w}" height="${h}" patternUnits="userSpaceOnUse">`;
      s += `<path d="M.5 ${h}V.5H${w}" fill="none" stroke="${stroke}" stroke-width="1"/></pattern></defs>`;
      s += `<rect width="100%" height="100%" fill="url(#g_hero-grid)"/>`;
      hi.forEach(([x, y]) => {
        s += `<rect x="${x * w + 1}" y="${y * h + 1}" width="${w - 1}" height="${h - 1}" fill="${stroke}" stroke="none"/>`;
      });
      svg.innerHTML = s;
    };

    drawGrid();

    const handleResize = () => drawGrid();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      if (svgRef.current) {
        svgRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Hero fade-up animations
    gsap.fromTo(
      "#hero .fade-up",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      }
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToFooter = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section id="hero">
      <div className="grid-bg">
        <svg id="hero-grid" ref={svgRef} xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
      <div
        className="orb"
        style={{
          width: "420px",
          height: "420px",
          background: "rgba(255, 107, 0, 0.07)",
          top: "15%",
          left: "8%",
        }}
      ></div>
      <div
        className="orb"
        style={{
          width: "300px",
          height: "300px",
          background: "rgba(255, 107, 0, 0.05)",
          bottom: "15%",
          right: "8%",
        }}
      ></div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        <div className="hero-badge fade-up">
          <div className="badge-dot"></div>
          <span className="badge-text">Build. Connect. Grow.</span>
        </div>
        <h1 className="fade-up">
          CodeMate<br />
          <span>Events</span>
        </h1>
        <p className="fade-up">
          A journey of innovation, collaboration, hackathons, workshops, and
          unforgettable tech experiences.
        </p>
        <div className="hero-btns fade-up">
          <button className="btn-primary" onClick={onExploreClick}>
            Explore Events
          </button>
          <button className="btn-secondary" onClick={scrollToFooter}>
            Join CodeMate
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
