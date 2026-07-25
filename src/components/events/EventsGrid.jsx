import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventCard from "./EventCard";

gsap.registerPlugin(ScrollTrigger);

const EventsGrid = ({ events, selectedEventId, onSelectEvent, gridRef }) => {
  useEffect(() => {
    // GSAP ScrollTrigger animation for cards entrance
    const cards = document.querySelectorAll(".events-page .event-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 70, rotateX: 18, scale: 0.95, transformPerspective: 900 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          ease: "power4.out",
          delay: i * 0.08,
          transformPerspective: 900,
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Fade up animations for headings
    const fadeUps = document.querySelectorAll(".events-page #events-section .fade-up");
    fadeUps.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  }, [events]);

  return (
    <section id="events-section" ref={gridRef}>
      <div className="sec-head fade-up">
        <div className="sec-label">
          <div className="sec-line"></div>
          <span className="sec-tag">CodeMate</span>
        </div>
        <h2 className="sec-title">Events &amp; Experiences</h2>
        <p className="sec-sub">
          From hackathons to summits — every event is a chapter in our
          collective story.
        </p>
      </div>
      <div className="events-grid" id="events-grid">
        {events.map((ev) => (
          <EventCard
            key={ev.id}
            event={ev}
            isSelected={selectedEventId === ev.id}
            isDimmed={selectedEventId !== null && selectedEventId !== ev.id}
            onClick={onSelectEvent}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsGrid;
