import React from "react";

const ValidationError = ({ id, message }) => {
  if (!message) return null;

  return (
    <p
      id={id}
      className="mt-1 text-xs font-semibold text-rose-500 transition-all duration-200"
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
};

export default ValidationError;
