# PRD — Product Requirements Document
# SignFlow Nepal

**Version:** 1.0  
**Status:** Active  
**Last Updated:** 2025  
**AI Tool:** Google AI Studio (Gemini)

---

## 1. Product Overview

### Vision
Replace Nepal's paper-based document signing culture with a fast, mobile-friendly, legally credible digital workflow — accessible to SMEs, NGOs, freelancers, and enterprises.

### Problem Statement
Nepal's business and legal ecosystem still relies on printing, physically signing, scanning, and couriering documents. This creates:
- 3–7 day delays per contract cycle
- High risk of document loss
- No audit trail or version control
- Impossible remote signing (diaspora, field offices, international partners)
- No centralized document archive for SMEs

### Solution
SignFlow Nepal is a frontend SaaS demo simulating a complete e-signature and document workflow platform. It combines the best features of PandaDoc (document creation, analytics, approvals) and SignNow (mobile signing, audit trail, precision field placement).

---

## 2. Target Users

| Persona | Description | Primary Pain |
|---|---|---|
| SME Owner | Small business in Kathmandu, 5–50 employees | Vendor/client contracts take too long |
| HR Manager | IT company hiring remote/diaspora talent | Offer letters and NDAs via courier |
| NGO Program Officer | INGO with international partners | MoUs require multi-country physical signing |
| Freelancer | Developer or consultant billing clients | No professional contract system |
| Property Manager | Rental agreements, lease deeds | Tenant signing requires physical meeting |
| Legal Professional | Law firms managing client agreements | No digital archive or tracking |

---

## 3. Core Modules

### Module 1 — Document Builder
- PDF upload with signature overlay layer
- Drag-and-drop field placement using dnd-kit
- Field types: Signature, Initials, Date, Text, Checkbox, Company Seal/Stamp
- Assign fields to specific recipients
- Real-time canvas preview

### Module 2 — Template Library
- Nepal-specific templates: rental deed, employment contract, NDA, consultancy agreement, vendor SLA, NGO MoU
- Templates in both Nepali and English
- Create custom templates from any completed document

### Module 3 — Signature Workflow Engine
- Sequential and parallel multi-signer support
- Signing order enforcement
- Recipient roles: Signer, Approver, CC
- Signing status per recipient: Waiting → Notified → Viewed → Signed

### Module 4 — Recipient Management
- Add recipients by name, email, phone
- Assign signing order
- Set signing deadline
- Contacts address book

### Module 5 — Notification System
- Email notification simulation (mock)
- WhatsApp / Viber link share (copy-to-clipboard with deep link format)
- Auto-reminder simulation after 24h/48h

### Module 6 — Document Tracking Dashboard
- Live status per document: Draft, Sent, Viewed, In Progress, Completed, Expired, Declined, Voided
- Per-recipient status breakdown
- Activity timeline

### Module 7 — Signing Page (Public)
- Route: `/sign/:token`
- No login required for recipients
- Draw / Type / Upload signature modes
- Company seal/stamp upload
- OTP verification simulation (phone)
- Sign and submit

### Module 8 — Audit Trail
- Full event log: created, sent, opened, viewed, signed, completed
- IP address + timestamp + device simulation
- Downloadable audit certificate (mock PDF)

### Module 9 — Secure Document Vault
- All completed documents stored and searchable
- Filter by date, status, party name, document type
- Download signed PDF

### Module 10 — Analytics Dashboard
- Total documents, completion rate, average sign time
- Documents by status (chart)
- Monthly volume trend

---

## 4. User Stories

### Document Sender
- As a sender, I can upload a PDF and place signature fields by dragging them onto the document
- As a sender, I can assign each field to a specific recipient
- As a sender, I can add multiple recipients and set their signing order
- As a sender, I can share the signing link via WhatsApp or Viber
- As a sender, I can track which recipients have viewed and signed
- As a sender, I can send a reminder to pending signers

### Document Recipient
- As a recipient, I can open a signing link without creating an account
- As a recipient, I can draw, type, or upload my signature
- As a recipient, I can upload a company seal image
- As a recipient, I can complete signing from my mobile device
- As a recipient, I receive a copy of the signed document

### Admin / Power User
- As a user, I can save a completed document as a reusable template
- As a user, I can toggle between Nepali and English UI
- As a user, I can view a full audit trail for any document
- As a user, I can search and filter my document vault

---

## 5. Nepal-Specific Requirements (V1)

| Feature | Priority | Notes |
|---|---|---|
| Nepali language toggle (NP/EN) | High | i18n via react-i18next |
| WhatsApp / Viber signing link | High | Copy-to-clipboard with wa.me and viber:// format |
| Company seal / stamp upload field | High | Image upload field type in editor |
| Nepal date display (BS calendar) | Low | Defer to V2 |
| eSewa/Khalti payment mock | Low | Defer to V2 |
| Citizenship OTP verification | Low | Defer to V2 |

---

## 6. Technical Constraints

- **No real backend** — all data is hardcoded mock JSON in `src/lib/mock-data/`
- **No real authentication** — login screen accepts any credentials
- **No real file storage** — uploaded PDFs use mock URLs or public/mock-pdfs/
- **No real email sending** — notifications are simulated UI events
- **PDF signing** is visual simulation only — no cryptographic signing

---

## 7. Non-Functional Requirements

| Requirement | Target |
|---|---|
| First page load | < 2s (Vite + lazy loading) |
| Lighthouse performance | > 85 |
| Mobile responsiveness | All screens responsive at 375px+ |
| Dark mode | Full coverage via Tailwind dark: classes |
| Accessibility | shadcn/ui ARIA defaults maintained |
| TypeScript coverage | 100% — no `any` types |

---

## 8. KPIs (for portfolio evaluation)

- All 14 screens implemented and navigable
- dnd-kit drag-and-drop signature placement working
- react-pdf document rendering working
- Multi-signer workflow state machine functional
- Nepali/English language toggle working
- Dark/light mode working
- Skeleton loading on all lazy-loaded routes
- Audit trail panel populated with mock events
