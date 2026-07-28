/**
 * Sends notification email to CodeMate Team and auto-reply email to User.
 * Uses Resend API if RESEND_API_KEY is available, or logs email payloads gracefully.
 *
 * @param {Object} submission
 */
export async function sendContactEmails(submission) {
  const teamEmail =
    process.env.CODEMATE_ADMIN_EMAIL || "typrotypro220@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  const teamNotificationPayload = {
    from: "CodeMate Contact Form <noreply@codematenehu.org>",
    to: [teamEmail],
    subject: `New Contact Submission: ${submission.subject} (${submission.name})`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded-radius: 12px;">
        <h2 style="color: #f37f30; margin-bottom: 20px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 8px 0;">${submission.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${submission.email}">${submission.email}</a></td>
          </tr>
          ${submission.phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${submission.phone}</td></tr>` : ""}
          ${submission.whatsapp ? `<tr><td style="padding: 8px 0; font-weight: bold;">WhatsApp:</td><td style="padding: 8px 0;">${submission.whatsapp}</td></tr>` : ""}
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
            <td style="padding: 8px 0;">${submission.subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Date:</td>
            <td style="padding: 8px 0;">${new Date(submission.createdAt).toLocaleString()}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <h4 style="margin-bottom: 8px;">Message:</h4>
        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; font-size: 14px; white-space: pre-wrap;">${submission.message}</div>
      </div>
    `,
  };

  const userAutoReplyPayload = {
    from: "CodeMate Team <noreply@codematenehu.org>",
    to: [submission.email],
    subject: "We've received your message — CodeMate",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #f37f30; margin-bottom: 16px;">Hi ${submission.name},</h2>
        <p>Thank you for reaching out to <strong>CodeMate</strong>.</p>
        <p>Your message regarding <strong>"${submission.subject}"</strong> has been received successfully. Our team is reviewing it and will get back to you as soon as possible.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">Best regards,<br /><strong>Team CodeMate</strong><br />NEHU, Shillong</p>
      </div>
    `,
  };

  if (resendApiKey) {
    // 1. Send Team Notification
    const teamResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamNotificationPayload),
    });

    const teamData = await teamResponse.json();

    if (!teamResponse.ok) {
      console.error("[Email Service] Resend Notification failed:", teamData);
      throw new Error("Failed to send notification email to the team.");
    }

    // 2. Send User Confirmation ONLY if Notification succeeds
    const userResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAutoReplyPayload),
    });

    if (!userResponse.ok) {
      const userData = await userResponse.json();
      console.error(
        "[Email Service] Resend Confirmation failed (Non-fatal):",
        userData,
      );
      // We don't throw here because the main notification succeeded,
      // so the message is received by the team.
    }

    console.log(
      `[Email Service] Notification & Auto-reply emails sent via Resend for submission ${submission.id}`,
    );
  } else {
    console.log(`[Email Service Mock - No RESEND_API_KEY]`);
    console.log(` -> Notification email queued for team (${teamEmail})`);
    console.log(` -> Auto-reply email queued for user (${submission.email})`);
  }
}
