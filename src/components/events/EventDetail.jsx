import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const EventDetail = ({ event, allEvents, onSelectEvent, detailRef }) => {
  const svgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const drawGrid = (stroke = "rgba(180,180,180,0.12)", w = 60, h = 60) => {
      const svg = svgRef.current;
      if (!svg) return;
      const W = window.innerWidth;
      const H = svg.parentElement?.offsetHeight || 800;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      let s = `<defs><pattern id="g_detail-grid" width="${w}" height="${h}" patternUnits="userSpaceOnUse">`;
      s += `<path d="M.5 ${h}V.5H${w}" fill="none" stroke="${stroke}" stroke-width="1"/></pattern></defs>`;
      s += `<rect width="100%" height="100%" fill="url(#g_detail-grid)"/>`;
      svg.innerHTML = s;
    };

    drawGrid();

    const handleResize = () => drawGrid();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (event && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );

      const img = contentRef.current.querySelector("#detail-img");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.1 },
          { scale: 1, duration: 0.9, ease: "power3.out" },
        );
      }
    }
  }, [event?.id]);

  const currentIndex = event
    ? allEvents.findIndex((e) => e.id === event.id)
    : -1;
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent =
    currentIndex >= 0 && currentIndex < allEvents.length - 1
      ? allEvents[currentIndex + 1]
      : null;

  return (
    <section
      id="detail-section"
      ref={detailRef}
      className="max-w-[80vw] mt-30 mb-20 rounded-2xl"
    >
      <div className="grid-bg">
        <svg
          id="detail-grid"
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
      <div id="detail-inner " className="px-20 py-15">
        <div
          className="sec-head fade-up"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="sec-label">
            <div className="sec-line"></div>
            <span className="sec-tag">CodeMate</span>
          </div>
          <h2 className="sec-title">Event Deep Dive</h2>
          <p className="sec-sub">
            Click any event card above to explore it in detail.
          </p>
        </div>

        {!event ? (
          <div id="detail-placeholder">
            <div className="ph-icon">⚡</div>
            <p>Select an event above to see details</p>
          </div>
        ) : (
          <div
            id="detail-content"
            ref={contentRef}
            style={{ display: "block" }}
          >
            <div className="detail-banner">
              <img src={event.img} alt={event.name} id="detail-img" />
              <div className="detail-banner-overlay"></div>
              <div className="detail-banner-text">
                <span
                  className="d-badge"
                  style={{
                    color: event.color,
                    borderColor: `${event.color}40`,
                    background: `${event.color}20`,
                  }}
                >
                  {event.cat}
                </span>
                <h2>{event.name}</h2>
                <p>{event.date}</p>
              </div>
            </div>

            <div className="detail-grid">
              <div className="detail-col">
                <h3>About the Event</h3>
                <p>{event.desc}</p>

                <h3 className="mt24">Technologies</h3>
                <div className="tech-tags mt8">
                  {event.tech.length ? (
                    event.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="tech-tag"
                        style={{
                          color: event.color,
                          borderColor: `${event.color}40`,
                          background: `${event.color}12`,
                        }}
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: "#aaa", fontSize: "13px" }}>—</span>
                  )}
                </div>

                <h3 className="mt24">{event.speakersLabel}</h3>
                <div className="speakers-row mt8">
                  {event.speakers.map((s, idx) => (
                    <div key={idx} className="speaker-pill">
                      <div
                        className="speaker-av"
                        style={{
                          background: `${event.color}20`,
                          color: event.color,
                        }}
                      >
                        {s[0]}
                      </div>
                      <span className="speaker-name">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-col">
                <h3>Event Stats</h3>
                <div className="stats-grid mt8">
                  {Object.entries(event.stats).some(([, v]) => v > 0) ? (
                    Object.entries(event.stats).map(
                      ([k, v]) =>
                        v > 0 && (
                          <div key={k} className="stat-card">
                            <div
                              className="stat-num"
                              style={{ color: event.color }}
                            >
                              {v}
                            </div>
                            <div className="stat-label">{k}</div>
                          </div>
                        ),
                    )
                  ) : (
                    <p style={{ color: "#aaa", fontSize: "13px" }}>—</p>
                  )}
                </div>

                <h3>Gallery</h3>
                <div className="gallery-strip mt8">
                  {event.gallery.map((g, idx) => (
                    <div key={idx} className="gallery-img">
                      <img src={g} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="detail-nav-arrows">
              {prevEvent ? (
                <button
                  className="arrow-btn"
                  onClick={() => onSelectEvent(prevEvent.id)}
                  title={prevEvent.name}
                >
                  <span className="arrow-icon">←</span>
                  <span className="arrow-label">
                    Previous
                    <br />
                    <strong>{prevEvent.name}</strong>
                  </span>
                </button>
              ) : (
                <div></div>
              )}

              {nextEvent ? (
                <button
                  className="arrow-btn arrow-btn-next"
                  onClick={() => onSelectEvent(nextEvent.id)}
                  title={nextEvent.name}
                  style={{ borderColor: `${event.color}40` }}
                >
                  <span className="arrow-label" style={{ textAlign: "right" }}>
                    Next
                    <br />
                    <strong>{nextEvent.name}</strong>
                  </span>
                  <span className="arrow-icon" style={{ color: event.color }}>
                    →
                  </span>
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetail;
