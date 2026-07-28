import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const SuccessMessage = ({ onReset }) => {
  return (
    <div
      className="p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-4 animate-fadeIn"
      role="status"
      aria-live="polite"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-200/60 shadow-sm">
        <CheckCircle2 size={36} />
      </div>

      <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
        Message sent successfully!
      </h3>

      <p className="font-sans text-sm md:text-base text-zinc-600 max-w-md leading-relaxed">
        Thank you for getting in touch. Our team has received your message and will review it shortly.
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 transition-all duration-200 text-xs font-extrabold tracking-wider uppercase cursor-pointer"
        >
          Send Another Message <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
