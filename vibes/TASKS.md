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
- [x] **M0.2** Install and configure Tailwind CSS v3
- [x] **M0.3** Install and initialise shadcn/ui
- [x] **M0.4** Install all core dependencies
- [x] **M0.5** Configure Tailwind theme with SignFlow Nepal colours and fonts
- [x] **M0.6** Add Google Fonts: Fraunces, Syne, DM Mono
- [x] **M0.7** Configure dark mode and shadcn CSS variables
- [x] **M0.8** Set up React Router v6 with lazy loading skeleton
- [x] **M0.9** Set up Zustand stores
- [x] **M0.10** Set up TanStack Query provider
- [x] **M0.11** Configure PDF.js worker
- [x] **M0.12** Set up i18next with `en.json` and `np.json`
- [x] **M0.13** Create `src/types/` files with all core TypeScript interfaces
- [x] **M0.14** Create all mock data files
- [x] **M0.15** Create TanStack Query hooks
- [x] **M0.16** Create utility files
- [x] **M0.17** Wire dark mode toggle
- [x] **M0.18** Refactor routes to use `React.lazy()` + `Suspense`

---

## Milestone 1 — Layout & Navigation ✅

- [x] **M1.1–M1.11** All layout, navigation, auth guard, skeletons — COMPLETE

---

## Milestone 2 — Auth Screens ✅

- [x] **M2.1–M2.3** Landing, Login, Signup — COMPLETE

---

## Milestone 3 — Dashboard ✅

- [x] **M3.1–M3.6** Dashboard with stats, recent docs, activity, quick actions — COMPLETE

---

## Milestone 4 — Document Management ✅

- [x] **M4.1–M4.11** Documents list, statuses, search, upload, viewer, audit — COMPLETE

---

## Milestone 5 — Document Editor (Core Feature) ✅

- [x] **M5.1–M5.12** Editor layout, field toolbar, canvas, properties, recipients — COMPLETE

---

## Milestone 6 — Workflow & Recipients ✅

- [x] **M6.1–M6.7** Send flow, workflow builder, deadlines, share — COMPLETE

---

## Milestone 7 — Signing Page (Public) ✅

- [x] **M7.1–M7.9** Signing page, signature canvas, typed, seal, mobile, success — COMPLETE

---

## Milestone 8 — Templates, Vault, Analytics ✅

- [x] **M8.1–M8.5** Templates, vault, analytics, contacts — COMPLETE

---

## Milestone 9 — Settings & Polish ✅ (partial)

- [x] **M9.1–M9.9** Settings, skeletons, empty states, i18n, 404, error boundary — COMPLETE
- [ ] **M9.10** Final accessibility audit (keyboard nav, focus states, aria labels)

---

## Milestone 10 — Demo Preparation

- [ ] **M10.1** Create 3–5 sample Nepal-themed PDF documents for demo uploads
- [ ] **M10.2** Populate mock data with realistic Nepal names, company names, document titles
- [ ] **M10.3** Record demo flow: upload → edit → send → sign → vault
- [ ] **M10.4** Write portfolio README with screenshots and demo link

---

## Milestone 11 — Dashboard & Navigation Refactor

> **Goal:** Merge analytics into main dashboard, hide templates, restructure sidebar.

### M11.1 — Merge Analytics Charts Into Dashboard
> **Files to change:** `src/app/dashboard/index.tsx`
> **Reference:** `src/app/analytics/index.tsx` (source of charts to merge)

- [ ] **M11.1.1** Import and add the "Monthly Volume" stacked bar chart from `AnalyticsPage` into `DashboardPage`
  - Place it below the Stats Grid, above the Recent Documents table
  - Keep the existing StatCard grid (total, draft, sent, completed, declined)
  - Add the 4 analytics stat cards (Completion Rate, Avg signing time, Active documents, Active Recipients) as a new row or merge into existing stat grid
- [ ] **M11.1.2** Add the "Device Usage" progress bars widget from analytics into the dashboard
  - Place as a secondary card in the bottom grid alongside Activity Feed
- [ ] **M11.1.3** Add the "Pro Insights" CTA card from analytics
  - Place alongside Device Usage or below the chart section
