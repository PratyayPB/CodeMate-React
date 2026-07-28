/**
 * Sanitizes input strings to prevent HTML injection and XSS
 * @param {string} str 
 * @returns {string}
 */
export function sanitizeString(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Sanitizes an object containing text fields
 * @param {Object} data 
 * @returns {Object}
 */
export function sanitizeContactPayload(data) {
  if (!data || typeof data !== "object") return {};
  return {
    name: sanitizeString(data.name),
    email: sanitizeString(data.email).toLowerCase(),
    phone: sanitizeString(data.phone),
    whatsapp: sanitizeString(data.whatsapp),
    subject: sanitizeString(data.subject),
    message: sanitizeString(data.message),
    hp_field: String(data.hp_field || ""),
  };
}
