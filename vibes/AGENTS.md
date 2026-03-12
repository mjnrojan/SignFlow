# AGENTS.md — AI Coding Agent Instructions
# SignFlow Nepal

This file defines how the AI coding agent (Gemini via Google AI Studio) should behave when working on this codebase. Read this file before making any changes.

---

## Project Identity

- **Project Name:** SignFlow Nepal
- **Type:** Frontend SaaS demo (React + Vite, no real backend)
- **AI Tool:** Google AI Studio — Gemini
- **Purpose:** Portfolio-grade demo of an e-signature platform for Nepal

---

## Core Principles

1. **Mock data only** — Never attempt to integrate a real API, database, or authentication service unless explicitly instructed. All data lives in `src/lib/mock-data/`.
2. **TypeScript always** — Every file must be `.tsx` or `.ts`. Never use `.js` or `.jsx`. Never use `any` — define proper interfaces in `src/types/`.
3. **shadcn/ui first** — Use shadcn/ui components before writing custom UI. Only write custom components when shadcn doesn't cover the use case.
4. **Tailwind for all styling** — No inline styles, no CSS modules, no styled-components. Use Tailwind utility classes exclusively.
5. **Dark mode always** — Every component must include `dark:` variants. Use CSS variables defined in `src/index.css` via the shadcn/ui theme system.
6. **Lazy load every page** — All route-level components in `src/app/` must use `React.lazy()` + `Suspense` with a `<Skeleton />` fallback.

---

## Folder Rules

| Folder | Rule |
|---|---|
| `src/app/` | Route pages only. One folder per route. Each has `index.tsx` + optional `components/` subfolder |
| `src/components/ui/` | shadcn/ui generated components only. Never manually edit these |
| `src/components/layout/` | AppLayout, Sidebar, TopNavbar, PageHeader |
| `src/components/document-editor/` | FieldToolbar, CanvasContainer, PropertiesPanel, FieldOverlay |
| `src/components/signature/` | SignatureCanvas, TypedSignature, UploadSignature, SealUpload |
| `src/components/viewer/` | PDFViewer, AuditPanel, AuditTimeline |
| `src/components/shared/` | Reusable non-shadcn components: StatusBadge, DocumentCard, Skeleton wrappers |
| `src/lib/mock-data/` | All hardcoded data. Export typed arrays/objects. Never import mock data in components directly — use Zustand stores |
| `src/lib/stores/` | Zustand stores only. One store per domain: `useDocumentStore`, `useUserStore`, `useUIStore` |
| `src/lib/hooks/` | Custom hooks only. Prefix all hooks with `use` |
| `src/types/` | TypeScript interfaces and enums. One file per domain |
| `src/i18n/` | Translation files: `en.json` and `np.json`. Keys must match exactly between files |

---

## Naming Conventions

- **Components:** PascalCase — `DocumentCard.tsx`, `SignatureCanvas.tsx`
- **Hooks:** camelCase with `use` prefix — `useDocumentStore.ts`, `usePDFViewer.ts`
- **Stores:** camelCase with `use` prefix — `useDocumentStore.ts`
- **Types/Interfaces:** PascalCase prefixed with `I` for interfaces — `IDocument`, `IRecipient`
- **Enums:** PascalCase — `DocumentStatus`, `SignatureFieldType`
- **Mock data files:** camelCase — `documents.mock.ts`, `templates.mock.ts`
- **Route folders:** kebab-case — `document-editor/`, `signing-page/`

---

## Component Rules

- Every component must have typed props via an interface (never inline object types in function signatures)
- Default exports only for page components
- Named exports for all shared/reusable components
- No component should exceed 200 lines — split into subcomponents if it does
- Never use `useEffect` to sync state — use Zustand derived state or TanStack Query instead
- All async-looking operations (loading mock data) must show a skeleton for at least 300ms using `setTimeout` to simulate realism

---

## dnd-kit Rules

- Use `@dnd-kit/core` + `@dnd-kit/utilities` only
- Draggable items are signature field types from the FieldToolbar
- Droppable target is the CanvasContainer (the PDF overlay layer)
- Field position is stored in absolute coordinates as `{ x: number, y: number, pageNumber: number }`
- On drop, add field to `useDocumentStore` → `activeDocument.fields[]`
- Never modify the underlying PDF — fields are an overlay layer only

---

## react-pdf Rules

- Use `react-pdf` with worker configured in `main.tsx`
- Render PDFs inside `<Document>` + `<Page>` components
- The PDF canvas is always position `relative`
- Signature fields are absolutely positioned `<div>` overlays on top of the PDF page
- Page dimensions must be read from the PDF and stored in state to calculate field positions correctly

---

## Routing Rules

- Use React Router v6 with `createBrowserRouter`
- All page components must be wrapped in `React.lazy()`
- Every lazy route must have a `<Suspense fallback={<PageSkeleton />}>` wrapper
- The public signing page `/sign/:token` must be accessible without authentication
- All other routes require a mock auth check (if no user in `useUserStore`, redirect to `/login`)

---

## i18n Rules

- Use `react-i18next` for all user-facing strings
- Never hardcode English or Nepali strings directly in JSX — always use `t('key')`
- Key format: `section.component.element` — e.g., `dashboard.stats.totalDocuments`
- The language toggle lives in the TopNavbar and updates `useUIStore.language`
- Nepali translations use Devanagari script

---

## Zustand Store Rules

- Stores are in `src/lib/stores/`
- Initialize stores with mock data from `src/lib/mock-data/` inside the store definition
- Use `immer` middleware for all stores that manage arrays or nested objects
- Never mutate state directly — always use store actions
- TanStack Query wraps any "fetch" simulation — use `queryFn` that returns a Promise resolving mock data after a `setTimeout(300)`

---

## Dark Mode Rules

- Use shadcn/ui's CSS variable system (`--background`, `--foreground`, `--primary`, etc.)
- Theme toggle stored in `useUIStore.theme` and applied as `class="dark"` on the `<html>` element
- Never use hardcoded hex colors in Tailwind — always use semantic tokens: `bg-background`, `text-foreground`, `border-border`
- Custom colors for SignFlow brand:
  - Saffron: `#E8760A` → defined as `--color-saffron` in CSS variables
  - Forest green: `#1A3D2B` → defined as `--color-forest`
  - Both must have light and dark mode variants

---

## What the Agent Should NOT Do

- Do not install any backend framework (Express, NestJS, Fastify)
- Do not set up any database connection
- Do not use `localStorage` as a real persistence layer — only for theme/language preference
- Do not generate placeholder/lorem ipsum content — use Nepal-specific realistic mock data (Nepali names, Kathmandu addresses, NPR amounts)
- Do not use emojis in production UI components (they are acceptable in this AGENTS.md for clarity)
- Do not create files outside the defined folder structure without asking first
- Do not skip TypeScript types — if unsure what type to use, ask before using `any`

---

## When Ambiguous, Ask

If a task is unclear, the agent should ask one specific clarifying question before proceeding rather than making assumptions and generating code that needs to be fully rewritten.

---

## Commit Message Format

```
type(scope): short description

Types: feat | fix | refactor | style | docs | chore
Example: feat(document-editor): add company seal upload field type
```