- [ ] **M11.1.4** Ensure the merged dashboard still uses `useDocuments` and `useAuditLogs` hooks
- [ ] **M11.1.5** Add skeleton states for the new chart sections

### M11.2 — Remove Separate Analytics Route
> **Files to change:** `src/App.tsx`, `src/components/layout/Sidebar.tsx`

- [ ] **M11.2.1** Comment out the `/analytics` route in `App.tsx` router config (keep the import commented too)
- [ ] **M11.2.2** Remove `Analytics` from the sidebar `NAV_ITEMS` array in `Sidebar.tsx`
- [ ] **M11.2.3** Keep `src/app/analytics/index.tsx` file intact (commented out, not deleted) for future reference

### M11.3 — Hide Templates
> **Files to change:** `src/App.tsx`, `src/components/layout/Sidebar.tsx`

- [ ] **M11.3.1** Comment out the `/templates` route in `App.tsx` router config
- [ ] **M11.3.2** Remove `Templates` from the sidebar `NAV_ITEMS` array in `Sidebar.tsx`
- [ ] **M11.3.3** Keep `src/app/templates/index.tsx` file intact for future use
- [ ] **M11.3.4** Update the "Use Template" QuickAction on dashboard to navigate to `/documents/upload` instead of `/templates`

### M11.4 — Sidebar Restructure
> **Files to change:** `src/components/layout/Sidebar.tsx`

- [ ] **M11.4.1** Add `Signatures` as a top-level sidebar item linking to `/signatures`
  - Icon: `PenLine` (already imported)
  - Position: below Documents, above Contacts
- [ ] **M11.4.2** Add `Company` as a sidebar item under the "Administration" section
  - Icon: `Building2`
  - Path: `/administration/company`
  - Place it under Contacts in the Administration section
- [ ] **M11.4.3** Reorder final sidebar items: Dashboard, Documents, Signatures, Contacts (Administration header), Company (Administration), Settings

---

## Milestone 12 — Signature Vault + Documents Sent/Received Filter

> **Goal:** Two changes:
> 1. The Vault page (`/vault`, "Signatures" in sidebar) should become a **Signature Vault** — showing the user's saved signatures (same interface currently inside Settings → Signatures tab). Users can add/view/delete their default signature and company seal here.
> 2. The **Documents page** (`/documents`) should gain a "Sent" / "Received" tab filter so users can see both documents they sent out for signing AND documents they received to sign.

### M12.1 — Signature Vault Page (replaces current Vault)
> **Files to change:** `src/app/vault/index.tsx`
> **Reference:** `src/app/settings/index.tsx` (the `signatures` tab section — copy this UI)

- [x] **M12.1.1** Replace the current Vault page content (completed documents grid) with the signature management UI from Settings:
  - Default Signature card — click to open `SignatureModal` in signature mode
  - Official Seal card — click to open `SignatureModal` in seal mode
  - Both cards show a preview when a signature/seal is set, or an empty state with CTA
  - Delete button (X) to remove a saved signature/seal
- [x] **M12.1.2** Update the page header: title = "Signature Vault", description = "Manage your digital signatures and official seals."
- [x] **M12.1.3** Import and use `SignatureModal` component (same as Settings does)
- [x] **M12.1.4** Wire to `useUserStore` — `updateUser({ signatureBase64 })` and `updateUser({ sealBase64 })`
- [x] **M12.1.5** Add skeleton loading state (400ms delay)

### M12.2 — Documents Page: Sent / Received Filter
> **Files to change:** `src/types/document.types.ts`, `src/lib/mock-data/documents.mock.ts`, `src/app/documents/index.tsx`

- [x] **M12.2.1** Add `direction` field to `IDocument` type:
  ```typescript
  direction: 'sent' | 'received';
  ```
- [x] **M12.2.2** Update all existing mock documents to have `direction: 'sent'` (authored by the mock user)
- [x] **M12.2.3** Add 3–4 new mock documents with `direction: 'received'` — documents others sent to the mock user for signing
  - Use different `authorId` values (not `usr_nepal_123`)
  - Include various statuses: `SIGNED`, `SENT` (waiting for your signature), `COMPLETED`
  - Use realistic Nepal-themed titles (e.g. "Office Lease Agreement - YetiCorp")
