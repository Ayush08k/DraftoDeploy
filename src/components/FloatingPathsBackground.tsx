import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingPathsBackground({
  position,
  children,
  className,
}: {
  position: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pathCount = isMobile ? 12 : 36;

  const paths = Array.from({ length: pathCount }, (_, i) => ({
    id: i,
    d: `M-${380 - i * (isMobile ? 15 : 5) * position} -${189 + i * 12}C-${
      380 - i * (isMobile ? 15 : 5) * position
    } -${189 + i * 12} -${312 - i * 5 * position} ${216 - i * 12} ${
      152 - i * 5 * position
    } ${343 - i * 12}C${616 - i * 5 * position} ${470 - i * 12} ${
      684 - i * 5 * position
    } ${875 - i * 12} ${684 - i * 5 * position} ${875 - i * 12}`,
    width: 0.5 + i * 0.05,
    opacity: 0.15 + i * 0.018,
  }));

  return (
    <div className={cn("w-full h-full relative", className)}>
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full text-white"
          viewBox="-600 -400 1800 1400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {paths.map((path) =>
            isMobile ? (
              <path
                key={path.id}
                d={path.d}
                stroke="currentColor"
                strokeWidth={path.width}
                strokeOpacity={path.opacity * 0.7}
              />
            ) : (
              <motion.path
                key={path.id}
                d={path.d}
                stroke="currentColor"
                strokeWidth={path.width}
                strokeOpacity={path.opacity}
                initial={{ pathLength: 0.3, opacity: 0.6 }}
                animate={{
                  pathLength: 1,
                  opacity: [0.3, 0.6, 0.3],
                  pathOffset: [0, 1, 0],
                }}
                transition={{
                  duration: 20 + (path.id % 7) * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )
          )}
        </svg>
      </div>
      {children}
    </div>
  );
}

export default FloatingPathsBackground;
