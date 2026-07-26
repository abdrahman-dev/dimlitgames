# Dimlit Games

Official website for Dimlit Games — an independent game studio creating atmospheric indie games inspired by the PS1 era.

Built with React, TypeScript, Vite and Tailwind CSS.

![Dimlit Games](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/Source%20Code-MIT-green)
![Assets](https://img.shields.io/badge/Assets-All%20Rights%20Reserved-red)

## Features

- Dark atmospheric theme with Dawn mode toggle
- PS1-inspired UI (square corners, flat surfaces, chunky borders)
- Responsive design (mobile, tablet, desktop)
- Framer Motion scroll animations
- SEO optimised with Open Graph and Twitter Card support
- Floating WhatsApp button
- Loading screen with cinematic fade
- Noise overlay for retro texture

## Tech Stack

- **React 19** — UI library
- **TypeScript 5.8** — Type safety
- **Vite 6** — Build tool
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion 12** — Animations
- **react-helmet-async** — SEO meta tags
- **Vercel** — Deployment

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

Produces a production build in `dist/`.

### Preview

```bash
npm run preview
```

Serves the production build locally.

## Project Structure

```
dimlit-games/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── logos/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Footer.tsx
│   │   ├── GameCard.tsx
│   │   ├── Image.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navbar.tsx
│   │   ├── NoiseOverlay.tsx
│   │   ├── ScrollIndicator.tsx
│   │   ├── SocialCard.tsx
│   │   └── WhatsAppButton.tsx
│   ├── config/
│   │   ├── site.ts
│   │   └── theme.ts
│   ├── data/
│   │   ├── games.ts
│   │   └── projects.ts
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   └── useTheme.ts
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── FindUs.tsx
│   │   ├── Games.tsx
│   │   ├── Hero.tsx
│   │   └── Philosophy.tsx
│   ├── services/
│   │   ├── GameService.ts
│   │   └── ProjectService.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── cn.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── content/
│   ├── articles/
│   └── devlogs/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vercel.json
├── ASSETS_LICENSE.md
├── .gitignore
├── LICENSE
└── README.md
```

## Deployment

The site is deployed on Vercel. Push to the `main` branch to trigger an automatic deployment.

[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel)](https://dimlitgames.vercel.app)

## License

This repository uses a dual-licensing model:

| Component | License |
|-----------|---------|
| Source code (TypeScript, CSS, configuration) | [MIT License](LICENSE) — free to use, modify, and distribute |
| Branding, artwork, logos, and visual assets | [All Rights Reserved](ASSETS_LICENSE.md) — proprietary to Dimlit Games |

### Source Code

The source code — including all `.ts`, `.tsx`, `.css`, `.json`, and configuration files — is licensed under the MIT License. You are welcome to study it, adapt it, and use it in your own projects.

See [LICENSE](./LICENSE) for the full terms.

### Branding & Visual Assets

The Dimlit Games name, logo, banner artwork, favicon, and all future creative assets are **not** part of the MIT License. They remain the exclusive intellectual property of Dimlit Games and may not be reused without written permission.

See [ASSETS_LICENSE.md](./ASSETS_LICENSE.md) for the full terms.

---

© 2026 Dimlit Games. All Rights Reserved for branding and visual assets.
