# Dr. Bagad Clinic — Website

A static, dependency-free website for Dr. Bagad Clinic (Mother & Child Care, Talegaon Dabhade).
No build step, no frameworks — just open `index.html` or deploy the folder as-is.

## Project structure

```
bagadclinic-redesign/
├── index.html              # Page markup only (sections clearly commented)
├── assets/
│   ├── css/
│   │   ├── base.css        # Design tokens (colors/spacing), reset, typography, buttons
│   │   ├── layout.css      # Header/nav, mobile menu, footer, back-to-top
│   │   ├── components.css  # Reusable UI: cards, chips, toggle, service pills, reveal
│   │   ├── sections.css    # Page sections: hero, marquee, contact
│   │   └── responsive.css  # Media queries (loaded last so overrides win)
│   └── js/
│       ├── data.js         # Editable content — the service lists live here
│       └── main.js         # Behaviour, split into small init* functions
└── images/                 # Logo, doctor photos, hero image, favicon
```

## Common edits

| I want to…                        | Edit this file |
| --------------------------------- | -------------- |
| Change colors / spacing / radius  | `assets/css/base.css` (`:root` and the dark-theme block) |
| Add or reword a service           | `assets/js/data.js` — the page rebuilds the pills automatically |
| Change phone / address / hours    | `index.html` → `#contact` section |
| Update a doctor's details or photo| `index.html` → `#specialists` section (+ swap file in `images/`) |
| Change a testimonial              | `index.html` → `#testimonials` section |
| Adjust an animation or behaviour  | `assets/js/main.js` (each feature is its own `init*` function) |

## Run locally

Open `index.html` directly in a browser, **or** serve it (recommended):

```bash
python3 -m http.server 8000    # then visit http://localhost:8000
```

## Deploy

Static site — drop the whole folder onto <https://app.netlify.com/drop>, or run
`netlify deploy --prod` inside it. Also works on GitHub Pages, Vercel, or any host.
