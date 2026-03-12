# CHANGELOG.md
# SignFlow Nepal

All notable changes to this project will be documented here.
Format: `[VERSION] YYYY-MM-DD — Description`

---

## [Unreleased]

### Added
- Project initialization and base dependencies installed.
- Configured Vite, Tailwind CSS, shadcn/ui setup, routing and initial CSS tokens.
- Fonts (Fraunces, Syne, DM Mono) and main HTML structure updated.
- All TypeScript interfaces created: `document.types.ts`, `recipient.types.ts`, `user.types.ts`, `template.types.ts`, `signature.types.ts`.
- Mock data files: `documents.mock.ts`, `recipients.mock.ts`, `user.mock.ts`, `templates.mock.ts`, `audit-logs.mock.ts`.
- Zustand stores: `useDocumentStore`, `useUserStore`, `useUIStore` (with immer, persist middleware).
- TanStack Query provider wrapping the app.
- PDF.js worker configured in `main.tsx`.
- i18n setup (`react-i18next`) with English and Nepali stub files.
- Downloaded all 13 Stitch design screens (screenshots + HTML) to `vibes/stitch-screens/`.
- shadcn/ui components installed: button, dropdown-menu, input, avatar, skeleton, card, badge, select, dialog, table.

### Changed
- Removed `erasableSyntaxOnly` from `tsconfig.json` to support TypeScript enums.

---

## How to Update This File

When you complete a feature, add an entry under `[Unreleased]` in the correct category:

- **Added** — new features or screens
- **Changed** — changes to existing functionality
- **Fixed** — bug fixes (also log in BUGLOG.md)
- **Removed** — removed features
- **Refactored** — code restructuring with no behavior change

When you reach a meaningful milestone, create a version entry and move items from Unreleased into it.

### Example Entry Format
```
## [0.3.0] 2025-01-15

### Added
- feat(document-editor): dnd-kit drag-and-drop field placement on PDF canvas
- feat(document-editor): PropertiesPanel for editing field assignment and type
- feat(signing): DrawSignature tab using react-signature-canvas

### Fixed
- fix(pdf-viewer): PDF page dimensions now correctly read before field overlay positioning
```
