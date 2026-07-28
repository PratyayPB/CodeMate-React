/**
 * Validates sanitized contact payload on the server
 * @param {Object} data 
 * @returns {{isValid: boolean, errors: Object}}
 */
export function validateContactPayload(data) {
  const errors = {};

  // Name
  if (!data.name || data.name.length < 2) {
    errors.name = "Full name is required (minimum 2 characters).";
  } else if (data.name.length > 100) {
    errors.name = "Full name cannot exceed 100 characters.";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(data.email) || data.email.length > 255) {
    errors.email = "Please provide a valid email address.";
  }

  // Phone (Optional)
  if (data.phone && !/^\+?[0-9\s\-()]{7,20}$/.test(data.phone)) {
    errors.phone = "Invalid phone number format.";
  }

  // WhatsApp (Optional)
  if (data.whatsapp && !/^\+?[0-9\s\-()]{7,20}$/.test(data.whatsapp)) {
    errors.whatsapp = "Invalid WhatsApp number format.";
  }

  // Subject
  const validSubjects = [
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
  if (!data.subject || !validSubjects.includes(data.subject)) {
    errors.subject = "Please select a valid subject from the list.";
  }

  // Message
  if (!data.message || data.message.length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  } else if (data.message.length > 2000) {
    errors.message = "Message cannot exceed 2000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
