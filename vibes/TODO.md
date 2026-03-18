# TODO.md
# SignFlow Nepal — Immediate Priorities

Quick-reference list of what needs to happen next. Update this file as you work.

---

## 🟢 Recently Completed — Milestones 0 to 9 ✅

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
- [x] **M6:** Workflow & Recipients
- [x] **M7:** Signing Page (Public)
- [x] **M8:** Templates, Vault, Analytics, Contacts
- [x] **M9:** Settings & Polish (partial — M9.10 accessibility audit remaining)

---

## 🔴 Current — Milestone 11 (Dashboard & Navigation Refactor)

> 🎨 **Focus:** Merging analytics into dashboard, sidebar restructure, templates hiding.

- [ ] **M11.1** Merge analytics charts into `DashboardPage.tsx` — monthly volume bar chart + stats cards from `AnalyticsPage.tsx`
- [ ] **M11.2** Remove or comment out the separate `/analytics` route and sidebar link
- [ ] **M11.3** Comment out and hide Templates from sidebar navigation and route
- [ ] **M11.4** Restructure sidebar: move Signatures to top-level (out of Settings), add Company Management under Administration

---

## 🟢 Done — Milestone 12 (Signature Vault + Documents Sent/Received)

> 🎨 **Focus**: Vault page becomes Signature Vault (user's saved signatures). Documents page gets sent/received tab filter.

- [x] **M12.1** Replace Vault page content with signature management UI (same as Settings → Signatures tab)
- [x] **M12.2** Add `direction` field to `IDocument` type: `'sent' | 'received'`
- [x] **M12.3** Add received documents to mock data (documents others sent to you)
- [x] **M12.4** Add "All / Sent / Received" tab filter on the Documents page

---

## 🟠 Next — Milestone 13 (Contacts Enhancement)

> 🎨 **Focus:** Make contacts fully editable with extended fields.

- [ ] **M13.1** Extend `IRecipient` type with optional fields: `phone`, `companyName`, `designation`, `panNumber`
- [ ] **M13.2** Build `ContactEditModal.tsx` — full edit form with all fields
- [ ] **M13.3** Phone field required; email, companyName, designation, panNumber optional
- [ ] **M13.4** Wire add/edit/delete actions on contacts table rows

---

## 🔵 Upcoming — Milestone 14 (Company Management)

> 🎨 **Focus:** Administration tab for company info management.

- [ ] **M14.1** Add `ICompany` type with Nepal-specific fields (name, address, PAN, registration)
- [ ] **M14.2** Build `CompanyManagementPage.tsx` under `/administration/company`
- [ ] **M14.3** Add "Company Management" link in sidebar under Administration section
- [ ] **M14.4** Wire to `useUserStore` or new `useCompanyStore`

---

## 🟣 Upcoming — Milestone 15 (Signature Management — Standalone Page)

> 🎨 **Focus:** Move signatures out of Settings to a dedicated sidebar page. Multiple named signatures with color picker.

- [ ] **M15.1** Create `IUserSignature` type: `{ id, name, dataUrl, color, createdAt }`
- [ ] **M15.2** Build `SignaturesPage.tsx` — grid/list of saved signatures
- [ ] **M15.3** Add "create signature" flow with name input + color picker + draw/type/upload
- [ ] **M15.4** Allow multiple signatures with naming ("Contract Signature", "Initial Signature", etc.)
- [ ] **M15.5** Update sidebar to link to `/signatures` as a top-level item
- [ ] **M15.6** Remove signatures tab from Settings page

---

## ⚫ Major Feature — Milestone 16–21 (Document Signing System)

> 🎨 **Focus:** Full multi-signer document signing with sequential/parallel/bulk modes.

### Milestone 16 — Data Model & Types
- [ ] **M16.1** Create `IRole` type (id, label, assignedTo, order, status, color, required)
- [ ] **M16.2** Create `IAuditEvent` type (eventType, roleId, timestamp, ipAddress, userAgent)
- [ ] **M16.3** Extend `IDocument` with `signingMode`, `roles[]`, `instances[]`, `auditTrail[]`, `expiresAt`
- [ ] **M16.4** Extend `IDocumentField` with `assignedRoleId`, `completedAt`
- [ ] **M16.5** Create `IDocumentInstance` type for bulk mode

### Milestone 17 — SigningModeSelector & RolePanel
- [ ] **M17.1** Build `SigningModeSelector.tsx` — sequential | parallel | bulk toggle
- [ ] **M17.2** Build `RolePanel.tsx` — add/edit/reorder named roles with auto-assigned colors
- [ ] **M17.3** Integrate into document editor layout
- [ ] **M17.4** Wire `onModeChange(mode)` event to document store

### Milestone 18 — Role-based Field Assignment
- [ ] **M18.1** Update `FieldOverlay.tsx` to show role color coding
- [ ] **M18.2** Add role selector to `PropertiesPanel.tsx` per field
- [ ] **M18.3** Build `SigningOrderStep.tsx` — drag-to-reorder for sequential mode
- [ ] **M18.4** Build `RoleAssignmentStep.tsx` — map roles to real emails

### Milestone 19 — Send Flow Enhancements
- [ ] **M19.1** Build `BulkUploadStep.tsx` — CSV upload + field mapping for bulk mode
- [ ] **M19.2** Build `ReviewAndSendStep.tsx` — summary before dispatch
- [ ] **M19.3** Sequential send logic: notify only first role
- [ ] **M19.4** Parallel send logic: notify all roles simultaneously
- [ ] **M19.5** Bulk send logic: generate instances, send to each

### Milestone 20 — Signer View & Signing Experience
- [ ] **M20.1** Update `SigningPage.tsx` — role-aware field highlighting
- [ ] **M20.2** Build `SigningProgressBar.tsx` — chain state (sequential) or counter (parallel)
- [ ] **M20.3** Build `FieldHighlighter.tsx` — own fields interactive, others greyed
- [ ] **M20.4** Implement signing chain rules (lock fields, sequential gating)

### Milestone 21 — Sender Dashboard & Tracking
- [ ] **M21.1** Build `DocumentStatusCard.tsx` — overall status with mode badge + signer list
- [ ] **M21.2** Build `SignerChain.tsx` — sequential step-by-step visual
- [ ] **M21.3** Build `SignerGrid.tsx` — flat cards for parallel mode
- [ ] **M21.4** Build `InstanceTable.tsx` — rows per recipient for bulk mode
- [ ] **M21.5** Build `AuditTrailDrawer.tsx` — timeline of all events

---

## 💡 Ideas / Nice-to-Have

- [ ] Confetti animation on document completion
- [ ] "Time saved vs paper" counter on Dashboard
- [ ] Citizenship/NID placeholder verification
- [ ] eSewa/Khalti integration mocks
