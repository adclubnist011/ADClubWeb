
import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import { GiDramaMasks } from "react-icons/gi";
import { BsStars } from "react-icons/bs";

const HeroSection = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const activities = [
    "Art & Creativity",
    "Theatre & Drama",
    "Expression",
    "Culture",
  ];

  const highlights = [
    {
      icon: <FiUsers />,
      title: "Community",
      subtitle: "Creative Minds",
    },
    {
      icon: <GiDramaMasks />,
      title: "Perform",
      subtitle: "Stage & Theatre",
    },
    {
      icon: <FiAward />,
      title: "Celebrate",
      subtitle: "Art & Talent",
    },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#080808] px-4 py-24 sm:px-8 sm:py-28 lg:px-16"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[300px] w-[300px] rounded-full bg-red-700/10 blur-[120px] sm:h-[400px] sm:w-[400px]" />

        <div className="absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full bg-red-600/10 blur-[120px] sm:h-[500px] sm:w-[500px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-900/5 blur-[120px]" />
      </div>

      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.025]" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">

        {/* LEFT CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* University Badge */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex max-w-full items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-4 py-2 sm:mb-7 sm:px-5"
          >
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-red-500" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-red-400 sm:text-xs sm:tracking-[0.22em]">
              NIST University • Official Club
            </span>
          </motion.div>

          {/* Intro */}
          <motion.p
            variants={fadeUp}
            className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500 sm:text-sm sm:tracking-[0.35em]"
          >
            Where Creativity Meets Expression
          </motion.p>

          {/* Club Name */}
          <motion.h1
            variants={fadeUp}
            className="mb-3 text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl"
          >
            AD{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-700 bg-clip-text text-transparent">
              CLUB
            </span>
          </motion.h1>

          {/* Full Name */}
          <motion.h2
            variants={fadeUp}
            className="mb-6 text-base font-semibold tracking-wide text-gray-300 sm:mb-7 sm:text-xl md:text-2xl"
          >
            Arts & Dramatics Club
          </motion.h2>

          {/* Red Divider */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center gap-3 sm:mb-7"
          >
            <div className="h-[3px] w-16 rounded-full bg-red-500" />
            <div className="h-[3px] w-5 rounded-full bg-red-500/30" />
            <div className="h-[3px] w-2 rounded-full bg-red-500/10" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mb-7 max-w-xl text-sm leading-7 text-gray-400 sm:mb-8 sm:text-base sm:leading-8 md:text-lg"
          >
            A creative community at NIST University where imagination
            takes centre stage. From the colours of art to the power
            of theatre, we bring together passionate minds to create,
            perform, express, and inspire.

            <span className="text-gray-300">
              {" "}Every individual has a story worth telling, and every
              creative idea deserves a stage.
            </span>
          </motion.p>

          {/* Activities */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-9 sm:gap-3 lg:justify-start"
          >
            {activities.map((item, index) => (
              <span
                key={index}
                className="rounded-full border border-red-500/20 bg-red-500/[0.05] px-3 py-2 text-[10px] font-medium tracking-wide text-gray-300 transition-all duration-300 hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-400 sm:px-4 sm:text-xs"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mb-9 flex w-full flex-col justify-center gap-3 sm:mb-10 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start"
          >
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("about")}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-red-500 hover:shadow-red-500/30 sm:w-auto sm:px-8"
            >
              Explore Our Club
              <FiArrowUpRight className="text-lg" />
            </motion.button>

            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("events")}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-red-500/70 hover:bg-red-500/10 hover:text-red-400 sm:w-auto sm:px-8"
            >
              <GiDramaMasks className="text-lg" />
              Discover Events
            </motion.button>
          </motion.div>

          {/* Club Highlights */}
          <motion.div
            variants={fadeUp}
            className="grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-3"
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group flex min-w-0 flex-col items-center rounded-xl border border-white/[0.07] bg-white/[0.025] px-1 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-500/[0.05] sm:px-2"
              >
                <div className="mb-2 text-xl text-red-500 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                <h3 className="text-[10px] font-bold text-white sm:text-sm">
                  {item.title}
                </h3>

                <p className="mt-1 text-center text-[8px] text-gray-500 sm:text-xs">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: ANIMATED CLUB LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.3,
          }}
          className="relative mx-auto flex w-full max-w-[500px] items-center justify-center py-6 sm:py-10"
        >
          {/* Background Glow */}
          <div className="absolute h-[230px] w-[230px] rounded-full bg-red-600/20 blur-[80px] sm:h-[420px] sm:w-[420px]" />

          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[260px] w-[260px] rounded-full border border-dashed border-red-500/30 sm:h-[450px] sm:w-[450px]"
          >
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.9)]" />

            <div className="absolute bottom-10 right-8 h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.8)]" />
          </motion.div>

          {/* Inner Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[220px] w-[220px] rounded-full border border-red-500/20 sm:h-[390px] sm:w-[390px]"
          >
            <div className="absolute right-5 top-1/2 h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.8)]" />
          </motion.div>

          {/* Main Logo Container */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex h-[210px] w-[210px] items-center justify-center rounded-[30px] border border-red-500/30 bg-gradient-to-br from-red-500/[0.12] via-black/80 to-rose-950/30 p-6 shadow-[0_0_60px_rgba(220,38,38,0.15)] backdrop-blur-xl sm:h-[340px] sm:w-[340px] sm:rounded-[45px] sm:p-10"
          >
            {/* Inner Border */}
            <div className="absolute inset-3 rounded-[24px] border border-red-500/10 sm:inset-4 sm:rounded-[35px]" />

            {/* Club Logo */}
            <img
              src="/logo/logo.png"
              alt="AD Club Arts and Dramatics Club Logo"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_25px_rgba(239,68,68,0.2)]"
            />

            {/* Top Decorative Spark */}
            <motion.div
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute -right-2 -top-2 rounded-full border border-red-400/30 bg-[#160808] p-2.5 text-red-400 shadow-lg shadow-red-500/20 sm:-right-3 sm:-top-3 sm:p-3"
            >
              <BsStars className="text-lg sm:text-xl" />
            </motion.div>
          </motion.div>

          {/* Floating Art Badge */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-1 top-4 z-20 flex items-center gap-2 rounded-xl border border-red-500/20 bg-[#100b0b]/95 px-2.5 py-2 shadow-xl backdrop-blur-xl sm:-left-8 sm:top-12 sm:gap-3 sm:px-4 sm:py-3"
          >
            <div className="rounded-lg bg-red-500/15 p-1.5 text-lg text-red-400 sm:p-2 sm:text-xl">
              <GiDramaMasks />
            </div>

            <div>
              <p className="text-[10px] font-bold text-white sm:text-xs">
                Theatre & Drama
              </p>
              <p className="text-[9px] text-gray-500 sm:text-[10px]">
                Stories come alive
              </p>
            </div>
          </motion.div>

          {/* Floating Creativity Badge */}
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-1 bottom-12 z-20 flex items-center gap-2 rounded-xl border border-red-500/20 bg-[#100b0b]/95 px-2.5 py-2 shadow-xl backdrop-blur-xl sm:-right-8 sm:bottom-16 sm:gap-3 sm:px-4 sm:py-3"
          >
            <div className="rounded-lg bg-red-500/15 p-1.5 text-lg text-red-400 sm:p-2 sm:text-xl">
              <FiAward />
            </div>

            <div>
              <p className="text-[10px] font-bold text-white sm:text-xs">
                Art & Creativity
              </p>
              <p className="text-[9px] text-gray-500 sm:text-[10px]">
                Create something unique
              </p>
            </div>
          </motion.div>

          {/* Bottom Label */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-center sm:-bottom-4">
            <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-red-400/70 sm:text-[10px] sm:tracking-[0.4em]">
              Imagine • Create • Perform
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.button
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to about section"
        className="absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-600 transition-colors duration-300 hover:text-red-400 sm:flex"
      >
        <span>Scroll to explore</span>
        <FiArrowDown className="text-lg" />
      </motion.button>
    </section>
  );
};

export default HeroSection;