# Lead Triage Console

A lightweight console to triage **Leads** and convert them into **Opportunities**. No backend — loads from a local JSON file and simulates latency/errors to mimic a real API. Built to handle ~100 leads smoothly.

---

## ✨ Features

- **Leads List**
  - Load from local JSON (`src/data/leads.json`)
  - Fields: `id, name, company, email, source, score, status`
  - Search (name/company), Filter (status), Sort (score desc)
- **Lead Detail SlideOver**
  - Inline edit **email** (validated) and **status**
  - Save / Cancel with basic error handling
- **Convert to Opportunity**
  - Fields: `id, name, stage, amount (optional), accountName, fromLeadId`
  - Opportunities table with **stage badges**
- **UX/States**
  - Loading overlay, empty & error states
  - **Optimistic updates** with rollback on simulated failure
- **Responsive**
  - Tables adapt on mobile (hide non‑critical columns)
- **Persistence**
  - Search/filter stored in `localStorage` via `useLocalStorage`

---

## 🧰 Tech Stack

- **React + TypeScript** (Vite)
- **Tailwind CSS**
- **pnpm** (package manager)
- Local JSON + simulated latency (`simulate` / `delay`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+**
- pnpm **8+**

### Install & Run
```bash
pnpm install        # install deps
pnpm dev            # start dev server  → http://localhost:5173
pnpm build          # production build
pnpm preview        # preview dist
```

> If cloning this repo, Tailwind and the alias are already configured. If bootstrapping from scratch, see **Configuration** below.

---

## 🗂️ Project Structure

```
src/
  components/
    LeadTable.tsx
    LeadDetailPanel.tsx
    OpportunityTable.tsx
    base/
      BaseButton.tsx
      BaseInput.tsx
      BaseSelect.tsx          # custom select: caret animation + dropdown w/ scroll
      BaseSlideOver.tsx
      BaseSpinner.tsx
      BaseEmpty.tsx
      BaseErrorState.tsx
  data/
    leads.json
  types/
    lead.ts
    opportunity.ts
  utils/
    constants.ts              # statuses/stages + badge helpers
    fakeApi.ts                # delay/simulate with fail rate
    sort.ts
  App.tsx
  main.tsx
  index.css
```

---

## ⚙️ Configuration (only if setting up from scratch)

### Tailwind
**tailwind.config.js**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```
**src/index.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Path Alias `@`
**vite.config.ts**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
```
**tsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "resolveJsonModule": true
  }
}
```

---

## 🧪 Simulated API

`src/utils/fakeApi.ts`
```ts
export function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function simulate<T>(payload: T, ms = 600, failRate = 0.12): Promise<T> {
  await delay(ms);
  if (Math.random() < failRate) throw new Error('Network error (simulated)');
  return payload;
}
```

Used to:
- Add latency on load/updates
- Randomly fail optimistic updates (rollback path)

---

## 🧠 Hooks

### `useLeads`
Single place for data loading, filtering, sorting and updates.

Exposes:
- `leads` (already filtered/sorted)
- `loading`, `error`, `refresh()`
- `query`, `setQuery` (persisted)
- `status`, `setStatus` (persisted)
- `updateLead(patch)` → optimistic + rollback

`App.tsx` reuses this hook and keeps only UI concerns (selected lead, opportunities).

---

## 🎨 UI/UX Notes

- Tables: light theme with **gray surface**, headers colored
  - Leads: **blue** header
  - Opportunities: **green** header, **stage badges** by status
- SlideOver: **gray** background, **Save (green)**, **Cancel (yellow)**
- Inputs/Selects: **pill style**, clear placeholder, blue focus ring
- Custom Select: caret rotates (↑ closed / ↓ open), animated dropdown, internal **scroll**

---

## ❗ Troubleshooting

- **Failed to resolve import '@/…'**  
  Ensure alias is set in `vite.config.ts` and `tsconfig.json`. Restart dev server.

- **delay is not defined**  
  Confirm `delay` is exported in `fakeApi.ts` and used by `simulate`.

- **Select dropdown is clipped**  
  The dropdown uses `max-h-64 overflow-y-auto`. Make sure parents don’t force `overflow: hidden`.

- **JSON not loading**  
  Verify `src/data/leads.json` exists and the fetch path is `/src/data/leads.json` in dev.

---

## 🛠 Scripts

```bash
pnpm dev
pnpm build
pnpm preview
```

---

## 📄 License

MIT.
