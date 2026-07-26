import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { EVENTS } from "../data/eventsData";
import EventsHero from "../components/events/EventsHero";
import EventsGrid from "../components/events/EventsGrid";
import EventDetail from "../components/events/EventDetail";
import EventNavDots from "../components/events/EventNavDots";
import "../styles/events-page.css";

gsap.registerPlugin(ScrollToPlugin);

const EventsPage = () => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const gridRef = useRef(null);
  const detailRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const passedEventId =
      location.state?.eventId ||
      new URLSearchParams(location.search).get("eventId");

    if (passedEventId) {
      const id = Number(passedEventId);
      setSelectedEventId(id);

      setTimeout(() => {
        if (detailRef.current) {
          gsap.to(window, {
            scrollTo: { y: detailRef.current, offsetY: 0 },
            duration: 0.9,
            ease: "power3.inOut",
          });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleSelectEvent = (id) => {
    setSelectedEventId(id);
    if (detailRef.current) {
      gsap.to(window, {
        scrollTo: { y: detailRef.current, offsetY: 0 },
        duration: 0.9,
        ease: "power3.inOut",
      });
    }
  };

  const handleExploreClick = () => {
    if (gridRef.current) {
      gsap.to(window, {
        scrollTo: { y: gridRef.current, offsetY: -20 },
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  };

  const selectedEvent = EVENTS.find((e) => e.id === selectedEventId) || null;

  return (
    <div className="events-page">
      <EventNavDots
        events={EVENTS}
        selectedEventId={selectedEventId}
        onSelectEvent={handleSelectEvent}
      />
      <EventsHero onExploreClick={handleExploreClick} />
      <EventsGrid
        events={EVENTS}
        selectedEventId={selectedEventId}
        onSelectEvent={handleSelectEvent}
        gridRef={gridRef}
      />
      <EventDetail
        event={selectedEvent}
        allEvents={EVENTS}
        onSelectEvent={handleSelectEvent}
        detailRef={detailRef}
      />
    </div>
  );
};

export default EventsPage;
