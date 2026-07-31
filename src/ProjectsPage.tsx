'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  Code2, 
  Globe, 
  Star,
  Search,
  X,
  ChevronDown,
  FileText
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
  pass,
  mix,
  add
} from 'three/tsl';

// High-reliability textures + Procedural Data URI fallbacks
const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

// Create fallback procedural canvas texture data URIs if network/CORS delays
const createFallbackTexture = (type: 'raw' | 'depth') => {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  if (type === 'raw') {
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#e11d48');
    grad.addColorStop(0.5, '#4c0519');
    grad.addColorStop(1, '#09090b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DRAFTO DEPLOY', 256, 256);
  } else {
    const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#888888');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
  }
  return canvas.toDataURL();
};

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
  // Use fallback texture if primary image suspended/errored
  const fallbackRaw = useMemo(() => createFallbackTexture('raw'), []);
  const fallbackDepth = useMemo(() => createFallbackTexture('depth'), []);

  const textures = useTexture(
    [TEXTUREMAP.src, DEPTHMAP.src],
    (loaded) => {
      // Successfully loaded textures
    }
  );

  const rawMap = textures[0] || null;
  const depthMap = textures[1] || null;

  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(true);

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
          visible ? 1 : 0,
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
          <PostProcessing fullScreenEffect={true} />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
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

const PROJECTS_DATA: ProjectItem[] = [];

// Projects Showcase Section Component
const ProjectsCatalogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

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
    <section id="projects-grid-section" className="w-full min-h-screen bg-zinc-950 py-24 px-4 sm:px-8 md:px-12 lg:px-20 relative text-white">
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
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800/60">
            <Code2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-300">No projects found</h3>
            <p className="text-zinc-500 text-sm mt-1">Try matching different keywords or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                onClick={() => setActiveModalProject(project)}
                className="group relative bg-zinc-900/70 border border-zinc-800/90 hover:border-red-500/50 rounded-xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(225,29,72,0.12)] hover:-translate-y-1"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    
                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-red-400">
                      {project.category}
                    </div>

                    {project.featured && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[9px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-amber-300" /> Featured
                      </div>
                    )}
                  </div>

                  {/* Body content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metrics preview */}
                    <div className="grid grid-cols-3 gap-1.5 my-3.5 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-xs font-bold text-white">{m.value}</div>
                          <div className="text-[9px] text-zinc-500 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-zinc-800/80 text-[10px] font-medium text-zinc-300 border border-zinc-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer button for Case Study */}
                <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white text-xs font-semibold transition-all duration-300 shadow-sm group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>See Case Study</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 text-white scrollbar-thin scrollbar-thumb-zinc-700"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Banner */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-zinc-950 border border-zinc-800">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md border border-white/20">
                  <FileText className="w-3.5 h-3.5" /> Case Study • {activeModalProject.category}
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeModalProject.title}
              </h2>
              <p className="mt-3 text-zinc-300 text-base leading-relaxed">
                {activeModalProject.longDescription}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                {activeModalProject.metrics.map((m) => (
                  <div key={m.label} className="p-3 text-center rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                    <div className="text-xl font-extrabold text-red-400">{m.value}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-200 border border-zinc-700/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 font-bold text-sm text-white shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]"
                  >
                    <Globe className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-bold text-sm text-zinc-200 hover:text-white border border-zinc-700 transition-all hover:scale-[1.02]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg> Source Repository
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Full Projects Page export
export default function ProjectsPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white selection:bg-red-500 selection:text-white">
      {/* 1. Canvas Hero Header Component requested by user */}
      <Html />

      {/* 2. Projects Catalog & Grid Showcase */}
      <ProjectsCatalogSection />
    </div>
  );
}
