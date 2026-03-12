# TASKS.md
# SignFlow Nepal — Development Task Breakdown

Tasks are organised into milestones. Mark tasks `[x]` when complete. Add new packages used under each task.

> **Guide:** See `ARCHITECTURE.md` for the full folder structure, state architecture, routing patterns, and design decisions. All implementation must follow its specifications.

---

## Stitch Design Reference

All 13 Stitch screens have been downloaded to `vibes/stitch-screens/`. Each screen has a `.png` screenshot and `.html` source file. Use these as the visual spec for each milestone.

| # | Screen Name | Files | Maps To |
|---|---|---|---|
| 01 | Documents List | `01-documents-list.{png,html}` | M4 — Document Management |
| 02 | Secure Vault | `02-secure-vault.{png,html}` | M8.3 — VaultPage |
| 03 | Interactive Landing Page v2 | `03-landing-page.{png,html}` | M2.1 — LandingPage |
| 04 | Document Editor Components | `04-doc-editor-components.{png,html}` | M5 — Document Editor |
| 05 | Analytics Dashboard | `05-analytics-dashboard.{png,html}` | M8.4 — AnalyticsPage |
| 06 | Login Page | `06-login-page.{png,html}` | M2.2 — LoginPage |
| 07 | Templates Library | `07-templates-library.{png,html}` | M8.1 — TemplatesPage |
| 08 | SignFlow Document Editor | `08-document-editor.{png,html}` | M5.1 — DocumentEditorPage |
| 09 | Signature & Seal Components | `09-signature-seal.{png,html}` | M7 — Signing Page |
| 10 | Layout & Navigation | `10-layout-navigation.{png,html}` | M1 — Layout & Navigation |
| 11 | SignFlow Nepal Dashboard | `11-dashboard.{png,html}` | M3 — Dashboard |
| 12 | Public Signing Page | `12-public-signing.{png,html}` | M7.1 — SigningPage |
| 13 | Audit & Shared Components | `13-audit-shared.{png,html}` | M4.6 — AuditPanel + Shared |

---

## Milestone 0 — Project Scaffolding ✅

- [x] **M0.1** Scaffold React + Vite + TypeScript project
  - `npm create vite@latest signflow-nepal -- --template react-ts`
- [x] **M0.2** Install and configure Tailwind CSS v3
  - Packages: `tailwindcss`, `postcss`, `autoprefixer`
- [x] **M0.3** Install and initialise shadcn/ui
  - Packages: `shadcn-ui` (CLI), `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`
- [x] **M0.4** Install all core dependencies
  - Packages: `react-router-dom`, `zustand`, `@tanstack/react-query`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `react-pdf`, `pdfjs-dist`, `i18next`, `react-i18next`, `lucide-react`
- [x] **M0.5** Configure Tailwind theme with SignFlow Nepal colours and fonts (saffron, forest green, dark mode)
- [x] **M0.6** Add Google Fonts: Fraunces, Syne, DM Mono to `index.html`
- [x] **M0.7** Configure dark mode (`darkMode: 'class'`) and shadcn CSS variables in `index.css`
- [x] **M0.8** Set up React Router v6 with lazy loading skeleton in `router.tsx`
- [x] **M0.9** Set up Zustand stores: `documentStore`, `userStore`, `uiStore`
- [x] **M0.10** Set up TanStack Query provider in `App.tsx`
- [x] **M0.11** Configure PDF.js worker in `main.tsx`
- [x] **M0.12** Set up i18next with `en.json` and `np.json` stub files
- [x] **M0.13** Create `src/types/` files with all core TypeScript interfaces
- [x] **M0.14** Create all mock data files in `src/lib/mock-data/`
  - 12 documents, 12 recipients, 8 templates, 12 audit logs, 1 user
- [x] **M0.15** Create TanStack Query hooks in `src/lib/hooks/`
  - `useDocuments.ts`, `useDocument.ts`, `useTemplates.ts` — all with 300ms simulated delay
- [x] **M0.16** Create utility files in `src/lib/utils/`
  - `document-status.ts`, `date.ts`, `sharing.ts`, `constants.ts`
- [x] **M0.17** Wire dark mode toggle on `<html>` element
  - `ThemeProvider` in `App.tsx` reads `useUIStore.theme` and toggles `class="dark"`
- [x] **M0.18** Refactor routes to use `React.lazy()` + `Suspense`
  - All page routes lazy-loaded with `<PageSkeleton />` fallback
  - `PageSkeleton.tsx` and `TableSkeleton.tsx` created in `components/shared/`

