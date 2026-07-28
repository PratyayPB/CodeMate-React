import { useState, useCallback } from "react";
import { sendContactSubmission } from "../services/contactApi";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  whatsapp: "",
  subject: "General Inquiry",
  message: "",
  hp_field: "",
};

export function useContactForm(onSuccessCallback) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Field validation rules
  const validateField = useCallback((name, value, allValues = formData) => {
    let error = null;
    const val = String(value || "").trim();

    switch (name) {
      case "firstName":
        if (!val) {
          error = "First name is required";
        } else if (val.length < 2) {
          error = "First name must be at least 2 characters";
        }
        break;

      case "lastName":
        if (!val) {
          error = "Last name is required";
        }
        break;

      case "email":
        if (!val) {
          error = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          error = "Please enter a valid email address";
        }
        break;

      case "phone":
        if (val && !/^\+?[0-9\s\-()]{7,15}$/.test(val)) {
          error = "Please enter a valid phone number";
        }
        break;

      case "whatsapp":
        if (val && !/^\+?[0-9\s\-()]{7,15}$/.test(val)) {
          error = "Please enter a valid WhatsApp number";
        }
        break;

      case "subject":
        if (!val) {
          error = "Please select a subject";
        }
        break;

      case "message":
        if (!val) {
          error = "Message is required";
        } else if (val.length < 10) {
          error = "Message should be at least 10 characters long";
        } else if (val.length > 2000) {
          error = "Message cannot exceed 2000 characters";
        }
        break;

      default:
        break;
    }

    return error;
  }, [formData]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    const fieldsToValidate = ["firstName", "lastName", "email", "phone", "whatsapp", "subject", "message"];

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // Handle Input Changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Real-time inline validation if touched
      if (touched[name]) {
        const error = validateField(name, value, updated);
        setErrors((prevErr) => ({ ...prevErr, [name]: error }));
      }
      return updated;
    });

    if (serverError) setServerError(null);
  }, [touched, validateField, serverError]);

  // Handle Input Blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, [validateField]);

  // Handle Form Submission
  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();

    // Spam Honeypot Check: silently pretend success if filled by bot
    if (formData.hp_field) {
      setIsSuccess(true);
      return;
    }

    // Touch all required fields
    const allTouched = {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      whatsapp: true,
      subject: true,
      message: true,
    };
    setTouched(allTouched);

    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      };

      const result = await sendContactSubmission(payload);

      setIsSuccess(true);
      if (onSuccessCallback) onSuccessCallback(result);
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSuccessCallback]);

  // Reset Form
  const resetForm = useCallback(() => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSuccess(false);
    setServerError(null);
  }, []);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
