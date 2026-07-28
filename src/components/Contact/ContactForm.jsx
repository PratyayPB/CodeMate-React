import React from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import ContactInput from "./ContactInput";
import SuccessMessage from "./SuccessMessage";
import { useContactForm } from "../../hooks/useContactForm";

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Join CodeMate",
  "Partnership",
  "Sponsorship",
  "Event Inquiry",
  "Workshop",
  "Career Guidance",
  "Technical Support",
  "Other",
];

const ContactForm = ({ onSubmitSuccess }) => {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useContactForm(onSubmitSuccess);

  if (isSuccess) {
    return <SuccessMessage onReset={resetForm} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot Anti-Spam Field (Hidden) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="hp_field"
          tabIndex="-1"
          autoComplete="off"
          value={formData.hp_field}
          onChange={handleChange}
        />
      </div>

      {/* Global Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
          <div>
            <p className="font-bold">Submission Failed</p>
            <p className="text-xs mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      {/* Grid Row 1: First Name & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactInput
          id="firstName"
          name="firstName"
          label="First Name"
          placeholder="e.g. John"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.firstName}
          required
          disabled={isSubmitting}
        />
        <ContactInput
          id="lastName"
          name="lastName"
          label="Last Name"
          placeholder="e.g. Doe"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastName}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Grid Row 2: Mobile No. & WhatsApp No. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactInput
          id="phone"
          name="phone"
          label="Mobile No."
          placeholder="+91 00000 00000"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          disabled={isSubmitting}
        />
        <ContactInput
          id="whatsapp"
          name="whatsapp"
          label="WhatsApp No."
          placeholder="+91 00000 00000"
          value={formData.whatsapp}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.whatsapp}
          disabled={isSubmitting}
        />
      </div>

      {/* Grid Row 3: Email & Subject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          required
          disabled={isSubmitting}
        />
        <ContactInput
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Select inquiry subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.subject}
          required
          isSelect
          options={SUBJECT_OPTIONS}
          disabled={isSubmitting}
        />
      </div>

      {/* Message Textarea */}
      <ContactInput
        id="message"
        name="message"
        label="Message"
        placeholder="How can we help you build something amazing?"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
        required
        isTextArea
        rows={5}
        disabled={isSubmitting}
      />

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-8 rounded-2xl bg-black text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 font-heading text-sm font-extrabold tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-black/10 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
              Submitting Message...
            </>
          ) : (
            <>
              Submit Message <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