- [x] **M12.2.4** Add a tab/toggle filter on the Documents page: "All" / "Sent" / "Received"
  - "Sent" shows documents where `direction === 'sent'`
  - "Received" shows documents where `direction === 'received'`
  - Default: "All"
- [x] **M12.2.5** Display `direction` as a subtle badge ("Sent" / "Received") on each document row

---

## Milestone 13 — Contacts Enhancement

> **Goal:** Make contacts fully editable with expanded fields: email, phone (required), company name, designation, PAN number (all optional except phone).

### M13.1 — Type Extensions
> **Files to change:** `src/types/recipient.types.ts`

- [ ] **M13.1.1** Add new optional fields to `IRecipient`:
  ```typescript
  phone?: string;        // Required in edit form, optional in type for backward compat
  companyName?: string;
  designation?: string;
  panNumber?: string;
  ```
- [ ] **M13.1.2** Update `src/lib/mock-data/recipients.mock.ts` to populate these new fields for existing mock contacts
  - Use realistic Nepal phone numbers (98XXXXXXXX format)
  - Use realistic Nepal company names and designations

### M13.2 — Contact Edit Modal
> **Files to create:** `src/app/contacts/components/ContactEditModal.tsx`

- [ ] **M13.2.1** Build `ContactEditModal.tsx` with the following fields:
  - **Name** — text input (required)
  - **Email** — email input (required)
  - **Phone** — tel input (required, placeholder: `98XXXXXXXX`)
  - **Company Name** — text input (optional)
  - **Designation** — text input (optional, placeholder: "e.g. CEO, Manager, Legal Counsel")
  - **PAN Number** — text input (optional, placeholder: "XXXXXXXXX")
  - **Role** — dropdown: Signer / Approver / CC
- [ ] **M13.2.2** Modal should work for both "Add Contact" AND "Edit Contact" modes
  - When editing, pre-populate all fields from the contact record
  - When adding, all fields empty
- [ ] **M13.2.3** Validation:
  - Name, email, phone are required → show inline error if missing
  - Email must be a valid email format
  - Phone must be numeric, 10 digits
- [ ] **M13.2.4** On save: call `addRecipient()` or `updateRecipient()` from `useRecipientStore`
- [ ] **M13.2.5** Use shadcn `Dialog` component for the modal container
- [ ] **M13.2.6** Style to match the app design system (rounded-2xl, font-['Fraunces'] headers, etc.)

### M13.3 — Contacts Page Wiring
> **Files to change:** `src/app/contacts/index.tsx`

- [ ] **M13.3.1** Wire the "Add Contact" button in `PageHeader` to open `ContactEditModal` in "add" mode
- [ ] **M13.3.2** Add an "Edit" action to the `MoreHorizontal` menu on each contact row
  - On click: open `ContactEditModal` in "edit" mode with contact data
- [ ] **M13.3.3** Add a "Delete" action to the `MoreHorizontal` menu
  - Show confirmation dialog before deleting
  - On confirm: call `removeRecipient(id)` from store
- [ ] **M13.3.4** Display the new fields (phone, company, designation, PAN) in the "Details" column
  - Currently shows placeholder icons — replace with actual data
  - Show phone number and company name when available
- [ ] **M13.3.5** Add a detail/expand row or a click-to-view panel that shows all contact fields

---

## Milestone 14 — Company Management (Administration)

> **Goal:** Under Administration, allow the account holder to manage their company information if they have a company.

### M14.1 — Data Model
> **Files to create:** `src/types/company.types.ts`
> **Files to change:** `src/types/user.types.ts`

- [ ] **M14.1.1** Create `ICompany` interface:
  ```typescript
  export interface ICompany {
    id: string;
    name: string;
    registrationNumber?: string;  // Company registration number (Nepal DoC)
    panNumber?: string;            // PAN / VAT number
    address: {
      street?: string;
      city: string;               // e.g. "Kathmandu", "Lalitpur"
      district?: string;
      province?: string;
      country: string;            // default "Nepal"
    };
    phone?: string;
    email?: string;
    website?: string;
    logoBase64?: string;           // Company logo upload
    sealBase64?: string;           // Official company seal
    establishedDate?: string;
    industry?: string;             // e.g. "Technology", "Legal", "Construction"
  }
  ```
