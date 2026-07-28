# AI Agent Prompt: Simplify Contact Form Architecture

You are a senior Full Stack Engineer responsible for implementing the Contact Form backend for the CodeMate website.

## Objective

Update the existing Contact Form implementation to follow a **simple, production-ready architecture** suitable for the current stage of the project.

The previous implementation attempted to store submissions in a database. That requirement has changed.

**We do NOT want to permanently store contact form submissions.**

Instead, the contact form should simply send an email to the official CodeMate email address and send an acknowledgement email to the user.

The implementation should remain secure, scalable for moderate traffic, and easy to extend in the future.

---

# Updated Requirements

## Remove Completely

Remove all persistence-related code.

Delete or remove references to:

- `database.js`
- JSON file storage
- `/tmp` storage
- Local file storage
- Supabase integration
- Prisma
- MongoDB
- PostgreSQL
- Any database dependencies
- Any logic that saves contact submissions

The backend should no longer attempt to store contact form data anywhere.

---

# Final Architecture

```text
React Contact Form
        │
        ▼
POST /api/contact
        │
        ├── Validate request
        ├── Honeypot spam check
        ├── Rate limiting
        ├── Send notification email to CodeMate
        ├── Send acknowledgement email to user
        └── Return success response
```

No database should exist anywhere in this flow.

---

# Backend Endpoint

Implement

```text
POST /api/contact
```

Expected request body

```json
{
  "name": "",
  "email": "",
  "phone": "",
  "whatsapp": "",
  "subject": "",
  "message": ""
}
```

Responsibilities:

- Validate request
- Sanitize input
- Detect spam
- Send emails
- Return response

---

# Email Provider

Use **Resend** as the email service.

All email operations must happen inside the serverless API.

Never expose the Resend API key to the frontend.

Environment variables:

```env
RESEND_API_KEY=
CONTACT_EMAIL=codemate.nehu@gmail.com
```

---

# Email 1 — Notification

Recipient:

```
CONTACT_EMAIL
```

Subject format:

```
[CodeMate Contact] <Subject> - <User Name>
```

Body should contain:

- Name
- Email
- Phone
- WhatsApp
- Subject
- Message
- Submission timestamp

Format the email cleanly for easy reading.

---

# Email 2 — Auto Reply

Recipient:

```
User Email
```

Subject:

```
We've received your message
```

Example body:

```
Hi <Name>,

Thank you for contacting CodeMate.

We have successfully received your message.

Our team will review it and respond as soon as possible.

Regards,
CodeMate Team
```

The confirmation email should only be sent if the notification email was successfully accepted by the email provider.

---

# Validation

Implement server-side validation for:

Name

- Required
- Minimum length
- Maximum length

Email

- Required
- Valid email

Phone

- Optional
- Valid phone format

WhatsApp

- Optional
- Valid phone format

Subject

- Required

Message

- Required
- Minimum length
- Maximum length

Never rely solely on frontend validation.

---

# Spam Protection

Implement:

## 1. Honeypot

Add a hidden field.

If the field contains any value:

- Reject request
- Return success status without sending emails (to silently ignore bots), or return an appropriate rejection based on your preferred anti-spam strategy.

---

## 2. Rate Limiting

Limit requests per IP.

Example:

```
20 requests per hour
```

Return

```
429 Too Many Requests
```

when exceeded.

---

# Security

Never expose:

- Resend API Key
- Environment variables

All email logic must execute inside the serverless API.

The React frontend should only call:

```javascript
fetch("/api/contact");
```

---

# Frontend UX

Keep the existing UI.

Improve behaviour by implementing:

Loading state

```
Submitting...
```

Disable submit button while request is in progress.

Prevent duplicate submissions.

---

Success state

Display:

```
✓ Message sent successfully.

Thank you for contacting CodeMate.
Our team will get back to you soon.
```

---

Failure state

Show user-friendly errors such as:

- Invalid email
- Missing required fields
- Too many requests
- Unable to send message
- Please try again later

Do not expose internal server errors.

---

# Accessibility

Ensure:

- Proper labels
- Keyboard accessibility
- ARIA attributes where needed
- Focus management after submission
- Inline validation messages

---

# Folder Structure

```
src/
│
├── components/
│   └── Contact/
│       ├── ContactForm.jsx
│       ├── ContactInput.jsx
│       ├── SuccessMessage.jsx
│       └── ValidationError.jsx
│
├── hooks/
│   └── useContactForm.js
│
├── services/
│   └── contactApi.js
│
api/
└── contact.js

lib/
├── validation.js
├── email.js
├── rateLimit.js
└── sanitize.js
```

There should be **no** `database.js`.

---

# Code Quality

The implementation should:

- Be modular
- Follow clean architecture
- Use reusable helper functions
- Be production-ready
- Be easy to maintain
- Minimize duplicate code
- Follow modern React and Node.js best practices

---

# Deliverables

Implement incrementally.

For each phase:

1. Explain what will be implemented.
2. Generate the code.
3. Explain how to test it.
4. Wait for confirmation before proceeding.

Do not implement everything in one step.

---

# Success Criteria

The final implementation should:

- Not store contact form submissions anywhere.
- Send a notification email to `codemate.nehu@gmail.com`.
- Send a confirmation email to the user.
- Validate and sanitize all inputs.
- Protect against spam using a honeypot and rate limiting.
- Keep all API keys secure on the server.
- Provide clear loading, success, and error states.
- Be simple, secure, maintainable, and ready for future enhancements if persistent storage is ever needed.
