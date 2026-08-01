<div align="center">

<h1>🤖 DraftoDeploy</h1>

<p><strong>An immersive, interactive agency web application & digital product suite — from Draft to Deploy in record time.</strong></p>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Three.js-0.185-black?style=for-the-badge&logo=threedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
  <img src="https://img.shields.io/badge/SEO-100%25%20Optimized-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Mobile-100%25%20Responsive-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square" />
</p>

</div>

---

## 📖 Overview

**DraftoDeploy** is a high-performance, visually stunning agency platform built for web applications, mobile apps, SaaS MVPs, and AI integrations. It features an interactive 3D WebGL robot hero, real-time physics tracking, liquid bubble backgrounds, horizontal snap-scroll service cards, a 3-step interactive Price Estimator, 35 system architecture case studies on a standalone blog page, 100% free Google Webhook mail integration, and full mobile/tablet responsive optimization with rich SEO schemas.

> Built with React 19, Three.js, React Three Fiber, Framer Motion, Tailwind CSS v4, and Vite 8.

---

## ✨ Features & Architecture

### 🤖 3D Interactive Robot Hero (`RobotHero`)
- **Real-time WebGL rendering** via `@react-three/fiber` and `Three.js`
- **Mouse-tracking physics** — robot body and head follow your cursor with smooth lerp-based rotation
- **Procedurally generated PBR textures** (color + bump maps) generated asynchronously using Canvas API
- **Custom GLSL Fresnel shader** for the glowing glass visor effect
- **Animated blinking eyes** with configurable blink cycle, rendered using parametric `TubeGeometry`
- **Heart-eye Easter egg** — click the robot to toggle glowing ❤️ eyes for 2 seconds
- **Scroll indicator animation** that fades out as you scroll down using Framer Motion `useScroll` + `useTransform`

### 🧭 Smart Antenna Navbar (`AntennaNavbar`)
- **Auto-hide on scroll down / reveal on scroll up** with smooth `cubic-bezier` transition
- **Always visible at the top** of the page
- **Desktop floating pill** — frosted glass backdrop blur navbar with hover highlights
- **Mobile sidebar drawer** (`MobileSidebarDrawer`) for smooth navigation on small screens
- **Smooth anchor navigation** for all site sections (`#top`, `#projects`, `#blog`, `#about`, `#services`, `#estimator`, `#testimonials`, `#contact`)

### 🌊 About Section with Fluid Bubble Background (`AboutSection`)
- **Interactive liquid bubble animation** — fluid blobs that react to cursor movement
- **Frosted glass card** with `backdrop-blur-2xl` layered on top of the animation
- **4 animated stat cards**: Deployment Speed `<50ms`, Uptime SLA `99.99%`, 3D Rendering `60 FPS`, Deployed Projects `10,000+`
- **Tech stack badges**: React 19, Three.js, React Three Fiber, Tailwind CSS v4, TypeScript, Framer Motion, Vite, WebGL Engine

### 🧩 Services Section — Horizontal Snap Scroll (`ServicesSection`)
- **10 service cards** in a horizontally scrollable snap-scroll track:
  1. Full Stack Development
  2. Mobile Application Development
  3. 3D Interactive Landing Pages
  4. SaaS Development
  5. AI Integration & Autonomous Agents
  6. E-commerce & Shopify Solutions
  7. WordPress & Custom CMS
  8. iOS Development
  9. Existing Project Upgradation
  10. Custom Enterprise Software
- **Scroll hijack**: `IntersectionObserver` detects section visibility, then intercepts vertical wheel events to scroll cards horizontally
- **Floating Paths SVG background** (`FloatingPathsBackground`) animated with Framer Motion

### 🧮 Interactive Price Estimator & Quote Generator (`PriceEstimatorSection`)
- **3-Step Configurator**:
  1. **Select Core Services**: Multi-service selection unlocks automatic 10% – 15% bundle discounts
  2. **Choose Project Scope & Page Count**: Interactive range slider with free page credits ($25/extra page)
  3. **Add-ons & Velocity**: Infrastructure, CI/CD, SEO, AI integration, and Express 2x velocity options
- **Real-Time Terminal Receipt**: Live estimate breakdown with instant total cost calculation ($USD)
- **Direct Proposal Attachment**: Clicking *"Request Proposal"* attaches an uneditable proposal card directly into the Contact Section

