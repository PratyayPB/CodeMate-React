import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import gsap from "gsap";

const eventsData = [
  {
    tag: "Webinar",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
    date: "Sun 12 Apr 2026",
    location: "Online",
    title: "Resume Building Webinar",
    desc: "Learn from our Alumni. Get insider tips and craft a resume that stands out to top-tier tech companies.",
  },
  {
    tag: "Coding Competition",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
    date: "Sun 10 Nov 2025",
    location: "Offline",
    title: "Codefest 3.0",
    desc: "Coding Competition at NEHU. Test your algorithmic skills, solve complex problems, and win amazing prizes.",
  },
  {
    tag: "Orientation",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
    date: "Sun 10 Sep 2025",
    location: "Offline",
    title: "Orientation 2025",
    desc: "Introduction to CodeMate for new students. Kickstart your journey, discover our community, and find your peers.",
  },
  {
    tag: "Sports/E-Sports",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
    date: "Sun 16 May 2025",
    location: "Offline",
    title: "Hostel Havoc",
    desc: "Sports & E-Sports Competition. Take a break from coding, engage in friendly rivalry, and dominate the leaderboards.",
  },
];

const Events = () => {
  useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Initial setup for cards
    cardsRef.current.forEach((card, index) => {
      if (index === activeIndex) {
        gsap.set(card, { opacity: 1, x: 0, scale: 1, zIndex: 10 });
      } else {
        gsap.set(card, { opacity: 0, x: 100, scale: 0.9, zIndex: 0 });
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleIndexChange((activeIndex + 1) % eventsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleIndexChange = (newIndex) => {
    if (newIndex === activeIndex) return;

    const oldCard = cardsRef.current[activeIndex];
    const newCard = cardsRef.current[newIndex];

    gsap.to(oldCard, {
      opacity: 0,
      x: 100,
      scale: 0.9,
      duration: 0.5,
      ease: "power2.inOut",
      zIndex: 0,
    });
    gsap.fromTo(
      newCard,
      { opacity: 0, x: 100, scale: 0.9, zIndex: 10 },
      { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power2.inOut" },
    );

    oldCard.style.pointerEvents = "none";
    newCard.style.pointerEvents = "auto";

    setActiveIndex(newIndex);
  };

  return (
    <section id="events" className="events section py-24">
      <div className="container">
        <div className="events-animated-grid">
          {/* Left side: Heading and navigation */}
          <div className="events-animated-left">
            <div className="events-heading-space">
              <h2 className="section-title">
                our <span className="accent">upcoming</span> events
              </h2>
              <p className="section-subtitle-events">
                don't miss out — build, connect & grow
              </p>

              <div className="events-nav-dots">
                {eventsData.map((_, idx) => (
                  <button
                    key={idx}
                    className={`event-dot ${activeIndex === idx ? "active" : ""}`}
                    aria-label={`View event ${idx + 1}`}
                    onClick={() => handleIndexChange(idx)}
                  ></button>
                ))}
              </div>

              <div style={{ marginTop: "3rem" }}>
                <Link
                  to="/eventSection"
                  className="btn btn-secondary text-white"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          {/* Right side: Event cards */}
          <div
            className="events-animated-right relative"
            style={{ minHeight: "600px" }}
          >
            {eventsData.map((event, idx) => (
              <div
                key={idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`event-animated-card absolute top-0 left-0 w-full ${activeIndex === idx ? "active" : ""}`}
                style={{ pointerEvents: activeIndex === idx ? "auto" : "none" }}
              >
                <div className="event-card">
                  <div className="event-image">
                    <img src={event.img} alt={event.tag} />
                    <span className="event-tag">{event.tag}</span>
                  </div>
                  <div className="event-details gap-3">
                    <div className="event-meta">
                      <span className="flex items-center gap-1 text-xl">
                        <Calendar size={22} /> {event.date}
                      </span>
                      <span className="flex items-center gap-1 text-xl">
                        <MapPin size={22} /> {event.location}
                      </span>
                    </div>
                    <h1 className="text-4xl font-extrabold ">{event.title}</h1>
                    <p className="text-lg">{event.desc}</p>
                    <a href="#" className="event-link">
                      View Event <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Decorative elements */}
            <div className="event-decor-bottom"></div>
            <div className="event-decor-top"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
