'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Code2, 
  Star,
  Search,
  X,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';


import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass
} from 'three/tsl';

// High-reliability textures + Procedural Data URI fallbacks
const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

// Post Processing component
const PostProcessing = ({
  strength = 1,
  threshold = 1,
}: {
  strength?: number;
  threshold?: number;
}) => {
  const { gl, scene, camera } = useThree();

  const render = useMemo(() => {
    try {
      const postProcessing = new THREE.PostProcessing(gl as any);
      const scenePass = pass(scene, camera);
      const scenePassColor = scenePass.getTextureNode('output');
      const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

      // Add bloom effect
      const final = scenePassColor.add(bloomPass);

      postProcessing.outputNode = final;

      return postProcessing;
    } catch (e) {
      console.warn("PostProcessing setup note:", e);
      return null;
    }
  }, [camera, gl, scene, strength, threshold]);

  useFrame(() => {
    if (render && 'renderAsync' in render) {
      (render as any).renderAsync();
    }
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const textures = useTexture(
    [TEXTUREMAP.src, DEPTHMAP.src]
  );

  const rawMap = textures[0] || null;
  const depthMap = textures[1] || null;

  const meshRef = useRef<Mesh>(null);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);

    const strength = 0.01;

    const tDepthMap = texture(depthMap);

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));

    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth = tDepthMap;

    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    const mask = dot.mul(flow).mul(vec3(10, 0, 0));

    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 1,
    });

    return {
      material,
      uniforms: {
        uPointer,
        uProgress,
      },
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
    if (meshRef.current && 'material' in meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as any;
      if ('opacity' in mat) {
        mat.opacity = THREE.MathUtils.lerp(
          mat.opacity,
          1,
          0.07
        );
      }
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  const scaleFactor = 0.40;
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

// Fallback procedural Mesh if WebGPU textures are loading
const FallbackScene = () => {
  const meshRef = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5 + pointer.x * 0.5;
    }
  });
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial color="#e11d48" wireframe emissive="#e11d48" emissiveIntensity={0.5} />
    </mesh>
  );
};

