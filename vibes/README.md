# SignFlow Nepal 🇳🇵

> Digital document signing — built for Nepal's business culture.

A modern e-signature and document workflow SaaS frontend demo inspired by PandaDoc and SignNow, optimized for Nepal's paper-heavy business environment. Built with React + Vite, shadcn/ui, and Tailwind CSS.

---

## What Is This?

SignFlow Nepal is a **frontend portfolio demo** that simulates a full e-signature SaaS product. It covers the complete document lifecycle: upload → place fields → assign recipients → send → sign → audit trail → secure vault.

The product is designed around real problems in Nepal — rental deeds, consultancy agreements, NGO MoUs, HR contracts — all traditionally done with physical paper, courier, and manual signatures.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| UI Library | shadcn/ui + Tailwind CSS |
| Routing | React Router v6 (lazy loading + Skeleton UI) |
| State | Zustand + TanStack Query |
| Drag & Drop | dnd-kit |
| PDF Rendering | react-pdf (PDF.js) |
| Theme | Dual mode — light default + dark toggle |
| Backend | Hardcoded mock data (no real backend) |
| AI Tool | Google AI Studio (Gemini) |

---

## Project Structure

```
signflow-nepal/
├── public/
│   └── mock-pdfs/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── documents/
│   │   ├── templates/
│   │   ├── workflows/
│   │   ├── vault/
│   │   ├── analytics/
│   │   ├── contacts/
│   │   └── settings/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── document-editor/
│   │   ├── signature/
│   │   ├── viewer/
│   │   └── shared/
│   ├── lib/
│   │   ├── mock-data/
│   │   ├── hooks/
│   │   ├── stores/
│   │   └── utils/
│   ├── types/
│   └── i18n/
├── PRD.md
├── ARCHITECTURE.md
├── AGENTS.md
├── TODO.md
├── TASKS.md
├── CHANGELOG.md
├── BUGLOG.md
└── PROGRESS.md
```

---

## Getting Started

```bash
git clone https://github.com/your-username/signflow-nepal.git
cd signflow-nepal
npm install
npm run dev
```

---

## Key Routes

| Route | Screen |
|---|---|
| `/` | Landing Page |
| `/login` | Login |
| `/dashboard` | Main Dashboard |
| `/documents` | Documents List |
| `/documents/upload` | Upload Document |
| `/documents/:id` | Document Viewer |
| `/documents/:id/edit` | Field Placement Editor |
| `/documents/:id/recipients` | Recipients Setup |
| `/sign/:token` | Public Signing Page |
| `/templates` | Template Library |
| `/analytics` | Analytics Dashboard |
| `/vault` | Secure Document Vault |

---

## Nepal-Specific V1 Features

- 🇳🇵 Nepali / English language toggle
- 📱 WhatsApp / Viber signing link sharing
- 🖼️ Company seal / stamp upload field

---

## Demo Note

This is a mock frontend. Use any email/password on the login screen. All data is pre-seeded from `src/lib/mock-data/`.
