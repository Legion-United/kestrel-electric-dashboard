/* ============================================================
   KESTREL ELECTRIC — mock data (solo electrician)
   Owner-operator: Sam Kestrel. One person, LEGION OS is the office.
   ============================================================ */

export const brand = {
  name: "KESTREL",
  suffix: "Electric",
  tagline: "Solo Operator OS",
  owner: { name: "Sam Kestrel", initials: "SK", role: "Owner · Electrician", region: "Greater Bristol" },
  cert: "NICEIC Approved · Part P",
};

/* ---------------- Today / morning briefing ---------------- */
export const today = {
  date: "Tuesday, 29 July",
  greeting: "Everything for today is already lined up.",
  weather: "17°C · light rain from 14:00",
  drive: "42 min total on the road",
  jobsToday: 4,
  quotesToChase: 3,
  overdueInvoices: 2,
  decisionsNeeded: 2,
};

export const schedule = [
  { time: "08:00", title: "Consumer unit upgrade", client: "R. Achterberg", place: "Clifton, BS8", kind: "Execution", tone: "now", travel: "home → 18 min" },
  { time: "10:30", title: "EICR — 3-bed rental", client: "Belmore Lettings", place: "Bishopston, BS7", kind: "Site visit", tone: "done", travel: "12 min" },
  { time: "13:00", title: "EV charger survey", client: "J. Whitfield", place: "Redland, BS6", kind: "Qualification", tone: "next", travel: "9 min" },
  { time: "15:30", title: "Fault find — kitchen circuit", client: "The Old Bakery Café", place: "Southville, BS3", kind: "Execution", tone: "next", travel: "14 min" },
];

/* ---------------- KPIs ---------------- */
export const kpis = {
  revenueMonth: 18420,
  revenueSpark: [9, 11, 10, 13, 12, 15, 14, 17, 16, 18],
  outstanding: 7350,
  quotesOpen: 9,
  quotesOpenValue: 14980,
  winRate: 62,
  hoursBillable: 128,
  hoursAdmin: 6,
  adminSavedHrs: 34,
};

/* ---------------- Pipeline (8 stages) ---------------- */
export type Job = { id: string; title: string; client: string; place: string; value: number; progress: number; age: string; flag?: "hot" | "wait" | "risk" };
export const stages: { key: string; idx: number; name: string; jobs: Job[] }[] = [
  { key: "contact", idx: 1, name: "Customer contact", jobs: [
    { id: "J-207", title: "Garden office wiring", client: "M. Sørensen", place: "Henleaze", value: 2400, progress: 6, age: "20 min", flag: "hot" },
    { id: "J-206", title: "Fuseboard smell — urgent", client: "K. Doyle", place: "Totterdown", value: 480, progress: 4, age: "1 h", flag: "hot" },
  ]},
  { key: "qualify", idx: 2, name: "Qualification", jobs: [
    { id: "J-203", title: "EV charger survey", client: "J. Whitfield", place: "Redland", value: 1150, progress: 20, age: "1 d" },
    { id: "J-201", title: "Loft conversion 1st fix", client: "Hillside Builders", place: "Cotham", value: 3600, progress: 18, age: "2 d", flag: "wait" },
  ]},
  { key: "visit", idx: 3, name: "Site visit", jobs: [
    { id: "J-198", title: "EICR — 3-bed rental", client: "Belmore Lettings", place: "Bishopston", value: 190, progress: 34, age: "today" },
  ]},
  { key: "quote", idx: 4, name: "Quotation", jobs: [
    { id: "J-195", title: "Rewire — Victorian terrace", client: "A. & P. Nawaz", place: "Easton", value: 6800, progress: 48, age: "3 d", flag: "hot" },
    { id: "J-193", title: "Outdoor lighting + sockets", client: "The Walled Garden", place: "Long Ashton", value: 2150, progress: 45, age: "4 d" },
  ]},
  { key: "plan", idx: 5, name: "Planning", jobs: [
    { id: "J-190", title: "Consumer unit upgrade", client: "R. Achterberg", place: "Clifton", value: 720, progress: 64, age: "scheduled" },
  ]},
  { key: "execute", idx: 6, name: "Execution", jobs: [
    { id: "J-188", title: "Fault find — kitchen circuit", client: "Old Bakery Café", place: "Southville", value: 340, progress: 72, age: "today" },
    { id: "J-186", title: "Kitchen refit — 2nd fix", client: "D. Emerson", place: "Bedminster", value: 1980, progress: 78, age: "on site" },
  ]},
  { key: "complete", idx: 7, name: "Completion", jobs: [
    { id: "J-182", title: "Shower circuit + RCD", client: "L. Braithwaite", place: "Horfield", value: 560, progress: 92, age: "cert due", flag: "wait" },
  ]},
  { key: "payment", idx: 8, name: "Payment", jobs: [
    { id: "J-176", title: "Garden room power", client: "N. Fairbanks", place: "Westbury", value: 1420, progress: 100, age: "invoiced" },
    { id: "J-171", title: "Landlord EICR x2", client: "Belmore Lettings", place: "Bishopston", value: 380, progress: 100, age: "overdue", flag: "risk" },
  ]},
];