- [ ] **M14.1.2** Update `IUser` type to include `companyId?: string`
- [ ] **M14.1.3** Create `src/lib/mock-data/company.mock.ts` with a default company for the mock user:
  - Name: "Everest Tech Solutions Pvt. Ltd."
  - PAN: "302456789"
  - Address: "Thamel, Kathmandu"

### M14.2 — Company Store
> **Files to create:** `src/lib/stores/useCompanyStore.ts`

- [ ] **M14.2.1** Create `useCompanyStore` Zustand store with:
  - `company: ICompany | null`
  - `setCompany(company: ICompany): void`
  - `updateCompany(updates: Partial<ICompany>): void`
  - `clearCompany(): void`
- [ ] **M14.2.2** Initialize with mock company data

### M14.3 — Company Management Page
> **Files to create:** `src/app/administration/company/index.tsx`

- [ ] **M14.3.1** Build `CompanyManagementPage.tsx` with sections:
  - **Company Identity** — Name, registration number, PAN, industry
  - **Contact Details** — Phone, email, website
  - **Address** — Street, city, district, province
  - **Branding** — Logo upload area, Official seal upload area
  - **Established Date** — Date picker or text input
- [ ] **M14.3.2** Each section should be a `Card` component with edit capability
- [ ] **M14.3.3** Add a save button that calls `useCompanyStore.updateCompany()`
- [ ] **M14.3.4** Add skeleton loading state (400ms delay)
- [ ] **M14.3.5** If no company exists yet, show an "Add Your Company" empty state with a CTA

### M14.4 — Routing & Navigation
> **Files to change:** `src/App.tsx`, `src/components/layout/Sidebar.tsx`

- [ ] **M14.4.1** Add `/administration/company` route in `App.tsx` router config
- [ ] **M14.4.2** Sidebar already updated in M11.4.2 with Company link — verify it works
- [ ] **M14.4.3** Ensure the route is protected (inside `ProtectedRoute`)

---

## Milestone 15 — Signature Management (Standalone Page)

> **Goal:** Move signatures out of Settings into a dedicated sidebar page. Users can add multiple named signatures with a color picker.

### M15.1 — Data Model
> **Files to create:** `src/types/signature.types.ts` (extend existing)

- [ ] **M15.1.1** Add `IUserSignature` interface:
  ```typescript
  export interface IUserSignature {
    id: string;
    name: string;           // e.g. "Contract Signature", "Quick Initials"
    dataUrl: string;         // base64 data URL
    color: string;           // hex color used when drawing
    mode: SignatureMode;     // DRAW | TYPE | UPLOAD
    isDefault: boolean;
    createdAt: string;
  }
  ```
- [ ] **M15.1.2** Create `src/lib/mock-data/signatures.mock.ts` with 1–2 pre-existing signatures

### M15.2 — Signature Store
> **Files to create:** `src/lib/stores/useSignatureStore.ts`

- [ ] **M15.2.1** Create `useSignatureStore` Zustand store with:
  - `signatures: IUserSignature[]`
  - `addSignature(signature: IUserSignature): void`
  - `removeSignature(id: string): void`
  - `updateSignature(id: string, updates: Partial<IUserSignature>): void`
  - `setDefault(id: string): void`
  - `getDefault(): IUserSignature | undefined`
- [ ] **M15.2.2** Initialize with mock signature data

### M15.3 — Signatures Page
> **Files to create:** `src/app/signatures/index.tsx`

- [ ] **M15.3.1** Build `SignaturesPage.tsx` — a grid of signature cards:
  - Each card shows: signature preview image, name, color dot, "Default" badge if default, created date
  - Hover reveals: Edit, Delete, Set as Default actions
- [ ] **M15.3.2** "Add New Signature" CTA card with dashed border → opens `SignatureCreateModal`
- [ ] **M15.3.3** Add skeleton loading state

