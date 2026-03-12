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
│   ├── dashboard/index.tsx
│   ├── documents/
│   │   ├── index.tsx           # Documents list
│   │   ├── upload/index.tsx
│   │   ├── [id]/
│   │   │   ├── index.tsx       # Document viewer
│   │   │   ├── edit/index.tsx  # Field placement editor
│   │   │   ├── recipients/index.tsx
│   │   │   └── send/index.tsx
│   ├── sign/
│   │   └── [token]/index.tsx   # Public signing page (no auth)
│   ├── templates/index.tsx
│   ├── contacts/index.tsx
│   ├── analytics/index.tsx
│   ├── vault/index.tsx
│   └── settings/index.tsx
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
│   │   └── PropertiesPanel.tsx # Right panel: selected field properties editor
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
│   │   └── AuditTimeline.tsx   # Chronological event list with icons and timestamps
│   │
│   └── shared/
│       ├── StatusBadge.tsx     # Document status pill (Draft/Sent/Signed/etc)
│       ├── DocumentCard.tsx    # Card used in Documents List and Dashboard
│       ├── RecipientRow.tsx    # Signer row with avatar, name, status, order badge
│       ├── PageSkeleton.tsx    # Full-page skeleton for Suspense fallback
│       ├── TableSkeleton.tsx   # Table row skeletons
│       └── ActivityFeed.tsx    # Recent activity list for Dashboard
│
├── lib/
│   ├── mock-data/
│   │   ├── documents.mock.ts   # 10+ sample documents with full field data
│   │   ├── templates.mock.ts   # 8 Nepal-specific templates
│   │   ├── recipients.mock.ts  # Sample signers with Nepali names
│   │   ├── audit-logs.mock.ts  # Sample audit trail events
│   │   └── user.mock.ts        # Logged-in user profile
│   │
│   ├── stores/
│   │   ├── useDocumentStore.ts # Documents, active document, fields, recipients
│   │   ├── useUserStore.ts     # Auth state, user profile
│   │   └── useUIStore.ts       # Theme, language, sidebar collapsed state
│   │
│   ├── hooks/
│   │   ├── useDocuments.ts     # TanStack Query hook — fetches from mock data
│   │   ├── useDocument.ts      # Single document by ID
│   │   ├── usePDFDimensions.ts # Reads PDF page width/height for field positioning
│   │   └── useSigningFlow.ts   # Multi-signer state machine logic
│   │
│   └── utils/
│       ├── document-status.ts  # Status label/color helpers
│       ├── date.ts             # BS/AD date formatting, relative time
│       ├── sharing.ts          # WhatsApp/Viber link generators
│       └── constants.ts        # App-wide constants
│
├── types/
│   ├── document.types.ts
│   ├── recipient.types.ts
│   ├── signature.types.ts
│   ├── template.types.ts
│   └── user.types.ts
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
  ├── documents[]              ← all documents (loaded from mock-data)
  ├── activeDocument           ← currently open document
  ├── activeDocument.fields[]  ← placed signature fields
  ├── activeDocument.recipients[]
  ├── setActiveDocument()
  ├── addField()
  ├── updateField()
  ├── removeField()
  └── updateDocumentStatus()

useUserStore
  ├── user                     ← mock logged-in user
  ├── isAuthenticated
  ├── login()                  ← sets user, always succeeds (mock)
  └── logout()

useUIStore
  ├── theme                    ← 'light' | 'dark'
  ├── language                 ← 'en' | 'np'
  ├── sidebarCollapsed
  ├── toggleTheme()
  ├── toggleLanguage()
  └── toggleSidebar()
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
      { path: '/dashboard', element: <Suspense fallback={<PageSkeleton />}><Dashboard /></Suspense> },
      { path: '/documents', element: <Suspense ...><DocumentsList /></Suspense> },
      // ... all protected routes
    ]
  }
])
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
│  [Drag] Date          │  │  [Field overlay] │     │  Assigned to: Recipient 1 │
│  [Drag] Text          │  │                  │     │  Required: Yes            │
│  [Drag] Seal/Stamp    │  └──────────────────┘     │  Signing order: 1         │
└─────────────────────────────────────────────────────────┘
```

**dnd-kit flow:**
1. `FieldToolbar` items are `<Draggable>` with `data.fieldType`
2. `CanvasContainer` is a `<Droppable>` zone
3. On `DragEndEvent`, calculate drop coordinates relative to the PDF canvas
4. Dispatch `addField({ type, x, y, pageNumber, recipientId })` to `useDocumentStore`
5. `FieldOverlay` components render as absolutely positioned divs over the PDF

---

## Multi-Signer Workflow State Machine

```
Document Status Flow:
  Draft → Sent → [per recipient: Waiting → Notified → Viewed → Signed]
                                                               ↓
                                              All signed? → Completed
                                              Deadline passed? → Expired
                                              Any declined? → Declined
```

Recipient status progresses independently. After each signature, the store checks if all required signers are complete and auto-updates the document status.

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

---

## Performance Considerations

- All route pages are `React.lazy()` — initial bundle is small
- react-pdf worker is loaded via CDN to avoid bundling PDF.js
- Skeleton loading on every async operation (minimum 300ms simulated delay)
- Images (seals, signatures) are base64 in mock mode — in production would be S3 presigned URLs

---

## Future Backend Integration Path

When replacing mock data with a real backend:

1. Replace `src/lib/mock-data/` files with API call functions
2. TanStack Query `queryFn` functions already point to a `queryKey` — just swap the resolver
3. Zustand stores keep their shape — only initialization changes
4. Auth store gets real JWT handling
5. No component changes required
