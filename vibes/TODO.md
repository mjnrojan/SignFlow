# TODO.md
# SignFlow Nepal — Immediate Priorities

Quick-reference list of what needs to happen next. Update this file as you work.

---

## 🟢 Recently Completed — Milestones 0 to 5 ✅

- [x] **M0 - M1:** Project Scaffolding, Layout & Navigation
- [x] **M2 - M3:** Auth Screens, Landing Page & Dashboard Implementation
- [x] **M4:** Document Management (List, Statuses, Search, Upload)
- [x] **M5 (CORE):** Document Editor
  - [x] Draggable fields (Signature, Date, Text, etc.)
  - [x] Percentage-based absolute coordinate positioning
  - [x] Field resizing and manual drag adjustment
  - [x] Recipient tagging and color-coding
  - [x] Properties panel for field configuration
  - [x] Editor Skeleton loading state (800ms simulation)

---

## 🔴 Current — Milestone 6 (Workflow & Recipients)

> 🎨 **Focus:** Sending flow and recipient management.

- [ ] **M6.1** Build `DocumentSendPage.tsx` — Recap of document + recipient list
- [ ] **M6.2** Build `WorkflowBuilder.tsx` — Sequential vs Parallel signing order toggle
- [ ] **M6.3** Implement signing deadline and automatic reminder settings
- [ ] **M6.4** WhatsApp/Viber share simulation for sent documents
- [ ] **M6.5** Email notification template preview
- [ ] **M6.6** Update document status to `SENT` upon completion of workflow

---

## 🟡 Next Up — Milestone 7 (Public Signing Page)

> 🎨 **Stitch ref:** `09-signature-seal.{png,html}`, `12-public-signing.{png,html}`

- [ ] **M7.1** Build `SigningPage.tsx` (Public Route: `/sign/:token`)
- [ ] **M7.2** Implement HTML5 `SignatureCanvas` for drawing signatures
- [ ] **M7.3** Build `TypedSignature` component with cursive fonts
- [ ] **M7.4** Build `SealUpload.tsx` for company official stamps
- [ ] **M7.5** Mobile-first signing experience (375px optimization)

---

## 🔵 Upcoming Milestones

- [ ] **Milestone 8:** Templates Library, Secure Vault & Analytics Dashboard
- [ ] **Milestone 8.5:** Contacts Management (Nepal-specific names/addresses)
- [ ] **Milestone 9:** Settings, Error Boundaries & Final i18n Audit
- [ ] **Milestone 10:** Demo Preparation & Vercel Deployment

---

## 💡 Ideas / Nice-to-Have

- [ ] Confetti animation on document completion
- [ ] "Time saved vs paper" counter on Dashboard
- [ ] Citizenship/NID placeholder verification
- [ ] Bulk send capability
- [ ] eSewa/Khalti integration mocks