### 📬 Contact Section with Free Mail Backend (`ContactSection`)
- **100% Free Google Webhook Mail Integration**: Form submissions trigger instant email lead notifications directly to your Gmail inbox with $0 monthly cost
- **Attached Proposal Card**: Displays locked, read-only estimate details with **Edit** (scrolls to Estimator) and **Delete** (clears quote) buttons
- **Form Reset on Re-submit**: Clicking *"Send Another Message"* clears input state for fresh entries
- **Ultra-Wide 1-Line Footer Navbar**: Single horizontal row displaying all navbar links (`Home`, `Projects`, `Blog`, `About`, `Services`, `Estimator`, `Review`, `Contact`) and copyright metadata

### 📚 Standalone Blog Page & System Architecture Case Studies (`BlogPage` & `BlogSection`)
- **Dedicated View**: Renders on `#blog` or `/blog` with an animated `AuroraBackground`
- **35 System Architecture Case Studies**: Deep-dive technical breakdowns including Problem Statement, Overcoming Strategy, Monorepo File Structure, Backend Working, and Core Features
- **Futuristic Reader Modal**: Fullscreen mobile-responsive reader with 1-click code block copying, progress bar, JSON-LD `BlogPosting` schema, and related study recommendations

### 💬 Testimonials Section — Infinite Scroll Columns (`TestimonialsSection`)
- **12 client testimonials** auto-scrolling in **3 independent columns** using Framer Motion infinite loop animation
- Responsive: 1 column on mobile, 2 on tablet, 3 on desktop
- DiceBear avatars and star ratings (⭐ × 5)

---

## 🔍 SEO & Mobile Responsiveness

- **Primary Meta Tags**: Keyword-rich titles, meta descriptions, author, and canonical link
- **Social Open Graph & Twitter Cards**: Full social sharing metadata
- **Structured Data (JSON-LD)**:
  - `Organization` Schema (Agency branding & founder info)
  - `ProfessionalService` Schema (Freelancing & startup service catalog)
  - `BlogPosting` Schema (Automated post indexing)
- **Search Engine Files**: Generated `sitemap.xml` and `robots.txt`
- **100% Mobile/Tablet Optimization**: Safe area insets, touch target sizing (44px min), non-overflowing grids, and touch scroll handling

---

## 🗂️ Project Structure

```
DraftoDeploy/
│
├── public/                              # Static public assets
│   ├── favicon.svg                      # Favicon SVG
│   ├── logo.png                         # Agency logo
│   ├── robots.txt                       # Search engine crawler rules
│   └── sitemap.xml                      # XML site map for indexing
│
├── src/
│   ├── assets/                          # Project images & assets
│   ├── components/                      # UI Section Components
│   │   ├── AboutSection.tsx             # About section & liquid bubble card
│   │   ├── AntennaNavbar.tsx            # Floating pill header navbar
│   │   ├── BlogSection.tsx              # 35 case studies grid & reader modal
│   │   ├── BubbleBackground.tsx         # Liquid SVG goo blob animation
│   │   ├── ContactSection.tsx           # Contact form & Google Mail Webhook
│   │   ├── FireworksBackground.tsx      # Canvas fireworks animation
│   │   ├── FloatingPathsBackground.tsx  # Animated SVG paths background
│   │   ├── MobileSidebarDrawer.tsx      # Slide-over mobile drawer nav
│   │   ├── ParticlesBackground.tsx      # Interactive canvas particle background
│   │   ├── PriceEstimatorSection.tsx    # 3-step price quote generator
│   │   ├── ServicesSection.tsx          # 10-card snap scroll services track
│   │   ├── TestimonialsSection.tsx      # 3-column infinite review scroll
│   │   └── aurora-background.tsx        # Aurora gradient background
│   │
│   ├── App.tsx                          # Core React app container
│   ├── BlogPage.tsx                     # Standalone Blog page component
│   ├── ProjectsPage.tsx                 # Projects catalog & 3D canvas hero
│   ├── RobotHero.tsx                    # 3D WebGL Robot canvas hero
│   ├── index.css                        # Global CSS & Tailwind rules
│   └── main.tsx                         # React entry point
│
├── index.html                           # SEO meta shell & JSON-LD schemas
├── vite.config.ts                       # Vite bundler configuration
└── package.json                         # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Ayush08k/DraftoDeploy.git

# 2. Navigate into the project directory
cd DraftoDeploy

# 3. Install dependencies
npm install
```

### Running Locally (Development)

```bash
npm run dev
```

Opens the local development server at **http://localhost:5173** with Hot Module Replacement (HMR).

### Building for Production

```bash
npm run build
```

Compiles TypeScript and bundles production assets into the `dist/` directory.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 👤 Author

**Ayush Kumar** — [@Ayush08k](https://github.com/Ayush08k)

> *From Draft to Deploy — Crafted with React, Three.js, and modern web design standards.*
