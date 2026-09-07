import React, { useEffect, useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const Hero = () => {
  useScrollReveal();
  const heroRef = useRef(null);
  const revealImgRef = useRef(null);
  const scrollBoxRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Cursor reveal effect
    const heroSection = heroRef.current;
    const revealImg = revealImgRef.current;

    const handleMouseMove = (e) => {
      if (!heroSection || !revealImg) return;
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      revealImg.style.setProperty("--mx", `${x}px`);
      revealImg.style.setProperty("--my", `${y}px`);
    };

    const handleMouseLeave = () => {
      if (!revealImg) return;
      revealImg.style.setProperty("--mx", "-9999px");
      revealImg.style.setProperty("--my", "-9999px");
    };

    if (heroSection) {
      heroSection.addEventListener("mousemove", handleMouseMove);
      heroSection.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener("mousemove", handleMouseMove);
        heroSection.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    // 3D Scroll Box
    const scrollBox = scrollBoxRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!scrollBox || !scrollContainer) return;

    const updateScrollAnimation = () => {
      if (window.innerWidth <= 768) {
        scrollBox.style.transform = "none";
        scrollBox.classList.add("animate-in");
        return;
      }
      const rect = scrollContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight;
      const end = windowHeight * 0.25;
      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      const rotateX = 20 * (1 - progress);
      const scale = 1.05 - 0.05 * progress;
      const translateY = -100 * progress;
      scrollBox.style.transform = `rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`;
      if (progress > 0.01) scrollBox.classList.add("animate-in");
      else scrollBox.classList.remove("animate-in");
    };

    window.addEventListener("scroll", updateScrollAnimation, { passive: true });
    updateScrollAnimation();

    return () => window.removeEventListener("scroll", updateScrollAnimation);
  }, []);

  return (
    <section id="home" className="hero twogood-v2" ref={heroRef}>
      <img
        ref={revealImgRef}
        className="hero-reveal-img"
        src="/images/heroes/nehu-school-of-technology.png"
        alt="NEHU School of Technology"
      />

      <div className="hero-text-container flex flex-col justify-center items-center sm:block">
        <h1 className="massive-title reveal">
          <span className="word-small block">BUILD.</span>
          <span className="word-large accent block">CONNECT.</span>
          <span className="word-small block">GROW.</span>
        </h1>
      </div>

      <div id="about" className="scroll-box-container" ref={scrollContainerRef}>
        <div className="mission-scroll-box" ref={scrollBoxRef}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="mission-video-bg"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          ></video>

          <div className="mission-gradient-top"></div>
          <div className="mission-gradient-bottom"></div>

          <div className="mission-prisma-content">
            <span className="mission-label">CodeMate</span>

            <div className="mission-bottom-row">
              <div className="mission-bottom-left">
                <h2 className="mission-hero-title">
                  where students become ready for what comes next
                </h2>
              </div>
              <div className="mission-bottom-right">
                <p className="mission-hero-desc">
                  CodeMate exists because the gap between classroom and career
                  was too wide. We built a place where students find resources,
                  mentors, and peers who understand the journey ahead.
                </p>
                <ul className="mission-hero-list">
                  <li>Placement preparation that actually works</li>
                  <li>Guidance for higher studies anywhere in the world</li>
                  <li>
                    A community that grows together and lifts each other up
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
