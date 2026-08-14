export type WorldId =
  | "about"
  | "enterprise"
  | "ai"
  | "growth"
  | "design-systems"
  | "beyond";

export interface WorldDef {
  id: WorldId;
  index: number;
  name: string;
  shortLabel: string;
  theme: string;
  icon: string;
}

export const WORLDS: WorldDef[] = [
  { id: "about", index: 1, name: "Command Center", shortLabel: "About", theme: "Futuristic HQ", icon: "◈" },
  { id: "enterprise", index: 2, name: "Enterprise Platform", shortLabel: "Enterprise", theme: "Control Room", icon: "▣" },
  { id: "ai", index: 3, name: "AI Experiences", shortLabel: "AI Lab", theme: "Hologram Lab", icon: "✦" },
  { id: "growth", index: 4, name: "Growth", shortLabel: "Growth", theme: "Mission Control", icon: "▲" },
  { id: "design-systems", index: 5, name: "Design Systems", shortLabel: "Systems", theme: "Tech Workshop", icon: "◆" },
  { id: "beyond", index: 6, name: "Beyond Design", shortLabel: "Beyond", theme: "Creative Studio", icon: "✺" },
];

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export const PROFILE_STATS: StatItem[] = [
  { label: "Years Experience", value: 6, suffix: "+" },
  { label: "Products Designed", value: 24, suffix: "+" },
  { label: "Users Impacted", value: 8, suffix: "M+" },
  { label: "Seats Influenced", value: 120, suffix: "K+" },
  { label: "Countries Collaborated With", value: 14, suffix: "" },
];

export interface SkillAxis {
  label: string;
  value: number;
}

export const SKILL_RADAR: SkillAxis[] = [
  { label: "Product Strategy", value: 88 },
  { label: "Interaction Design", value: 95 },
  { label: "Design Systems", value: 90 },
  { label: "AI/UX", value: 82 },
  { label: "Prototyping", value: 92 },
  { label: "Storytelling", value: 85 },
];

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export const TIMELINE: TimelineEntry[] = [
  { year: "2019", title: "Entered the Enterprise Realm", description: "Began designing complex B2B systems, learning to balance power with simplicity." },
  { year: "2021", title: "Unlocked Systems Thinking", description: "Built and scaled design systems used across multiple product lines." },
  { year: "2023", title: "Joined the AI Frontier", description: "Started designing AI-native experiences — copilots, agents, and recommendations." },
  { year: "2025", title: "Leveled Up to Strategic Design", description: "Now shaping platform-wide experiences that influence thousands of seats." },
];

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Record<string, AchievementDef> = {
  spawn: { id: "spawn", title: "Signal Received", description: "Entered the interactive world.", icon: "📡" },
  about: { id: "about", title: "Know Thyself", description: "Explored the Command Center.", icon: "🧭" },
  enterprise: { id: "enterprise", title: "Control Room Access", description: "Explored the Enterprise Platform.", icon: "🛰️" },
  ai: { id: "ai", title: "Neural Link Established", description: "Explored the AI Experiences lab.", icon: "🧠" },
  growth: { id: "growth", title: "Mission Control", description: "Explored the Growth dashboard.", icon: "📈" },
  "design-systems": { id: "design-systems", title: "System Architect", description: "Explored the Design Systems workshop.", icon: "🧩" },
  beyond: { id: "beyond", title: "Off Duty", description: "Explored Beyond Design.", icon: "🎬" },
  mission: { id: "mission", title: "Debrief Complete", description: "Finished a full project mission.", icon: "✅" },
  explorer: { id: "explorer", title: "Curious Explorer", description: "Explored every world in the experience.", icon: "🏆" },
};

export interface ProjectMission {
  id: string;
  world: WorldId;
  title: string;
  tagline: string;
  role: string;
  year: string;
  tags: string[];
  gradient: string;
  brief: string;
  challenge: string;
  research: string;
  exploration: string;
  iterations: string;
  finalDesign: string;
  impact: string[];
  learnings: string;
}

