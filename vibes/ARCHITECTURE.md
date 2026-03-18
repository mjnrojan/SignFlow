# ARCHITECTURE.md
# SignFlow Nepal — System Architecture & Design Decisions

---

## Overview

SignFlow Nepal is a **single-page application (SPA)** built with React 18 + Vite. It has no real backend — all data is simulated through hardcoded mock data and Zustand stores. The architecture is designed to be realistic enough that a real backend could be plugged in later with minimal frontend changes.

---

## Tech Stack

| Concern | Technology | Why |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, modern React, no SSR needed for demo |
| Language | TypeScript | Type safety, better AI code generation, self-documenting |
| UI Components | shadcn/ui | Headless + styled, accessible, copy-paste model works great with AI tools |
| Styling | Tailwind CSS v3 | Utility-first, dark mode via `dark:` classes, consistent design tokens |
| Routing | React Router v6 | Industry standard, lazy loading built-in, declarative route config |
| Global State | Zustand | Minimal boilerplate, works well with TypeScript, no Provider wrapping |
| Server State | TanStack Query | Simulates async data fetching with loading/error states even against mock data |
| Drag & Drop | dnd-kit | Modern, accessible, no jQuery dependency, pointer + keyboard support |
| PDF Rendering | react-pdf (PDF.js) | Best React wrapper for PDF.js, handles page rendering and text layers |
| Internationalization | react-i18next | Industry standard, lazy loads translation files, hooks-based API |
| Dark Mode | CSS Variables + Tailwind | shadcn/ui theme system, single class toggle on `<html>` |

---

## Folder Architecture

