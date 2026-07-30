import { motion } from "framer-motion";
import { BubbleBackground } from "./BubbleBackground";
import { 
  HiOutlineSparkles, 
  HiOutlineLightningBolt, 
  HiOutlineShieldCheck, 
  HiOutlineCube,
  HiOutlineGlobeAlt,
  HiOutlineCheckCircle,
  HiOutlineCloudUpload
} from "react-icons/hi";

export function AboutSection() {
  const stats = [
    { label: "Deployment Speed", value: "< 50ms", detail: "Global Edge Network", icon: HiOutlineLightningBolt },
    { label: "Uptime SLA", value: "99.99%", detail: "Enterprise Reliability", icon: HiOutlineShieldCheck },
    { label: "3D Rendering", value: "60 FPS", detail: "WebGL & Three.js", icon: HiOutlineCube },
    { label: "Deployed Projects", value: "10,000+", detail: "Worldwide Creators", icon: HiOutlineCloudUpload },
  ];

  const techStack = [
    "React 19",
    "Three.js",
    "React Three Fiber",
    "Tailwind CSS v4",
    "TypeScript",
    "Framer Motion",
    "Vite",
    "WebGL Engine",
  ];

  return (
    <section id="about" className="relative w-full overflow-hidden bg-zinc-950 text-white">
      {/* 
        BubbleBackground is the background of the ENTIRE About section.
        The liquid bubbles move behind the blurred card container!
      */}
      <BubbleBackground 
        interactive={true}
        className="w-full py-24 px-4 sm:px-6 lg:px-8 min-h-[800px]"
        colors={{
          first: "18,113,255",
          second: "221,74,255",
          third: "0,220,255",
          fourth: "255,50,150",
          fifth: "0,255,198",
          sixth: "140,100,255",
        }}
      >
        <div className="max-w-5xl mx-auto relative z-10 space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-[#00ffc6] shadow-[0_0_20px_rgba(0,255,198,0.2)]"
            >
              <HiOutlineSparkles className="w-4 h-4 text-[#00ffc6]" />
              About DraftoDeploy
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
            >
              Turning Creative Concepts into <span className="bg-gradient-to-r from-[#00ffc6] via-cyan-400 to-purple-400 bg-clip-text text-transparent">Live Production Apps</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-300 text-base sm:text-lg leading-relaxed font-medium"
            >
              DraftoDeploy is an interactive UI factory and rapid deployment suite built for modern web applications.
            </motion.p>
          </div>

          {/* 
            THE BLURRED FROSTED GLASS CARD
            This card sits on top of the section background and blurs the BubbleBackground liquid animation flowing behind it!
          */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-3xl backdrop-blur-2xl bg-zinc-950/65 border border-white/20 p-8 sm:p-12 lg:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.8)] space-y-12"
          >
            
            {/* Card Inner Grid Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00ffc6] uppercase tracking-wider">
                  <HiOutlineGlobeAlt className="w-4 h-4" />
                  Next-Gen Web Architecture
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Engineered for Designers, Developers & Visionaries
                </h3>
                
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                  DraftoDeploy eliminates the friction between design iterations and live deployment. By integrating real-time WebGL rendering, responsive component modularity, and edge execution, we empower teams to launch state-of-the-art web products in record time.
                </p>

                <ul className="space-y-3 pt-2">
                  {[
                    "Real-time Three.js lighting & custom shader support",
                    "Full dark mode & responsive container scaling",
                    "Zero-config setup with modern build tools",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-zinc-200">
                      <HiOutlineCheckCircle className="w-5 h-5 text-[#00ffc6] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side Highlight Card */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl space-y-6 hover:border-[#00ffc6]/50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffc6] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ffc6]" />
                      </span>
                      <span className="text-xs font-bold text-[#00ffc6] uppercase tracking-wider">Live Factory Core</span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">v2.4 Active</span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#00ffc6] transition-colors">
                      DraftoDeploy Core Engine
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                      Move your cursor across the section to interact with the fluid liquid bubble animation flowing behind this blurred card!
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-zinc-200 font-mono border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bar inside the main Blurred Card */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/15">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl hover:bg-white/15 hover:border-white/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00ffc6]/15 text-[#00ffc6] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-xs font-bold text-zinc-200 mt-0.5">{stat.label}</div>
                    <div className="text-[11px] text-zinc-400">{stat.detail}</div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

        </div>
      </BubbleBackground>
    </section>
  );
}

export default AboutSection;
