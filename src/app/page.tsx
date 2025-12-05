"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRef, useState } from "react";

export default function Home() {
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);

  return (
    <div className="bg-zinc-950 relative">
      {/* GLOBAL FILM GRAIN OVERLAY */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-overlay z-[9999]"
        style={{
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAtMB9UoilKkAAAAASUVORK5CYII=')",
        }}
      />

      {/* IMAGE VIEWER MODAL */}
      {viewerSrc && (
        <div
          className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setViewerSrc(null)}
        >
          <img
            src={viewerSrc}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}

      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />
        <Hero setViewerSrc={setViewerSrc} />
      </ReactLenis>
    </div>
  );
}

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-white backdrop-blur-xl bg-zinc-950/10 border-b border-white/5 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]">
      <div className="text-3xl font-bold tracking-tight mix-blend-difference">
        Logo Here
      </div>

      <button
        onClick={() => {
          document.getElementById("content-section")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white transition-colors"
      >
        LEARN MORE <FiArrowRight className="mt-0.5" />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = ({ setViewerSrc }: any) => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages setViewerSrc={setViewerSrc} />

      <div className="absolute bottom-0 left-0 right-0 h-[450px] bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950 blur-[2px]" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["70%", "100%"]
  );

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full relative overflow-hidden"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url("/work/art (3).jpg")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "150%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.9))]" />

      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAtMB9UoilKkAAAAASUVORK5CYII=')",
        }}
      />
    </motion.div>
  );
};

const ParallaxImages = ({ setViewerSrc }: any) => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/work/art (1).jpg"
        alt="Image"
        start={-200}
        end={200}
        className="w-1/3"
        onClick={() => setViewerSrc("/work/art (1).jpg")}
      />

      <ParallaxImg
        src="/work/art (6).jpg"
        alt="Image"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
        onClick={() => setViewerSrc("/work/art (6).jpg")}
      />

      <ParallaxImg
        src="/work/art (4).jpg"
        alt="Image"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
        onClick={() => setViewerSrc("/work/art (4).jpg")}
      />

      <ParallaxImg
        src="/work/art (7).png"
        alt="Image"
        start={-500}
        end={0}
        className="ml-24 w-5/12"
        onClick={() => setViewerSrc("/work/art (7).png")}
      />

      <ParallaxImg
        src="/work/art (8).jpg"
        alt="Image"
        start={0}
        end={-200}
        className="ml-24 w-5/12"
        onClick={() => setViewerSrc("/work/art (8).jpg")}
      />

      <ParallaxImg
        src="/work/art (2).png"
        alt="Image"
        start={-500}
        end={0}
        className="ml-auto w-1/3"
        onClick={() => setViewerSrc("/work/art (2).png")}
      />

      <ParallaxImg
        src="/work/art (9).png"
        alt="Image"
        start={-500}
        end={0}
        className="mx-auto w-2/3"
        onClick={() => setViewerSrc("/work/art (9).png")}
      />
    </div>
  );
};

interface ParallaxImgProps {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
  onClick: () => void;
}

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
  onClick,
}: ParallaxImgProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      ref={ref}
      style={{ transform, opacity }}
      className={`${className} relative cursor-pointer`}
      onClick={onClick}
    >
      <div className="absolute inset-0 blur-3xl opacity-30 bg-black/40 -z-10" />

      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-40 translate-x-[1px] translate-y-[1px] saturate-150"
      />

      <img
        src={src}
        alt={alt}
        className="relative w-full h-full object-cover rounded-lg shadow-2xl shadow-black/50"
      />
    </motion.div>
  );
};
