import React from "react";
import ValidationError from "./ValidationError";

const ContactInput = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  isTextArea = false,
  isSelect = false,
  options = [],
  rows = 4,
}) => {
  const errorId = `${id}-error`;

  const baseInputStyles = `
    w-full px-4 py-3 rounded-xl bg-zinc-100/80 border text-zinc-900 placeholder:text-zinc-400 
    text-sm font-medium transition-all duration-200 outline-none
    ${
      error
        ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        : "border-zinc-200/70 hover:border-zinc-300 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
    }
    ${disabled ? "opacity-60 cursor-not-allowed" : ""}
  `;

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label
        htmlFor={id}
        className="font-sans text-[11px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1"
      >
        {label}
        {required && <span className="text-orange-500 font-bold">*</span>}
      </label>

      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${baseInputStyles} resize-y min-h-[120px]`}
        />
      ) : isSelect ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${baseInputStyles} appearance-none bg-no-repeat bg-[right_1rem_center] cursor-pointer`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%252371717a' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundSize: "1.25rem",
          }}
        >
          <option value="" disabled>
            {placeholder || "Select a subject"}
          </option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={baseInputStyles}
        />
      )}

      <ValidationError id={errorId} message={error} />
    </div>
  );
};

export default ContactInput;
