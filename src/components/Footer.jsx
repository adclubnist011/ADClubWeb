
import React from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  ArrowUp,
  ArrowUpRight,
  Drama,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const footerLinks = [
  { name: "Home", id: "home" },
  { name: "About Us", id: "about" },
  { name: "Events", id: "events" },
  { name: "Gallery", id: "gallery" },
  { name: "Our Team", id: "team" },
  { name: "Contact", id: "contact" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const socialLinks = [
    {
      icon: Instagram,
      url: "https://www.instagram.com/adclub.nist/",
      label: "Instagram",
    },
    {
      icon: Youtube,
      url: "https://www.youtube.com/channel/UC-HpeVOeHfEr5fUXYSZD9iw",
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#080808] px-6 pb-8 pt-20 text-white sm:px-10 lg:px-16">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-red-700/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-red-900/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-center justify-between gap-7 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-950/50 via-[#151010] to-red-950/50 px-7 py-10 text-center md:flex-row md:px-12 md:text-left"
        >
          <div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Arts. Drama. Expression.
            </span>

            <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
              Ready to Express <span className="text-red-500">Yourself?</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              Discover your creative side, meet passionate people, and become
              part of something unforgettable with AD CLUB.
            </p>
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="group flex shrink-0 items-center gap-3 rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25"
          >
            Join Our Community
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </motion.div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Club Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5 lg:col-span-2"
          >
            <motion.div
              variants={textVariant}
              custom={1}
              className="flex items-center gap-3"
            >
              <img
                src="/logo/logo.png"
                alt="AD CLUB Logo"
                className="h-12 w-12 rounded-full object-contain"
              />

              <div>
                <h3 className="text-2xl font-black tracking-wide">
                  AD <span className="text-red-600">CLUB</span>
                </h3>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500">
                  Arts & Dramatics Club
                </p>
              </div>
            </motion.div>

            <motion.p
              variants={textVariant}
              custom={2}
              className="max-w-md text-sm leading-7 text-gray-400"
            >
              A creative space at NIST University where imagination meets
              expression. We bring together artists, performers, storytellers,
              and creative minds to celebrate art, culture, and theatre.
            </motion.p>

            <motion.div
              variants={textVariant}
              custom={3}
              className="flex items-center gap-3 pt-1"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            <motion.h4
              variants={textVariant}
              custom={1}
              className="text-sm font-bold uppercase tracking-[0.2em] text-white"
            >
              Quick Links
            </motion.h4>

            <ul className="space-y-3">
              {footerLinks.map((item, index) => (
                <motion.li
                  key={item.id}
                  variants={textVariant}
                  custom={index + 2}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-red-500"
                  >
                    <span className="h-1 w-0 rounded-full bg-red-600 transition-all duration-300 group-hover:w-2" />
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            <motion.h4
              variants={textVariant}
              custom={1}
              className="text-sm font-bold uppercase tracking-[0.2em] text-white"
            >
              Get In Touch
            </motion.h4>

            <motion.div
              variants={textVariant}
              custom={2}
              className="flex items-start gap-3"
            >
              <MapPin className="mt-1 shrink-0 text-red-500" size={18} />
              <p className="text-sm leading-6 text-gray-400">
                NIST University,
                <br />
                Berhampur, Odisha, India
              </p>
            </motion.div>

            <motion.div
              variants={textVariant}
              custom={3}
              className="flex items-center gap-3"
            >
              <Mail className="shrink-0 text-red-500" size={18} />
              <a
                href="mailto:"
                className="break-all text-sm text-gray-400 transition-colors hover:text-red-500"
              >
                adclubnist011@gmail.com
              </a>
            </motion.div>

            <motion.p
              variants={textVariant}
              custom={4}
              className="text-sm leading-6 text-gray-500"
            >
              Have an idea, collaboration, or event proposal? We'd love to
              hear from you.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-5 pt-7 text-center md:flex-row md:text-left"
        >
          <motion.p
            variants={textVariant}
            custom={1}
            className="text-xs leading-6 text-gray-500"
          >
            © {new Date().getFullYear()} AD CLUB, NIST University.
            <span className="ml-1">All Rights Reserved.</span>
          </motion.p>

          <motion.p
            variants={textVariant}
            custom={2}
            className="text-xs font-medium tracking-wide text-gray-500"
          >
            Made with <span className="text-red-600">♥</span> and Creativity.
          </motion.p>

          <motion.button
            variants={textVariant}
            custom={3}
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-semibold text-gray-400 transition-colors hover:text-red-500"
          >
            Back to Top

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white">
              <ArrowUp size={15} />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;