```
src/
│
├── main.tsx                    # App entry point. Configures PDF worker, i18n, Router, QueryClient
├── App.tsx                     # Root component. Applies theme class. Renders RouterProvider
│
├── app/                        # Route-level pages (all lazy loaded)
│   ├── landing/index.tsx
│   ├── auth/
│   │   ├── login/index.tsx
│   │   └── signup/index.tsx
│   ├── dashboard/index.tsx      # Main dashboard with merged analytics charts
│   ├── documents/
│   │   ├── index.tsx           # Documents list
│   │   ├── upload/index.tsx
│   │   ├── view/index.tsx      # Document viewer
│   │   ├── send/index.tsx      # Send flow
│   │   └── [id]/
│   │       └── edit/index.tsx  # Field placement editor
│   ├── document-editor/index.tsx
│   ├── sign/
│   │   └── [token]/index.tsx   # Public signing page (no auth)
│   ├── templates/index.tsx     # HIDDEN — commented out in router, kept for future use
│   ├── analytics/index.tsx     # DEPRECATED — merged into dashboard, kept for reference
│   ├── contacts/
│   │   ├── index.tsx
│   │   └── components/
│   │       └── ContactEditModal.tsx   # NEW — Add/edit contact modal
│   ├── signatures/
│   │   ├── index.tsx                  # NEW — Standalone signature management page
│   │   └── components/
│   │       └── SignatureCreateModal.tsx # NEW — Create/edit signature with color picker
│   ├── administration/
│   │   └── company/
│   │       └── index.tsx              # NEW — Company management page
│   ├── vault/index.tsx         # Secure Vault — now shows sent + received documents
│   ├── not-found/index.tsx
│   └── settings/index.tsx      # Simplified — signatures tab removed
│
├── components/
│   ├── ui/                     # shadcn/ui components (never manually edited)
│   │
│   ├── layout/
│   │   ├── AppLayout.tsx       # Sidebar + TopNavbar + main content wrapper
│   │   ├── Sidebar.tsx         # Navigation links, logo, collapse toggle
│   │   ├── TopNavbar.tsx       # Search, notifications, language toggle, theme toggle, user menu
│   │   └── PageHeader.tsx      # Reusable page title + breadcrumbs + action buttons
│   │
│   ├── document-editor/
│   │   ├── FieldToolbar.tsx    # Left panel: draggable field type buttons
│   │   ├── CanvasContainer.tsx # Center: PDF page + absolutely positioned field overlays
│   │   ├── FieldOverlay.tsx    # Individual placed field (draggable/resizable on canvas)
│   │   ├── PropertiesPanel.tsx # Right panel: selected field properties editor
│   │   ├── SigningModeSelector.tsx   # NEW — Sequential / Parallel / Bulk toggle
│   │   ├── RolePanel.tsx            # NEW — Add/edit/reorder named roles
│   │   ├── SigningOrderStep.tsx     # NEW — Drag-to-reorder for sequential mode
│   │   ├── RoleAssignmentStep.tsx   # NEW — Map roles to real emails
│   │   ├── BulkUploadStep.tsx       # NEW — CSV upload + field mapping
│   │   └── ReviewAndSendStep.tsx    # NEW — Final review before sending
│   │
│   ├── signature/
│   │   ├── SignatureModal.tsx  # Tabbed modal: Draw / Type / Upload
│   │   ├── DrawSignature.tsx   # react-signature-canvas drawing pad
│   │   ├── TypeSignature.tsx   # Styled text input with cursive font preview
│   │   ├── UploadSignature.tsx # Image file upload for hand-drawn signature photo
│   │   └── SealUpload.tsx      # Company seal / stamp image uploader (Nepal-specific)
│   │
│   ├── viewer/
│   │   ├── PDFViewer.tsx       # react-pdf Document + Page renderer
│   │   ├── AuditPanel.tsx      # Collapsible audit info sidebar
│   │   ├── AuditTimeline.tsx   # Chronological event list with icons and timestamps
│   │   └── SigningProgressBar.tsx   # NEW — Chain (sequential) or counter (parallel) progress
│   │
│   └── shared/
│       ├── StatusBadge.tsx     # Document status pill (Draft/Sent/Signed/etc)
│       ├── DocumentCard.tsx    # Card used in Documents List and Dashboard
│       ├── RecipientRow.tsx    # Signer row with avatar, name, status, order badge
│       ├── PageSkeleton.tsx    # Full-page skeleton for Suspense fallback
│       ├── TableSkeleton.tsx   # Table row skeletons
│       ├── ActivityFeed.tsx    # Recent activity list for Dashboard
│       ├── DocumentStatusCard.tsx   # NEW — Document status with mode badge
│       ├── SignerChain.tsx          # NEW — Sequential mode step-by-step visual
│       ├── SignerGrid.tsx           # NEW — Parallel mode flat signer cards
│       ├── InstanceTable.tsx        # NEW — Bulk mode recipient table
│       └── AuditTrailDrawer.tsx     # NEW — Slide-out audit trail panel
│
├── lib/
│   ├── mock-data/
│   │   ├── documents.mock.ts   # 10+ sample documents with sent/received direction
│   │   ├── templates.mock.ts   # 8 Nepal-specific templates (hidden but data kept)
│   │   ├── recipients.mock.ts  # Sample signers with extended fields (phone, company, PAN)
│   │   ├── audit-logs.mock.ts  # Sample audit trail events
│   │   ├── user.mock.ts        # Logged-in user profile
│   │   ├── company.mock.ts     # NEW — Mock company data for the user
│   │   └── signatures.mock.ts  # NEW — Pre-existing user signatures
│   │
│   ├── stores/
│   │   ├── useDocumentStore.ts # Documents, active document, fields, recipients, signing logic
│   │   ├── useUserStore.ts     # Auth state, user profile
│   │   ├── useUIStore.ts       # Theme, language, sidebar collapsed state
│   │   ├── useRecipientStore.ts # Contacts with extended CRUD
│   │   ├── useTemplateStore.ts  # Templates (kept, hidden from UI)
│   │   ├── useCompanyStore.ts   # NEW — Company info management
│   │   └── useSignatureStore.ts # NEW — User signature collection management
│   │
│   ├── hooks/
│   │   ├── useDocuments.ts     # TanStack Query hook — fetches from mock data
│   │   ├── useDocument.ts      # Single document by ID
│   │   ├── usePDFDimensions.ts # Reads PDF page width/height for field positioning
│   │   ├── useAuditLogs.ts     # Audit log query hook
│   │   └── useSigningFlow.ts   # Multi-signer state machine logic (enhanced for roles)
│   │
│   └── utils/
│       ├── document-status.ts  # Status label/color helpers
│       ├── date.ts             # BS/AD date formatting, relative time
│       ├── sharing.ts          # WhatsApp/Viber link generators
│       └── constants.ts        # App-wide constants
│
├── types/
│   ├── document.types.ts       # IDocument (with direction, signingMode, roles, auditTrail)
│   ├── recipient.types.ts      # IRecipient (with phone, companyName, designation, panNumber)
│   ├── signature.types.ts      # ISignatureData + IUserSignature (with name, color)
│   ├── template.types.ts
│   ├── user.types.ts           # IUser (with companyId)
│   ├── company.types.ts        # NEW — ICompany (Nepal-specific company info)
│   ├── role.types.ts           # NEW — IRole, RoleStatus
│   └── audit.types.ts          # IAuditEvent (extended with roleId, ipAddress, userAgent)
│
└── i18n/
    ├── index.ts                # i18next config
    ├── en.json                 # English translations
    └── np.json                 # Nepali (Devanagari) translations
```

