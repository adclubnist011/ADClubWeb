
import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiUser,
  FiAward,
  FiStar,
  FiImage,
} from "react-icons/fi";

import events from "../data/events.json";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const Events = () => {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#080808] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-700/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-red-900/10 blur-[130px]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2">
            <FiStar className="text-red-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              Creativity in Action
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Our <span className="text-red-600">Events</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Every event tells a story. Explore the artistic celebrations,
            performances, and creative experiences organized by AD CLUB
            at NIST University.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-red-600" />
        </motion.div>

        {/* Event Count */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              Event Highlights
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Moments, memories and creativity
            </p>
          </div>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300">
            {events.length} {events.length === 1 ? "Event" : "Events"}
          </span>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {events.map((event, index) => (
              <motion.article
                key={event.id}
                variants={cardVariants}
                whileHover={{ y: -7 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition-colors duration-500 hover:border-red-600/50"
              >
                {/* Event Image */}
                <div className="relative h-64 overflow-hidden bg-[#1a1a1a] sm:h-80">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-950 to-black">
                      <FiImage className="text-6xl text-red-500/50" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Featured Badge */}
                  {event.featured && (
                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-red-400/30 bg-red-600/90 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                      <FiStar className="fill-white" />
                      Featured Event
                    </div>
                  )}

                  {/* Event Number */}
                  <span className="absolute bottom-5 right-6 text-5xl font-black text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Event Title on Image */}
                  <div className="absolute bottom-5 left-6 right-16">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                      AD CLUB PRESENTS
                    </p>

                    <h3 className="text-2xl font-black sm:text-3xl">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Event Information */}
                <div className="p-6 sm:p-8">

                  {/* Date and Venue */}
                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <FiCalendar className="mt-1 shrink-0 text-red-500" />

                      <div>
                        <p className="text-xs text-gray-500">Event Date</p>
                        <p className="mt-1 text-sm font-medium text-gray-200">
                          {event.date || "Date not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiMapPin className="mt-1 shrink-0 text-red-500" />

                      <div>
                        <p className="text-xs text-gray-500">Venue</p>
                        <p className="mt-1 text-sm font-medium text-gray-200">
                          {event.venue || "Venue not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-7 text-gray-400">
                    {event.description}
                  </p>

                  {/* Theme and Participants */}
                  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {event.theme && (
                      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] p-4">
                        <p className="mb-1 text-xs text-gray-500">
                          Event Theme
                        </p>

                        <p className="font-semibold text-red-400">
                          {event.theme}
                        </p>
                      </div>
                    )}

                    {event.participants && (
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                          <FiUsers />
                          Participation
                        </div>

                        <p className="font-semibold text-white">
                          {event.participants}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Event Team */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="mb-4 flex items-center gap-2">
                      <FiAward className="text-red-500" />

                      <h4 className="text-sm font-bold text-white">
                        Event Team & Coordination
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {event.coordinator && (
                        <div className="flex items-start gap-3">
                          <FiUser className="mt-1 shrink-0 text-red-500" />

                          <div>
                            <p className="text-xs text-gray-500">
                              Event Coordinator
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-200">
                              {event.coordinator}
                            </p>
                          </div>
                        </div>
                      )}

                      {event.advisor && (
                        <div className="flex items-start gap-3">
                          <FiUser className="mt-1 shrink-0 text-red-500" />

                          <div>
                            <p className="text-xs text-gray-500">
                              Faculty Advisor
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-200">
                              {event.advisor}
                            </p>
                          </div>
                        </div>
                      )}

                      {(event.clubPresident || event.clubVicePresident) && (
                        <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
                          {event.clubPresident && (
                            <div>
                              <p className="text-xs text-gray-500">
                                Club President
                              </p>

                              <p className="mt-1 text-sm font-medium text-gray-200">
                                {event.clubPresident}
                              </p>
                            </div>
                          )}

                          {event.clubVicePresident && (
                            <div>
                              <p className="text-xs text-gray-500">
                                Club Vice President
                              </p>

                              <p className="mt-1 text-sm font-medium text-gray-200">
                                {event.clubVicePresident}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {event.tags?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                      {event.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center"
          >
            <FiCalendar className="mx-auto mb-5 text-4xl text-red-500" />

            <h3 className="mb-3 text-xl font-bold text-white">
              Events Coming Soon
            </h3>

            <p className="mx-auto max-w-md text-sm leading-6 text-gray-400">
              We're preparing exciting experiences. Stay connected with AD
              CLUB for upcoming events and activities.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Events;