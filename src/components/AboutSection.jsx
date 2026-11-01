
import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiUsers,
  FiAward,
  FiHeart,
} from "react-icons/fi";

import { GiDramaMasks } from "react-icons/gi";
import aboutImage from "../assets/About/About.JPG";

const AboutSection = () => {
  const highlights = [
    {
      icon: <FiUsers />,
      title: "Community",
      description: "A space for creative minds to connect.",
    },
    {
      icon: <GiDramaMasks />,
      title: "Expression",
      description: "Bringing stories and ideas to life.",
    },
    {
      icon: <FiAward />,
      title: "Creativity",
      description: "Celebrating talent and originality.",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#050505] px-6 py-24 sm:px-10 md:py-32"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-red-700/15 blur-[150px]" />
        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-red-950/40 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 bg-red-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-red-400">
              Discover Our Story
            </span>
            <span className="h-[1px] w-10 bg-red-500" />
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            More Than A Club.
            <span className="block bg-gradient-to-r from-red-500 via-red-400 to-red-700 bg-clip-text text-transparent">
              A Creative Identity.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Where imagination finds its voice, talent finds its stage,
            and creativity becomes an experience.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Animated image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="group relative mx-auto w-full max-w-[540px]"
            style={{ perspective: "1000px" }}
          >
            {/* Outer glow */}
            <motion.div
              animate={{
                opacity: [0.35, 0.7, 0.35],
                scale: [0.98, 1.03, 0.98],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-red-600/50 via-red-900/10 to-red-500/40 blur-2xl"
            />

            {/* Image frame */}
            <motion.div
              whileHover={{
                rotateY: 5,
                rotateX: -3,
                scale: 1.025,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-[#110606] p-2 shadow-[0_0_45px_rgba(220,38,38,0.13)]"
            >
              <div className="relative overflow-hidden rounded-[1.3rem]">
                <motion.img
                  src={aboutImage}
                  alt="AD Club members and activities"
                  className="h-[390px] w-full object-cover sm:h-[500px]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10 transition-opacity duration-500 group-hover:from-black/65" />

                {/* Animated shine */}
                <motion.div
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "150%" }}
                  transition={{ duration: 0.9 }}
                  className="pointer-events-none absolute inset-0 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                {/* Image caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="mb-2 inline-block rounded-full border border-red-400/40 bg-red-950/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-300 backdrop-blur-md">
                    NIST University
                  </span>

                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    Arts & Dramatics Club
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">
                    One stage. Countless stories. Endless possibilities.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating corner badge */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-4 -top-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-[#170808] text-red-400 shadow-[0_0_25px_rgba(220,38,38,0.25)] sm:-right-6 sm:-top-6 sm:h-20 sm:w-20"
            >
              <FiHeart size={30} />
            </motion.div>

            {/* Bottom decorative accent */}
            <div className="absolute -bottom-3 -left-3 h-20 w-20 rounded-bl-3xl border-b-2 border-l-2 border-red-500/70" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Who We Are
            </span>

            <h3 className="mt-7 text-3xl font-bold leading-tight text-white sm:text-4xl">
              We Create.
              <span className="text-red-500"> We Perform.</span>
              <br />
              We Inspire.
            </h3>

            <p className="mt-6 text-base leading-8 text-gray-300">
              AD CLUB, the Arts and Dramatics Club of NIST University, is
              a vibrant community for students passionate about art,
              theatre, performance, and creative expression.
            </p>

            <p className="mt-4 text-sm leading-8 text-gray-400 sm:text-base">
              From stage performances and street plays to artistic
              showcases and cultural celebrations, we bring people
              together through creativity. We believe every individual
              has a story worth telling and a talent worth celebrating.
            </p>

            {/* Highlight cards */}
            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -7, scale: 1.03 }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors duration-300 hover:border-red-500/40 hover:bg-red-950/20"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-xl text-red-400 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
                    {item.icon}
                  </div>

                  <h4 className="font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0px 0px 25px rgba(220,38,38,0.4)",
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  document
                    .getElementById("events")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-700 to-red-500 px-7 py-3.5 font-semibold text-white transition-all"
              >
                Explore Our Events
                <FiArrowUpRight size={19} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  document
                    .getElementById("team")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl border border-red-500/40 px-7 py-3.5 font-semibold text-red-400 transition-all duration-300 hover:border-red-400 hover:bg-red-500/10"
              >
                Meet Our Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;