# Your Day

[Your Day](https://your-day-teal.vercel.app) is a calm daily wishes experience built with Vue 3. It presents a new uplifting wish in Ukrainian or English, wrapped in an animated, atmospheric interface.

## Features

- More than 100 wishes in Ukrainian and English
- Language and theme switching with saved preferences
- Dark theme by default and an optional light theme
- Dynamic date formatting for both supported locales
- Animated card transitions, glowing particles, moving ambient words, and morning light effects
- Respect for the user's reduced-motion preference
- Responsive layout for desktop and mobile screens

## Tech Stack

- [Vue 3](https://vuejs.org/) with the Composition API and `<script setup>`
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Pinia](https://pinia.vuejs.org/) for application state
- [GSAP](https://gsap.com/) for motion design

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone git@github.com:dadi2008/your-day.git
cd your-day
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local address shown by Vite, usually `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run type-check` | Runs Vue and TypeScript type checking. |
| `npm run build` | Type-checks the project and creates a production build. |
| `npm run preview` | Serves the production build locally. |

## Project Structure

```text
src/
├── common/       # Shared constants, interfaces, and type definitions
├── components/   # Self-contained UI components with component-specific styles
├── helpers/      # Domain logic for wishes and animation calculations
├── stores/       # Pinia stores and persisted application state
├── utils/        # Reusable framework-independent utilities
├── App.vue       # Application composition
└── style.css     # Global styles and page shell
```

## State and Preferences

The Pinia store manages the selected language, active theme, and current wish. Language and theme preferences are stored in `localStorage`, so a returning visitor keeps their last selected settings.

## Deployment

The application is deployed on Vercel:

<https://your-day-teal.vercel.app>

Vercel detects the Vite configuration automatically and runs `npm run build` for production deployments.
