import React from "react";

const EventNavDots = ({ events, selectedEventId, onSelectEvent }) => {
  return (
    <div id="nav-dots">
      {events.map((ev) => {
        const isActive = selectedEventId === ev.id;
        return (
          <button
            key={ev.id}
            className={`dot-btn ${isActive ? "active" : ""}`}
            data-id={ev.id}
            title={ev.name}
            style={{
              borderColor: isActive ? ev.color : "",
              background: isActive ? ev.color : "",
            }}
            onClick={() => onSelectEvent(ev.id)}
          ></button>
        );
      })}
    </div>
  );
};

export default EventNavDots;
