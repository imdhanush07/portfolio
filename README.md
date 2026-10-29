# Dhanush Raj P — Portfolio

Next.js + TypeScript + Tailwind + Framer Motion.

## How to Manage My Portfolio

**You do not need to touch code.** Use the built-in editor.

### 1. Open the editor

```bash
npm install     # first time only
npm run dev
```

Open **http://localhost:3000/admin**, change anything, press **Save**.
Your site at http://localhost:3000 updates immediately.

### 2. What you can do in the editor

| Tab | What you can change |
|---|---|
| **Sections & Tabs** | Rename tabs, reorder (arrows), hide/show a section, show/hide its navbar tab, **add brand-new sections** |
| **Profile** | Name, headline, rotating roles, bio, email, phone, location, hero badge, About text, **profile photo (upload)** |
| **Skills / Learning Journey** | Add, edit, remove, reorder |
| **Projects** | Title, description, technologies, live link, GitHub link, featured |
| **Education / Experience / Certifications / Career Goals / Social Links** | Add, edit, remove, reorder |

### 3. Put your changes online

The editor saves to one file: **`data/content.json`**. That file *is* your portfolio's content.
After saving, publish it the way you normally deploy:

```bash
git add .
git commit -m "Update portfolio"
git push        # Vercel/Netlify rebuild automatically
```

> **Important:** saving only works on your own computer (`npm run dev`).
> On the deployed website `/admin` shows a notice and cannot save. This is deliberate so nobody else can edit your site.

### Adding a new tab (no code)

Sections & Tabs → **Add a new section (tab)**. Fill in the tab name, heading, a paragraph, and optional cards. Save.

### Editing by hand (optional)

Everything in the editor maps to `data/content.json`:

- `sections` → `enabled`, `showInNavbar`, `navLabel`, `order`
- `profile`, `skills`, `projects`, `education`, `experience`, `certifications`, `careerGoals`, `social`

### Adding a custom-designed section (code)

Only needed if the "Custom" section type is not enough:

1. Create `components/sections/MySection.tsx` (give its `<section>` an `id`).
2. Register it in `lib/sectionRegistry.tsx`.
3. Add a section with `"component": "MySection"` in `data/content.json`.

### Not editable in the editor

Section headings and intro sentences inside the built-in sections (for example "Technical foundation") and the "Let's talk" button text live in `components/sections/*.tsx`.

## Project layout

```
data/content.json        ← ALL content + section list (edited by /admin)
data/*.ts                ← thin wrappers that read content.json
app/admin/               ← the editor (local only)
app/api/admin/           ← save/upload endpoints (refuse to run in production)
lib/sectionRegistry.tsx  ← maps section component names to components
components/sections/     ← section designs
```

## Scripts

`npm run dev` · `npm run build` · `npm run lint`