### M15.4 — Signature Create/Edit Modal
> **Files to create:** `src/app/signatures/components/SignatureCreateModal.tsx`

- [ ] **M15.4.1** Build modal with fields:
  - **Signature Name** — text input (required, e.g. "Contract Signature")
  - **Color Picker** — a set of preset color swatches + custom hex input
    - The selected color changes the pen color in the draw tab
    - Preset colors: `#000000, #1A3D2B, #0284c7, #E8760A, #7c3aed, #dc2626`
  - **Signature Input** — reuse existing tabs: Draw / Type / Upload
    - Draw tab: pass selected color to `DrawSignature` component as pen color
    - Type tab: pass selected color to `TypeSignature` component as text color
    - Upload tab: no color change needed (uses uploaded image as-is)
- [ ] **M15.4.2** On save: create `IUserSignature` and call `useSignatureStore.addSignature()`
- [ ] **M15.4.3** If editing: pre-fill name, color, and show existing preview

### M15.5 — Settings Cleanup
> **Files to change:** `src/app/settings/index.tsx`

- [ ] **M15.5.1** Remove the `signatures` tab from the Settings page tab list
- [ ] **M15.5.2** Remove the signature/seal cards section from Settings
- [ ] **M15.5.3** Optionally add a link/button in Settings that says "Manage Signatures →" linking to `/signatures`

### M15.6 — Routing & Sidebar
> **Files to change:** `src/App.tsx`, `src/components/layout/Sidebar.tsx`

- [ ] **M15.6.1** Add `/signatures` route in `App.tsx` (replace the old `/vault` → Signatures link)
- [ ] **M15.6.2** Update sidebar: the `Signatures` link should point to `/signatures` not `/vault`
- [ ] **M15.6.3** Rename the Vault sidebar item back to "Vault" linking to `/vault` (keep secure vault as is)

---

## Milestone 16 — Document Signing System: Data Model

> **Goal:** Establish the complete data model for the multi-signer document signing system.

### M16.1 — Core Types
> **Files to change:** `src/types/document.types.ts`
> **Files to create:** `src/types/role.types.ts`, `src/types/audit.types.ts` (extend)

- [ ] **M16.1.1** Create `IRole` interface:
  ```typescript
  export interface IRole {
    id: string;
    label: string;                    // e.g. "Client", "Legal Approver"
    assignedTo: { name: string; email: string } | null;
    order: number | null;             // null = parallel, number = sequential position
    status: RoleStatus;
    color: string;                    // for field highlighting
    required: boolean;
  }

  export enum RoleStatus {
    PENDING = 'PENDING',
    NOTIFIED = 'NOTIFIED',
    VIEWED = 'VIEWED',
    SIGNED = 'SIGNED',
    DECLINED = 'DECLINED',
  }
  ```

- [ ] **M16.1.2** Create extended `IAuditEvent` interface:
  ```typescript
  export interface IAuditEvent {
    id: string;
    eventType: 'sent' | 'viewed' | 'signed' | 'declined' | 'reminder_sent' | 'voided';
    roleId: string;
    timestamp: string;
    ipAddress: string;
    userAgent: string;
  }
  ```

- [ ] **M16.1.3** Add `SigningMode` enum and extend `IDocument`:
  ```typescript
  export enum SigningMode {
    SEQUENTIAL = 'sequential',
    PARALLEL = 'parallel',
    BULK = 'bulk',
  }
  ```
  Add to `IDocument`:
  ```typescript
  signingMode?: SigningMode;
  roles?: IRole[];
  auditTrail?: IAuditEvent[];
  expiresAt?: string | null;
  ```

- [ ] **M16.1.4** Extend `IDocumentField`:
  ```typescript
  assignedRoleId?: string;
  completedAt?: string | null;
  ```

- [ ] **M16.1.5** Add `CheckboxFieldType` to `FieldType` enum:
  ```typescript
  CHECKBOX = 'CHECKBOX'
  ```

- [ ] **M16.1.6** Create `IDocumentInstance` for bulk mode:
  ```typescript
  export interface IDocumentInstance {
    id: string;
    documentId: string;
    recipientName: string;
    recipientEmail: string;
    status: DocumentStatus;
    magicLink: string;
    auditTrail: IAuditEvent[];
    customFields?: Record<string, string>;
    completedAt?: string | null;
  }
  ```