/* ---------------- Leads / Receptionist ---------------- */
export type Lead = { id: string; name: string; channel: "Call" | "WhatsApp" | "Web" | "Missed call"; summary: string; when: string; qualified: boolean; value?: string; urgency: "hot" | "warm" | "cold" };
export const leads: Lead[] = [
  { id: "L-51", name: "M. Sørensen", channel: "Web", summary: "New garden office, needs power + 2 circuits and lighting.", when: "20 min ago", qualified: true, value: "~£2.4k", urgency: "hot" },
  { id: "L-50", name: "K. Doyle", channel: "Missed call", summary: "Burning smell from fuseboard. Called back, booked emergency slot 08:00 tomorrow.", when: "1 h ago", qualified: true, value: "~£480", urgency: "hot" },
  { id: "L-49", name: "The Old Bakery Café", channel: "WhatsApp", summary: "Kitchen ring keeps tripping during service. Sent photos of the board.", when: "2 h ago", qualified: true, value: "~£340", urgency: "warm" },
  { id: "L-48", name: "G. Hollis", channel: "Call", summary: "Asked about solar + battery. Out of scope, referred to partner, logged for follow-up.", when: "3 h ago", qualified: false, urgency: "cold" },
  { id: "L-47", name: "Riverside Dental", channel: "Web", summary: "Quote for surgery lighting refit, 6 rooms. Wants a call this week.", when: "5 h ago", qualified: true, value: "~£5.2k", urgency: "warm" },
];

/* ---------------- Quotes (Estimator) ---------------- */
export type Quote = { id: string; client: string; title: string; value: number; sent: string; status: "Draft" | "Sent" | "Viewed" | "Chasing" | "Accepted" | "Declined"; followups: number };
export const quotes: Quote[] = [
  { id: "Q-341", client: "A. & P. Nawaz", title: "Full rewire — Victorian terrace", value: 6800, sent: "2 days ago", status: "Viewed", followups: 1 },
  { id: "Q-340", client: "Riverside Dental", title: "Surgery lighting refit", value: 5200, sent: "Draft", status: "Draft", followups: 0 },
  { id: "Q-338", client: "The Walled Garden", title: "Outdoor lighting + sockets", value: 2150, sent: "4 days ago", status: "Chasing", followups: 2 },
  { id: "Q-335", client: "Hillside Builders", title: "Loft conversion 1st fix", value: 3600, sent: "5 days ago", status: "Sent", followups: 1 },
  { id: "Q-331", client: "D. Emerson", title: "Kitchen refit — full", value: 1980, sent: "1 week ago", status: "Accepted", followups: 1 },
  { id: "Q-329", client: "T. Okafor", title: "Garage conversion power", value: 1240, sent: "1 week ago", status: "Declined", followups: 2 },
];

export const estimatorLine = [
  { label: "Labour", detail: "2 days · £320/day", value: 640 },
  { label: "Consumer unit — 10-way dual RCD", detail: "Hager, incl. SPD", value: 185 },
  { label: "Cable & containment", detail: "6242Y, trunking, clips", value: 240 },
  { label: "Accessories", detail: "Sockets, MCBs, glands", value: 310 },
  { label: "Certification & notification", detail: "EIC + Building Control", value: 95 },
];

/* ---------------- Invoices / Collector ---------------- */
export type Invoice = { id: string; client: string; amount: number; issued: string; due: string; status: "Paid" | "Sent" | "Due soon" | "Overdue"; days: number; reminders: number };
export const invoices: Invoice[] = [
  { id: "INV-0912", client: "Belmore Lettings", amount: 380, issued: "12 Jun", due: "26 Jun", status: "Overdue", days: 33, reminders: 3 },
  { id: "INV-0918", client: "N. Fairbanks", amount: 1420, issued: "2 Jul", due: "16 Jul", status: "Overdue", days: 13, reminders: 2 },
  { id: "INV-0921", client: "D. Emerson", amount: 990, issued: "18 Jul", due: "1 Aug", status: "Due soon", days: -3, reminders: 0 },
  { id: "INV-0923", client: "The Old Bakery Café", amount: 340, issued: "24 Jul", due: "7 Aug", status: "Sent", days: -9, reminders: 0 },
  { id: "INV-0908", client: "L. Braithwaite", amount: 560, issued: "1 Jul", due: "15 Jul", status: "Paid", days: 0, reminders: 1 },
  { id: "INV-0905", client: "Hillside Builders", amount: 2400, issued: "20 Jun", due: "4 Jul", status: "Paid", days: 0, reminders: 0 },
];
export const cashflow = [12.4, 11.8, 13.2, 14.1, 13.6, 15.9, 16.2, 17.1, 16.8, 18.4];
export const cashLabels = ["Wk1", "Wk2", "Wk3", "Wk4", "Wk5", "Wk6", "Wk7", "Wk8", "Wk9", "Now"];