export const PROJECTS: ProjectMission[] = [
  {
    id: "multi-tenant-management",
    world: "enterprise",
    title: "Multi Tenant Management",
    tagline: "One control surface for every tenant, at any scale.",
    role: "Lead Product Designer",
    year: "2023",
    tags: ["Enterprise", "IA", "Admin UX"],
    gradient: "from-violet-500 via-indigo-500 to-cyan-400",
    brief: "Design a unified way for admins to manage thousands of tenants without losing control or context.",
    challenge: "Admins were switching between disconnected tools to manage tenant hierarchies, leading to costly configuration errors.",
    research: "Shadowed enterprise admins, mapped tenant hierarchies, and audited every existing management surface for overlap and gaps.",
    exploration: "Explored flat tables, tree-based navigators, and hybrid command-palette concepts before converging on a hierarchical workspace switcher.",
    iterations: "Ran three rounds of usability testing with IT admins, refining bulk actions and permission previews each round.",
    finalDesign: "A single control room with a searchable tenant tree, inline bulk actions, and a live blast-radius preview before any change ships.",
    impact: [
      "-42% time to complete common admin tasks",
      "Adopted across all enterprise tiers",
      "Referenced as the template for future admin surfaces",
    ],
    learnings: "Enterprise trust is earned through predictability — every action needs a visible, reversible preview.",
  },
  {
    id: "copilot-security",
    world: "enterprise",
    title: "Copilot Security",
    tagline: "Making AI governance legible for security teams.",
    role: "Lead Product Designer",
    year: "2024",
    tags: ["AI Governance", "Security", "Enterprise"],
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-400",
    brief: "Give security admins visibility and control over how Copilot interacts with sensitive organizational data.",
    challenge: "Security teams had no clear way to audit, restrict, or reason about AI behavior at an org-wide level.",
    research: "Partnered with security architects and compliance stakeholders to understand existing threat models and audit workflows.",
    exploration: "Prototyped policy builders ranging from rule-based toggles to natural-language policy authoring.",
    iterations: "Tested policy comprehension with security admins, simplifying language and adding real-time impact simulation.",
    finalDesign: "A policy control center with plain-language rules, real-time simulation, and full audit trails for every AI interaction.",
    impact: [
      "Enabled AI rollout across previously blocked security-sensitive orgs",
      "Reduced policy misconfiguration incidents significantly",
      "Became a reference pattern for AI governance UX",
    ],
    learnings: "Trust in AI systems is built through transparency, not restriction alone.",
  },
  {
    id: "license-requests",
    world: "enterprise",
    title: "License Requests",
    tagline: "Turning a support ticket into a self-serve flow.",
    role: "Product Designer",
    year: "2022",
    tags: ["Workflow", "Self-serve", "Enterprise"],
    gradient: "from-cyan-400 via-sky-500 to-violet-500",
    brief: "Replace slow, ticket-based license provisioning with a transparent self-service request flow.",
    challenge: "Employees waited days for license access with zero visibility into approval status.",
    research: "Mapped the end-to-end request lifecycle across employees, approvers, and IT admins.",
    exploration: "Prototyped request flows with varying levels of automation and approval routing.",
    iterations: "Iterated on notification timing and approval clarity based on pilot feedback from three org sizes.",
    finalDesign: "A guided request flow with live status tracking, smart approver routing, and automated approvals for low-risk requests.",
    impact: [
      "-68% average time-to-access",
      "Significant reduction in IT support tickets",
      "Rolled out org-wide after pilot success",
    ],
    learnings: "Visibility into 'where is my request' matters as much as speed itself.",
  },
  {
    id: "organizational-prompts",
    world: "ai",
    title: "Organizational Prompts",
    tagline: "Shared prompt libraries for entire organizations.",
    role: "Lead Product Designer",
    year: "2024",
    tags: ["AI", "Knowledge Sharing", "Enterprise"],
    gradient: "from-fuchsia-400 via-violet-500 to-indigo-500",
    brief: "Help organizations capture, curate, and share high-quality prompts across teams.",
    challenge: "Great prompts lived in individual chat histories, invisible and unreusable by the rest of the org.",
    research: "Interviewed power users to understand how they discovered and refined prompts organically.",
    exploration: "Explored prompt marketplaces, template galleries, and inline 'save as org prompt' patterns.",
    iterations: "Refined discovery and permissions model after testing with early adopter teams.",
    finalDesign: "An organizational prompt library with inline save, tagging, usage analytics, and admin curation controls.",
    impact: [
      "Thousands of prompts shared org-wide within first quarter",
      "Increased Copilot engagement among new users",
      "Became a flagship AI-adoption feature",
    ],
    learnings: "Knowledge-sharing features succeed when saving is easier than searching.",
  },
  {
    id: "iris-recommendations",
    world: "ai",
    title: "Iris Recommendations",
    tagline: "Contextual AI recommendations that feel earned, not intrusive.",
    role: "Product Designer",
    year: "2023",
    tags: ["AI", "Recommendations", "Personalization"],
    gradient: "from-violet-500 via-cyan-400 to-emerald-400",
    brief: "Surface the right recommendation at the right moment without overwhelming the user.",
    challenge: "Early recommendation surfaces felt noisy and eroded trust in the broader AI experience.",
    research: "Analyzed engagement and dismissal patterns across recommendation types and placements.",
    exploration: "Prototyped floating cards, inline suggestions, and ambient indicators with varying confidence signaling.",
    iterations: "A/B tested timing, framing, and dismissal patterns to balance helpfulness with restraint.",
    finalDesign: "Context-aware floating recommendation cards with transparent confidence framing and one-tap dismissal.",
    impact: [
      "Higher acceptance rate than previous recommendation model",
      "Lower dismissal-without-reading rate",
      "Extended to three additional product surfaces",
    ],
    learnings: "The best AI recommendation is the one the user barely notices accepting.",
  },
  {
    id: "admin-agents",
    world: "ai",
    title: "Admin Agents",
    tagline: "Autonomous agents that handle admin busywork.",
    role: "Lead Product Designer",
    year: "2025",
    tags: ["AI Agents", "Automation", "Admin UX"],
    gradient: "from-emerald-400 via-cyan-400 to-violet-500",
    brief: "Design agentic experiences that let admins delegate repetitive configuration tasks safely.",
    challenge: "Admins spent hours on repetitive, rule-based tasks that were ideal candidates for automation — but needed to trust the agent first.",
    research: "Studied prior automation failures to identify what eroded admin trust in autonomous systems.",
    exploration: "Prototyped agent 'plans before action' patterns, approval checkpoints, and rollback-first designs.",
    iterations: "Refined the balance between autonomy and checkpoints through admin co-design sessions.",
    finalDesign: "An agent workspace that proposes a plan, requests approval for high-impact steps, and logs every action for full reversibility.",
    impact: [
      "Cut manual admin task time substantially in pilot orgs",
      "High trust scores in post-pilot survey",
      "Set the interaction pattern for future agentic features",
    ],
    learnings: "Autonomy earns trust when it's reversible, explainable, and asks permission at the right moments.",
  },
  {
    id: "sales-advisor",
    world: "growth",
    title: "Sales Advisor",
    tagline: "An AI co-pilot for enterprise sales motions.",
    role: "Lead Product Designer",
    year: "2023",
    tags: ["Growth", "AI", "Sales"],
    gradient: "from-amber-400 via-orange-400 to-fuchsia-400",
    brief: "Give sellers real-time, data-backed guidance during high-stakes enterprise deals.",
    challenge: "Sellers relied on scattered dashboards and gut instinct to prioritize accounts and next steps.",
    research: "Shadowed enterprise sellers through full deal cycles to map decision points and blockers.",
    exploration: "Prototyped dashboard-first, chat-first, and hybrid advisor experiences.",
    iterations: "Refined signal prioritization and explanation depth based on seller feedback across three regions.",
    finalDesign: "A unified advisor surface combining prioritized next-best-actions with transparent reasoning behind each suggestion.",
    impact: [
      "Measurable lift in deal velocity for pilot sellers",
      "High daily active usage among enrolled sellers",
      "Expanded from pilot to full sales org rollout",
    ],
    learnings: "Sellers trust guidance more when they can see the 'why' behind every suggestion.",
  },
  {
    id: "renewals",
    world: "growth",
    title: "Renewals",
    tagline: "Turning renewal risk into a proactive, guided motion.",
    role: "Product Designer",
    year: "2022",
    tags: ["Growth", "Retention", "Dashboard"],
    gradient: "from-orange-400 via-amber-400 to-emerald-400",
    brief: "Help account teams spot at-risk renewals early and act before it's too late.",
    challenge: "Renewal risk was discovered too late, often only after a customer had already disengaged.",
    research: "Analyzed historical renewal data to identify the earliest reliable risk signals.",
    exploration: "Prototyped risk-scoring dashboards with varying levels of detail and recommended actions.",
    iterations: "Tested risk-signal clarity and action guidance with account teams across segments.",
    finalDesign: "A proactive renewals dashboard with early risk scoring, root-cause signals, and suggested intervention playbooks.",
    impact: [
      "Earlier at-risk detection window",
      "Improved renewal save rate in pilot segment",
      "Adopted as the standard renewals workflow",
    ],
    learnings: "Predictive dashboards only work when paired with a clear next action, not just a score.",
  },
  {
    id: "opportunities",
    world: "growth",
    title: "Opportunities",
    tagline: "Surfacing the growth opportunities hiding in plain sight.",
    role: "Product Designer",
    year: "2022",
    tags: ["Growth", "Analytics", "Sales"],
    gradient: "from-emerald-300 via-emerald-400 to-cyan-400",
    brief: "Help sellers identify expansion and cross-sell opportunities within existing accounts.",
    challenge: "Expansion opportunities were buried in raw usage data that sellers rarely had time to analyze.",
    research: "Partnered with data science to define what signals reliably predicted expansion readiness.",
    exploration: "Prototyped opportunity feeds ranked by confidence, potential value, and urgency.",
    iterations: "Refined ranking transparency and follow-up actions through seller feedback loops.",
    finalDesign: "A ranked opportunity feed with confidence scoring, supporting evidence, and one-click follow-up actions.",
    impact: [
      "Meaningful increase in expansion pipeline generated",
      "Faster time-to-outreach on high-confidence signals",
      "Extended to partner-facing teams",
    ],
    learnings: "Ranked recommendations need visible evidence — sellers act faster when they understand the 'why'.",
  },
];

