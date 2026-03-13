# EduExpert Migration Report

## What Changed

The project moved from a single-entry Vite app to a Next.js App Router structure.

Before:

- `src/App.tsx` owned all routing.
- `src/main.tsx` bootstrapped the whole app.
- route pages and large UI sections were tightly coupled.
- static content was consumed directly inside page components.

After:

- `src/app` now contains thin route files.
- `src/app/layout.tsx` is the application shell entrypoint.
- domain rendering lives in `src/components/<domain>`.
- content access is routed through `src/lib/services/*`.
- shared providers live in `src/app/providers.tsx`.

## Current Architecture

The new structure is intentionally closer to `cc-website`:

```text
src/
  app/
    layout.tsx
    page.tsx
    courses/page.tsx
    colleges/page.tsx
    colleges/[slug]/page.tsx
    news/page.tsx
    news/[slug]/page.tsx
    admissions/page.tsx
    scholarships/page.tsx
    trends-2026/page.tsx
    about/page.tsx
  components/
    home/
    courses/
    colleges/
    news/
    admissions/
    scholarships/
    trends/
    about/
    ui/
  lib/
    services/
    types/
    data.ts
```

Practical flow:

`route file -> shared shell/providers -> domain page component -> service layer -> static content`

That is not a CMS architecture yet, but it is now ready for one. The next safe step would be splitting `src/lib/data.ts` into domain files and then replacing service internals with API or CMS fetchers.

## Vite + React vs Next.js

### Vite + React

- client-side entrypoint starts from `main.tsx`
- routing depends on `react-router-dom`
- all pages are bundled as a client SPA
- SEO, metadata, and route-level loading behavior need more manual work
- deployment is simple for static/SPAs

### Next.js App Router

- filesystem routes live under `src/app`
- layout, not-found, and dynamic slug routes are first-class
- route files can stay thin and compose domain components
- server and client boundaries are explicit with `"use client"`
- easier future path for SSR, metadata, dynamic data, and incremental rendering

## Structural Difference in Practice

Old mental model:

`App router config -> page component -> direct static data usage`

New mental model:

`filesystem route -> domain component -> service layer -> content source`

Why this matters:

- page files become smaller and easier to reason about
- slug routes are easier to add without growing one central router
- static data can later be swapped for API/CMS responses inside services
- the UI becomes more reusable because it is no longer tied to router hooks

## What Was Intentionally Not Overdone

- The visual/UI layer was not rewritten again.
- The existing domain components were kept and adapted instead of being broken into dozens of tiny files.
- Static content still exists, because replacing it with remote data now would create unnecessary instability.

## Remaining Upgrade Path

If you continue the architecture toward `cc-website`, the next worthwhile steps are:

1. Split `src/lib/data.ts` into `src/lib/data/courses.ts`, `colleges.ts`, `news.ts`, and similar files.
2. Add adapter functions that map raw API/CMS payloads into the current UI-safe types.
3. Break the largest domain pages into section-level components only where reuse is real.
4. Add route metadata per page and slug page once live content is introduced.