---

## State Architecture

### Zustand Stores

```
useDocumentStore
  ├── documents[]              ← all documents (loaded from mock-data, includes sent/received)
  ├── activeDocument           ← currently open document
  ├── activeDocument.fields[]  ← placed signature fields
  ├── activeDocument.recipients[]
  ├── activeDocument.roles[]       ← NEW: named roles for multi-signer
  ├── activeDocument.signingMode   ← NEW: sequential | parallel | bulk
  ├── activeDocument.auditTrail[]  ← NEW: audit events
  ├── setActiveDocument()
  ├── addField()
  ├── removeField()
  ├── updateField()
  ├── updateDocumentStatus()
  ├── addDocument()
  ├── sendDocument()               ← NEW: mode-aware send logic
  ├── addRole()                    ← NEW
  ├── updateRole()                 ← NEW
  ├── removeRole()                 ← NEW
  └── reorderRoles()               ← NEW

useUserStore
  ├── user                     ← mock logged-in user
  ├── isAuthenticated
  ├── login()
  ├── logout()
  └── updateUser()

useUIStore
  ├── theme                    ← 'light' | 'dark'
  ├── language                 ← 'en' | 'np'
  ├── sidebarCollapsed
  ├── toggleTheme()
  ├── toggleLanguage()
  └── toggleSidebar()

useRecipientStore
  ├── recipients[]             ← contacts with extended fields (phone, company, PAN)
  ├── addRecipient()
  ├── updateRecipient()
  ├── removeRecipient()
  └── getRecipientById()

useCompanyStore                ← NEW
  ├── company                  ← ICompany | null
  ├── setCompany()
  ├── updateCompany()
  └── clearCompany()

useSignatureStore              ← NEW
  ├── signatures[]             ← IUserSignature[] (multiple named signatures)
  ├── addSignature()
  ├── removeSignature()
  ├── updateSignature()
  ├── setDefault()
  └── getDefault()
```

### TanStack Query

Used to simulate async data fetching with realistic loading states:

```typescript
// Example: fetching documents list
const useDocuments = () => useQuery({
  queryKey: ['documents'],
  queryFn: () => new Promise<IDocument[]>(resolve =>
    setTimeout(() => resolve(MOCK_DOCUMENTS), 300)
  )
})
```

Every query has a 300ms delay to trigger Skeleton loading states.