export const Html = () => {
  const titleWords = 'Build Your Dreams'.split(' ');
  const subtitle = 'Where Cutting-Edge Software Engineering Meets Premium Design.';
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords((prev) => prev + 1), 300);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  const scrollToGrid = () => {
    const gridElem = document.getElementById('projects-grid-section');
    if (gridElem) {
      gridElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen min-h-[600px] w-full bg-zinc-950 overflow-hidden flex flex-col justify-between select-none">
      {/* Animated Text Hero Overlay */}
      <div className="h-full w-full absolute inset-0 z-30 pointer-events-none px-6 md:px-10 flex justify-center items-center flex-col text-center">
        <div className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="flex space-x-3 sm:space-x-4 lg:space-x-6 overflow-hidden text-white justify-center flex-wrap">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={index < visibleWords ? 'fade-in' : ''}
                style={{
                  animationDelay: `${index * 0.12 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? 1 : 0,
                  transition: 'opacity 0.3s ease-out'
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm sm:text-xl xl:text-2xl 2xl:text-3xl mt-4 overflow-hidden text-zinc-300 font-bold max-w-2xl drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
          <div
            className={subtitleVisible ? 'fade-in-subtitle' : ''}
            style={{
              animationDelay: `${titleWords.length * 0.12 + 0.15 + subtitleDelay}s`,
              opacity: subtitleVisible ? 1 : 0,
              transition: 'opacity 0.4s ease-out'
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      {/* Frameless scroll indicator with text and two stacked down arrows (Matching Home Screen) */}
      <div
        onClick={scrollToGrid}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto cursor-pointer flex flex-col items-center gap-1 select-none text-center group"
      >
        <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white tracking-widest uppercase transition-colors">
          Scroll for details
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center -space-y-1.5 text-zinc-400 group-hover:text-white transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
          <ChevronDown className="w-4 h-4 opacity-60" />
        </motion.div>
      </div>

      {/* R3F WebGPU / WebGL Canvas */}
      <Canvas
        flat
        className="w-full h-full absolute inset-0 z-10"
        gl={async (props) => {
          try {
            // Attempt WebGPU Renderer initialization
            const renderer = new THREE.WebGPURenderer(props as any);
            await renderer.init();
            return renderer;
          } catch (err) {
            console.warn("WebGPU initialization notice - falling back to WebGL backend:", err);
            // Fallback to WebGL backend inside WebGPURenderer
            const fallbackRenderer = new THREE.WebGPURenderer({
              ...(props as any),
              forceWebGL: true,
            });
            await fallbackRenderer.init();
            return fallbackRenderer;
          }
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={<FallbackScene />}>
          <PostProcessing />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Dynamically import all images from Assets/project images directory
const imageModules = import.meta.glob<{ default: string }>('../Assets/project images/*.png', { eager: true });

const getProjectImage = (filename: string): string => {
  const key = Object.keys(imageModules).find((k) =>
    k.toLowerCase().endsWith(filename.toLowerCase())
  );
  if (key && imageModules[key]) {
    return imageModules[key].default || (imageModules[key] as unknown as string);
  }
  return '';
};

// Projects Catalog Data
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'ai-business-dashboard',
    title: 'AI Business Analytics Dashboard',
    category: 'AI & ML',
    description: 'Enterprise intelligence suite with automated revenue forecasting, churn analytics, and AI executive summaries.',
    longDescription: 'An enterprise-grade business intelligence platform leveraging LLMs and machine learning algorithms to analyze organizational metrics in real-time. Features automated data ingestion pipelines, dynamic predictive charts, and natural language query generation for non-technical stakeholders.',
    image: getProjectImage('ai business dashboard.png'),
    tags: ['Python', 'React', 'TypeScript', 'FastAPI', 'PyTorch', 'Tailwind CSS'],
    metrics: [
      { label: 'Forecast Accuracy', value: '98.4%' },
      { label: 'Processing Speed', value: '45ms' },
      { label: 'Active Users', value: '120k+' }
    ],
    liveUrl: 'https://example.com/ai-business',
    githubUrl: 'https://github.com/example/ai-business',
    featured: true
  },
  {
    id: 'e-commerce-ecosystem',
    title: 'OmniChannel E-Commerce Suite',
    category: 'E-Commerce',
    description: 'High-concurrency headless store platform with sub-second page loads, automated inventory sync, and multi-currency checkout.',
    longDescription: 'Architected for massive digital retail volume, this storefront utilizes Next.js App Router, edge caching, and serverless payment webhooks. Includes custom inventory management, intelligent cart recommendations, and international checkout support with 15+ payment gateways.',
    image: getProjectImage('E-commerce.png'),
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Stripe API', 'PostgreSQL'],
    metrics: [
      { label: 'Conversion Boost', value: '+34%' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Monthly GMV', value: '$4.2M' }
    ],
    liveUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/example/ecommerce',
    featured: true
  },
  {
    id: 'ai-code-review',
    title: 'AI Automated Code Reviewer',
    category: 'AI & ML',
    description: 'Developer tool performing instant static code analysis, vulnerability detection, and automated PR inline refactoring.',
    longDescription: 'Integrated into GitHub & GitLab workflows, this AI engine analyzes code diffs for security bugs, memory leaks, and performance bottlenecks before code hits staging. Generates automated fix suggestions and enforces clean code standards across engineering teams.',
    image: getProjectImage('ai code review.png'),
    tags: ['Python', 'Rust', 'TypeScript', 'Docker', 'OpenAI API', 'React'],
    metrics: [
      { label: 'Bugs Caught', value: '15,000+' },
      { label: 'Review Speed', value: '< 2 min' },
      { label: 'Dev Time Saved', value: '40%' }
    ],
    liveUrl: 'https://example.com/ai-code-review',
    githubUrl: 'https://github.com/example/ai-code-review',
    featured: true
  },
  {
    id: 'crypto-tracker',
    title: 'Crypto Tracker & Web3 Wallet',
    category: 'Fintech',
    description: 'Real-time multi-chain portfolio tracker with Web3 wallet integration, token swap routing, and instant price alerts.',
    longDescription: 'A comprehensive Web3 dashboard providing real-time telemetry across Ethereum, Solana, and Layer 2 networks. Features live WebSocket price feeds, automated impermanent loss calculators for liquidity providers, and non-custodial wallet management.',
    image: getProjectImage('crypto tracker.png'),
    tags: ['TypeScript', 'React', 'Web3.js', 'Tailwind CSS', 'Node.js', 'Chart.js'],
    metrics: [
      { label: 'Chains Supported', value: '14+' },
      { label: 'Latency', value: '12ms' },
      { label: 'Assets Tracked', value: '$850M' }
    ],
    liveUrl: 'https://example.com/crypto-tracker',
    githubUrl: 'https://github.com/example/crypto-tracker',
    featured: true
  },
  {
    id: 'devdock',
    title: 'DevDock Cloud Workstation',
    category: 'Developer Tools',
    description: 'DevOps portal for provisioning ephemeral development environments, monitoring server health, and managing containers.',
    longDescription: 'Eliminating the "works on my machine" problem, DevDock provisions isolated Docker and Kubernetes environments in seconds. Includes real-time pod logs, automated SSL termination, and resource quota management.',
    image: getProjectImage('devdock.png'),
    tags: ['Go', 'TypeScript', 'React', 'Docker', 'Kubernetes', 'Tailwind CSS'],
    metrics: [
      { label: 'Provision Time', value: '8.2s' },
      { label: 'Active Containers', value: '50k+' },
      { label: 'Cloud Cost Cut', value: '28%' }
    ],
    liveUrl: 'https://example.com/devdock',
    githubUrl: 'https://github.com/example/devdock',
    featured: true
  },
  {
    id: 'agency-portfolio',
    title: 'Agency Portfolio Studio',
    category: 'Web Apps',
    description: 'Ultra-slick digital portfolio experience for modern design studios with WebGL shaders and interactive case studies.',
    longDescription: 'Created for top-tier creative agencies, this interactive platform combines custom Three.js fragment shaders, fluid page transitions, and smooth scroll physics to showcase high-impact branding and software engineering visual case studies.',
    image: getProjectImage('agency portfolio.png'),
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    metrics: [
      { label: 'Avg Session', value: '4m 12s' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Award Score', value: '9.8/10' }
    ],
    liveUrl: 'https://example.com/agency-portfolio',
    githubUrl: 'https://github.com/example/agency-portfolio'
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content & Copy Generator',
    category: 'AI & ML',
    description: 'Multimodal generative AI workspace for producing SEO articles, ad copy, marketing graphics, and social posts.',
    longDescription: 'Empowering marketing agencies and growth teams, this content suite combines natural language generation with AI image diffusion models. Includes automated brand tone alignment, SEO keyword density optimization, and export to CMS platforms.',
    image: getProjectImage('ai content generator.png'),
    tags: ['TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'OpenAI API', 'Python'],
    metrics: [
      { label: 'Articles Generated', value: '250k+' },
      { label: 'Time Saved', value: '75%' },
      { label: 'SEO Rank Gain', value: '+45%' }
    ],
    liveUrl: 'https://example.com/ai-content',
    githubUrl: 'https://github.com/example/ai-content'
  },
  {
    id: 'ai-predictive',
    title: 'AI Predictive Intelligence Engine',
    category: 'AI & ML',
    description: 'Machine learning analytics engine for customer churn prediction, dynamic pricing models, and demand forecasting.',
    longDescription: 'High-throughput predictive analytics framework that processes historical transactional data to identify customer risk profiles, recommend optimal pricing strategies, and forecast inventory stock requirements months in advance.',
    image: getProjectImage('ai predictive.png'),
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Chart.js', 'PostgreSQL'],
    metrics: [
      { label: 'Churn Reduction', value: '22%' },
      { label: 'Model Accuracy', value: '96.8%' },
      { label: 'Data Points/Sec', value: '1.2M' }
    ],
    liveUrl: 'https://example.com/ai-predictive',
    githubUrl: 'https://github.com/example/ai-predictive'
  },
  {
    id: 'ai-travel-planner',
    title: 'AI Smart Itinerary Travel Planner',
    category: 'AI & ML',
    description: 'Personalized trip planner generating tailored day-by-day travel itineraries based on budget, style, and real-time data.',
    longDescription: 'Leverages geospatial APIs and AI location algorithms to craft custom travel routes, recommend local dining spots, schedule flight transitions, and optimize daily activity schedules for seamless vacations.',
    image: getProjectImage('ai travel planner.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Google Maps API', 'Python'],
    metrics: [
      { label: 'Trips Planned', value: '80k+' },
      { label: 'User Rating', value: '4.9/5' },
      { label: 'Plan Time', value: '15 secs' }
    ],
    liveUrl: 'https://example.com/ai-travel',
    githubUrl: 'https://github.com/example/ai-travel'
  },
  {
    id: 'apex',
    title: 'Apex Financial Operations Hub',
    category: 'Fintech',
    description: 'High-throughput payment routing engine and cryptographic general ledger built for enterprise scale operations.',
    longDescription: 'An ultra-reliable financial backend handling multi-currency settlements, automated reconciliations, fraud monitoring, and double-entry ledger security with zero latency bottlenecks.',
    image: getProjectImage('apex.png'),
    tags: ['Go', 'TypeScript', 'React', 'PostgreSQL', 'Redis', 'Kafka'],
    metrics: [
      { label: 'Daily Volume', value: '$120M' },
      { label: 'Uptime', value: '99.999%' },
      { label: 'Settlement Time', value: '120ms' }
    ],
    liveUrl: 'https://example.com/apex',
    githubUrl: 'https://github.com/example/apex'
  },
  {
    id: 'assethub',
    title: 'AssetHub Digital Asset Manager',
    category: 'Cloud & DevOps',
    description: 'Centralized cloud media library featuring automated image compression, smart AI tagging, and instant CDN delivery.',
    longDescription: 'Designed for design and engineering teams, AssetHub organizes terabytes of digital assets with smart AI tagging, vector previews, automated responsive webp conversion, and global CDN links.',
    image: getProjectImage('assethub.png'),
    tags: ['TypeScript', 'React', 'AWS S3', 'Node.js', 'GraphQL', 'Tailwind CSS'],
    metrics: [
      { label: 'Assets Stored', value: '4.5M+' },
      { label: 'Bandwidth Saved', value: '42%' },
      { label: 'CDN Speed', value: '18ms' }
    ],
    liveUrl: 'https://example.com/assethub',
    githubUrl: 'https://github.com/example/assethub'
  },
  {
    id: 'bookself',
    title: 'Bookself Interactive Library & Reader',
    category: 'Web Apps',
    description: 'Modern digital reading workspace with smart text highlighting, audio narration sync, and reader analytics.',
    longDescription: 'A refined web reading platform for e-books and technical papers with full offline access, customizable typography styles, interactive note-taking, and community book clubs.',
    image: getProjectImage('bookself.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'PWA', 'IndexedDB'],
    metrics: [
      { label: 'Books Indexed', value: '100k+' },
      { label: 'Daily Active', value: '45k' },
      { label: 'Offline Sync', value: '100%' }
    ],
    liveUrl: 'https://example.com/bookself',
    githubUrl: 'https://github.com/example/bookself'
  },
  {
    id: 'chatbot-ecommerce',
    title: 'E-Commerce AI Conversational Bot',
    category: 'AI & ML',
    description: 'Intelligent support bot handling instant order tracking, product matching, returns, and FAQs 24/7.',
    longDescription: 'Custom trained on store catalog datasets, this conversational AI assistant resolves customer inquiries instantly, suggests cross-sell items during chats, and integrates into WhatsApp and web widgets.',
    image: getProjectImage('chatbot for ecommerce.png'),
    tags: ['Python', 'LangChain', 'TypeScript', 'React', 'Node.js', 'WebSockets'],
    metrics: [
      { label: 'Deflection Rate', value: '78%' },
      { label: 'Response Time', value: '0.8s' },
      { label: 'CSAT Score', value: '4.8/5' }
    ],
    liveUrl: 'https://example.com/chatbot-ecom',
    githubUrl: 'https://github.com/example/chatbot-ecom'
  },
  {
    id: 'coding-sandbox',
    title: 'Cloud Coding Sandbox & Compiler',
    category: 'Developer Tools',
    description: 'Browser-based code execution environment supporting 20+ languages with live multi-developer pair programming.',
    longDescription: 'Provides instantly ready, isolated Docker container runtimes in the browser. Supports real-time collaborative editing, terminal access, package installations, and one-click deployment URLs.',
    image: getProjectImage('coding sandbox.png'),
    tags: ['TypeScript', 'React', 'Node.js', 'Docker', 'WebAssembly', 'Tailwind CSS'],
    metrics: [
      { label: 'Languages', value: '24 Supported' },
      { label: 'Execution', value: '< 100ms' },
      { label: 'Code Sessions', value: '1.8M' }
    ],
    liveUrl: 'https://example.com/coding-sandbox',
    githubUrl: 'https://github.com/example/coding-sandbox'
  },
  {
    id: 'collabedit',
    title: 'CollabEdit Real-Time Workspace',
    category: 'Developer Tools',
    description: 'Real-time collaborative document platform featuring CRDT-based multi-user sync and inline commentary.',
    longDescription: 'Built with conflict-free replicated data types, CollabEdit allows hundreds of team members to write technical specifications, documentation, and markdown notes simultaneously without edit conflicts.',
    image: getProjectImage('collabedit.png'),
    tags: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'Tailwind CSS', 'Yjs'],
    metrics: [
      { label: 'Concurrent Users', value: '5,000+' },
      { label: 'Sync Latency', value: '15ms' },
      { label: 'Zero Conflicts', value: '100%' }
    ],
    liveUrl: 'https://example.com/collabedit',
    githubUrl: 'https://github.com/example/collabedit'
  },
  {
    id: 'customer-sentiment-analyzer',
    title: 'Customer Sentiment Intelligence',
    category: 'AI & ML',
    description: 'NLP platform analyzing customer feedback, social sentiment, and support tickets into actionable insight scores.',
    longDescription: 'Utilizes transformer models to scan customer interaction channels in real time, detecting sentiment trends, product pain points, and urgent support escalations automatically.',
    image: getProjectImage('customer sentiment analyzer.png'),
    tags: ['Python', 'HuggingFace', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS'],
    metrics: [
      { label: 'Accuracy', value: '94.2%' },
      { label: 'Text/Min', value: '500,000' },
      { label: 'Insights Speed', value: 'Real-Time' }
    ],
    liveUrl: 'https://example.com/sentiment-analyzer',
    githubUrl: 'https://github.com/example/sentiment-analyzer'
  },
  {
    id: 'docusigner',
    title: 'DocuSigner Electronic Signature Suite',
    category: 'Web Apps',
    description: 'Secure digital document signing solution with cryptographic verification, workflow templates, and audit logs.',
    longDescription: 'Compliant enterprise electronic signature app providing PDF document generation, signature placement, automated recipient routing, and tamper-evident cryptographic hash verification.',
    image: getProjectImage('docusigner.png'),
    tags: ['TypeScript', 'React', 'Node.js', 'PDF.js', 'PostgreSQL', 'Tailwind CSS'],
    metrics: [
      { label: 'Signed Docs', value: '1.2M+' },
      { label: 'Compliance', value: 'eIDAS/ESIGN' },
      { label: 'Completion Rate', value: '94%' }
    ],
    liveUrl: 'https://example.com/docusigner',
    githubUrl: 'https://github.com/example/docusigner'
  },
  {
    id: 'e-commerce-retail',
    title: 'Modern Retail Storefront',
    category: 'E-Commerce',
    description: 'Ultra-fast storefront UI featuring dynamic product filtering, instant cart updates, and rich product galleries.',
    longDescription: 'Optimized for high conversion rates, this retail application features micro-interactions, responsive grid views, multi-tier pricing, and seamless integration with headless commerce backends.',
    image: getProjectImage('e commerce.png'),
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Shopify API', 'GraphQL'],
    metrics: [
      { label: 'Page Load', value: '0.4s' },
      { label: 'Mobile Sales', value: '+52%' },
      { label: 'Bounce Rate', value: '-18%' }
    ],
    liveUrl: 'https://example.com/retail-store',
    githubUrl: 'https://github.com/example/retail-store'
  },
  {
    id: 'ecotrack',
    title: 'EcoTrack Carbon Footprint Monitor',
    category: 'Cloud & DevOps',
    description: 'Sustainability telemetry engine tracking enterprise carbon emissions, energy usage, and green compliance.',
    longDescription: 'Ingests facility sensor data, cloud compute metrics, and logistics routes to compute real-time carbon equivalent scores and guide corporate ESG reporting.',
    image: getProjectImage('ecotrack.png'),
    tags: ['TypeScript', 'React', 'Python', 'Tailwind CSS', 'PostgreSQL', 'D3.js'],
    metrics: [
      { label: 'CO2 Reduction', value: '18%' },
      { label: 'Sensors Monitored', value: '10,000+' },
      { label: 'Reports Built', value: '5,000+' }
    ],
    liveUrl: 'https://example.com/ecotrack',
    githubUrl: 'https://github.com/example/ecotrack'
  },
  {
    id: 'expense-tracker',
    title: 'Smart Expense & Budget Tracker',
    category: 'Fintech',
    description: 'Financial dashboard featuring intelligent receipt scanning, automated category splitting, and spending analytics.',
    longDescription: 'Personal and team finance app equipped with optical character recognition for physical receipts, automated recurring subscription detection, and custom budget goal alerts.',
    image: getProjectImage('expense tracker.png'),
    tags: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'Chart.js', 'MongoDB'],
    metrics: [
      { label: 'Receipt OCR', value: '99.1%' },
      { label: 'Savings Found', value: '$450/mo avg' },
      { label: 'Active Trackers', value: '90k+' }
    ],
    liveUrl: 'https://example.com/expense-tracker',
    githubUrl: 'https://github.com/example/expense-tracker'
  },
  {
    id: 'feedo',
    title: 'Feedo Customer Feedback Engine',
    category: 'Web Apps',
    description: 'In-app feedback widgets, feature upvoting boards, and public product roadmap management system.',
    longDescription: 'Captures direct product feedback from web and mobile users, allowing product managers to prioritize feature backlogs through public upvoting and automated sentiment tagging.',
    image: getProjectImage('feedo.png'),
    tags: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'PostgreSQL'],
    metrics: [
      { label: 'Feedback Collected', value: '500k+' },
      { label: 'Upvotes Cast', value: '2.1M' },
      { label: 'Time to Implement', value: '-30%' }
    ],
    liveUrl: 'https://example.com/feedo',
    githubUrl: 'https://github.com/example/feedo'
  },
  {
    id: 'formforge',
    title: 'FormForge Dynamic Form Builder',
    category: 'Developer Tools',
    description: 'No-code drag-and-drop form builder supporting complex conditional logic branches and automated webhooks.',
    longDescription: 'Enables teams to design interactive multi-page surveys, registration forms, and checkout flows without writing code. Supports custom CSS themes, spam protection, and 50+ integrations.',
    image: getProjectImage('formforge.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    metrics: [
      { label: 'Forms Created', value: '140k+' },
      { label: 'Submissions', value: '12M+' },
      { label: 'Completion', value: '88%' }
    ],
    liveUrl: 'https://example.com/formforge',
    githubUrl: 'https://github.com/example/formforge'
  },
  {
    id: 'gitvisual',
    title: 'GitVisual Repository Explorer',
    category: 'Developer Tools',
    description: 'Interactive Git commit tree visualization tool mapping repository architecture, code frequency, and author diffs.',
    longDescription: 'Transforms dense Git commit logs into beautiful interactive node graphs. Helps engineering leads understand codebase evolution, spot refactoring targets, and onboard new developers.',
    image: getProjectImage('gitvisual.png'),
    tags: ['TypeScript', 'React', 'D3.js', 'GitHub API', 'Tailwind CSS'],
    metrics: [
      { label: 'Repos Visualized', value: '85k+' },
      { label: 'Graph Render', value: '< 50ms' },
      { label: 'Stars on GitHub', value: '4.8k' }
    ],
    liveUrl: 'https://example.com/gitvisual',
    githubUrl: 'https://github.com/example/gitvisual'
  },
  {
    id: 'gym-tracker',
    title: 'GymTrack Fitness & Workout Planner',
    category: 'Web Apps',
    description: 'Workout logging application featuring animated exercise guides, custom routine building, and strength graphs.',
    longDescription: 'Designed for fitness enthusiasts and trainers, GymTrack tracks weights, reps, rest intervals, and target muscle activation maps across workout routines.',
    image: getProjectImage('gym tracker.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Chart.js'],
    metrics: [
      { label: 'Workouts Logged', value: '3.2M' },
      { label: 'Exercise Library', value: '800+' },
      { label: 'User Retention', value: '72%' }
    ],
    liveUrl: 'https://example.com/gym-tracker',
    githubUrl: 'https://github.com/example/gym-tracker'
  },
  {
    id: 'habitforge',
    title: 'HabitForge Daily Streak Engine',
    category: 'Web Apps',
    description: 'Gamified habit formation tracker with streak reminders, daily check-ins, and performance statistics.',
    longDescription: 'Builds positive daily routines through gamified streak counters, customizable notification schedules, dark mode UI, and progress sharing with friends.',
    image: getProjectImage('habitforge.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'PWA'],
    metrics: [
      { label: 'Streaks Kept', value: '1.4M+' },
      { label: 'Daily Active', value: '65k' },
      { label: 'Completion Rate', value: '82%' }
    ],
    liveUrl: 'https://example.com/habitforge',
    githubUrl: 'https://github.com/example/habitforge'
  },
  {
    id: 'invoiceflow',
    title: 'InvoiceFlow Automated Billing Suite',
    category: 'Fintech',
    description: 'Recurring billing and invoicing suite supporting automatic payment collection, tax calculations, and PDF receipts.',
    longDescription: 'Automates client invoicing for freelancers and SaaS companies. Includes automatic payment reminders, tax compliance engine, currency conversion, and accounting ledger export.',
    image: getProjectImage('invoiceflow.png'),
    tags: ['TypeScript', 'React', 'Next.js', 'Stripe API', 'PostgreSQL', 'Tailwind CSS'],
    metrics: [
      { label: 'Invoices Sent', value: '850k+' },
      { label: 'Paid On-Time', value: '+35%' },
      { label: 'Volume Processed', value: '$95M' }
    ],
    liveUrl: 'https://example.com/invoiceflow',
    githubUrl: 'https://github.com/example/invoiceflow'
  },
  {
    id: 'kube',
    title: 'Kube Cluster Management Console',
    category: 'Cloud & DevOps',
    description: 'DevOps portal for monitoring Kubernetes clusters, pod health, resource telemetry, and auto-scaling rules.',
    longDescription: 'A lightweight Kubernetes administration dashboard that provides terminal access into pods, visual pod topology maps, metrics graphs, and instant alerting on crash loops.',
    image: getProjectImage('kube.png'),
    tags: ['Go', 'TypeScript', 'React', 'Kubernetes API', 'Docker', 'Tailwind CSS'],
    metrics: [
      { label: 'Clusters Managed', value: '1,200+' },
      { label: 'Metrics Polling', value: '100ms' },
      { label: 'Downtime Prevented', value: '99.9%' }
    ],
    liveUrl: 'https://example.com/kube',
    githubUrl: 'https://github.com/example/kube'
  },
  {
    id: 'learnloom',
    title: 'LearnLoom Interactive LMS',
    category: 'Web Apps',
    description: 'E-learning platform featuring video course streaming, coding challenges, student discussions, and certificates.',
    longDescription: 'A modern learning management system built for online academies and enterprise employee training. Supports video progress tracking, automated coding quizzes, and downloadable completion certificates.',
    image: getProjectImage('learnloom.png'),
    tags: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    metrics: [
      { label: 'Students Enrolled', value: '350k+' },
      { label: 'Courses Hosted', value: '1,400+' },
      { label: 'Completion Rate', value: '74%' }
    ],
    liveUrl: 'https://example.com/learnloom',
    githubUrl: 'https://github.com/example/learnloom'
  },
  {
    id: 'localbite',
    title: 'LocalBite Gourmet Food Delivery',
    category: 'E-Commerce',
    description: 'On-demand food ordering platform with live GPS courier tracking, restaurant menu management, and instant chat.',
    longDescription: 'Connects local diners with artisanal restaurants. Features interactive menu customizers, live driver geolocation maps via WebSockets, and instant contact options.',
    image: getProjectImage('localbite.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'WebSockets', 'Google Maps API'],
    metrics: [
      { label: 'Orders Delivered', value: '2.1M+' },
      { label: 'Avg Delivery Time', value: '24 mins' },
      { label: 'Restaurant Partners', value: '850+' }
    ],
    liveUrl: 'https://example.com/localbite',
    githubUrl: 'https://github.com/example/localbite'
  },
  {
    id: 'mailblast',
    title: 'MailBlast Email Marketing Automation',
    category: 'Web Apps',
    description: 'High-volume email delivery platform with visual campaign builder, AB testing, and audience segmentation.',
    longDescription: 'Handles millions of transactional and promotional emails per hour. Includes drag-and-drop newsletter editing, automated drip campaigns, link click heatmaps, and ISP deliverability scoring.',
    image: getProjectImage('mailblast.png'),
    tags: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'Redis', 'PostgreSQL'],
    metrics: [
      { label: 'Emails / Hour', value: '5,000,000' },
      { label: 'Deliverability', value: '99.4%' },
      { label: 'Open Rate Boost', value: '+24%' }
    ],
    liveUrl: 'https://example.com/mailblast',
    githubUrl: 'https://github.com/example/mailblast'
  },
  {
    id: 'medical-diagnosis',
    title: 'AI Medical Diagnostics Assistant',
    category: 'AI & ML',
    description: 'Clinical support tool analyzing patient vitals and medical imaging to assist physicians in early diagnosis.',
    longDescription: 'Engineered in compliance with medical privacy standards, this AI model assists radiologists and clinicians by scanning medical scans and lab reports to highlight diagnostic indicators.',
    image: getProjectImage('medical diagnosis.png'),
    tags: ['Python', 'PyTorch', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS'],
    metrics: [
      { label: 'Scan Sensitivity', value: '97.8%' },
      { label: 'Analysis Time', value: '1.4s' },
      { label: 'Hospitals Tested', value: '12' }
    ],
    liveUrl: 'https://example.com/medical-diagnosis',
    githubUrl: 'https://github.com/example/medical-diagnosis'
  },
  {
    id: 'mindmap',
    title: 'MindMap Infinite Canvas Workspace',
    category: 'Developer Tools',
    description: 'Infinite canvas node diagramming web app for visual brainstorming, system architecture maps, and user flows.',
    longDescription: 'Features smooth canvas panning, node connecting physics, real-time multi-user cursor collaboration, export to SVG/PNG, and auto-layout algorithms for complex diagrams.',
    image: getProjectImage('mindmap.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Canvas API', 'Zustand'],
    metrics: [
      { label: 'Nodes Rendered', value: '100,000+' },
      { label: 'Pan Smoothness', value: '60 FPS' },
      { label: 'Diagrams Exported', value: '300k+' }
    ],
    liveUrl: 'https://example.com/mindmap',
    githubUrl: 'https://github.com/example/mindmap'
  },
  {
    id: 'music-player',
    title: 'SoundSphere Audio Streaming Studio',
    category: 'Web Apps',
    description: 'Hi-fi music streaming web player featuring spatial audio equalizers, live lyrics, and custom visualizers.',
    longDescription: 'A slick audio web application delivering lossless audio playback, responsive canvas frequency spectrum visualizers, collaborative queue management, and playlist sharing.',
    image: getProjectImage('music.png'),
    tags: ['TypeScript', 'React', 'Web Audio API', 'Tailwind CSS', 'Node.js'],
    metrics: [
      { label: 'Tracks Streamed', value: '10M+' },
      { label: 'Audio Quality', value: '320kbps' },
      { label: 'Active Listeners', value: '140k' }
    ],
    liveUrl: 'https://example.com/music-player',
    githubUrl: 'https://github.com/example/music-player'
  },
  {
    id: 'pagepulse',
    title: 'PagePulse Web Vitals & SEO Monitor',
    category: 'Cloud & DevOps',
    description: 'Automated site performance auditor testing Lighthouse scores, Core Web Vitals, and uptime 24/7.',
    longDescription: 'Monitors global domain fleets for performance degradation, broken links, SEO metadata errors, and server response slowdowns with instant SMS and Slack alerts.',
    image: getProjectImage('pagepulse.png'),
    tags: ['TypeScript', 'Node.js', 'React', 'Puppeteer', 'Tailwind CSS', 'Chart.js'],
    metrics: [
      { label: 'Domains Monitored', value: '45,000+' },
      { label: 'Check Frequency', value: 'Every 60s' },
      { label: 'Alert Latency', value: '< 2s' }
    ],
    liveUrl: 'https://example.com/pagepulse',
    githubUrl: 'https://github.com/example/pagepulse'
  },
  {
    id: 'parksmart',
    title: 'ParkSmart IoT Parking Management',
    category: 'Cloud & DevOps',
    description: 'Smart city parking platform displaying real-time space availability, digital spot reservations, and gate entry.',
    longDescription: 'Integrates IoT parking sensor telemetry to display live availability maps across multi-story garages, allowing drivers to reserve and pay for parking spots before arrival.',
    image: getProjectImage('parksmart.png'),
    tags: ['Python', 'TypeScript', 'React', 'MQTT', 'Node.js', 'Tailwind CSS'],
    metrics: [
      { label: 'Spaces Tracked', value: '25,000+' },
      { label: 'Traffic Saved', value: '30%' },
      { label: 'Reservations', value: '400k+' }
    ],
    liveUrl: 'https://example.com/parksmart',
    githubUrl: 'https://github.com/example/parksmart'
  },
  {
    id: 'siteguard',
    title: 'SiteGuard Web Application Firewall',
    category: 'Cloud & DevOps',
    description: 'Cybersecurity suite monitoring DDoS threats, SQL injection attacks, rate limiting, and SSL security.',
    longDescription: 'Real-time security telemetry center that blocks malicious traffic patterns before hitting origin servers. Includes interactive attack geolocation maps and IP whitelist rules.',
    image: getProjectImage('siteguard.png'),
    tags: ['Go', 'TypeScript', 'React', 'Tailwind CSS', 'PostgreSQL', 'Grafana'],
    metrics: [
      { label: 'Attacks Blocked', value: '8.4M' },
      { label: 'Filter Speed', value: '2ms' },
      { label: 'Protection Score', value: '100%' }
    ],
    liveUrl: 'https://example.com/siteguard',
    githubUrl: 'https://github.com/example/siteguard'
  },
  {
    id: 'smart-recommendation',
    title: 'Smart Product Recommendation Engine',
    category: 'AI & ML',
    description: 'AI recommendation API delivering real-time personalized product suggestions for e-commerce platforms.',
    longDescription: 'Analyzes user browsing behavior and past purchase histories using collaborative filtering algorithms to present high-converting product recommendation carousels in real time.',
    image: getProjectImage('smart recommendation.png'),
    tags: ['Python', 'Scikit-Learn', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS'],
    metrics: [
      { label: 'AOV Increase', value: '+28%' },
      { label: 'Rec CTR', value: '14.6%' },
      { label: 'API Response', value: '18ms' }
    ],
    liveUrl: 'https://example.com/smart-rec',
    githubUrl: 'https://github.com/example/smart-rec'
  },
  {
    id: 'social-network',
    title: 'ConnectVerse Social Community Hub',
    category: 'Web Apps',
    description: 'Real-time social platform featuring live activity feeds, group channels, media posts, and direct messaging.',
    longDescription: 'Built with scalable WebSocket architectures, ConnectVerse offers fluid media sharing, threaded discussion channels, customizable user profiles, and instant push notifications.',
    image: getProjectImage('social.png'),
    tags: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'Tailwind CSS', 'MongoDB'],
    metrics: [
      { label: 'Monthly Active', value: '500k+' },
      { label: 'Posts / Day', value: '1.2M' },
      { label: 'Message Speed', value: '10ms' }
    ],
    liveUrl: 'https://example.com/social',
    githubUrl: 'https://github.com/example/social'
  },
  {
    id: 'starbucks',
    title: 'OrderExpress Coffee & Retail App',
    category: 'E-Commerce',
    description: 'Order-ahead mobile web app featuring custom drink builders, digital rewards cards, and store locator.',
    longDescription: 'Allows customers to customize orders, pay using digital gift cards, earn loyalty points, and pick up fresh beverages at nearby store locations without waiting in line.',
    image: getProjectImage('starbucks.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Stripe API', 'Mapbox'],
    metrics: [
      { label: 'Daily Orders', value: '45,000+' },
      { label: 'Wait Time Cut', value: '80%' },
      { label: 'Loyalty Users', value: '250k' }
    ],
    liveUrl: 'https://example.com/orderexpress',
    githubUrl: 'https://github.com/example/orderexpress'
  },
  {
    id: 'statlink',
    title: 'StatLink Real-time Data Telemetry',
    category: 'Cloud & DevOps',
    description: 'High-frequency metric visualizer rendering 3D data streams, server load graphs, and alert thresholds.',
    longDescription: 'Engineered for high-frequency telemetry, StatLink processes millions of data points per second, rendering live 3D surface charts and line graphs for mission-critical server infrastructure.',
    image: getProjectImage('statlink.png'),
    tags: ['TypeScript', 'React', 'Three.js', 'D3.js', 'Tailwind CSS', 'WebSockets'],
    metrics: [
      { label: 'Events / Sec', value: '2,500,000' },
      { label: 'FPS Latency', value: '60 FPS' },
      { label: 'Servers Monitored', value: '8,000+' }
    ],
    liveUrl: 'https://example.com/statlink',
    githubUrl: 'https://github.com/example/statlink'
  },
  {
    id: 'super-app',
    title: 'Super App Ecosystem Suite',
    category: 'Web Apps',
    description: 'Multi-service platform combining ride-hailing, food delivery, peer-to-peer payments, and messaging in one app.',
    longDescription: 'An all-in-one digital companion integrating multiple urban services into a single unified design system, shared digital wallet, and single sign-on security core.',
    image: getProjectImage('super.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis'],
    metrics: [
      { label: 'Total Downloads', value: '5.0M+' },
      { label: 'Services Hosted', value: '8 Apps' },
      { label: 'Daily Transactions', value: '650k' }
    ],
    liveUrl: 'https://example.com/super-app',
    githubUrl: 'https://github.com/example/super-app'
  },
  {
    id: 'support-desk',
    title: 'Omnichannel Customer Support Desk',
    category: 'Web Apps',
    description: 'Helpdesk ticketing platform organizing email, live chat, and social inquiries into a unified agent inbox.',
    longDescription: 'Empowers support teams to resolve issues faster using collision detection, internal note mentions, automated canned responses, and SLA performance dashboards.',
    image: getProjectImage('support.png'),
    tags: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'WebSockets'],
    metrics: [
      { label: 'Tickets Solved', value: '1.8M+' },
      { label: 'Resolution Time', value: '-45%' },
      { label: 'Agent CSAT', value: '98%' }
    ],
    liveUrl: 'https://example.com/support-desk',
    githubUrl: 'https://github.com/example/support-desk'
  },
  {
    id: 'taskflow',
    title: 'TaskFlow Agile Project Management',
    category: 'Developer Tools',
    description: 'Kanban & Scrum management application with drag-and-drop task boards, sprint velocity, and time tracking.',
    longDescription: 'A streamlined project management tool for agile engineering teams. Features interactive Kanban boards, automated sprint roll-overs, time tracking timers, and burndown chart analytics.',
    image: getProjectImage('taskflow.png'),
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    metrics: [
      { label: 'Tasks Completed', value: '4.2M+' },
      { label: 'Sprint Speed', value: '+28%' },
      { label: 'Active Teams', value: '15k' }
    ],
    liveUrl: 'https://example.com/taskflow',
    githubUrl: 'https://github.com/example/taskflow'
  },
  {
    id: 'tasksync',
    title: 'TaskSync Distributed Workflow Automation',
    category: 'Developer Tools',
    description: 'Automated integration engine connecting API endpoints via custom trigger conditions and data transformations.',
    longDescription: 'Like an enterprise integration glue, TaskSync connects cloud services via visual workflow pipelines, allowing teams to automate data syncs between databases, webhooks, and third-party tools.',
    image: getProjectImage('tasksync.png'),
    tags: ['TypeScript', 'Node.js', 'React', 'Tailwind CSS', 'Redis', 'Docker'],
    metrics: [
      { label: 'Workflows Run', value: '50M/mo' },
      { label: 'Integrations', value: '200+' },
      { label: 'Reliability', value: '99.99%' }
    ],
    liveUrl: 'https://example.com/tasksync',
    githubUrl: 'https://github.com/example/tasksync'
  },
  {
    id: 'whisper-chat',
    title: 'WhisperChat Encrypted Messaging App',
    category: 'Web Apps',
    description: 'End-to-end encrypted messaging application with self-destructing text options and zero server data retention.',
    longDescription: 'Prioritizing privacy above all, WhisperChat encrypts all messages and file transfers client-side using Web Crypto standards before sending them over WebSockets.',
    image: getProjectImage('whisper chat.png'),
    tags: ['TypeScript', 'React', 'Web Crypto API', 'Node.js', 'WebSockets', 'Tailwind CSS'],
    metrics: [
      { label: 'Encryption', value: 'AES-GCM 256' },
      { label: 'Data Retained', value: '0 Bytes' },
      { label: 'Messages Sent', value: '8M+' }
    ],
    liveUrl: 'https://example.com/whisper-chat',
    githubUrl: 'https://github.com/example/whisper-chat'
  },
  {
    id: 'zenith',
    title: 'Zenith Enterprise ERP Cloud',
    category: 'Fintech',
    description: 'Comprehensive business ERP system handling supply chain logistics, payroll, auditing, and warehouse inventory.',
    longDescription: 'An enterprise cloud solution consolidating core business operations into a single secure platform with role-based access control, automated audit logging, and financial forecasting.',
    image: getProjectImage('zenith.png'),
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    metrics: [
      { label: 'Enterprise Clients', value: '450+' },
      { label: 'Inventory Items', value: '12M+' },
      { label: 'Efficiency Gain', value: '38%' }
    ],
    liveUrl: 'https://example.com/zenith',
    githubUrl: 'https://github.com/example/zenith'
  }
];

// Vibrant theme color accents for distinct card hover effects
const CARD_ACCENTS = [
  {
    borderHover: 'hover:border-rose-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(244,63,94,0.3)]',
    textHover: 'group-hover:text-rose-400',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-400',
    badgeBorder: 'border-rose-500/30',
    metricText: 'text-rose-400',
  },
  {
    borderHover: 'hover:border-cyan-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(6,182,212,0.3)]',
    textHover: 'group-hover:text-cyan-400',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/30',
    metricText: 'text-cyan-400',
  },
  {
    borderHover: 'hover:border-emerald-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(16,185,129,0.3)]',
    textHover: 'group-hover:text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/30',
    metricText: 'text-emerald-400',
  },
  {
    borderHover: 'hover:border-purple-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(168,85,247,0.3)]',
    textHover: 'group-hover:text-purple-400',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-400',
    badgeBorder: 'border-purple-500/30',
    metricText: 'text-purple-400',
  },
  {
    borderHover: 'hover:border-amber-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(245,158,11,0.3)]',
    textHover: 'group-hover:text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    badgeBorder: 'border-amber-500/30',
    metricText: 'text-amber-400',
  },
  {
    borderHover: 'hover:border-blue-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(59,130,246,0.3)]',
    textHover: 'group-hover:text-blue-400',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    badgeBorder: 'border-blue-500/30',
    metricText: 'text-blue-400',
  },
  {
    borderHover: 'hover:border-pink-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(236,72,153,0.3)]',
    textHover: 'group-hover:text-pink-400',
    badgeBg: 'bg-pink-500/10',
    badgeText: 'text-pink-400',
    badgeBorder: 'border-pink-500/30',
    metricText: 'text-pink-400',
  },
  {
    borderHover: 'hover:border-orange-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(249,115,22,0.3)]',
    textHover: 'group-hover:text-orange-400',
    badgeBg: 'bg-orange-500/10',
    badgeText: 'text-orange-400',
    badgeBorder: 'border-orange-500/30',
    metricText: 'text-orange-400',
  },
  {
    borderHover: 'hover:border-indigo-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(99,102,241,0.3)]',
    textHover: 'group-hover:text-indigo-400',
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-400',
    badgeBorder: 'border-indigo-500/30',
    metricText: 'text-indigo-400',
  },
  {
    borderHover: 'hover:border-teal-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(20,184,166,0.3)]',
    textHover: 'group-hover:text-teal-400',
    badgeBg: 'bg-teal-500/10',
    badgeText: 'text-teal-400',
    badgeBorder: 'border-teal-500/30',
    metricText: 'text-teal-400',
  },
  {
    borderHover: 'hover:border-violet-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(139,92,246,0.3)]',
    textHover: 'group-hover:text-violet-400',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-400',
    badgeBorder: 'border-violet-500/30',
    metricText: 'text-violet-400',
  },
  {
    borderHover: 'hover:border-lime-500',
    shadowHover: 'hover:shadow-[0_12px_35px_rgba(132,204,22,0.3)]',
    textHover: 'group-hover:text-lime-400',
    badgeBg: 'bg-lime-500/10',
    badgeText: 'text-lime-400',
    badgeBorder: 'border-lime-500/30',
    metricText: 'text-lime-400',
  },
];

// Projects Showcase Section Component
const ProjectsCatalogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(PROJECTS_DATA.map((p) => p.category)))],
    []
  );

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesQuery = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="projects-grid-section" className="w-full min-h-screen bg-transparent py-24 px-4 sm:px-8 md:px-12 lg:px-20 relative text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Featured Works & Prototypes
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Engineering <span className="bg-gradient-to-r from-red-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">Digital Artifacts</span>
            </h2>
            <p className="mt-3 text-zinc-400 text-base max-w-xl">
              Explore our showcase of cutting-edge web graphics, AI-driven architectures, and high-performance applications.
            </p>

            {/* Privacy & Confidentiality Notice */}
            <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-zinc-400 flex items-start gap-3 max-w-2xl backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-white">Privacy Notice:</span> We do not provide live project demos or GitHub repository links as per client confidentiality agreements. The project names displayed are placeholders with actual titles hidden for privacy, and showcase images are utilized with explicit owner permission.
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/60 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25 scale-105 border border-red-400/30'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border-2 border-zinc-800/60">
            <Code2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-300">No projects found</h3>
            <p className="text-zinc-500 text-sm mt-1">Try matching different keywords or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={`group relative bg-zinc-950/25 backdrop-blur-3xl backdrop-saturate-200 border-2 border-white/15 ${accent.borderHover} ${accent.shadowHover} rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)]`}
                >
                  <div>
                    {/* Image container */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950/70 rounded-xl mb-4 border border-white/15 shadow-inner">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />
                      
                      {/* Category Badge with custom theme color */}
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xl border ${accent.badgeBorder} text-[11px] font-semibold ${accent.badgeText}`}>
                        {project.category}
                      </div>

                      {project.featured && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-xl border border-amber-500/40 text-[9px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-amber-300" /> Featured
                        </div>
                      )}
                    </div>

                    {/* Body content */}
                    <div>
                      <h3 className={`text-lg font-bold text-white ${accent.textHover} transition-colors duration-300 drop-shadow-sm`}>
                        {project.title}
                      </h3>
                      <p className="mt-2 text-zinc-300/90 text-xs leading-relaxed font-normal">
                        {project.description}
                      </p>

                      {/* Metrics preview */}
                      <div className="grid grid-cols-3 gap-1.5 my-4 p-2.5 rounded-xl bg-black/30 backdrop-blur-xl border border-white/15">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="text-center">
                            <div className={`text-xs font-extrabold text-white group-hover:${accent.metricText} transition-colors`}>{m.value}</div>
                            <div className="text-[9px] text-zinc-400 truncate mt-0.5">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Languages used tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900/40 backdrop-blur-xl text-[10px] font-semibold text-zinc-200 border border-white/15 transition-colors group-hover:border-white/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

import { GradientBackground } from './components/GradientBackground';

// Full Projects Page export
export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white selection:bg-red-500 selection:text-white">
      {/* 1. Canvas Hero Header Component requested by user */}
      <Html />

      {/* 2. Projects Catalog & Grid Showcase wrapped in GradientBackground */}
      <GradientBackground overlay={true} overlayOpacity={0.65} animationDuration={10}>
        <ProjectsCatalogSection />
      </GradientBackground>
    </div>
  );
}
