# Vibe SPA Dashboard

A lightweight hub for hosting and navigating a collection of self-contained single-page applications (SPAs) via GitHub Pages.

Live site: https://glenneboy.github.io/vibe-spa/

---

## Overview

Vibe SPA Dashboard is a static, zero-backend “app launcher” for small tools and experiments. Each app is a standalone HTML file served from the `docs` folder and linked from a simple dashboard page.

- **No build step** – just HTML, CSS, and JavaScript.
- **No backend** – everything runs client-side.
- **Easy to extend** – drop in a new SPA, add a link, and you’re done.

---

## Current apps

The dashboard currently exposes three SPAs:

1. **Strava Route Finder**  
   Advanced route filtering and discovery tool for Strava. Filter routes by distance, elevation, proximity, and more with interactive maps.  
   `docs/strava.html`

2. **Super Productivity**  
   Comprehensive productivity tool with task management, note-taking, and document organization features.  
   `docs/bionic.html`

3. **Mortgage Comparator**  
   Compare multiple mortgage scenarios side-by-side. Analyze interest rates, terms, and monthly payments to make informed home financing decisions.  
   `docs/mortgage-comparison.html`

The dashboard also shows:

- **Total apps** count
- **Last updated** timestamp
- Status badges (e.g., “Active”) for each app

---

## Tech stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Hosting:** GitHub Pages (served from the `docs` directory)
- **Architecture:** Each app is a self-contained SPA (no shared runtime required)

---

## Project structure

```text
vibe-spa/
├─ docs/
│  ├─ index.html              # Vibe SPA Dashboard (main hub)
│  ├─ strava.html             # Strava Route Finder SPA
│  ├─ bionic.html             # Super Productivity SPA
│  ├─ mortgage-comparison.html# Mortgage Comparator SPA
│  ├─ assets/                 # (Optional) shared images, CSS, JS
│  └─ ...                     # Any additional app HTML files
└─ README.md
