
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiChevronDown,
} from "react-icons/fi";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "events", label: "Events" },
    { id: "gallery", label: "Gallery" },
    { id: "team", label: "Our Team" },
    { id: "contact", label: "Contact" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.07 },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-2xl border-b border-red-500/20 shadow-[0_8px_35px_rgba(239,68,68,0.08)]"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      {/* Animated top accent */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "100%" }}
      />

      <div
        className={`max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Logo */}
        <Link
          to="home"
          smooth
          duration={600}
          onClick={() => setMenuOpen(false)}
          className="group flex items-center cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/logo/logo.png"
              alt="AD Club Logo"
              className="relative h-10 md:h-12 w-auto max-w-[170px] object-contain"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              smooth
              spy
              duration={600}
              offset={-85}
              onSetActive={() => setActive(item.id)}
              className="relative group cursor-pointer py-3"
            >
              <span
                className={`text-sm xl:text-[15px] font-medium tracking-wide transition-colors duration-300 ${
                  active === item.id
                    ? "text-red-400"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>

              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-red-600 to-red-400"
                initial={false}
                animate={{
                  width: active === item.id ? "100%" : "0%",
                  opacity: active === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Hover glow */}
              <span className="absolute -inset-x-2 inset-y-1 rounded-lg bg-red-500/0 group-hover:bg-red-500/5 transition-colors duration-300 -z-10" />
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            to="events"
            smooth
            duration={600}
            offset={-85}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-red-500/50 px-5 py-2.5 text-sm font-semibold text-white cursor-pointer transition-all duration-300 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Explore Events</span>
            <FiArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden relative z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden absolute top-full left-0 w-full border-t border-red-500/20 bg-[#090909]/95 backdrop-blur-2xl shadow-2xl"
          >
            <motion.nav
              className="flex flex-col px-6 py-5"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Link
                    to={item.id}
                    smooth
                    spy
                    duration={600}
                    offset={-75}
                    onSetActive={() => setActive(item.id)}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between border-b border-white/5 py-4 text-base cursor-pointer transition-colors ${
                      active === item.id
                        ? "text-red-400"
                        : "text-gray-300 hover:text-red-400"
                    }`}
                  >
                    {item.label}
                    <FiChevronDown
                      className="-rotate-90 text-red-500/70"
                      size={16}
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="pt-5">
                <Link
                  to="events"
                  smooth
                  duration={600}
                  offset={-75}
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-500 py-3 font-semibold text-white shadow-lg shadow-red-500/20 cursor-pointer"
                >
                  Explore Events <FiArrowUpRight />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;