/* ---------------- Field Companion (on-site) ---------------- */
export const fieldJob = {
  ref: "J-190",
  title: "Consumer unit upgrade",
  client: "R. Achterberg",
  address: "14 Canynge Road, Clifton, BS8 3JX",
  arrived: "08:02",
  history: [
    { d: "Mar 2024", t: "Fitted outdoor socket + RCD, rear patio" },
    { d: "Nov 2023", t: "EICR — code C2 on kitchen ring, remedied" },
    { d: "Aug 2022", t: "First contact, landlord safety check" },
  ],
  docs: [
    { n: "Existing board photo.jpg", t: "Photo" },
    { n: "Hager VML910CU — datasheet.pdf", t: "Manual" },
    { n: "Previous EICR 2023.pdf", t: "Cert" },
    { n: "Circuit schedule (draft).pdf", t: "Doc" },
  ],
  notes: [
    { t: "Old Wylex board, rewireable fuses. No RCD protection on any circuit.", by: "Voice note → transcribed", when: "08:11" },
    { t: "Meter tails need upgrading to 25mm. Isolator required before board.", by: "Voice note → transcribed", when: "08:19" },
  ],
};

/* ---------------- Vault ---------------- */
export const vaultStats = { docs: 1284, clients: 213, drawings: 74, certs: 168 };
export const vaultRecent = [
  { n: "BS 7671 — Amendment 2 quick notes", cat: "Regulations", when: "opened today" },
  { n: "R. Achterberg — client history", cat: "Customer", when: "opened today" },
  { n: "Hager consumer unit range", cat: "Manuals", when: "yesterday" },
  { n: "EICR template 2025", cat: "Templates", when: "yesterday" },
  { n: "Easton rewire — as-built drawings", cat: "Drawings", when: "2 days ago" },
];
export const vaultAsk = [
  "What was the last fault I found at the Old Bakery Café?",
  "Which of my open quotes are worth over £3k?",
  "Show the RCD type I used on Clifton jobs.",
];

/* ---------------- Digital Workforce (specialists for solo) ---------------- */
export type Agent = { key: string; name: string; role: string; on: boolean; today: string; metric: string; icon: string };
export const workforce: Agent[] = [
  { key: "receptionist", name: "The Receptionist", role: "Answers calls, WhatsApp & web enquiries", on: true, today: "5 enquiries captured, 1 emergency booked", metric: "0 missed", icon: "phone" },
  { key: "estimator", name: "The Estimator", role: "Drafts quotes, chases approvals", on: true, today: "2 quotes drafted, 3 followed up", metric: "62% win rate", icon: "doc" },
  { key: "field", name: "The Field Companion", role: "On-site history, drawings & manuals", on: true, today: "Prepped 4 site packs", metric: "live", icon: "field" },
  { key: "collector", name: "The Collector", role: "Chases invoices, protects cash flow", on: true, today: "3 reminders sent, £2.4k collected", metric: "£7.35k open", icon: "cash" },
  { key: "knowledge", name: "The Knowledge Expert", role: "Answers technical & regs questions", on: true, today: "9 lookups", metric: "instant", icon: "vault" },
  { key: "journey", name: "The Customer Journey", role: "Confirmations, updates & reviews", on: true, today: "6 messages, 1 review request", metric: "4.9★", icon: "chat" },
  { key: "recorder", name: "The Recorder", role: "Turns notes & calls into records", on: false, today: "Standby", metric: "off", icon: "mic" },
  { key: "analyst", name: "The Analyst", role: "Your morning briefing", on: true, today: "Briefing ready at 06:30", metric: "daily", icon: "chart" },
];

/* ---------------- Activity feed ---------------- */
export const activity = [
  { icon: "phone", t: "Receptionist booked K. Doyle for 08:00 emergency slot", when: "1 h ago", tone: "b" },
  { icon: "cash", t: "N. Fairbanks opened invoice INV-0918 (2nd reminder)", when: "2 h ago", tone: "y" },
  { icon: "doc", t: "A. & P. Nawaz viewed your £6,800 rewire quote", when: "3 h ago", tone: "g" },
  { icon: "chat", t: "Review request sent to D. Emerson", when: "4 h ago", tone: "b" },
  { icon: "field", t: "Site pack prepared for Clifton consumer unit upgrade", when: "yesterday", tone: "b" },
];

/* ---------------- Intelligence prompts ---------------- */
export const intelPrompts = [
  { icon: "doc", t: "Draft a quote follow-up for the Nawaz rewire" },
  { icon: "vault", t: "What's the max Zs for a 32A Type B MCB?" },
  { icon: "chart", t: "Summarise this month vs last month" },
  { icon: "mail", t: "Write a polite overdue reminder to Belmore Lettings" },
];
