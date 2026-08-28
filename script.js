const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

/* ---------- tiny hand-rolled icon set (no external icon library needed) ---------- */
const ICONS = {
  ticket: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 6v14",
    strokeDasharray: "2 2"
  })),
  sparkles: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9Z"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  music: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9 18V5l11-2v13"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "16",
    r: "3"
  })),
  graduationCap: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M22 10 12 5 2 10l10 5 10-5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"
  })),
  presentation: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 3h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 3v11a1 1 0 0 0 1 1h5l-2 5h8l-2-5h5a1 1 0 0 0 1-1V3"
  })),
  partyPopper: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 21l7-2 9-9-5-5-9 9-2 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 6l5 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 3l1 2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 6l2 1"
  })),
  trophy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M8 21h8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 4h10v5a5 5 0 0 1-10 0V4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 4h2v3a3 3 0 0 1-3-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 4h-2v3a3 3 0 0 0 3-3"
  })),
  users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })),
  mapPin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  pencil: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 20h9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"
  })),
  trash2: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  })),
  arrowLeft: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "12",
    x2: "5",
    y2: "12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 19l-7-7 7-7"
  })),
  calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  })),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 7 12 12 15 14"
  })),
  userPlus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "8",
    x2: "19",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "11",
    x2: "16",
    y2: "11"
  })),
  x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })),
  check: /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }),
  refreshCw: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 1-15 6.7L3 16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 0 1 15-6.7L21 8"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "21 3 21 8 16 8"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "3 21 3 16 8 16"
  }))
};
function Icon({
  name,
  size = 16,
  color = "currentColor"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    }
  }, ICONS[name]);
}

