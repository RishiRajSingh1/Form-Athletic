# FORM ATHLETIC

A fictional premium training club built with React, Vite, React Router, and Three.js. Entirely frontend-only: all accounts, memberships, bookings, and payments are demonstrations.

## Run locally

Requires Node.js 22.13+ and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. Build and preview production output:

```sh
npm run build
npm run preview
```

`dist/` is ready for any static host supporting an SPA fallback to `index.html`. All routes (`/auth`, `/checkout`, `/confirmation`, `/dashboard`) are client-side routes. On a static host, configure requests for unknown paths to serve `index.html` with HTTP 200. A `_redirects` file is included for hosts that support that convention.

## Demo journey

1. Choose Essential, Performance, or Private under Memberships.
2. Choose Monthly or Annual billing.
3. Continue with the plan, then use **Try Demo Account**, or enter a valid sample email and a sample password of 8+ characters.
4. Choose Demo Card or Demo UPI at checkout.
5. Use the **Demo control** to simulate Successful, Declined, or Cancelled. Payment processing lasts 1.5 seconds. Declined and cancelled outcomes preserve all choices for retry. Processing disables submission and checkout controls.
6. Success creates one demo transaction and activates the selected membership.
7. Open the dashboard, reserve/cancel sample classes, view demo payment history, and logout. Group bookings require Performance or Private.

No credentials are transmitted and passwords are never saved. This is intentionally not production authentication. Password reset reports a simulated reset and sends no email. No card numbers, CVVs, real UPI IDs, bank data, or payment authorization are requested.

## Editable configuration

`src/config.js` owns plan names, prices in USD, benefits, billing prices, feature comparison, and class data. Annual savings compare configured annual totals with 12 monthly payments; the full annual total is displayed alongside the monthly equivalent.

`src/main.jsx` contains reusable site and account components, client-side routes, local state, and the demo flows. `src/Scene.jsx` renders the barbell, separated plates, and gym environment. `src/style.css` controls the editorial theme and responsive layouts.

## Motion and assets

The scene uses actual WebGL, physically based materials, a procedural knurled grip texture, native scroll progress, a sticky desktop stage, and demand-driven rendering. Scroll controls camera movement, plate separation/reassembly, architecture camera travel, and a licensed exercise image sequence. It reverses with scrolling. The mobile scene is shorter, renders fewer segments, limits pixel ratio, and places equipment below the copy. Rendering stops when hidden or off-screen. Three.js is loaded in a separate lazy chunk.

Reduced motion and missing/lost WebGL use a static visual story. Account and membership features remain available. All images, fonts, favicon, and exercise frames are bundled locally; the experience requires no asset network calls.

Asset credits and licenses: `public/assets/LICENSES.md`. Generated concept imagery is clearly fictional. Generated-image briefs: `public/assets/prompts.json` and `gallery-prompts.json`. The adapted real exercise sequence is CC BY-SA 4.0; retain its attribution and license on redistribution.

## Local persistence

Only a whitelisted demo profile, session flag, selected plan/billing, preset payment choices, membership, demo payment history, and demo bookings persist under `form-demo-v1` in browser localStorage. No passwords or financial credentials are stored. Malformed JSON and invalid state are sanitized. Storage failures fall back to in-memory use. To clear demo content, remove this one localStorage key using browser developer tools.

## Verification

```sh
npm run dev -- --port 5174
npm test
```

The test defaults to `http://127.0.0.1:5174`. Override `FORM_TEST_URL` if your server uses another port. The test uses headless Chrome at `/usr/bin/google-chrome`; set `CHROME_PATH` for another installation, or install Playwright's Chromium and adapt the launch executable. It covers plan/billing preservation, annual totals, login validation, signup, password visibility/reset, payment success/decline/cancellation/retry, duplicate prevention, dashboard booking and filtering, logout, responsive widths, reduced motion, unavailable WebGL, invalid saved state, and absence of page errors. Screenshots are written under `tests/screenshots/`.

A feature-detected WebMCP tool, `stage_demo_membership`, uses the same plan-selection action as the UI. It only stages a choice for review and never completes payment. Tests validate registration, valid state changes, and rejected invalid input through a compatible simulated context.
