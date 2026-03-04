# ARG RABBY – Portfolio Website

A cutting-edge, fully-responsive personal portfolio for **ARG RABBY** ([@itrabbi24](https://github.com/itrabbi24)), Senior Full-Stack Software Developer.

## ✨ Features

- **Dark mode default** with light mode toggle
- **Hero section** with animated particle canvas, parallax, and typewriter effect
- **About section** with animated avatar, floating badges, and skill icons
- **Tech Stack** with interactive filterable grid, progress bars, and hover glow
- **Projects** with flip-card reveal, category filtering, and 3D tilt hover
- **Experience** with animated vertical timeline (desktop) / left timeline (mobile)
- **Contact** with form validation, success animation, and floating particles
- **Back to top** button, scroll-spy navigation, and hamburger mobile menu
- **Glassmorphism** cards, neon gradient accents, smooth Framer Motion animations

## 🛠 Tech Stack 

| Layer      | Tech                                      |
|------------|-------------------------------------------|
| Framework  | Next.js 14 (App Router)                   |
| Language   | TypeScript                                |
| Styling    | Tailwind CSS                              |
| Animation  | Framer Motion                             |
| Forms      | React Hook Form                           |
| Icons      | React Icons                               |
| Deployment | Vercel                                    |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Install & run

```bash
# Clone
git clone https://github.com/itrabbi24/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## 📦 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import the repo at [vercel.com](https://vercel.com).

## 📁 Project Structure

```
├── app/
│   ├── globals.css       # Global styles + Tailwind
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Main page composition
├── components/
│   ├── ThemeProvider.tsx # Dark/light theme context
│   ├── Navigation.tsx    # Sticky nav + scroll-spy + hamburger
│   ├── Hero.tsx          # Full-screen hero + particles + typewriter
│   ├── About.tsx         # Bio + skill icons + highlights
│   ├── TechStack.tsx     # Filterable skills grid
│   ├── Projects.tsx      # Flip-card projects + filter
│   ├── Experience.tsx    # Animated timeline
│   ├── Contact.tsx       # Form + particles + socials
│   ├── Footer.tsx        # Footer with nav + socials
│   └── BackToTop.tsx     # Floating back-to-top button
├── public/               # Static assets
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## 📄 License

MIT © ARG RABBY
