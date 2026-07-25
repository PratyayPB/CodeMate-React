import React, { useRef } from "react";

const EventCard = ({ event, isSelected, isDimmed, onClick }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;
    const rotY = ((x - cx) / cx) * 10;
    const rotX = -((y - cy) / cy) * 8;

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;

    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${x - 110}px, ${y - 110}px)`;
    }

    if (imgRef.current) {
      imgRef.current.style.transform = `scale(1.09) translate(${rotY * 0.5}px, ${-rotX * 0.4}px)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1)";
    }
  };

  let cardClasses = "event-card";
  if (isSelected) cardClasses += " card-selected";
  if (isDimmed) cardClasses += " card-dimmed";

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      data-id={event.id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(event.id)}
    >
      <div
        ref={glowRef}
        className="card-glow"
        style={{
          background: `radial-gradient(circle, ${event.color}30 0%, transparent 70%)`,
        }}
      ></div>
      <div className="card-img-wrap">
        <img ref={imgRef} src={event.img} alt={event.name} loading="lazy" />
        <div className="card-overlay"></div>
        <span
          className="card-badge"
          style={{
            color: event.color,
            borderColor: `${event.color}40`,
            background: `${event.color}18`,
          }}
        >
          {event.cat}
        </span>
      </div>
      <div className="card-border-glow" style={{ borderColor: event.color }}></div>
      <div className="card-body">
        <p className="card-date">{event.date}</p>
        <h3 className="card-name">{event.name}</h3>
        <p className="card-desc">{event.short}</p>
        <div className="card-cta" style={{ color: event.color }}>
          View Details <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