---

## Milestone 1 — Layout & Navigation
> 🎨 **Stitch ref:** `10-layout-navigation.{png,html}`

- [x] **M1.1** Build `AppLayout.tsx` — sidebar + topnav + main content wrapper
  - ⚠️ Exists but is a monolithic file. Must split per ARCHITECTURE.md: `AppLayout.tsx`, `Sidebar.tsx`, `TopNavbar.tsx`
- [x] **M1.2** Build `Sidebar.tsx` — navigation links, logo, collapse button
  - Must include all routes: Dashboard, Documents, Templates, Analytics, Vault, Contacts, Settings
  - Use `useUIStore.sidebarCollapsed` for collapse state
- [x] **M1.3** Build `TopNavbar.tsx` — search, notifications bell, language toggle, theme toggle, user avatar
  - Must use `useUserStore.user` for avatar/name display
- [x] **M1.4** Build `AuthLayout.tsx` — centered card layout for login/signup
- [x] **M1.5** Build `LanguageToggle.tsx` — NP/EN switch that updates `useUIStore.language` + i18next
- [x] **M1.6** Build `ThemeToggle.tsx` — light/dark switch that updates `useUIStore.theme`
- [x] **M1.7** Build `PageHeader.tsx` — reusable title + description + actions slot
- [x] **M1.8** Build `EmptyState.tsx` — icon + title + description + optional CTA
- [x] **M1.9** Build all skeleton components: `PageSkeleton`, `TableSkeleton`, `CardGridSkeleton`, `EditorSkeleton`, `ViewerSkeleton`
  - `PageSkeleton.tsx` is a blocker for M0.18 (lazy routes)
- [x] **M1.10** Wire dark mode: `App.tsx` sets `class="dark"` on `<html>` when `uiStore.theme === 'dark'`
- [x] **M1.11** Implement mock auth guard — redirect to `/login` if `useUserStore.isAuthenticated` is false

---

## Milestone 2 — Auth Screens
> 🎨 **Stitch ref:** `03-landing-page.{png,html}`, `06-login-page.{png,html}`

- [x] **M2.1** Build `LandingPage.tsx` — hero, features, CTA
- [x] **M2.2** Build `LoginPage.tsx` — email/password form (mock, sets useUserStore.isAuthenticated)
- [x] **M2.3** Build `SignupPage.tsx` — registration form (mock)

---

## Milestone 3 — Dashboard
> 🎨 **Stitch ref:** `11-dashboard.{png,html}`

- [x] **M3.1** Build `DashboardPage.tsx` with stat widgets (Total Documents, Awaiting, Completed, Avg Sign Time)
- [x] **M3.2** Add Recent Documents table to dashboard
- [x] **M3.3** Add Activity Feed to dashboard
- [x] **M3.4** Add Quick Action buttons (New Document, Use Template)
- [x] **M3.5** Wire `useDocuments` TanStack Query hook — dashboard stats derived from mock data
- [x] **M3.6** Add skeleton loader for dashboard while query loads

---

## Milestone 4 — Document Management
> 🎨 **Stitch ref:** `01-documents-list.{png,html}`, `13-audit-shared.{png,html}`

- [x] **M4.1** Build `DocumentsPage.tsx` with filterable list
- [x] **M4.2** Add status badges to list (Draft, Sent, Completed, etc.)
- [x] **M4.3** Add search functionality for documents
- [x] **M4.4** Add action menu for each document (View, Edit, Delete, Resend)
- [x] **M4.5** Add bulk actions (multiple selection, archive/delete)
- [x] **M4.6** Build `AuditTimeline.tsx` component (reusable for dashboard and doc view)
- [x] **M4.7** Build `AuditPanel.tsx` side panel for document details
- [x] **M4.8** Build `DocumentUploadPage.tsx` — drag-and-drop file upload + title input
- [x] **M4.9** Build `DocumentViewerPage.tsx` — read-only PDF view + document metadata + audit panel
- [x] **M4.10** Add `ShareModal.tsx` — WhatsApp link, Viber link, copy link buttons
- [x] **M4.11** Add skeleton loaders to all document pages

---

## Milestone 5 — Document Editor (Core Feature)
> 🎨 **Stitch ref:** `04-doc-editor-components.{png,html}`, `08-document-editor.{png,html}`

