import { sanitizeContactPayload } from "../lib/sanitize.js";
import { validateContactPayload } from "../lib/validation.js";
import { checkRateLimit } from "../lib/rateLimit.js";
import { sendContactEmails } from "../lib/email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1. IP Rate Limiting (20 submissions per hour per IP)
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket?.remoteAddress ||
      "127.0.0.1";

    const { allowed, remaining, resetTime } = checkRateLimit(ip, 20, 3600000);

    res.setHeader("X-RateLimit-Limit", 20);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", resetTime);

    if (!allowed) {
      return res.status(429).json({
        error: "Too many contact submissions from this IP. Please try again in an hour.",
      });
    }

    // 2. Sanitize Raw Input
    const sanitizedData = sanitizeContactPayload(req.body);

    // 3. Anti-Spam Honeypot Check
    if (sanitizedData.hp_field) {
      console.warn(`[Spam Trap] Submission rejected from IP: ${ip}`);
      // Pretend success to mislead spam bots
      return res.status(200).json({
        success: true,
        message: "Thank you for getting in touch!",
      });
    }

    // 4. Server-Side Data Validation
    const { isValid, errors } = validateContactPayload(sanitizedData);
    if (!isValid) {
      return res.status(400).json({
        error: "Validation failed.",
        details: errors,
      });
    }

    // Prepare submission object
    const submission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone || null,
      whatsapp: sanitizedData.whatsapp || null,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      createdAt: new Date().toISOString(),
    };

    // 5. Send Transactional Notification & Auto-Reply Emails
    // We now await this directly. If sending the primary notification fails,
    // an error is thrown, and we return a 500 error to the client instead of a fake success.
    await sendContactEmails(submission);

    console.log("[Contact API] Successfully processed submission:", submission.id);

    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been received.",
      id: submission.id,
    });
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred while processing your request.",
    });
  }
}
