# TODO.md
# SignFlow Nepal — Immediate Priorities

Quick-reference list of what needs to happen next. Update this file as you work.

---

## 🟢 Recently Completed — Milestone 0 ✅

- [x] Scaffold Vite + React + TypeScript project
- [x] Install all dependencies
- [x] CSS variables + dark mode tokens + Google Fonts
- [x] All TypeScript interfaces in `src/types/`
- [x] Mock data: 12 documents, 12 recipients, 8 templates, 12 audit logs, 1 user
- [x] Zustand stores: `useDocumentStore`, `useUserStore`, `useUIStore`
- [x] TanStack Query hooks: `useDocuments`, `useDocument`, `useTemplates`
- [x] Utility files: `document-status.ts`, `date.ts`, `sharing.ts`, `constants.ts`
- [x] Dark mode wired via `ThemeProvider` in `App.tsx`
- [x] Routes refactored to `React.lazy()` + `Suspense` with `PageSkeleton` fallback
- [x] PDF.js worker + i18n configured
- [x] All 13 Stitch design screens downloaded
- [x] shadcn/ui components installed

---

## 🔴 Current — Milestone 1 (Layout & Navigation)

> 🎨 **Stitch ref:** `10-layout-navigation.{png,html}`

- [x] Split `AppLayout.tsx` → separate `Sidebar.tsx`, `TopNavbar.tsx`, `PageHeader.tsx`
- [x] Build `Sidebar.tsx` with all nav links (Dashboard, Documents, Templates, Analytics, Vault, Contacts, Settings)
- [x] Build `TopNavbar.tsx` with search, notifications, language toggle, theme toggle, user avatar
- [x] Build `LanguageToggle.tsx` — NP/EN switch wired to `useUIStore` + i18next
- [x] Build `ThemeToggle.tsx` — light/dark switch wired to `useUIStore`
- [x] Build `PageHeader.tsx` — reusable title + breadcrumbs + actions slot
- [x] Build `AuthLayout.tsx` — centered card layout for login/signup
- [x] Build `EmptyState.tsx` — icon + title + description + optional CTA
- [x] Build remaining skeletons: `CardGridSkeleton`, `EditorSkeleton`, `ViewerSkeleton`
- [x] Implement mock auth guard — redirect to `/login` if not authenticated

---

## 🟢 Recently Completed — Milestones 2 & 3 ✅
...
- [x] `LandingPage.tsx` — hero, features, CTA
- [x] `LoginPage.tsx` — email/password form (mock auth)
- [x] `SignupPage.tsx` — registration form
- [x] Rebuild `DashboardPage.tsx` using `useDocuments` hook + typed props
- [x] Recent Documents, Activity Feed, Quick Actions, Skeleton loader

---

## 🔵 Deferred to V2

- [ ] Nepal BS calendar date display
- [ ] eSewa / Khalti payment mock
- [ ] Citizenship OTP verification mock
- [ ] AI contract clause analysis
- [ ] AI signature field auto-detection
- [ ] Document expiry + renewal alerts
- [ ] Approval workflow engine
- [ ] Real PDF generation (pdf-lib)

---

## 💡 Ideas / Nice-to-Have

- [ ] Confetti animation on document completion
- [ ] "Time saved vs paper" counter on Dashboard
- [ ] Onboarding tour for first-time users
- [ ] Document comparison view
- [ ] Bulk send
