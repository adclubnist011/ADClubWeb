
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Papa from "papaparse";

import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiUser,
  FiAward,
  FiImage,
  FiStar,
} from "react-icons/fi";

// Google Sheet CSV URL
const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1VdvKc-OsQMEzh9HkeSqGWf1Mexvsm0KdOvszWgjnd_8/export?format=csv";

// Animation Variants
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

// Normalize column names
const normalizeKey = (key = "") =>
  key
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

// Get values using Google Sheet column names
const getValue = (row, columnName) => {
  const target = normalizeKey(columnName);

  const key = Object.keys(row).find(
    (item) => normalizeKey(item) === target
  );

  return key ? String(row[key] ?? "").trim() : "";
};

// Parse event dates
const parseEventDate = (value) => {
  if (!value) return null;

  const dateString = value.trim();

  // DD/MM/YYYY or DD-MM-YYYY
  const indianDate = dateString.match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/
  );

  if (indianDate) {
    const [, day, month, year] = indianDate;

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    if (
      date.getFullYear() === Number(year) &&
      date.getMonth() === Number(month) - 1 &&
      date.getDate() === Number(day)
    ) {
      return date.getTime();
    }

    return null;
  }

  // YYYY-MM-DD
  const isoDate = dateString.match(
    /^(\d{4})-(\d{1,2})-(\d{1,2})/
  );

  if (isoDate) {
    const [, year, month, day] = isoDate;

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).getTime();
  }

  const timestamp = Date.parse(dateString);

  return Number.isNaN(timestamp) ? null : timestamp;
};

// Convert Google Drive links into displayable image URLs

const getImageUrl = (url) => {
  if (!url) return "";

  const trimmedUrl = url.trim();

  // Extract Google Drive file ID
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/uc\?id=([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = trimmedUrl.match(pattern);

    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
    }
  }

  // Keep normal image URLs unchanged
  return trimmedUrl;
};

// Map Google Sheet response to event objects
const mapEventData = (row, index) => {
  const date = getValue(row, "Date of event");

  return {
    id: index + 1,

    title: getValue(row, "Event Title"),
    description: getValue(row, "Description of the Event"),
    date,

    venue: getValue(row, "Venue"),
    theme: getValue(row, "Theme (if required)"),

    participants: getValue(row, "Number of pariticipants"),

    coordinator1: getValue(
      row,
      "Name of the coordinator 1"
    ),

    coordinator2: getValue(
      row,
      "Name of the coordinator 2"
    ),

    advisor: getValue(row, "Advisor name"),

    clubPresident: getValue(
      row,
      "Name of the president During the event"
    ),

    clubVicePresident: getValue(
      row,
      "Name of the Vice president During the event"
    ),

    image: getImageUrl(
      getValue(row, "Upload a image of the event")
    ),

    sortDate: parseEventDate(date),
  };
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from Google Sheets
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(GOOGLE_SHEET_URL);

        if (!response.ok) {
          throw new Error("Unable to fetch events from Google Sheets.");
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
        });

        if (result.errors.length > 0) {
          console.warn("CSV parsing warnings:", result.errors);
        }

        const eventData = result.data
          .map(mapEventData)
          .filter((event) => event.title);

        // Newest events first
        eventData.sort((a, b) => {
          if (a.sortDate === null) return 1;
          if (b.sortDate === null) return -1;

          return b.sortDate - a.sortDate;
        });

        setEvents(eventData);
      } catch (err) {
        console.error("Events fetch error:", err);
        setError(
          "Unable to load events. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
            Every event tells a story. Explore the artistic
            celebrations, performances, and creative experiences
            organized by AD CLUB at NIST University.
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

        {/* Loading State */}

        {loading ? (
          <div className="py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-500/20 border-t-red-500" />

            <p className="mt-5 text-sm text-gray-400">
              Loading events...
            </p>
          </div>
        ) : error ? (
          /* Error State */

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-16 text-center">
            <FiCalendar className="mx-auto mb-5 text-4xl text-red-500" />

            <h3 className="mb-3 text-xl font-bold text-white">
              Events Could Not Be Loaded
            </h3>

            <p className="text-sm text-gray-400">
              {error}
            </p>
          </div>
        ) : events.length > 0 ? (

          /* Events Grid */

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
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : null}

                  {/* Fallback */}
                  <div
                    style={{ display: event.image ? "none" : "flex" }}
                    className="absolute inset-0 items-center justify-center bg-gradient-to-br from-red-950 to-black"
                  >
                    <FiImage className="text-6xl text-red-500/50" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <span className="absolute bottom-5 right-6 text-5xl font-black text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

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
                        <p className="text-xs text-gray-500">
                          Event Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-200">
                          {event.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiMapPin className="mt-1 shrink-0 text-red-500" />

                      <div>
                        <p className="text-xs text-gray-500">
                          Venue
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-200">
                          {event.venue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}

                  {event.description && (
                    <p className="mb-6 text-sm leading-7 text-gray-400">
                      {event.description}
                    </p>
                  )}

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

                      {/* Coordinator 1 */}

                      {event.coordinator1 && (
                        <div className="flex items-start gap-3">
                          <FiUser className="mt-1 shrink-0 text-red-500" />

                          <div>
                            <p className="text-xs text-gray-500">
                              Event Coordinator 1
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-200">
                              {event.coordinator1}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Coordinator 2 */}

                      {event.coordinator2 && (
                        <div className="flex items-start gap-3">
                          <FiUser className="mt-1 shrink-0 text-red-500" />

                          <div>
                            <p className="text-xs text-gray-500">
                              Event Coordinator 2
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-200">
                              {event.coordinator2}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Faculty Advisor */}

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

                      {/* Club President and Vice President */}

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
              We're preparing exciting experiences. Stay connected
              with AD CLUB for upcoming events and activities.
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Events;