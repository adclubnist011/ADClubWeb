
import React, { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Youtube,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    value: "adclubnist011@gmail.com",
    link: "mailto:",
  },
  {
    icon: MapPin,
    title: "Find Us",
    value: "NIST University, Berhampur, Odisha, India",
    link: null,
  },
];

const socialLinks = [
  {
    icon: Instagram,
    name: "Instagram",
    link: "https://www.instagram.com/adclub.nist/",
  },
  {
    icon: Youtube,
    name: "YouTube",
    link: "https://www.youtube.com/channel/UC-HpeVOeHfEr5fUXYSZD9iw",
  },
];

const ContactSection = () => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing.");
      }

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080808] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-700/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-red-900/10 blur-[130px]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2"
          >
            <Sparkles size={15} className="text-red-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              Let's Connect
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl"
          >
            Get In <span className="text-red-600">Touch</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base"
          >
            Have a creative idea, want to collaborate, or interested in
            becoming part of AD CLUB? We'd love to hear from you.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-7 h-1 w-20 rounded-full bg-red-600"
          />
        </motion.div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Left Contact Information */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111]/90 p-7 backdrop-blur-xl sm:p-9"
          >
            {/* Card Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-600/10 blur-[90px]" />

            <div className="relative z-10">

              {/* Card Heading */}
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                  <MessageCircle className="text-red-500" size={21} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Let's Connect
                  </h3>

                  <p className="text-xs text-gray-500">
                    We'd love to hear from you
                  </p>
                </div>
              </div>

              <p className="mb-9 max-w-md text-sm leading-7 text-gray-400">
                Whether you are an artist, performer, storyteller, or simply
                someone who loves creativity, there's a place for you here.
                Reach out and let's create something memorable together.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactDetails.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.5,
                      }}
                      className="group flex items-start gap-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-red-500/40 group-hover:bg-red-600/10">
                        <Icon
                          size={19}
                          className="text-red-500 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="mb-1 text-sm font-semibold text-white">
                          {item.title}
                        </h4>

                        {item.link ? (
                          <a
                            href={item.link}
                            className="break-words text-sm text-gray-400 transition-colors hover:text-red-400"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm leading-6 text-gray-400">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-9 h-px bg-white/10" />

              {/* Social Links */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-white">
                  Follow Our Journey
                </h4>

                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;

                    return (
                      <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12 }}
                        whileHover={{ y: -5, scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-colors hover:border-red-500 hover:bg-red-600 hover:text-white"
                      >
                        <Icon size={19} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Message */}
              <div className="mt-9 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4">
                <p className="text-sm leading-6 text-gray-300">
                  <span className="font-semibold text-red-400">
                    Creativity has no limits.
                  </span>{" "}
                  Let's bring your ideas to life.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111]/90 p-7 backdrop-blur-xl sm:p-9"
          >
            {/* Form Glow */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-red-600/10 blur-[90px]" />

            <div className="relative z-10">

              <div className="mb-8">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                  Send Us A Message
                </span>

                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Let's Start a <span className="text-red-500">Conversation.</span>
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Fill out the form below and our team will get back to you.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="from_name"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Your Name
                  </label>

                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="from_email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    maxLength={150}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What would you like to discuss?"
                    required
                    maxLength={150}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your idea, collaboration, or query..."
                    required
                    maxLength={3000}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                      Send Message
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </>
                  )}
                </motion.button>

                {/* Form Status */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-center text-sm text-green-400"
                    >
                      Message sent successfully! We'll get back to you soon.
                    </motion.p>
                  )}

                  {status === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400"
                    >
                      Unable to send your message. Please try again later.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;