- [x] **M5.1** `EditorLayout.tsx` — Top bar with save/send actions, document title
- [x] **M5.2** `FieldToolbar.tsx` — Draggable fields (Signature, Initials, Date, Text, Seal)
- [x] **M5.3** `CanvasContainer.tsx` — PDF render area, Drop target, Zoom/Page controls
- [x] **M5.4** Implement dragging logic (dnd-kit sensor setup, pointer/keyboard sensors)
- [ ] **M5.5** Absolute coordinate calculation for field placement on PDF
- [x] **M5.6** `PropertiesPanel.tsx` — Side panel to configure field recipient & requirement toggle
- [ ] **M5.7** `FieldOverlay.tsx` — Individual field display with delete/resize capability
- [x] **M5.8** `RecipientList.tsx` — Managing signers for the current document
- [ ] **M5.9** Integration: Add field to `useDocumentStore` on drop
- [ ] **M5.10** Document preview before sending (Review & Send flow)
- [ ] **M5.11** Add recipient colour-coding — each recipient has a distinct colour
- [ ] **M5.12** Add EditorSkeleton while PDF loads


---

## Milestone 6 — Workflow & Recipients

- [ ] **M6.1** Build `DocumentSendPage.tsx` — recipients list + signing order + deadline + message + send button
- [ ] **M6.2** Build `WorkflowBuilder.tsx` — add/remove recipients, drag to reorder, set role
- [ ] **M6.3** Build `RecipientRow.tsx` — name, email, role selector, order badge, delete button
- [ ] **M6.4** Implement sequential vs parallel signing order toggle
- [ ] **M6.5** Build WhatsApp/Viber share buttons using `lib/utils/sharing.ts`
- [ ] **M6.6** Simulate document send — update document status to SENT in documentStore
- [ ] **M6.7** Build `SignerStatus.tsx` — progress indicator per recipient on viewer page

---

## Milestone 7 — Signing Page (Public)
> 🎨 **Stitch ref:** `09-signature-seal.{png,html}`, `12-public-signing.{png,html}`

- [ ] **M7.1** Build `SigningPage.tsx` — public route `/sign/:token`, no auth
- [ ] **M7.2** Look up document from mock data by token
- [ ] **M7.3** Render document with field highlights using react-pdf
- [ ] **M7.4** Build `SignatureCanvas.tsx` — draw signature on HTML canvas
- [ ] **M7.5** Build `TypedSignature.tsx` — type name, rendered in cursive font
- [ ] **M7.6** Build `SealUpload.tsx` — upload PNG/JPG company seal, preview, confirm
- [ ] **M7.7** Implement sign submission — update recipient status to SIGNED in store
- [ ] **M7.8** Show completion confirmation screen after signing
- [ ] **M7.9** Ensure signing page is fully usable on 375px mobile viewport

---

## Milestone 8 — Templates, Vault, Analytics
> 🎨 **Stitch ref:** `07-templates-library.{png,html}`, `02-secure-vault.{png,html}`, `05-analytics-dashboard.{png,html}`

- [ ] **M8.1** Build `TemplatesPage.tsx` — card grid of Nepal-specific templates
- [ ] **M8.2** Implement "Use Template" → creates new document from template data
- [ ] **M8.3** Build `VaultPage.tsx` — list of completed documents with download button
- [ ] **M8.4** Build `AnalyticsPage.tsx` — stats cards + mock chart data (Recharts or static)
- [ ] **M8.5** Build `ContactsPage.tsx` — table of saved contacts with add/edit/delete

---

## Milestone 9 — Settings & Polish

- [ ] **M9.1** Build `SettingsPage.tsx` — profile, company, default signature, theme, language, notifications
- [ ] **M9.2** Audit all pages for missing skeleton loaders — add where missing
- [ ] **M9.3** Audit all pages for missing empty states — add where missing
- [ ] **M9.4** Audit all UI strings — ensure every string uses i18n key (not hardcoded)
- [ ] **M9.5** Test NP/EN toggle on all pages
- [ ] **M9.6** Test dark/light mode on all pages
- [ ] **M9.7** Test mobile viewport (375px) on signing page and dashboard
- [ ] **M9.8** Add 404 page route
- [ ] **M9.9** Add ErrorBoundary at route level
- [ ] **M9.10** Final accessibility audit (keyboard nav, focus states, aria labels)

---

## Milestone 10 — Demo Preparation

- [ ] **M10.1** Create 3–5 sample Nepal-themed PDF documents for demo uploads
- [ ] **M10.2** Populate mock data with realistic Nepal names, company names, document titles
- [ ] **M10.3** Record demo flow: upload → edit → send → sign → vault
- [ ] **M10.4** Write portfolio README with screenshots and demo link
- [ ] **M10.5** Deploy to Vercel / Netlify
