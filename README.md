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
  <img src="https://img.shields.io/badge/Mobile-100%25%20Optimized%2060FPS-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square" />
</p>

</div>

---

## 📖 Overview

**DraftoDeploy** is a high-performance, visually stunning agency platform built for web applications, mobile apps, SaaS MVPs, project refactoring, and AI integrations. Having successfully built and deployed **150+ custom projects**, DraftoDeploy features an interactive 3D WebGL robot hero, real-time physics tracking, liquid bubble backgrounds, a 90FPS 3-card infinite loop services carousel, a 3-step Dual-Currency Price Estimator (Global $ USD vs India ₹ INR), 35 system architecture case studies on a standalone blog page, 100% free Google Webhook mail integration, global client case study reviews, and full 60FPS mobile responsive performance optimization.

> Built with React 19, Three.js, React Three Fiber, Framer Motion, Tailwind CSS v4, and Vite 8.

---

## ✨ Key Features & Architecture

### 🤖 3D Interactive Robot Hero (`RobotHero`)
- **Real-time WebGL rendering** via `@react-three/fiber` and `Three.js`
- **Mouse-tracking physics** — robot body and head follow cursor with smooth lerp-based rotation
- **Procedurally generated PBR textures** (color + bump maps) generated asynchronously using Canvas API
- **Custom GLSL Fresnel shader** for the glowing glass visor effect
- **Animated blinking eyes** with configurable blink cycle, rendered using parametric `TubeGeometry`
- **Heart-eye Easter egg** — click the robot to toggle glowing ❤️ eyes for 2 seconds

### 🧭 Smart Antenna Navbar (`AntennaNavbar`)
- **Auto-hide on scroll down / reveal on scroll up** with smooth `cubic-bezier` transition
- **Desktop floating pill** — frosted glass backdrop blur navbar with hover highlights
- **Mobile sidebar drawer** (`MobileSidebarDrawer`) for smooth navigation on small screens
- **Smooth anchor navigation** (`#top`, `#projects`, `#blog`, `#about`, `#services`, `#estimator`, `#testimonials`, `#contact`)

### 🌊 About Section with 150+ Projects Track Record (`AboutSection`)
- **Startup Acceleration Narrative**: Highlights 150+ successfully deployed projects for startups and custom project sets
- **Right-side Services Provided Box**: Displays core development capabilities with tick icons
- **Liquid Bubble Background** (`BubbleBackground`): Interactive blobs with mobile-optimized CSS blurs (`max-sm:blur(35px)`) for smooth 60FPS mobile scrolling
- **Frosted Glass Container**: Layered `backdrop-blur-2xl` glass card with key metrics (<2 Weeks average MVP launch, 99.99% Uptime SLA)

### 🎡 90FPS 3-Card Infinite Services Carousel (`ServicesSection`)
- **3 Visible Cards Grid**: Displays 3 cards side-by-side on desktop (`lg:grid-cols-3`), 2 on tablet (`md:grid-cols-2`), and 1 on mobile
- **Endless Infinite Looping**: Smooth wrap-around navigation through all 11 services
- **Borderless Glowing Arrows**: Clean, borderless Left (`←`) and Right (`→`) arrow icons + touch swipe gestures + keyboard arrow navigation (`←` / `→`)
- **Required Languages & Tech Stacks**: Every card explicitly lists all required programming languages (`TypeScript`, `JavaScript`, `Python`, `Swift`, `Kotlin`, `Dart`, `PHP`, `Go`, `Rust`, `C++`, `HTML5/CSS3`) and framework stacks
- **Intense Frosted Glass Blur**: Cards feature soft `backdrop-blur-3xl` over floating SVG paths (`FloatingPathsBackground`)
- **1-Click Estimator Integration**: Clicking *"Estimate Cost"* selects that service in the Price Estimator and smooth scrolls to `#estimator`

### 🧮 Dual-Currency Price Estimator & Proposal Generator (`PriceEstimatorSection`)
- **Global vs. India Country Selector**: Toggle between International rates (`$ USD`) and local Indian startup pricing (`₹ INR`)
  - **Indian Rates**: Basic Website (`₹8,999`), 3D Landing (`₹24,999`), AI Integration (`₹39,999`), Full Stack (`₹59,999`), Mobile App (`₹49,999`), SaaS Platform (`₹54,999`), Native iOS (`₹79,999`), Extra Pages (`₹499/page`), Growth Scope (`₹7,999`), Enterprise Scope (`₹15,999`), Add-ons (`₹5,999 - ₹14,999`)
  - **Starter / MVP Scope Tier**: Displayed cleanly as **`Free`**
