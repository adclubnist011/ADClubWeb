
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Images,
  Sparkles,
  ExternalLink,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  Heart,
  Aperture,
  MoveUpRight,
  Play,
} from "lucide-react";

const DRIVE_FOLDER_ID = "1Qy15_jqN7NxLGEz6eweYT8slTh9QBjYD";

const DRIVE_LINK =
  "https://drive.google.com/drive/folders/1Qy15_jqN7NxLGEz6eweYT8slTh9QBjYD?usp=sharing";

const EMBED_LINK = `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`;

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const floating = {
  animate: {
    y: [0, -18, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Gallery = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const galleryRef = useRef(null);

  // Refresh Google Drive gallery
  const refreshGallery = () => {
    setReloadKey((prev) => prev + 1);
  };

  // Fullscreen gallery
  const toggleFullscreen = async () => {
    if (!galleryRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await galleryRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen is not available:", error);
    }
  };

  // Mouse-following spotlight
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setSpotlight({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <main
      id="gallery"
      className="relative min-h-screen overflow-hidden bg-[#080808] px-4 pb-24 pt-24 text-white sm:px-8 lg:px-16 xl:px-[130px]"
    >
      {/* =====================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-red-700/10 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 top-[40%] h-[500px] w-[500px] rounded-full bg-red-900/10 blur-[160px]" />

      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute left-[45%] top-[15%] h-64 w-64 rounded-full bg-red-600/10 blur-[100px]"
      />

      {/* =====================================
          HERO SECTION
      ====================================== */}

      <section
        onMouseMove={handleMouseMove}
        className="relative mb-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#18090b] via-[#100d0e] to-[#080808] px-6 py-14 sm:px-12 sm:py-20"
      >
        {/* Mouse spotlight */}

        <div
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(220,38,38,0.16), transparent 35%)`,
          }}
        />

        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">
                <Sparkles size={14} />
                The Art Of Capturing Moments
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-5xl font-black uppercase leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Moments
              <br />
              That <span className="text-red-500">Stay.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-sm leading-7 text-gray-400 sm:text-base"
            >
              Every performance, every celebration, every little
              behind-the-scenes moment has a story. Step into the
              world of AD CLUB and relive the memories.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0px 0px 30px rgba(220,38,38,0.4)",
                }}
                whileTap={{ scale: 0.94 }}
                onClick={() =>
                  galleryRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }
                className="flex items-center gap-2 rounded-full bg-red-600 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-500"
              >
                <Play size={15} fill="currentColor" />
                Explore Gallery
              </motion.button>

              <motion.a
                href={DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:border-red-500/50 hover:bg-red-500/10"
              >
                Open Drive
                <ArrowUpRight size={15} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Animated Camera Illustration */}

          <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border border-dashed border-red-500/30"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-6 rounded-full border border-white/10"
            />

            <motion.div
              variants={floating}
              animate="animate"
              className="relative flex h-44 w-44 items-center justify-center rounded-full border border-red-500/30 bg-gradient-to-br from-red-700/30 via-[#1a090b] to-black shadow-[0_0_80px_rgba(220,38,38,0.2)] sm:h-56 sm:w-56"
            >
              <Aperture
                size={100}
                strokeWidth={0.8}
                className="text-red-500"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute right-0 top-8 rounded-2xl border border-red-500/30 bg-[#171010] p-4 shadow-xl"
            >
              <Camera className="text-red-400" size={25} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-8 left-0 rounded-2xl border border-white/10 bg-[#171010] p-4 shadow-xl"
            >
              <Images className="text-white" size={25} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================
          GALLERY HEADING
      ====================================== */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-red-500">
            <Images size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Captured Memories
            </span>
          </div>

          <h2 className="text-3xl font-black uppercase sm:text-4xl">
            Explore The <span className="text-red-500">Frames.</span>
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            A visual journey through the AD CLUB experience.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Google Drive · View Only
        </div>
      </motion.section>

      {/* =====================================
          GALLERY CONTROLS
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-gradient-to-r from-[#19090b] via-[#111111] to-[#19090b] p-3"
      >
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
            <Eye size={19} />
          </div>

          <div>
            <p className="text-xs font-bold text-white">
              Gallery Preview
            </p>
            <p className="text-[10px] text-gray-500">
              Browse the shared collection
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={refreshGallery}
            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-600 hover:text-white"
          >
            <RefreshCw size={14} />
            Refresh
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-600 hover:text-white"
          >
            {expanded ? (
              <Minimize2 size={14} />
            ) : (
              <Maximize2 size={14} />
            )}
            {expanded ? "Compact View" : "Expand View"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={toggleFullscreen}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-red-500"
          >
            <Maximize2 size={14} />
            Fullscreen
          </motion.button>
        </div>
      </motion.div>

      {/* =====================================
          CINEMATIC GOOGLE DRIVE GALLERY
      ====================================== */}

      <motion.section
        ref={galleryRef}
        layout
        className="relative isolate mt-2 overflow-hidden rounded-3xl border border-red-500/30 bg-[#090909] p-[2px] shadow-[0_0_50px_rgba(220,38,38,0.12)]"
      >
        {/* Animated gradient border */}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute -inset-[150%] -z-10 bg-[conic-gradient(from_0deg,transparent_0deg,#dc2626_80deg,transparent_150deg,#7f1d1d_220deg,transparent_300deg)]"
        />

        <div className="relative overflow-hidden rounded-[22px] bg-[#0b0b0b]">

          {/* Animated Background Glow */}

          <motion.div
            animate={{
              opacity: [0.15, 0.4, 0.15],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-red-700/30 blur-[100px]"
          />

          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-red-900/40 blur-[100px]"
          />

          {/* Gallery Header */}

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-red-500/20 bg-gradient-to-r from-[#21080c] via-[#100b0c] to-[#21080c] px-5 py-5 sm:px-7">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400"
              >
                <Camera size={23} />
              </motion.div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">
                  AD CLUB <span className="text-red-500">Gallery</span>
                </h3>

                <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-500">
                  A collection of unforgettable moments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-red-500/20 bg-black/40 px-4 py-2">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-red-500"
              />

              <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">
                View Only
              </span>
            </div>
          </div>

          {/* Gallery Frame */}

          <div className="relative z-10 p-3 sm:p-5">
            <motion.div
              whileHover={{
                borderColor: "rgba(239,68,68,0.6)",
                boxShadow: "0 0 35px rgba(220,38,38,0.12)",
              }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-[#101010] p-1.5 sm:p-2"
            >
              {/* Moving Red Accent */}

              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute left-0 top-0 z-20 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent"
              />

              {/* Google Drive iframe */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={reloadKey}
                  initial={{ opacity: 0, scale: 0.97, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden rounded-xl bg-[#111111]"
                >
                  <iframe
                    src={EMBED_LINK}
                    title="AD CLUB Google Drive Gallery"
                    className={`w-full border-0 transition-all duration-500 ${
                      expanded
                        ? "h-[1100px] sm:h-[1300px]"
                        : "h-[650px] sm:h-[750px] lg:h-[850px]"
                    }`}
                    loading="lazy"
                    allow="autoplay"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Bottom Toolbar */}

            <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <Images size={18} className="text-red-500" />

                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Memories worth revisiting
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={refreshGallery}
                  className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-600 hover:text-white"
                >
                  <RefreshCw size={14} />
                  Refresh
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition hover:border-red-500/40 hover:bg-red-500/10"
                >
                  <Maximize2 size={14} />
                  Fullscreen
                </motion.button>

                <motion.a
                  href={DRIVE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-red-500"
                >
                  Open Gallery
                  <ArrowUpRight size={14} />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}

          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </div>
      </motion.section>

      {/* =====================================
          MEMORY CARDS
      ====================================== */}

      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {[
          {
            icon: Camera,
            title: "Behind The Scenes",
            description:
              "The moments that happen beyond the spotlight.",
          },
          {
            icon: Heart,
            title: "Shared Memories",
            description:
              "The people, friendships, and memories we cherish.",
          },
          {
            icon: Sparkles,
            title: "Creative Moments",
            description:
              "Every idea, performance, and expression matters.",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{
                y: -9,
                borderColor: "rgba(239,68,68,0.5)",
              }}
              className="group rounded-2xl border border-white/10 bg-[#111111] p-7 transition-colors duration-300"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
                <Icon size={22} />
              </div>

              <h3 className="text-sm font-black uppercase tracking-wide text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-xs leading-6 text-gray-500">
                {item.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-400">
                AD CLUB
                <MoveUpRight size={13} />
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* =====================================
          FINAL CTA
      ====================================== */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-16 overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-r from-[#26090d] via-[#141010] to-[#26090d] px-5 py-14 text-center sm:py-20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-10 -top-20 opacity-[0.06]"
        >
          <Aperture size={280} />
        </motion.div>

        <div className="relative z-10">
          <Sparkles className="mx-auto mb-5 text-red-500" size={30} />

          <h2 className="text-3xl font-black uppercase sm:text-5xl">
            Every Frame
            <br />
            <span className="text-red-500">Has A Story.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400">
            From backstage moments to the spotlight, every memory
            reflects the passion and spirit of our AD CLUB family.
          </p>

          <motion.a
            href={DRIVE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.07,
              boxShadow: "0px 0px 35px rgba(220,38,38,0.35)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-red-500"
          >
            Explore All Memories
            <ArrowUpRight size={16} />
          </motion.a>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.35em] text-red-400">
            AD CLUB · NIST UNIVERSITY
          </p>
        </div>
      </motion.section>
    </main>
  );
};

export default Gallery;