---

## Routing Architecture

```typescript
// main.tsx — React Router v6 createBrowserRouter
const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/sign/:token', element: <SigningPage /> }, // public, no auth
  {
    element: <ProtectedLayout />,  // checks useUserStore.isAuthenticated
    children: [
      { path: '/dashboard', element: <Dashboard /> },       // Includes merged analytics
      { path: '/documents', element: <DocumentsList /> },
      { path: '/documents/upload', element: <DocumentUpload /> },
      { path: '/documents/:id', element: <DocumentView /> },
      { path: '/documents/:id/edit', element: <DocumentEditor /> },
      { path: '/documents/:id/send', element: <DocumentSend /> },
      { path: '/signatures', element: <SignaturesPage /> },  // NEW — standalone signature mgmt
      { path: '/vault', element: <VaultPage /> },
      { path: '/contacts', element: <ContactsPage /> },
      { path: '/administration/company', element: <CompanyPage /> }, // NEW
      { path: '/settings', element: <SettingsPage /> },
      // HIDDEN:
      // { path: '/templates', element: <TemplatesPage /> },
      // { path: '/analytics', element: <AnalyticsPage /> },
    ]
  }
])
```

---

## Sidebar Navigation Structure

```
Dashboard          → /dashboard
Documents          → /documents
Signatures         → /signatures          ← NEW: standalone signature page
─── Administration ───
Contacts           → /contacts
Company            → /administration/company  ← NEW
─── ─── ─── ─── ───
Settings           → /settings

HIDDEN (commented out):
Templates          → /templates
Analytics          → /analytics (merged into dashboard)
Vault              → /vault (still accessible, just not in primary nav — linked from dashboard)
```

---

## Document Editor Architecture

The field placement editor is the most complex screen. It uses a three-panel layout:

```
┌─────────────────────────────────────────────────────────┐
│  FieldToolbar (left)  │  CanvasContainer (center)  │  PropertiesPanel (right)  │
│                       │                            │                           │
│  [Drag] Signature     │  ┌──── PDF Page ────┐     │  Selected Field:          │
│  [Drag] Initials      │  │                  │     │  Type: Signature           │
│  [Drag] Date          │  │  [Field overlay] │     │  Assigned to: Role 1      │
│  [Drag] Text          │  │                  │     │  Required: Yes            │
│  [Drag] Checkbox      │  └──────────────────┘     │  Color: #E8760A           │
│  [Drag] Seal/Stamp    │                            │                           │
│  ───────────────────  │                            │  ─────────────────────── │
│  SigningModeSelector  │                            │  RolePanel:              │
│  [Sequential]         │                            │  Role 1: Client          │
│  [Parallel]           │                            │  Role 2: Legal Approver  │
│  [Bulk]               │                            │  + Add Role              │
└─────────────────────────────────────────────────────────┘
```

**dnd-kit flow:**
1. `FieldToolbar` items are `<Draggable>` with `data.fieldType`
2. `CanvasContainer` is a `<Droppable>` zone
3. On `DragEndEvent`, calculate drop coordinates relative to the PDF canvas
4. Dispatch `addField({ type, x, y, pageNumber, assignedRoleId })` to `useDocumentStore`
5. `FieldOverlay` components render as absolutely positioned divs over the PDF

---

## Multi-Signer Workflow Architecture

### Signing Modes

```
┌──────────────┬─────────────────────────────────────────────┐
│ SEQUENTIAL   │ Signers sign in order. Role #1 first,      │
│              │ then #2, then #3. Each role is notified     │
│              │ only after the previous completes.           │
├──────────────┼─────────────────────────────────────────────┤
│ PARALLEL     │ All signers notified simultaneously.        │
│              │ Each signs independently. Document           │
│              │ completes when all required roles sign.      │
├──────────────┼─────────────────────────────────────────────┤
│ BULK         │ One template, many recipients. Each gets    │
│              │ their own independent document instance.     │
│              │ No shared signing — each instance is solo.   │
└──────────────┴─────────────────────────────────────────────┘
```