export interface DesignToken {
  name: string;
  value: string;
  swatch?: string;
}

export const DESIGN_TOKENS: DesignToken[] = [
  { name: "Violet / Primary", value: "#7C6CFF", swatch: "#7C6CFF" },
  { name: "Cyan / Accent", value: "#2FD6E8", swatch: "#2FD6E8" },
  { name: "Mint / Success", value: "#4FE0B8", swatch: "#4FE0B8" },
  { name: "Coral / Warning", value: "#FF8A65", swatch: "#FF8A65" },
  { name: "Gold / Highlight", value: "#FFC65C", swatch: "#FFC65C" },
  { name: "Radius / Panel", value: "24px" },
  { name: "Radius / Control", value: "14px" },
  { name: "Blur / Glass", value: "22px" },
  { name: "Type / Display", value: "Space Grotesk" },
  { name: "Type / Body", value: "Inter" },
];

export interface BeyondItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  rotation: number;
}

export const BEYOND_ITEMS: BeyondItem[] = [
  { id: "dance", title: "Dance", description: "Choreography taught me timing — the same instinct behind great motion design.", emoji: "🩰", rotation: -6 },
  { id: "ux-day", title: "UX Day", description: "Organized and spoke at internal UX Day, rallying designers around craft.", emoji: "🎤", rotation: 4 },
  { id: "hackathons", title: "Hackathons", description: "Multiple hackathon wins turning wild ideas into working prototypes overnight.", emoji: "⚡", rotation: -3 },
  { id: "mentorship", title: "Mentorship", description: "Mentoring early-career designers on craft, systems thinking, and storytelling.", emoji: "🌱", rotation: 5 },
];

export const NAV_LABEL_MAP: Record<WorldId, string> = {
  about: "About",
  enterprise: "Enterprise",
  ai: "AI Lab",
  growth: "Growth",
  "design-systems": "Systems",
  beyond: "Beyond",
};