### M16.2 — Mock Data Updates
> **Files to change:** `src/lib/mock-data/documents.mock.ts`

- [ ] **M16.2.1** Add `signingMode: SigningMode.SEQUENTIAL` to `doc_1` (multi-signer example)
- [ ] **M16.2.2** Add `roles` array to `doc_1` with 2 roles assigned to existing recipients
- [ ] **M16.2.3** Add sample `auditTrail` events to `doc_2` (completed document)
- [ ] **M16.2.4** Add one document with `signingMode: SigningMode.PARALLEL` for testing

---

## Milestone 17 — SigningModeSelector & RolePanel Components

> **Goal:** Build the UI components for selecting signing mode and managing roles within the document editor.

### M17.1 — SigningModeSelector Component
> **Files to create:** `src/components/document-editor/SigningModeSelector.tsx`

- [ ] **M17.1.1** Build `SigningModeSelector.tsx` with props:
  ```typescript
  interface ISigningModeSelectorProps {
    currentMode: SigningMode;
    onModeChange: (mode: SigningMode) => void;
    disabled?: boolean;
  }
  ```
- [ ] **M17.1.2** UI: Three toggle buttons in a segmented control:
  - **Sequential** — icon: `ListOrdered`, description: "Signers sign one after another"
  - **Parallel** — icon: `Users`, description: "Everyone signs simultaneously"
  - **Bulk** — icon: `FileStack`, description: "Send to many recipients individually"
- [ ] **M17.1.3** Each mode shows a short description and icon when selected
- [ ] **M17.1.4** Active mode is highlighted with `bg-primary text-white`
- [ ] **M17.1.5** When mode changes, emit `onModeChange(mode)` callback
- [ ] **M17.1.6** If `disabled` is true (e.g., after any signer has signed), show disabled state with tooltip: "Cannot change mode once signing has begun"

### M17.2 — RolePanel Component
> **Files to create:** `src/components/document-editor/RolePanel.tsx`

- [ ] **M17.2.1** Build `RolePanel.tsx` with props:
  ```typescript
  interface IRolePanelProps {
    roles: IRole[];
    signingMode: SigningMode;
    onAddRole: (role: IRole) => void;
    onUpdateRole: (roleId: string, updates: Partial<IRole>) => void;
    onRemoveRole: (roleId: string) => void;
    onReorderRoles: (roles: IRole[]) => void;
  }
  ```
- [ ] **M17.2.2** Display list of roles, each showing:
  - Color dot (auto-assigned from a preset palette)
  - Role label (editable inline)
  - Assigned person name + email (or "Not assigned" placeholder)
  - Order badge (sequential mode only)
  - Required toggle
  - Delete button
- [ ] **M17.2.3** "Add Role" button that creates a new role with auto-generated color
  - Color palette: cycle through `['#E8760A', '#1A3D2B', '#0284c7', '#7c3aed', '#dc2626', '#059669', '#d97706']`
- [ ] **M17.2.4** In sequential mode: roles are displayed as a numbered list, draggable to reorder using dnd-kit
- [ ] **M17.2.5** In parallel mode: roles displayed as flat cards, no ordering UI
- [ ] **M17.2.6** In bulk mode: only one role allowed ("Recipient"), no add button, no ordering

### M17.3 — Document Editor Integration
> **Files to change:** `src/app/document-editor/index.tsx`

- [ ] **M17.3.1** Add `SigningModeSelector` to the editor toolbar or a dedicated panel
- [ ] **M17.3.2** Add `RolePanel` as a collapsible section in the sidebar (below FieldToolbar or PropertiesPanel)
- [ ] **M17.3.3** Wire mode change to update `activeDocument.signingMode` in `useDocumentStore`
- [ ] **M17.3.4** Wire role CRUD operations to the store

---

## Milestone 18 — Role-based Field Assignment

> **Goal:** Allow fields to be assigned to roles instead of just recipients, with color-coding per role.

### M18.1 — Field-Role Assignment
> **Files to change:** `src/components/document-editor/PropertiesPanel.tsx`, `src/components/document-editor/FieldOverlay.tsx`

