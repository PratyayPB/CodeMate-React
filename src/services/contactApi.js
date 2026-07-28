/**
 * Sends contact form submission payload to the serverless API endpoint
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.email
 * @param {string} [payload.phone]
 * @param {string} [payload.whatsapp]
 * @param {string} payload.subject
 * @param {string} payload.message
 * @returns {Promise<{success: boolean, message: string, id?: string}>}
 */
export async function sendContactSubmission(payload) {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      // Non-JSON response (e.g. Vite dev server 404 HTML page)
    }

    if (!response.ok) {
      // If running in local Vite dev server without Vercel CLI, simulate successful submission
      if (import.meta.env.DEV && (response.status === 404 || response.status === 405 || !text)) {
        console.warn("[Contact API Dev Simulation] Local Vite dev server detected. Form submission simulated:", payload);
        return {
          success: true,
          message: "Thank you! Your message has been received (Local Dev Simulation).",
          id: `sim_${Date.now()}`,
        };
      }

      throw new Error(data.error || `Server responded with status ${response.status}`);
    }

    return data;
  } catch (err) {
    // Local dev fallback if fetch fails completely
    if (import.meta.env.DEV && err.name === "TypeError") {
      console.warn("[Contact API Dev Simulation] Network error/Vite dev mode. Simulating success:", payload);
      return {
        success: true,
        message: "Thank you! Your message has been received (Local Dev Simulation).",
        id: `sim_${Date.now()}`,
      };
    }
    throw err;
  }
}
