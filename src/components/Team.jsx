
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  Users,
  Award,
  Sparkles,
  GraduationCap,
  X,
  AlertCircle,
  LoaderCircle,
  UserRound,
} from "lucide-react";

// ============================================
// GOOGLE SHEET CONFIGURATION
// ============================================

const POSITION_HOLDERS_SHEET_ID =
  "1kWW-kPNLxUMuFgRi02RySOM_M_BELFwr8XLyYDRh6TM";

const OTHER_MEMBERS_SHEET_ID =
  "1Lfk9Wr6mqU7lUgBGw349WeoG8rCx4Jtk0HxgKN1iIyE";

// ============================================
// FETCH GOOGLE SHEET DATA
// ============================================

const fetchGoogleSheet = async (sheetId) => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Google Sheets request failed. Status: ${response.status}`
    );
  }

  const csvText = await response.text();

  if (
    csvText.trim().startsWith("<!DOCTYPE html") ||
    csvText.trim().startsWith("<html")
  ) {
    throw new Error(
      "Google Sheet access denied. Enable Anyone with the link as Viewer."
    );
  }

  return csvText;
};

// ============================================
// CSV PARSER
// Supports commas, quotes and multiline values
// ============================================

const parseCSV = (text) => {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(value.trim());
      value = "";
    } else if (
      (char === "\n" || char === "\r") &&
      !insideQuotes
    ) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }

      row.push(value.trim());

      if (row.some((cell) => cell !== "")) {
        rows.push(row);
      }

      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  if (value || row.length > 0) {
    row.push(value.trim());

    if (row.some((cell) => cell !== "")) {
      rows.push(row);
    }
  }

  if (rows.length === 0) return [];

  // Normalize headers
  const headers = rows[0].map((header) =>
    header
      .replace(/^\uFEFF/, "")
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "")
  );

  return rows.slice(1).map((values) => {
    const member = {};

    headers.forEach((header, index) => {
      member[header] = values[index]?.trim() || "";
    });

    return member;
  });
};

// ============================================
// GET FIELD FROM MEMBER OBJECT
// ============================================

const getField = (person, ...keys) => {
  for (const key of keys) {
    const normalizedKey = key
      .toLowerCase()
      .replace(/[\s_-]+/g, "");

    const value = person[normalizedKey];

    if (value !== undefined && value !== null && value !== "") {
      return String(value).trim();
    }
  }

  return "";
};

// ============================================
// GOOGLE DRIVE IMAGE URL CONVERTER
// ============================================

const getDirectImageUrl = (url) => {
  if (!url) return "";

  const value = url.trim();

  // Extract ID from open?id=...
  let match = value.match(/[?&]id=([^&]+)/);

  // Extract ID from /file/d/...
  if (!match) {
    match = value.match(/\/file\/d\/([^/]+)/);
  }

  // Extract ID from /d/...
  if (!match) {
    match = value.match(/\/d\/([^/]+)/);
  }

  if (match?.[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }

  return value;
};

// ============================================
// NORMALIZE MEMBER DATA
// ============================================

const normalizeMember = (person, index, type) => {
  const image = getField(
    person,
    "upload your image",
    "image",
    "uploaded image",
    "photo",
    "profile image",
    "image url",
    "picture"
  );

  return {
    id: `${type}-${index}`,

    name: getField(
      person,
      "name",
      "full name",
      "member name"
    ),

    rollNo: getField(
      person,
      "roll number",
      "rollNo",
      "registration number",
      "regd no"
    ),

    branch: getField(
      person,
      "branch",
      "department"
    ),

    year: getField(
      person,
      "year",
      "academic year"
    ),

    email: getField(
      person,
      "email address",
      "email"
    ),

    role: getField(
      person,
      "role",
      "designation"
    ),

    position: getField(
      person,
      "position"
    ),

    image: getDirectImageUrl(image),
  };
};

// ============================================
// YEAR GROUPING
// ============================================

const getYearGroup = (year) => {
  const value = year.toLowerCase().trim();

  if (
    ["4th year", "fourth year", "4th", "4"].includes(value)
  ) {
    return "Fourth Year";
  }

  if (
    ["3rd year", "third year", "3rd", "3"].includes(value)
  ) {
    return "Third Year";
  }

  if (
    ["2nd year", "second year", "2nd", "2"].includes(value)
  ) {
    return "Second Year";
  }

  return null;
};

// ============================================
// POSITION GROUPING
// Uses the actual Position column
// ============================================

const getPositionGroup = (member) => {
  const position = member.position.toLowerCase().trim();

  if (
    position.includes("department heads") ||
    position.includes("department head")
  ) {
    return "Department Heads";
  }

  if (position.includes("core leadership")) {
    return "Core Leadership";
  }

  return null;
};

// ============================================
// SECTION HEADING
// ============================================

const SectionHeading = ({ title, subtitle, icon: Icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
          <Icon size={22} />
        </div>

        <h2 className="text-2xl font-bold text-white md:text-3xl">
          {title}
        </h2>
      </div>

      <p className="text-sm text-gray-400 md:text-base">
        {subtitle}
      </p>

      <div className="mt-5 h-[2px] w-20 rounded-full bg-red-500" />
    </div>
  );
};

// ============================================
// MEMBER CARD
// ============================================

const MemberCard = ({ member, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);

  const initials = member.name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.45,
          delay: Math.min(index * 0.05, 0.3),
        }}
        whileHover={{ y: -7 }}
        onClick={() => setShowDetails(true)}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition-colors duration-300 hover:border-red-500/50"
      >
        {/* IMAGE */}
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#1a1a1a] sm:h-72">
          {member.image && !imageError ? (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#222] to-[#111]">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-3xl font-bold text-red-400">
                {initials || <UserRound size={38} />}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">
              {member.name || "Team Member"}
            </h3>

            <p className="mt-1 text-sm font-medium text-red-400">
              {member.role || "Club Member"}
            </p>
          </div>
        </div>

        {/* MEMBER INFORMATION */}
        <div className="space-y-2 p-4">
          {member.branch && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <GraduationCap
                size={17}
                className="text-red-400"
              />
              <span>{member.branch}</span>
            </div>
          )}

          {member.year && (
            <p className="text-xs text-gray-500">
              {member.year}
            </p>
          )}

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs text-gray-500">
              {member.rollNo || "AD Club NIST"}
            </span>

            <span className="text-xs text-red-400 transition-colors group-hover:text-red-300">
              View Profile ↗
            </span>
          </div>
        </div>
      </motion.div>

      {/* PROFILE POPUP */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6"
            >
              <button
                onClick={() => setShowDetails(false)}
                className="absolute right-4 top-4 text-gray-400 transition hover:text-white"
                aria-label="Close profile"
              >
                <X size={22} />
              </button>

              <div className="mx-auto mb-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-red-500 bg-[#222]">
                {member.image && !imageError ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-red-400">
                    {initials}
                  </span>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white">
                  {member.name}
                </h3>

                <p className="mt-1 text-red-400">
                  {member.role || "Club Member"}
                </p>
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                {[
                  ["Roll Number", member.rollNo],
                  ["Branch", member.branch],
                  ["Academic Year", member.year],
                  ["Email", member.email],
                ].map(([label, value]) =>
                  value ? (
                    <div
                      key={label}
                      className="flex justify-between gap-4"
                    >
                      <span className="text-gray-500">
                        {label}
                      </span>

                      <span className="max-w-[65%] break-all text-right text-gray-200">
                        {value}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================
// MEMBER GRID
// ============================================

const MemberGrid = ({ members }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member, index) => (
        <MemberCard
          key={member.id}
          member={member}
          index={index}
        />
      ))}
    </div>
  );
};

// ============================================
// MAIN TEAM COMPONENT
// ============================================

const Team = () => {
  const [teamMembers, setTeamMembers] = useState({
    leadership: [],
    departmentHeads: [],
    fourthYear: [],
    thirdYear: [],
    secondYear: [],
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ------------------------------------------
  // LOAD GOOGLE SHEET DATA
  // ------------------------------------------

  useEffect(() => {
    let isMounted = true;

    const loadTeamData = async () => {
      try {
        setLoading(true);
        setError("");

        const [positionCSV, membersCSV] = await Promise.all([
          fetchGoogleSheet(POSITION_HOLDERS_SHEET_ID),
          fetchGoogleSheet(OTHER_MEMBERS_SHEET_ID),
        ]);

        const positionData = parseCSV(positionCSV);
        const membersData = parseCSV(membersCSV);

        console.log("Position Holders Raw Data:", positionData);
        console.log("Other Members Raw Data:", membersData);

        const positionMembers = positionData
          .map((person, index) =>
            normalizeMember(person, index, "position")
          )
          .filter((member) => member.name);

        const otherMembers = membersData
          .map((person, index) =>
            normalizeMember(person, index, "member")
          )
          .filter((member) => member.name);

        // POSITION HOLDER GROUPS
        const leadership = positionMembers.filter(
          (member) =>
            getPositionGroup(member) === "Core Leadership"
        );

        const departmentHeads = positionMembers.filter(
          (member) =>
            getPositionGroup(member) === "Department Heads"
        );

        // OTHER MEMBER GROUPS
        const fourthYear = otherMembers.filter(
          (member) =>
            getYearGroup(member.year) === "Fourth Year"
        );

        const thirdYear = otherMembers.filter(
          (member) =>
            getYearGroup(member.year) === "Third Year"
        );

        const secondYear = otherMembers.filter(
          (member) =>
            getYearGroup(member.year) === "Second Year"
        );

        console.log("Core Leadership:", leadership);
        console.log("Department Heads:", departmentHeads);
        console.log("Fourth Year:", fourthYear);
        console.log("Third Year:", thirdYear);
        console.log("Second Year:", secondYear);

        if (isMounted) {
          setTeamMembers({
            leadership,
            departmentHeads,
            fourthYear,
            thirdYear,
            secondYear,
          });
        }
      } catch (err) {
        console.error("Google Sheets Error:", err);

        if (isMounted) {
          setError(
            err.message ||
              "Unable to load team members. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeamData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ------------------------------------------
  // SEARCH FILTER
  // ------------------------------------------

  const filteredSections = useMemo(() => {
    const query = search.toLowerCase().trim();

    const filterMembers = (members) => {
      if (!query) return members;

      return members.filter((member) => {
        const searchableText = [
          member.name,
          member.role,
          member.position,
          member.rollNo,
          member.branch,
          member.year,
          member.email,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    };

    return {
      leadership: filterMembers(teamMembers.leadership),
      departmentHeads: filterMembers(teamMembers.departmentHeads),
      fourthYear: filterMembers(teamMembers.fourthYear),
      thirdYear: filterMembers(teamMembers.thirdYear),
      secondYear: filterMembers(teamMembers.secondYear),
    };
  }, [search, teamMembers]);

  // ------------------------------------------
  // SECTION CONFIGURATION
  // ------------------------------------------

  const sections = [
    {
      id: "leadership",
      title: "Core Leadership",
      subtitle: "The people leading our club forward.",
      icon: Award,
      members: filteredSections.leadership,
    },
    {
      id: "departmentHeads",
      title: "Department Heads",
      subtitle: "The creative minds guiding each department.",
      icon: Sparkles,
      members: filteredSections.departmentHeads,
    },
    {
      id: "fourthYear",
      title: "Fourth Year",
      subtitle: "Our experienced senior members.",
      icon: GraduationCap,
      members: filteredSections.fourthYear,
    },
    {
      id: "thirdYear",
      title: "Third Year",
      subtitle: "The next generation of club leaders.",
      icon: Users,
      members: filteredSections.thirdYear,
    },
    {
      id: "secondYear",
      title: "Second Year",
      subtitle: "Fresh energy and new creative perspectives.",
      icon: Users,
      members: filteredSections.secondYear,
    },
  ];

  const totalMembers = Object.values(teamMembers).reduce(
    (total, members) => total + members.length,
    0
  );

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <section id="team" className="min-h-screen bg-[#080808] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            <Sparkles size={16} />
            <span>Meet Our Creative Minds</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-7xl">
            OUR <span className="text-red-500">TEAM</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            The people behind the creativity, passion, and
            performances of the AD Club at NIST University.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3">
              <Users size={20} className="text-red-400" />

              <span className="text-sm text-gray-300">
                <strong className="text-white">
                  {totalMembers}
                </strong>{" "}
                Team Members
              </span>
            </div>
          </div>
        </motion.div>

        {/* SEARCH BAR */}
        <div className="mx-auto mb-16 max-w-xl">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search name, role, roll number or branch..."
              className="w-full rounded-xl border border-white/10 bg-[#141414] py-4 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-red-500/60"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <LoaderCircle
              size={42}
              className="mb-4 animate-spin text-red-500"
            />

            <p>Loading our team members...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <AlertCircle
              size={38}
              className="mx-auto mb-4 text-red-400"
            />

            <h3 className="text-lg font-bold text-white">
              Unable to load team members
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* TEAM SECTIONS */}
        {!loading && !error && (
          <div className="space-y-20">
            {sections.map((section) => (
              <div key={section.id}>
                <SectionHeading
                  title={section.title}
                  subtitle={section.subtitle}
                  icon={section.icon}
                />

                {section.members.length > 0 ? (
                  <MemberGrid members={section.members} />
                ) : (
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
                    <p className="text-sm text-gray-500">
                      {search
                        ? "No matching members found in this section."
                        : "No members added yet."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