- [ ] **M18.1.1** Update `PropertiesPanel` to show a role selector dropdown for each field
  - Dropdown lists all roles from the active document
  - Each option shows the role color dot + label
  - When a role is selected, update `field.assignedRoleId`
- [ ] **M18.1.2** Update `FieldOverlay` to display the assigned role's color as the field border/overlay color
- [ ] **M18.1.3** Show role label on the field overlay (small badge at top-right)
- [ ] **M18.1.4** Fields with no assigned role show a warning indicator

### M18.2 — Send Flow Components
> **Files to create:** `src/components/document-editor/SigningOrderStep.tsx`, `src/components/document-editor/RoleAssignmentStep.tsx`

- [ ] **M18.2.1** Build `SigningOrderStep.tsx` — visible only in sequential mode:
  - Drag-to-reorder interface for roles
  - Numbers auto-assign based on position
  - Visual chain preview: Step 1 → Step 2 → Step 3
- [ ] **M18.2.2** Build `RoleAssignmentStep.tsx`:
  - For each role, input fields: Name + Email
  - Use contacts autocomplete from `useRecipientStore`
  - Validate that all required roles have assignees

---

## Milestone 19 — Send Flow Enhancements (Per Mode)

> **Goal:** Implement mode-specific send flows for sequential, parallel, and bulk sending.

### M19.1 — Bulk Upload Step
> **Files to create:** `src/components/document-editor/BulkUploadStep.tsx`

- [ ] **M19.1.1** Build `BulkUploadStep.tsx`:
  - CSV file upload area (drag-and-drop or click to browse)
  - After upload: show a preview table of parsed CSV rows
  - Column mapping: map CSV columns to template field names
  - Validate: each row must have `name` and `email` columns
- [ ] **M19.1.2** Manual entry mode: add recipients one-by-one with name + email input rows

### M19.2 — Review and Send Step
> **Files to create:** `src/components/document-editor/ReviewAndSendStep.tsx`

- [ ] **M19.2.1** Build `ReviewAndSendStep.tsx` — final confirmation before sending:
  - Document title and page count summary
  - Signing mode badge
  - Full list of roles/signers with their status
  - Count of fields per role
  - Expiration date setting
  - "Send Document" primary button
- [ ] **M19.2.2** Mode-specific messaging:
  - Sequential: "Signer #1 will be notified first. Others will receive notification as each signer completes."
  - Parallel: "All signers will be notified simultaneously."
  - Bulk: "X document instances will be generated. Each recipient receives their own copy."

### M19.3 — Send Logic
> **Files to change:** `src/lib/stores/useDocumentStore.ts`

- [ ] **M19.3.1** Add `sendDocument(documentId: string)` action to store:
  - Sequential: mark first role as `NOTIFIED`, others remain `PENDING`
  - Parallel: mark all roles as `NOTIFIED`
  - Bulk: generate `DocumentInstance[]` from CSV data, each with unique magic link
- [ ] **M19.3.2** Update document status to `SENT`
- [ ] **M19.3.3** Create initial audit trail entry: `{ eventType: 'sent', timestamp: now }`

---

## Milestone 20 — Signer View & Signing Experience

> **Goal:** Update the public signing page to be role-aware, with proper field highlighting and sequential gating.

### M20.1 — Role-Aware Signing Page
> **Files to change:** `src/app/sign/[token]/index.tsx`

- [ ] **M20.1.1** Determine current signer's role from the magic link token
- [ ] **M20.1.2** Highlight the current signer's fields in their role color (interactive)
- [ ] **M20.1.3** Show other signers' fields, greyed out with lock icons (non-interactive)
- [ ] **M20.1.4** Sequential mode: if it's not the current signer's turn, show "Waiting for previous signer" state
- [ ] **M20.1.5** Show "Next signer will be notified after you sign" message (sequential mode)

### M20.2 — Signing Progress Components
> **Files to create:** `src/components/viewer/SigningProgressBar.tsx`

