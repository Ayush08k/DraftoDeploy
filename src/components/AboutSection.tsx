import { motion } from "framer-motion";
import { BubbleBackground } from "./BubbleBackground";
import {
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineCheckCircle,
  HiOutlineCloudUpload,
  HiOutlineCode,
  HiOutlineCheck
} from "react-icons/hi";

export function AboutSection() {
  const stats = [
    { label: "Deployed Projects", value: "150+", detail: "Successfully Delivered", icon: HiOutlineCloudUpload },
    { label: "Uptime & Quality SLA", value: "99.99%", detail: "Enterprise Reliability", icon: HiOutlineShieldCheck },
    { label: "Average MVP Launch", value: "< 2 Weeks", detail: "Rapid Turnaround", icon: HiOutlineLightningBolt },
    { label: "Core Expertise", value: "Full-Stack", detail: "Web, Mobile & AI Apps", icon: HiOutlineCode },
  ];

  const providedServices = [
    "Custom Full-Stack Web Apps & SaaS MVPs",
    "Mobile App Development (iOS & Android)",
    "3D WebGL & Interactive Three.js Experiences",
    "AI Microservices & LLM Integration",
    "High-Scale Cloud Deployment & DevOps Pipeline",
    "Custom E-Commerce & Enterprise Platforms",
  ];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-zinc-950 text-white"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* Smooth transition gradient blend at the top of About section */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none z-20" />
      
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
              id="about-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
              itemProp="name"
            >
              Empowering Startups with <span className="bg-gradient-to-r from-[#00ffc6] via-cyan-400 to-purple-400 bg-clip-text text-transparent">150+ Successfully Deployed Projects</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-300 text-base sm:text-lg leading-relaxed font-medium"
            >
              We design, build, and deploy tailored custom project sets for early-stage startups and growing businesses worldwide.
            </motion.p>
          </div>

          {/* 
            THE BLURRED FROSTED GLASS CARD
            This card sits on top of the section background and blurs the BubbleBackground liquid animation flowing behind it!
          */}
          {/* 
            THE FROSTED GLASS CARD (Optimized for 60fps mobile scrolling)
          */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-3xl bg-zinc-950/90 sm:bg-zinc-950/65 backdrop-blur-md sm:backdrop-blur-2xl border border-white/20 p-6 sm:p-12 lg:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.8)] space-y-12 transform-gpu"
          >

            {/* Card Inner Grid Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Startup Story & Track Record */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00ffc6] uppercase tracking-wider">
                  <HiOutlineGlobeAlt className="w-4 h-4" />
                  Startup Acceleration & Engineering
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight" itemProp="headline">
                  Turning Visionary Ideas into Live Production Software
                </h3>

                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                  DraftoDeploy specializes in custom engineering for startups and modern businesses. Having successfully built and deployed <strong className="text-white font-semibold">150+ custom projects</strong>, we eliminate the friction between initial design concepts and production rollout.
                </p>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  From high-converting web apps and custom SaaS MVPs to interactive 3D landing pages and autonomous AI microservices, we build reliable, scalable project sets engineered for fast market growth.
                </p>

                <ul className="space-y-3 pt-2">
                  {[
                    "150+ custom projects deployed across web, mobile & AI",
                    "Tailored project sets specifically crafted for startup MVPs",
                    "End-to-end delivery: architecture, UI/UX, backend & cloud launch",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-zinc-200">
                      <HiOutlineCheckCircle className="w-5 h-5 text-[#00ffc6] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side Services Highlight Box */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/90 sm:bg-white/10 border border-white/20 backdrop-blur-sm sm:backdrop-blur-xl shadow-2xl space-y-6 hover:border-[#00ffc6]/50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffc6] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ffc6]" />
                      </span>
                      <span className="text-xs font-bold text-[#00ffc6] uppercase tracking-wider">Services We Provide</span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">150+ Delivered</span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#00ffc6] transition-colors">
                      Core Development Services
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      Complete custom software development capabilities tailored for your product needs:
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    {providedServices.map((service) => (
                      <div
                        key={service}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-800/60 sm:bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#00ffc6]/20 border border-[#00ffc6]/40 flex items-center justify-center shrink-0">
                          <HiOutlineCheck className="w-4 h-4 text-[#00ffc6]" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-zinc-200">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Stats Bar inside the main Blurred Card */}
            <dl
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/15"
              aria-label="DraftoDeploy agency statistics and achievements"
            >
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="p-5 rounded-2xl bg-zinc-900/90 sm:bg-white/10 border border-white/15 backdrop-blur-sm sm:backdrop-blur-xl hover:bg-white/15 hover:border-white/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00ffc6]/15 text-[#00ffc6] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <dt className="text-2xl sm:text-3xl font-black text-white">{stat.value}</dt>
                    <dd className="text-xs font-bold text-zinc-200 mt-0.5">{stat.label}</dd>
                    <div className="text-[11px] text-zinc-400">{stat.detail}</div>
                  </motion.div>
                );
              })}
            </dl>

          </motion.div>

        </div>
      </BubbleBackground>
    </section>
  );
}

export default AboutSection;