/* ---------- data ---------- */
const CATEGORIES = [{
  id: "music",
  label: "Music",
  icon: "music"
}, {
  id: "workshop",
  label: "Workshop",
  icon: "graduationCap"
}, {
  id: "conference",
  label: "Conference",
  icon: "presentation"
}, {
  id: "party",
  label: "Party",
  icon: "partyPopper"
}, {
  id: "sports",
  label: "Sports",
  icon: "trophy"
}, {
  id: "community",
  label: "Community",
  icon: "users"
}];
const ACCENTS = [{
  id: "marigold",
  hex: "#F2A93B"
}, {
  id: "punch",
  hex: "#E14F3D"
}, {
  id: "teal",
  hex: "#2C7A6B"
}, {
  id: "plum",
  hex: "#7B4B94"
}, {
  id: "sky",
  hex: "#3B6FA6"
}];
const EMOJIS = ["🎉", "🎵", "🎤", "🍷", "🏆", "🌱", "🎨", "💡"];
const uid = () => "e" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const catInfo = id => CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
const accentHex = id => (ACCENTS.find(a => a.id === id) || ACCENTS[0]).hex;
function formatBadge(dateStr) {
  if (!dateStr) return {
    month: "—",
    day: "--"
  };
  const d = new Date(dateStr + "T00:00:00");
  return {
    month: d.toLocaleDateString(undefined, {
      month: "short"
    }).toUpperCase(),
    day: d.toLocaleDateString(undefined, {
      day: "2-digit"
    })
  };
}
function formatFullDate(dateStr) {
  if (!dateStr) return "Date TBD";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
function formatTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}
function getCountdown(dateStr, timeStr, now) {
  if (!dateStr) return null;
  const target = new Date(`${dateStr}T${timeStr || "00:00"}:00`).getTime();
  let diff = target - now;
  const past = diff < 0;
  diff = Math.abs(diff);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff % 86400000 / 3600000),
    mins: Math.floor(diff % 3600000 / 60000),
    secs: Math.floor(diff % 60000 / 1000),
    past
  };
}
function captionOptions(ev) {
  const date = formatFullDate(ev.date);
  const time = formatTime(ev.time);
  return [`${ev.emoji} Save the date — ${ev.title} is happening ${date} at ${time}. Come find us at ${ev.location || "the venue"}. Spots are limited, RSVP now!`, `You're invited: ${ev.title}. ${date}, ${time} · ${ev.location || "location TBA"}. ${ev.emoji} Bring your people, it's going to be a good one.`, `Mark your calendar ${ev.emoji} ${ev.title} lands on ${date}. Doors at ${time} — ${ev.location || "venue TBA"}. Tap the link to RSVP before it fills up.`];
}
function seedEvents() {
  return [{
    id: uid(),
    title: "Neon Nights Rooftop Party",
    category: "party",
    accent: "punch",
    emoji: "🎉",
    date: "2026-09-12",
    time: "20:00",
    location: "Skyline Terrace, Downtown",
    capacity: 120,
    description: "A rooftop send-off to summer — resident DJs, skyline views, and a strictly-vibes-only dress code.",
    guests: [{
      id: uid(),
      name: "Priya Nair",
      email: "priya@example.com",
      status: "going"
    }, {
      id: uid(),
      name: "Owen Clarke",
      email: "owen@example.com",
      status: "maybe"
    }, {
      id: uid(),
      name: "Sana Iqbal",
      email: "sana@example.com",
      status: "going"
    }],
    promo: {
      instagram: true,
      email: false,
      groupchat: true,
      flyer: false
    }
  }, {
    id: uid(),
    title: "Future Founders Summit",
    category: "conference",
    accent: "sky",
    emoji: "💡",
    date: "2026-10-03",
    time: "09:30",
    location: "Riverside Convention Hall",
    capacity: 300,
    description: "A day of talks, panels and speed-mentoring for early-stage founders across the region.",
    guests: [{
      id: uid(),
      name: "Marcus Lee",
      email: "marcus@example.com",
      status: "going"
    }],
    promo: {
      instagram: false,
      email: true,
      groupchat: false,
      flyer: false
    }
  }, {
    id: uid(),
    title: "Watercolor & Wine Workshop",
    category: "workshop",
    accent: "plum",
    emoji: "🎨",
    date: "2026-09-05",
    time: "18:30",
    location: "The Studio on 5th",
    capacity: 20,
    description: "Loose, expressive watercolor techniques for beginners. All materials included, wine optional.",
    guests: [{
      id: uid(),
      name: "Ingrid Voss",
      email: "ingrid@example.com",
      status: "going"
    }, {
      id: uid(),
      name: "Tomas Reyes",
      email: "tomas@example.com",
      status: "declined"
    }],
    promo: {
      instagram: true,
      email: true,
      groupchat: true,
      flyer: true
    }
  }];
}
const emptyForm = () => ({
  title: "",
  category: "music",
  accent: "marigold",
  emoji: "🎉",
  date: "",
  time: "",
  location: "",
  capacity: 50,
  description: ""
});
function EventOrganizer() {
  const [events, setEvents] = useState(seedEvents);
  const [view, setView] = useState("dashboard");
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [form, setForm] = useState(emptyForm());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [detailTab, setDetailTab] = useState("overview");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [captionIdx, setCaptionIdx] = useState({});
  const [copied, setCopied] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [now, setNow] = useState(Date.now());
  const copyTimer = useRef(null);
  useEffect(() => {
    if (view !== "detail") return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [view]);
  const selected = useMemo(() => events.find(e => e.id === selectedId) || null, [events, selectedId]);
  const filtered = useMemo(() => {
    return events.filter(e => categoryFilter === "all" || e.category === categoryFilter).filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase())).sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
  }, [events, search, categoryFilter]);
  const totalGuests = events.reduce((s, e) => s + e.guests.filter(g => g.status === "going").length, 0);
  const upcomingCount = events.filter(e => e.date && new Date(e.date) >= new Date(new Date().toDateString())).length;
  function openCreate() {
    setForm(emptyForm());
    setModalMode("create");
    setModalOpen(true);
  }
  function openEdit(ev) {
    setForm({
      ...ev
    });
    setModalMode("edit");
    setModalOpen(true);
  }
  function saveForm() {
    if (!form.title.trim() || !form.date || !form.time || !form.location.trim()) return;
    if (modalMode === "create") {
      const newEv = {
        ...form,
        id: uid(),
        capacity: Number(form.capacity) || 1,
        guests: [],
        promo: {
          instagram: false,
          email: false,
          groupchat: false,
          flyer: false
        }
      };
      setEvents(prev => [...prev, newEv]);
      setSelectedId(newEv.id);
    } else {
      setEvents(prev => prev.map(e => e.id === form.id ? {
        ...e,
        ...form,
        capacity: Number(form.capacity) || 1
      } : e));
    }
    setModalOpen(false);
  }
  function deleteEvent(id) {
    setEvents(prev => prev.filter(e => e.id !== id));
    setDeleteConfirm(false);
    setView("dashboard");
    setSelectedId(null);
  }
  function addGuest() {
    if (!guestName.trim()) return;
    setEvents(prev => prev.map(e => e.id === selectedId ? {
      ...e,
      guests: [...e.guests, {
        id: uid(),
        name: guestName.trim(),
        email: guestEmail.trim(),
        status: "going"
      }]
    } : e));
    setGuestName("");
    setGuestEmail("");
  }
  function setGuestStatus(guestId, status) {
    setEvents(prev => prev.map(e => e.id === selectedId ? {
      ...e,
      guests: e.guests.map(g => g.id === guestId ? {
        ...g,
        status
      } : g)
    } : e));
  }
  function removeGuest(guestId) {
    setEvents(prev => prev.map(e => e.id === selectedId ? {
      ...e,
      guests: e.guests.filter(g => g.id !== guestId)
    } : e));
  }
  function togglePromo(key) {
    setEvents(prev => prev.map(e => e.id === selectedId ? {
      ...e,
      promo: {
        ...e.promo,
        [key]: !e.promo[key]
      }
    } : e));
  }
  function doCopy(text, type) {
    try {
      navigator.clipboard.writeText(text);
    } catch (err) {}
    setCopied(type);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(null), 1600);
  }
  function cycleCaption(id, len) {
    setCaptionIdx(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % len
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "eo-app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eo-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eo-logo eo-display"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ticket",
    size: 22
  }), " MARQUEE"), /*#__PURE__*/React.createElement("div", {
    className: "eo-logo-tag"
  }, "EVENT PLANNING, ORGANIZED")), /*#__PURE__*/React.createElement("div", {
    className: "eo-stats-ticker eo-mono"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eo-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eo-stat-num"
  }, events.length), /*#__PURE__*/React.createElement("span", {
    className: "eo-stat-label"
  }, "Events")), /*#__PURE__*/React.createElement("div", {
    className: "eo-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eo-stat-num"
  }, totalGuests), /*#__PURE__*/React.createElement("span", {
    className: "eo-stat-label"
  }, "Confirmed")), /*#__PURE__*/React.createElement("div", {
    className: "eo-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eo-stat-num"
  }, upcomingCount), /*#__PURE__*/React.createElement("span", {
    className: "eo-stat-label"
  }, "Upcoming")))), view === "dashboard" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "eo-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eo-hero-eyebrow"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 13
  }), " Plan · Promote · Manage"), /*#__PURE__*/React.createElement("h1", {
    className: "eo-hero-title"
  }, "PLAN THE NIGHT", /*#__PURE__*/React.createElement("br", null), "EVERYONE TALKS ABOUT."), /*#__PURE__*/React.createElement("p", {
    className: "eo-hero-sub"
  }, "Build your event, dress it up in your own colors, fill the room, and get the word out — all from one board."), /*#__PURE__*/React.createElement("button", {
    className: "eo-btn eo-btn-primary",
    onClick: openCreate
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16
  }), " Create an event")), /*#__PURE__*/React.createElement("div", {
    className: "eo-filter-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eo-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15,
    color: "#6B6455"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search events or venues",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("button", {
    className: `eo-pill ${categoryFilter === "all" ? "active" : ""}`,
    onClick: () => setCategoryFilter("all")
  }, "All"), CATEGORIES.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    className: `eo-pill ${categoryFilter === c.id ? "active" : ""}`,
    onClick: () => setCategoryFilter(c.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 13
  }), " ", c.label))), filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "eo-empty"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eo-display",
    style: {
      fontSize: "1.6rem"
    }
  }, "NOTHING HERE YET"), /*#__PURE__*/React.createElement("p", null, "Try a different search, or create your first event.")) : /*#__PURE__*/React.createElement("div", {
    className: "eo-grid"
  }, filtered.map(ev => {
    const cat = catInfo(ev.category);
    const badge = formatBadge(ev.date);
    const hex = accentHex(ev.accent);
    const going = ev.guests.filter(g => g.status === "going").length;
    const pct = Math.min(100, Math.round(going / ev.capacity * 100));
    return /*#__PURE__*/React.createElement("div", {
      key: ev.id,
      className: "eo-ticket",
      style: {
        "--accent": hex
      },
      onClick: () => {
        setSelectedId(ev.id);
        setView("detail");
        setDetailTab("overview");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-ticket-main"
    }, /*#__PURE__*/React.createElement("span", {
      className: "eo-ticket-emoji"
    }, ev.emoji), /*#__PURE__*/React.createElement("span", {
      className: "eo-ticket-cat",
      style: {
        color: hex
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat.icon,
      size: 13
    }), " ", cat.label), /*#__PURE__*/React.createElement("div", {
      className: "eo-ticket-title eo-display"
    }, ev.title), /*#__PURE__*/React.createElement("div", {
      className: "eo-ticket-meta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-ticket-meta-row"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "mapPin",
      size: 13
    }), " ", ev.location), /*#__PURE__*/React.createElement("div", {
      className: "eo-ticket-meta-row"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 13
    }), " ", going, "/", ev.capacity, " going")), /*#__PURE__*/React.createElement("div", {
      className: "eo-cap-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-cap-fill",
      style: {
        width: pct + "%",
        background: hex
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "eo-ticket-divider"
    }), /*#__PURE__*/React.createElement("div", {
      className: "eo-ticket-stub",
      style: {
        background: hex
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "eo-ticket-stub-month eo-mono"
    }, badge.month), /*#__PURE__*/React.createElement("span", {
      className: "eo-ticket-stub-day eo-display"
    }, badge.day), /*#__PURE__*/React.createElement("span", {
      className: "eo-ticket-stub-time eo-mono"
    }, formatTime(ev.time))));
  }))), view === "detail" && selected && (() => {
    const hex = accentHex(selected.accent);
    const cat = catInfo(selected.category);
    const cd = getCountdown(selected.date, selected.time, now);
    const going = selected.guests.filter(g => g.status === "going").length;
    const maybe = selected.guests.filter(g => g.status === "maybe").length;
    const declined = selected.guests.filter(g => g.status === "declined").length;
    const pct = Math.min(100, Math.round(going / selected.capacity * 100));
    const link = `https://marquee.events/e/${selected.id}`;
    const captions = captionOptions(selected);
    const idx = captionIdx[selected.id] || 0;
    const promoKeys = [{
      key: "instagram",
      label: "Post to Instagram Story"
    }, {
      key: "email",
      label: "Send email invites"
    }, {
      key: "groupchat",
      label: "Share in group chat"
    }, {
      key: "flyer",
      label: "Print a flyer or poster"
    }];
    const promoCount = Object.values(selected.promo).filter(Boolean).length;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "eo-detail-head",
      style: {
        background: `linear-gradient(135deg, ${hex}, ${hex}CC)`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-detail-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "eo-icon-btn",
      onClick: () => openEdit(selected),
      title: "Edit"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 15
    })), /*#__PURE__*/React.createElement("button", {
      className: "eo-icon-btn",
      onClick: () => setDeleteConfirm(true),
      title: "Delete"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash2",
      size: 15
    }))), /*#__PURE__*/React.createElement("button", {
      className: "eo-back",
      onClick: () => {
        setView("dashboard");
        setDeleteConfirm(false);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrowLeft",
      size: 14
    }), " All events"), /*#__PURE__*/React.createElement("div", {
      className: "eo-detail-cat"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat.icon,
      size: 13
    }), " ", cat.label), /*#__PURE__*/React.createElement("h1", {
      className: "eo-detail-title eo-display"
    }, selected.emoji, " ", selected.title), /*#__PURE__*/React.createElement("div", {
      className: "eo-detail-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "eo-detail-meta-item"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 15
    }), " ", formatFullDate(selected.date)), /*#__PURE__*/React.createElement("span", {
      className: "eo-detail-meta-item"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 15
    }), " ", formatTime(selected.time)), /*#__PURE__*/React.createElement("span", {
      className: "eo-detail-meta-item"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "mapPin",
      size: 15
    }), " ", selected.location)), cd && /*#__PURE__*/React.createElement("div", {
      className: "eo-countdown eo-mono"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-count-box"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-count-num"
    }, cd.days), /*#__PURE__*/React.createElement("div", {
      className: "eo-count-label"
    }, "Days")), /*#__PURE__*/React.createElement("div", {
      className: "eo-count-box"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-count-num"
    }, cd.hours), /*#__PURE__*/React.createElement("div", {
      className: "eo-count-label"
    }, "Hrs")), /*#__PURE__*/React.createElement("div", {
      className: "eo-count-box"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-count-num"
    }, cd.mins), /*#__PURE__*/React.createElement("div", {
      className: "eo-count-label"
    }, "Min")), /*#__PURE__*/React.createElement("div", {
      className: "eo-count-box"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-count-num"
    }, cd.secs), /*#__PURE__*/React.createElement("div", {
      className: "eo-count-label"
    }, "Sec")), /*#__PURE__*/React.createElement("div", {
      className: "eo-count-box",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.72rem"
      }
    }, cd.past ? "Already began" : "To go")))), deleteConfirm && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 32px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-delete-banner"
    }, /*#__PURE__*/React.createElement("span", null, "Delete ", /*#__PURE__*/React.createElement("strong", null, selected.title), "? This can't be undone."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "eo-btn eo-btn-ghost",
      onClick: () => setDeleteConfirm(false)
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      className: "eo-btn eo-btn-primary",
      style: {
        background: "#E14F3D"
      },
      onClick: () => deleteEvent(selected.id)
    }, "Delete")))), /*#__PURE__*/React.createElement("div", {
      className: "eo-tabs"
    }, /*#__PURE__*/React.createElement("button", {
      className: `eo-tab ${detailTab === "overview" ? "active" : ""}`,
      onClick: () => setDetailTab("overview")
    }, "Overview"), /*#__PURE__*/React.createElement("button", {
      className: `eo-tab ${detailTab === "guests" ? "active" : ""}`,
      onClick: () => setDetailTab("guests")
    }, "Guests"), /*#__PURE__*/React.createElement("button", {
      className: `eo-tab ${detailTab === "promote" ? "active" : ""}`,
      onClick: () => setDetailTab("promote")
    }, "Promote")), detailTab === "overview" && /*#__PURE__*/React.createElement("div", {
      className: "eo-panel"
    }, /*#__PURE__*/React.createElement("p", {
      className: "eo-desc"
    }, selected.description || "No description yet — add one from Edit."), /*#__PURE__*/React.createElement("div", {
      className: "eo-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-num eo-display",
      style: {
        color: hex
      }
    }, going), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-label"
    }, "Going")), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-num eo-display"
    }, selected.capacity), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-label"
    }, "Capacity")), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-num eo-display"
    }, pct, "%"), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-label"
    }, "Filled"))), /*#__PURE__*/React.createElement("div", {
      className: "eo-cap-bar",
      style: {
        height: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-cap-fill",
      style: {
        width: pct + "%",
        background: hex
      }
    })))), detailTab === "guests" && /*#__PURE__*/React.createElement("div", {
      className: "eo-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-num eo-display",
      style: {
        color: "#2C7A6B"
      }
    }, going), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-label"
    }, "Going")), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-num eo-display",
      style: {
        color: "#F2A93B"
      }
    }, maybe), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-label"
    }, "Maybe")), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-num eo-display",
      style: {
        color: "#E14F3D"
      }
    }, declined), /*#__PURE__*/React.createElement("div", {
      className: "eo-summary-label"
    }, "Declined"))), /*#__PURE__*/React.createElement("div", {
      className: "eo-guest-form"
    }, /*#__PURE__*/React.createElement("input", {
      className: "eo-input",
      placeholder: "Guest name",
      value: guestName,
      onChange: e => setGuestName(e.target.value)
    }), /*#__PURE__*/React.createElement("input", {
      className: "eo-input",
      placeholder: "Email (optional)",
      value: guestEmail,
      onChange: e => setGuestEmail(e.target.value)
    }), /*#__PURE__*/React.createElement("button", {
      className: "eo-btn eo-btn-primary",
      onClick: addGuest
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "userPlus",
      size: 15
    }), " Add")), /*#__PURE__*/React.createElement("div", {
      className: "eo-card"
    }, selected.guests.length === 0 && /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--pencil)"
      }
    }, "No guests yet — add your first one above."), selected.guests.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.id,
      className: "eo-guest-row"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "eo-guest-name"
    }, g.name), g.email && /*#__PURE__*/React.createElement("div", {
      className: "eo-guest-email"
    }, g.email)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-status-group"
    }, /*#__PURE__*/React.createElement("button", {
      className: `eo-status-btn going ${g.status === "going" ? "active" : ""}`,
      onClick: () => setGuestStatus(g.id, "going")
    }, "Going"), /*#__PURE__*/React.createElement("button", {
      className: `eo-status-btn maybe ${g.status === "maybe" ? "active" : ""}`,
      onClick: () => setGuestStatus(g.id, "maybe")
    }, "Maybe"), /*#__PURE__*/React.createElement("button", {
      className: `eo-status-btn declined ${g.status === "declined" ? "active" : ""}`,
      onClick: () => setGuestStatus(g.id, "declined")
    }, "No")), /*#__PURE__*/React.createElement("button", {
      className: "eo-icon-btn",
      style: {
        background: "rgba(28,32,51,0.08)",
        color: "var(--ink)"
      },
      onClick: () => removeGuest(g.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 14
    }))))))), detailTab === "promote" && /*#__PURE__*/React.createElement("div", {
      className: "eo-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-label"
    }, "Shareable link"), /*#__PURE__*/React.createElement("div", {
      className: "eo-link-box"
    }, /*#__PURE__*/React.createElement("input", {
      className: "eo-input",
      readOnly: true,
      value: link
    }), /*#__PURE__*/React.createElement("button", {
      className: "eo-copy-btn",
      onClick: () => doCopy(link, "link")
    }, copied === "link" ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15
    }) : /*#__PURE__*/React.createElement(Icon, {
      name: "copy",
      size: 15
    }), " ", copied === "link" ? "Copied" : "Copy"))), /*#__PURE__*/React.createElement("div", {
      className: "eo-card"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-label",
      style: {
        marginBottom: 0
      }
    }, "Suggested caption"), /*#__PURE__*/React.createElement("button", {
      className: "eo-btn eo-btn-ghost",
      style: {
        padding: "6px 12px",
        fontSize: "0.78rem"
      },
      onClick: () => cycleCaption(selected.id, captions.length)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "refreshCw",
      size: 13
    }), " Shuffle")), /*#__PURE__*/React.createElement("div", {
      className: "eo-caption-box"
    }, captions[idx]), /*#__PURE__*/React.createElement("button", {
      className: "eo-copy-btn",
      onClick: () => doCopy(captions[idx], "caption")
    }, copied === "caption" ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15
    }) : /*#__PURE__*/React.createElement(Icon, {
      name: "copy",
      size: 15
    }), " ", copied === "caption" ? "Copied" : "Copy caption")), /*#__PURE__*/React.createElement("div", {
      className: "eo-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eo-label"
    }, "Promotion checklist — ", promoCount, "/4 channels covered"), /*#__PURE__*/React.createElement("div", {
      className: "eo-promo-checklist"
    }, promoKeys.map(p => /*#__PURE__*/React.createElement("div", {
      key: p.key,
      className: "eo-check-row",
      onClick: () => togglePromo(p.key)
    }, /*#__PURE__*/React.createElement("div", {
      className: `eo-check-box ${selected.promo[p.key] ? "checked" : ""}`
    }, selected.promo[p.key] && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13,
      color: "#fff"
    })), p.label))))));
  })(), modalOpen && /*#__PURE__*/React.createElement("div", {
    className: "eo-modal-overlay",
    onClick: () => setModalOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "eo-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "eo-modal-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "eo-display",
    style: {
      fontSize: "1.7rem"
    }
  }, modalMode === "create" ? "NEW EVENT" : "EDIT EVENT"), /*#__PURE__*/React.createElement("button", {
    className: "eo-icon-btn",
    style: {
      background: "rgba(28,32,51,0.08)",
      color: "var(--ink)"
    },
    onClick: () => setModalOpen(false)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Event title"), /*#__PURE__*/React.createElement("input", {
    className: "eo-input",
    value: form.title,
    onChange: e => setForm({
      ...form,
      title: e.target.value
    }),
    placeholder: "e.g. Neon Nights Rooftop Party"
  })), /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Category"), /*#__PURE__*/React.createElement("div", {
    className: "eo-cats"
  }, CATEGORIES.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: `eo-cat-opt ${form.category === c.id ? "active" : ""}`,
    onClick: () => setForm({
      ...form,
      category: c.id
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 14
  }), " ", c.label)))), /*#__PURE__*/React.createElement("div", {
    className: "eo-row2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "eo-input",
    value: form.date,
    onChange: e => setForm({
      ...form,
      date: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Time"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    className: "eo-input",
    value: form.time,
    onChange: e => setForm({
      ...form,
      time: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Location"), /*#__PURE__*/React.createElement("input", {
    className: "eo-input",
    value: form.location,
    onChange: e => setForm({
      ...form,
      location: e.target.value
    }),
    placeholder: "Venue or address"
  })), /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Capacity"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    className: "eo-input",
    value: form.capacity,
    onChange: e => setForm({
      ...form,
      capacity: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    className: "eo-textarea",
    value: form.description,
    onChange: e => setForm({
      ...form,
      description: e.target.value
    }),
    placeholder: "What should people know before they come?"
  })), /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Theme color"), /*#__PURE__*/React.createElement("div", {
    className: "eo-swatches"
  }, ACCENTS.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    className: `eo-swatch ${form.accent === a.id ? "active" : ""}`,
    style: {
      background: a.hex
    },
    onClick: () => setForm({
      ...form,
      accent: a.id
    })
  })))), /*#__PURE__*/React.createElement("div", {
    className: "eo-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "eo-label"
  }, "Sticker"), /*#__PURE__*/React.createElement("div", {
    className: "eo-emojis"
  }, EMOJIS.map(em => /*#__PURE__*/React.createElement("div", {
    key: em,
    className: `eo-emoji-opt ${form.emoji === em ? "active" : ""}`,
    onClick: () => setForm({
      ...form,
      emoji: em
    })
  }, em)))), /*#__PURE__*/React.createElement("div", {
    className: "eo-modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "eo-btn eo-btn-ghost",
    onClick: () => setModalOpen(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "eo-btn eo-btn-primary",
    onClick: saveForm
  }, modalMode === "create" ? "Create event" : "Save changes")))));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(EventOrganizer, null));