- [ ] **M20.2.1** Build `SigningProgressBar.tsx`:
  - Sequential mode: horizontal step chain (Step 1 → Step 2 → Step 3)
    - Active step: highlighted, shows role label + "Waiting" or "Signed"
    - Locked steps: greyed with lock icon
    - Completed steps: green check
  - Parallel mode: progress ring or counter ("2 of 4 signers completed")
- [ ] **M20.2.2** Integrate into both the signer view and the document viewer (sender view)

### M20.3 — Signing Chain Rules
> **Files to change:** `src/lib/stores/useDocumentStore.ts` or `src/lib/hooks/useSigningFlow.ts`

- [ ] **M20.3.1** Sequential: block access if previous signer hasn't completed
- [ ] **M20.3.2** Sequential: if signer declines → void entire document, notify sender
- [ ] **M20.3.3** Parallel: on each sign, check if all required roles are complete → if yes, mark document as COMPLETED
- [ ] **M20.3.4** Parallel: if one signer declines, notify sender but allow others to continue
- [ ] **M20.3.5** After signing: lock all signed fields (prevent modification)

---

## Milestone 21 — Sender Dashboard & Document Tracking

> **Goal:** Build sender-side tracking components to monitor document progress per mode.

### M21.1 — Document Status Card
> **Files to create:** `src/components/shared/DocumentStatusCard.tsx`

- [ ] **M21.1.1** Build `DocumentStatusCard.tsx`:
  - Overall document status
  - Signing mode badge (sequential / parallel / bulk)
  - Quick signer summary list
  - Link to full document view

### M21.2 — Sequential Tracking: SignerChain
> **Files to create:** `src/components/shared/SignerChain.tsx`

- [ ] **M21.2.1** Build `SignerChain.tsx`:
  - Step-by-step visual: numbered circles connected by lines
  - Each step shows: role label, assignee name, status icon (pending/notified/viewed/signed/declined)
  - Active step is highlighted and pulsing
  - Completed steps show green check

### M21.3 — Parallel Tracking: SignerGrid
> **Files to create:** `src/components/shared/SignerGrid.tsx`

- [ ] **M21.3.1** Build `SignerGrid.tsx`:
  - Flat grid of signer cards
  - Each card: avatar, name, email, status badge, role label, role color dot
  - Completion counter: "2 of 4 signers completed"

### M21.4 — Bulk Tracking: InstanceTable
> **Files to create:** `src/components/shared/InstanceTable.tsx`

- [ ] **M21.4.1** Build `InstanceTable.tsx`:
  - Table columns: Name | Email | Status | Last Activity | Actions
  - Row click opens that instance's document view
  - Status filter tabs: All / Pending / Completed / Declined
  - Batch actions: Void selected, Resend reminder

### M21.5 — Audit Trail Drawer
> **Files to create:** `src/components/shared/AuditTrailDrawer.tsx`

- [ ] **M21.5.1** Build `AuditTrailDrawer.tsx`:
  - Slide-out panel or sheet from the right side
  - Timeline of all audit events for the document
  - Each entry: icon, event description, role name, timestamp, IP address
  - Filter by event type
  - Uses shadcn `Sheet` component

---

## Milestone Quick Reference

| Milestone | Description | Scope | Dependencies |
|---|---|---|---|
| **M11** | Dashboard & Navigation Refactor | Dashboard merge, route cleanup, sidebar | None |
| **M12** | Document Vault: Sent + Received | Vault page, document types, mock data | None |
| **M13** | Contacts Enhancement | Contact edit modal, extended fields | None |
| **M14** | Company Management | Company page, store, types | M11 (sidebar) |
| **M15** | Signature Management | Signature page, store, color picker | M11 (sidebar) |
| **M16** | Signing System: Data Model | Types, enums, mock data extensions | None |
| **M17** | SigningModeSelector & RolePanel | Editor components | M16 |
| **M18** | Role-based Field Assignment | Field overlay, properties panel | M16, M17 |
| **M19** | Send Flow Enhancements | Bulk upload, review, send logic | M16, M17, M18 |
| **M20** | Signer View & Signing Experience | Signing page, progress bar | M16, M17 |
| **M21** | Sender Dashboard & Tracking | Status cards, chain, grid, table | M16, M17, M19 |