- **3-Step Configurator**:
  1. **Select Core Services**: Multi-service selection unlocks 10% – 15% bundle discounts
  2. **Project Scope & Page Count**: Interactive range slider with free page credits per service
  3. **Add-ons & Delivery Velocity**: Infrastructure, CI/CD, SEO, AI integration, and Express delivery options
- **Live Terminal Receipt**: Real-time receipt breakdown with live cost calculation in chosen currency
- **Direct Proposal Attachment**: Clicking *"Request Proposal"* attaches an uneditable proposal card directly into the Contact Section

### 💬 Global Client Reviews & Case Studies (`TestimonialsSection`)
- **15 International & Indian Client Reviews**: Feature reviewers from 🇮🇳 India (Bengaluru, Mumbai, Delhi, Hyderabad, Pune), 🇺🇸 USA, 🇦🇪 UAE (Dubai, Abu Dhabi), 🇬🇧 UK, 🇨🇦 Canada, 🇦🇺 Australia, 🇩🇪 Germany, and 🇸🇬 Singapore
- **Real Project Showcase Names**: Reviews feature real projects (*DevDock*, *SiteGuard*, *FormForge*, *DocuSigner*, *Apex Analytics*, *KubeCloud*, *TaskSync*, *LearnLoom*, *EcoTrack*, *Zenith Health*, *PagePulse*, *LocalBite*, *InvoiceFlow*, *WhisperChat*, *MailBlast*)
- **Problem ➔ Solution Case Study Structure**: Documents what the technical bottleneck was, what DraftoDeploy delivered, and praises DraftoDeploy's 150+ project experience

### 📬 Contact Section with Free Email Backend (`ContactSection`)
- **100% Free Google Webhook Mail Integration**: Form submissions trigger instant email lead notifications directly to your Gmail inbox with $0 monthly cost
- **Attached Proposal Card**: Displays locked, read-only estimate details with **Edit** (scrolls to Estimator) and **Delete** (clears quote) buttons
- **Ultra-Wide 1-Line Footer Navbar**: Single horizontal row displaying all navbar links and copyright metadata

### 📚 Standalone Blog Page & System Architecture Case Studies (`BlogPage` & `BlogSection`)
- **Dedicated View**: Renders on `#blog` or `/blog` with an animated `AuroraBackground`
- **35 System Architecture Case Studies**: Deep-dive technical breakdowns including Problem Statement, Overcoming Strategy, Monorepo File Structure, Backend Working, and Core Features
- **Futuristic Reader Modal**: Fullscreen mobile-responsive reader with 1-click code block copying, progress bar, JSON-LD `BlogPosting` schema, and related study recommendations

---

## ⚡ Mobile Performance Optimization (60FPS Target)

- **SVG Filter Fallback**: Switches from heavy SVG `<feColorMatrix>` matrix filters to clean CSS blur on mobile screens (`max-sm:blur(35px)`), preventing mobile GPU stutter
- **Static Vector Path Rendering**: Reduces SVG path count to 12 static paths on mobile view (`isMobile`) in `FloatingPathsBackground`
- **Reduced Canvas Particle Count**: Automatically scales down `ParticlesBackground` canvas count to 25 particles on mobile view
- **Hardware Acceleration**: Enforces `transform-gpu`, `touch-pan-x`, and `-webkit-overflow-scrolling: touch` for buttery smooth 60FPS mobile touch gestures

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
│   │   ├── AboutSection.tsx             # About section with 150+ projects track record
│   │   ├── AntennaNavbar.tsx            # Floating pill header navbar
│   │   ├── BlogSection.tsx              # 35 case studies grid & reader modal
│   │   ├── BubbleBackground.tsx         # Liquid SVG goo blob animation with mobile fallbacks
│   │   ├── ContactSection.tsx           # Contact form & Google Mail Webhook backend
│   │   ├── FireworksBackground.tsx      # Canvas fireworks animation
│   │   ├── FloatingPathsBackground.tsx  # Animated & mobile-optimized SVG paths background
│   │   ├── MobileSidebarDrawer.tsx      # Slide-over mobile drawer nav
│   │   ├── ParticlesBackground.tsx      # Interactive canvas particle background
│   │   ├── PriceEstimatorSection.tsx    # 3-step dual currency price quote generator
│   │   ├── ServicesSection.tsx          # 90FPS 3-card infinite loop services carousel
│   │   ├── TestimonialsSection.tsx      # 15 global client case study reviews
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

Compiles TypeScript and bundles production assets into the `dist/` directory with 0 errors.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 👤 Author

**Ayush Kumar** — [@Ayush08k](https://github.com/Ayush08k)

> *From Draft to Deploy — Crafted with React 19, Three.js, and modern web engineering standards.*