### Document Status Flow

```
Document Status Flow:
  Draft → Sent → [per role: Pending → Notified → Viewed → Signed]
                                                          ↓
                                         All required signed? → Completed
                                         Deadline passed? → Expired
                                         Any declined? (sequential) → Voided
                                         Any declined? (parallel) → Sender notified
```

### Signing Chain Rules

**Sequential Mode:**
- A signer cannot access the document if the previous signer has not completed
- If any signer declines, the entire document is voided and sender is notified
- If a signer's link expires, sender can re-send to that slot without restarting the chain
- Sender can reassign a role to a different person mid-chain only if that role has not yet signed

**Parallel Mode:**
- Document finalizes only when ALL required roles complete
- Optional roles (CC) do not block finalization
- If one parallel signer declines, sender is notified but other signers can continue
- Sender can choose: void on any decline, or continue and resolve manually

**Bulk Mode:**
- Each instance is fully independent
- Sender can void individual instances without affecting the batch
- Bulk mode does not support sequential or parallel within a single instance
- CSV columns can map to text fields in the template

**Field Rules:**
- A field with no assigned role is invalid — block send until resolved
- Date fields auto-populate with signing timestamp unless sender locks a specific date
- Signature fields require explicit signer action — cannot be auto-filled
- Once any signer has signed, the document layout (pages, fields) cannot be modified

---

## Theme System

Uses shadcn/ui's CSS variable approach:

```css
/* src/index.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 27 89% 48%;           /* Saffron #E8760A */
  --color-forest: 150 43% 18%;     /* Forest green #1A3D2B */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 27 89% 55%;           /* Saffron slightly lighter in dark mode */
}
```

Theme class is toggled on `document.documentElement` by `useUIStore.toggleTheme()`.

---

## Nepal-Specific Architecture Decisions

### Language Toggle (i18n)
- `react-i18next` with `en.json` and `np.json`
- Language stored in `useUIStore.language` and `localStorage` (persistence only)
- `<I18nextProvider>` wraps the entire app in `main.tsx`

### WhatsApp / Viber Link Sharing
- Utility in `src/lib/utils/sharing.ts`
- WhatsApp: `https://wa.me/?text=Sign%20this%20document%3A%20[link]`
- Viber: `viber://forward?text=Sign%20this%20document%3A%20[link]`
- Links copy to clipboard with a toast notification

### Company Seal Upload
- `SealUpload.tsx` is a special field type in the editor
- Uses a file input accepting `image/*`
- Preview renders the seal image at 80% opacity over the PDF position
- Stored as base64 string in field data (mock only — no real storage)

### Company Management (Nepal-specific)
- PAN Number (Permanent Account Number) — Nepal tax authority requirement
- Company registration number from Department of Company Administration
- Address format: Street, City (Municipality), District, Province, Nepal

---

## Performance Considerations

- All route pages are `React.lazy()` — initial bundle is small
- react-pdf worker is loaded via CDN to avoid bundling PDF.js
- Skeleton loading on every async operation (minimum 300ms simulated delay)
- Images (seals, signatures) are base64 in mock mode — in production would be S3 presigned URLs
- Templates and Analytics routes are code-split and hidden (not loaded unless accessed directly)

---

## Future Backend Integration Path

When replacing mock data with a real backend:

1. Replace `src/lib/mock-data/` files with API call functions
2. TanStack Query `queryFn` functions already point to a `queryKey` — just swap the resolver
3. Zustand stores keep their shape — only initialization changes
4. Auth store gets real JWT handling
5. No component changes required
6. Company store can integrate with Nepal DoC API for company verification
7. Signature store can use cloud storage (S3/GCS) instead of base64
8. Document instances (bulk mode) can be tracked via WebSocket for real-time status updates
