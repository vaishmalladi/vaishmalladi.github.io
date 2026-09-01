export type WorldId =
  | "about"
  | "projects"
  | "enterprise"
  | "ai"
  | "growth"
  | "design-systems"
  | "beyond";

export interface IslandPalette {
  accent: string;
  accentSoft: string;
  accentDeep: string;
}

export interface WorldDef {
  id: WorldId;
  index: number;
  name: string;
  shortLabel: string;
  levelLabel: string;
  theme: string;
  emoji: string;
  palette: IslandPalette;
}

export const WORLDS: WorldDef[] = [
  {
    id: "about",
    index: 1,
    name: "Introduction",
    shortLabel: "Intro",
    levelLabel: "Level 01",
    theme: "The First Island",
    emoji: "🏝️",
    palette: { accent: "#7C6CFF", accentSoft: "#EFEBFF", accentDeep: "#5B3DF0" },
  },
  {
    id: "enterprise",
    index: 2,
    name: "Enterprise",
    shortLabel: "Enterprise",
    levelLabel: "Level 02",
    theme: "The Citadel Island",
    emoji: "🏛️",
    palette: { accent: "#4C6FFF", accentSoft: "#EAF0FF", accentDeep: "#2F4FE0" },
  },
  {
    id: "ai",
    index: 3,
    name: "AI",
    shortLabel: "AI",
    levelLabel: "Level 03",
    theme: "The Hologram Island",
    emoji: "🔮",
    palette: { accent: "#B45CFF", accentSoft: "#F4E9FF", accentDeep: "#8E2FE0" },
  },
  {
    id: "growth",
    index: 4,
    name: "Growth",
    shortLabel: "Growth",
    levelLabel: "Level 04",
    theme: "The Summit Island",
    emoji: "⛰️",
    palette: { accent: "#FF9C4A", accentSoft: "#FFF1E1", accentDeep: "#E67A1F" },
  },
  {
    id: "design-systems",
    index: 5,
    name: "Systems",
    shortLabel: "Systems",
    levelLabel: "Level 05",
    theme: "The Workshop Island",
    emoji: "🏗️",
    palette: { accent: "#22C7C0", accentSoft: "#E4FBF9", accentDeep: "#0E9E98" },
  },
  {
    id: "beyond",
    index: 6,
    name: "Community",
    shortLabel: "Beyond",
    levelLabel: "Level 06",
    theme: "The Carnival Island",
    emoji: "🎪",
    palette: { accent: "#3ECF8E", accentSoft: "#E5FAF0", accentDeep: "#1FA36A" },
  },
];

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export const PROFILE_STATS: StatItem[] = [
  { label: "Seat Adds Delivered", value: 500, suffix: "K+" },
  { label: "Lighthouse Partner Adoption Growth", value: 2, suffix: ".8\u00d7" },
  { label: "Increase In Lighthouse Visits", value: 93, suffix: "%" },
  { label: "Increase In Clicks From Top 50 Partners", value: 211, suffix: "%" },
  { label: "Increase In Partner Visits To Sales Advisor", value: 54, suffix: "%" },
  { label: "Increase In Opportunity Clicks", value: 38, suffix: "%" },
];

export interface SkillAxis {
  label: string;
  value: number;
}

export const SKILL_RADAR: SkillAxis[] = [
  { label: "Product Design", value: 92 },
  { label: "Design Process", value: 90 },
  { label: "AI & Emerging Design", value: 85 },
  { label: "Systems & Collaboration", value: 88 },
  { label: "Enterprise UX", value: 90 },
  { label: "Visual Storytelling", value: 84 },
];

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Product Design",
    skills: ["Product Design", "UX Design", "Interaction Design", "UI Design", "Visual Design", "Enterprise UX"],
  },
  {
    label: "Design Process",
    skills: ["User Research", "Customer Interviews", "Usability Testing", "Information Architecture", "Wireframing", "Prototyping", "Design Thinking"],
  },
  {
    label: "AI & Emerging Design",
    skills: ["AI Product Design", "AI-Assisted Design", "Copilot Experiences", "Rapid Prototyping", "AI-Assisted Workflows"],
  },
  {
    label: "Systems & Collaboration",
    skills: ["Design Systems", "Systems Thinking", "Cross-Functional Collaboration", "Stakeholder Management", "Communication", "Visual Storytelling"],
  },
  {
    label: "Softwares",
    skills: ["Figma", "FigJam", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Microsoft 365", "Blender", "VS Code", "Claude Code", "Lovable"],
  },
];

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export const TIMELINE: TimelineEntry[] = [
  { year: "2025", title: "Scaled Partner & Copilot Experiences", description: "Delivered 500K+ seat adds and 2.8\u00d7 partner adoption growth, while coordinating Microsoft UX Day for two consecutive years." },
  { year: "2024", title: "Joined Microsoft", description: "Became a Product Designer shaping AI-powered enterprise experiences across M365 Lighthouse, MADS 2.0, and the Microsoft Admin Center." },
  { year: "2022", title: "Started M.Des at IIT Roorkee", description: "Began a Master's in Industrial Design, sharpening systems thinking, research, and prototyping craft." },
  { year: "2018", title: "Began Design Foundations", description: "Started a B.Tech in Digital Design at JNAFAU, building a base in visual and interaction design." },
];

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Record<string, AchievementDef> = {
  spawn: { id: "spawn", title: "Game Start", description: "Pressed start and entered the game.", icon: "🕹️" },
  about: { id: "about", title: "Character Select", description: "Checked out the About Me profile.", icon: "🧑‍🚀" },
  projects: { id: "projects", title: "Chapter Select", description: "Opened the chapter select screen.", icon: "📖" },
  "design-systems": { id: "design-systems", title: "System Builder", description: "Explored the Design Systems workshop.", icon: "🏗️" },
  beyond: { id: "beyond", title: "Side Quest", description: "Explored the Beyond Design bonus level.", icon: "🎪" },
  mission: { id: "mission", title: "Chapter Cleared", description: "Finished reading a full chapter.", icon: "✅" },
  explorer: { id: "explorer", title: "Game Complete", description: "Cleared every chapter in the game.", icon: "🏆" },
};

export interface ProjectMission {
  id: string;
  world: WorldId;
  title: string;
  tagline: string;
  role: string;
  party: string[];
  difficulty: number;
  estimatedMinutes: number;
  reward: string;
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
  screens?: { src: string; alt: string }[];
}

export const PROJECTS: ProjectMission[] = [
  {
    id: "multi-tenant-management",
    world: "enterprise",
    title: "Multi Tenant Management",
    tagline: "Bringing Lighthouse's multi-tenant power into an enterprise-ready admin experience.",
    role: "Lead Product Designer",
    party: ["Product Manager", "Engineering", "Customer Research"],
    difficulty: 4,
    estimatedMinutes: 3,
    reward: "Shaped the enterprise-ready foundation now shipping across MAC",
    year: "2025",
    tags: ["Enterprise", "Multi-Tenant", "Admin UX"],
    gradient: "from-violet-500 via-indigo-500 to-cyan-400",
    brief: "Bring Lighthouse's enterprise capabilities into the Microsoft Admin Center (MAC) as a scalable, enterprise-ready multi-tenant experience.",
    challenge: "Admins managing many tenants had no unified way to switch context or reason about hierarchy, and ownership of the effort changed hands mid-flight, putting continuity at risk.",
    research: "Partnered early with the product lead to define the vision and prototype the experience for leadership review, then grounded the direction in direct conversations with enterprise admins.",
    exploration: "Explored tenant-switching patterns and information architecture changes to simplify multi-tenant workflows, prototyping a left-nav toggle between 'This tenant' and 'All tenants' for leadership alignment.",
    iterations: "Ramped up a new design owner on Lighthouse workflows, baselines, and configuration patterns to protect continuity, while bridging distributed design and engineering teams to keep execution aligned.",
    finalDesign: "A left-nav Tenant Switcher toggling between 'This tenant' and 'All tenants,' with IA regrouped into Organization, Tenants, Baselines, Agents, Users, and Devices — plus a consolidated Admin Centers section for Security, Compliance, Endpoint Management, Identity, Exchange, SharePoint, and Teams.",
    impact: [
      "Moved the team from an ambiguous concept to a scalable enterprise direction",
      "Preserved continuity and momentum through a project and ownership transition",
      "Established a foundation other enterprise-ready surfaces are now building on",
    ],
    learnings: "In fast-changing, high-ambiguity projects, the highest-leverage role is often stepping in as the stabilizing force that protects context and momentum.",
    screens: [
      { src: "/projects/multi-tenant-management/slide-01.png", alt: "Multi Tenant Management presentation, slide 1 of 20" },
      { src: "/projects/multi-tenant-management/slide-02.png", alt: "Multi Tenant Management presentation, slide 2 of 20" },
      { src: "/projects/multi-tenant-management/slide-03.png", alt: "Multi Tenant Management presentation, slide 3 of 20" },
      { src: "/projects/multi-tenant-management/slide-04.png", alt: "Multi Tenant Management presentation, slide 4 of 20" },
      { src: "/projects/multi-tenant-management/slide-05.png", alt: "Multi Tenant Management presentation, slide 5 of 20" },
      { src: "/projects/multi-tenant-management/slide-06.png", alt: "Multi Tenant Management presentation, slide 6 of 20" },
      { src: "/projects/multi-tenant-management/slide-07.png", alt: "Multi Tenant Management presentation, slide 7 of 20" },
      { src: "/projects/multi-tenant-management/slide-08.png", alt: "Multi Tenant Management presentation, slide 8 of 20" },
      { src: "/projects/multi-tenant-management/slide-09.png", alt: "Multi Tenant Management presentation, slide 9 of 20" },
      { src: "/projects/multi-tenant-management/slide-10.png", alt: "Multi Tenant Management presentation, slide 10 of 20" },
      { src: "/projects/multi-tenant-management/slide-11.png", alt: "Multi Tenant Management presentation, slide 11 of 20" },
      { src: "/projects/multi-tenant-management/slide-12.png", alt: "Multi Tenant Management presentation, slide 12 of 20" },
      { src: "/projects/multi-tenant-management/slide-13.png", alt: "Multi Tenant Management presentation, slide 13 of 20" },
      { src: "/projects/multi-tenant-management/slide-14.png", alt: "Multi Tenant Management presentation, slide 14 of 20" },
      { src: "/projects/multi-tenant-management/slide-15.png", alt: "Multi Tenant Management presentation, slide 15 of 20" },
      { src: "/projects/multi-tenant-management/slide-16.png", alt: "Multi Tenant Management presentation, slide 16 of 20" },
      { src: "/projects/multi-tenant-management/slide-17.png", alt: "Multi Tenant Management presentation, slide 17 of 20" },
      { src: "/projects/multi-tenant-management/slide-18.png", alt: "Multi Tenant Management presentation, slide 18 of 20" },
      { src: "/projects/multi-tenant-management/slide-19.png", alt: "Multi Tenant Management presentation, slide 19 of 20" },
      { src: "/projects/multi-tenant-management/slide-20.png", alt: "Multi Tenant Management presentation, slide 20 of 20" },
    ],
  },
  {
    id: "copilot-security",
    world: "enterprise",
    title: "Copilot Governance",
    tagline: "Renaming 'Security' to 'Governance' — and redesigning the system to match.",
    role: "Lead Product Designer",
    party: ["Purview Team", "SharePoint Admin Center", "Engineering"],
    difficulty: 5,
    estimatedMinutes: 4,
    reward: "Drove the Security → Governance rename adopted across Purview and MAC",
    year: "2025",
    tags: ["Copilot", "Governance", "Enterprise"],
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-400",
    brief: "Own the Copilot Control System Security experience spanning Purview and the SharePoint Admin Center, and make AI governance legible for the teams managing it.",
    challenge: "The experience spanned multiple orgs and surfaces, and the word 'Security' didn't match how admins actually thought about the controls — creating friction in language, structure, and ownership.",
    research: "Worked across Purview and MAC stakeholders to map the existing surfaces, terminology, and workflows admins relied on to monitor Copilot behavior.",
    exploration: "Explored multiple interaction patterns for organizing the controls, including horizontal tabs and grouped panels, before converging on vertical navigation through collaborative critique.",
    iterations: "Drove the decision to rename 'Security' to 'Governance' across the system, aligned the Purview integration to MAC's standards, and identified gaps in Admin Agent Monitoring along the way.",
    finalDesign: "A unified Governance experience with vertical navigation, consistent language across Purview and MAC, and clearer feedback loops for admin agent monitoring.",
    impact: [
      "The Security → Governance rename was adopted across systems and teams",
      "Reduced friction between Purview and MAC through shared standards",
      "Surfaced and proposed fixes for gaps in admin agent monitoring feedback",
    ],
    learnings: "Language is structure — renaming 'Security' to 'Governance' did more to align teams than any single interaction pattern.",
    screens: [
      { src: "/projects/copilot-security/slide-01.png", alt: "Copilot Governance presentation, slide 1 of 12" },
      { src: "/projects/copilot-security/slide-02.png", alt: "Copilot Governance presentation, slide 2 of 12" },
      { src: "/projects/copilot-security/slide-03.png", alt: "Copilot Governance presentation, slide 3 of 12" },
      { src: "/projects/copilot-security/slide-04.png", alt: "Copilot Governance presentation, slide 4 of 12" },
      { src: "/projects/copilot-security/slide-05.png", alt: "Copilot Governance presentation, slide 5 of 12" },
      { src: "/projects/copilot-security/slide-06.png", alt: "Copilot Governance presentation, slide 6 of 12" },
      { src: "/projects/copilot-security/slide-07.png", alt: "Copilot Governance presentation, slide 7 of 12" },
      { src: "/projects/copilot-security/slide-08.png", alt: "Copilot Governance presentation, slide 8 of 12" },
      { src: "/projects/copilot-security/slide-09.png", alt: "Copilot Governance presentation, slide 9 of 12" },
      { src: "/projects/copilot-security/slide-10.png", alt: "Copilot Governance presentation, slide 10 of 12" },
      { src: "/projects/copilot-security/slide-11.png", alt: "Copilot Governance presentation, slide 11 of 12" },
      { src: "/projects/copilot-security/slide-12.png", alt: "Copilot Governance presentation, slide 12 of 12" },
    ],
  },
  {
    id: "baselines",
    world: "enterprise",
    title: "Baselines",
    tagline: "Making security configuration simpler and more scalable for Managed Service Providers.",
    role: "Product Designer",
    party: ["1 Product Manager", "8 Software Engineers"],
    difficulty: 4,
    estimatedMinutes: 4,
    reward: "Partner adoption OKR grew from 3% to 9% of Lighthouse MAU",
    year: "2024",
    tags: ["Enterprise", "MSP", "Security"],
    gradient: "from-cyan-400 via-blue-500 to-violet-500",
    brief: "Give Managed Service Providers a single, scalable way to define and enforce security configuration standards across every customer tenant they manage.",
    challenge: "MSPs manage anywhere from 10 to 200+ customer organizations, each with its own drifting configuration and security posture. Establishing and maintaining a consistent baseline across that many tenants without adding operational complexity was the core problem to solve.",
    research: "Mapped the end-to-end MSP workflow to understand how technicians currently discovered, configured, and reconciled security settings across disparate customer tenants.",
    exploration: "Explored how to let deep technical configurability coexist with a manageable experience, prototyping grouped and layered settings so nested policy detail didn't overwhelm the page.",
    iterations: "Worked as the dedicated UX owner alongside 1 Product Manager and 8 Software Engineers, taking the feature from fuzzy requirements to a shippable system through high-fidelity mockups, Figma component specs, and interactive clickable prototypes, refined further through partner preview feedback.",
    finalDesign: "An end-to-end, multi-tenant setup workflow — Discover, Configure, Compare, Identify Gaps, and Take Action — that lets MSPs unify hundreds of disjointed policies into single-pane control lists, built on and contributed back to the Fluent Web design system.",
    impact: [
      "Partner adoption OKR (baseline MAP as % of Lighthouse MAU) grew from 3% to 9%",
      "100+ Ignite session attendees gave strong partner feedback",
      "Several partners fully adopted Default Baselines for customer setup, and 2-week/4-week Lighthouse retention trended upward",
    ],
    learnings: "Enterprise products don't need fewer capabilities, they need better organization — and designing for scale (one MSP managing many tenants) changes the interaction model entirely, from bulk actions to batch status updates.",
    screens: [
      { src: "/projects/baselines/slide-01.png", alt: "Baselines presentation, slide 1 of 23" },
      { src: "/projects/baselines/slide-02.png", alt: "Baselines presentation, slide 2 of 23" },
      { src: "/projects/baselines/slide-03.png", alt: "Baselines presentation, slide 3 of 23" },
      { src: "/projects/baselines/slide-04.png", alt: "Baselines presentation, slide 4 of 23" },
      { src: "/projects/baselines/slide-05.png", alt: "Baselines presentation, slide 5 of 23" },
      { src: "/projects/baselines/slide-06.png", alt: "Baselines presentation, slide 6 of 23" },
      { src: "/projects/baselines/slide-07.png", alt: "Baselines presentation, slide 7 of 23" },
      { src: "/projects/baselines/slide-08.png", alt: "Baselines presentation, slide 8 of 23" },
      { src: "/projects/baselines/slide-09.png", alt: "Baselines presentation, slide 9 of 23" },
      { src: "/projects/baselines/slide-10.png", alt: "Baselines presentation, slide 10 of 23" },
      { src: "/projects/baselines/slide-11.png", alt: "Baselines presentation, slide 11 of 23" },
      { src: "/projects/baselines/slide-12.png", alt: "Baselines presentation, slide 12 of 23" },
      { src: "/projects/baselines/slide-13.png", alt: "Baselines presentation, slide 13 of 23" },
      { src: "/projects/baselines/slide-14.png", alt: "Baselines presentation, slide 14 of 23" },
      { src: "/projects/baselines/slide-15.png", alt: "Baselines presentation, slide 15 of 23" },
      { src: "/projects/baselines/slide-16.png", alt: "Baselines presentation, slide 16 of 23" },
      { src: "/projects/baselines/slide-17.png", alt: "Baselines presentation, slide 17 of 23" },
      { src: "/projects/baselines/slide-18.png", alt: "Baselines presentation, slide 18 of 23" },
      { src: "/projects/baselines/slide-19.png", alt: "Baselines presentation, slide 19 of 23" },
      { src: "/projects/baselines/slide-20.png", alt: "Baselines presentation, slide 20 of 23" },
      { src: "/projects/baselines/slide-21.png", alt: "Baselines presentation, slide 21 of 23" },
      { src: "/projects/baselines/slide-22.png", alt: "Baselines presentation, slide 22 of 23" },
      { src: "/projects/baselines/slide-23.png", alt: "Baselines presentation, slide 23 of 23" },
    ],
  },
  {
    id: "tenant-360",
    world: "enterprise",
    title: "Tenant 360",
    tagline: "Consolidating a fragmented, multi-domain view of every managed tenant into one intelligent hub.",
    role: "Product Designer",
    party: ["Engineering", "Core Designers"],
    difficulty: 4,
    estimatedMinutes: 4,
    reward: "Turned a monthly manual report-assembly process into a real-time tenant view",
    year: "2024",
    tags: ["Enterprise", "Information Architecture", "Lighthouse"],
    gradient: "from-violet-500 via-indigo-500 to-cyan-400",
    brief: "Give partners a unified view of their customer tenants instead of data scattered across reports, tools, and manual workflows.",
    challenge: "The page had to blend static firmographic data with dynamic monthly signals across 12+ core user stories, serve technicians and sales agents with competing goals on the exact same layout, and still fit inside the existing Lighthouse Shell and Microsoft 365 Admin Center framework.",
    research: "Categorized the sprawling dataset into static, dynamic, and slowly-changing modules to figure out what needed to update in real time versus what could stay fixed.",
    exploration: "Explored comprehensive design directions from the initial spec breakdown through interactive concepts, establishing a persistent in-page navigation strategy to keep information density manageable.",
    iterations: "Owned end-to-end design across two major phases — the initial tenant overview and a V2 expansion adding Users & Email, Apps & Services, Secure Score, and Product details tabs — facilitating design critiques that led to structural layout improvements and managing full engineering handoff with detailed specs and a tracked changelog.",
    finalDesign: "A consolidated tenant intelligence page combining scores, deployment progress, service usage, renewals, and opportunities in one scannable, actionable view for both technicians and sales agents.",
    impact: [
      "Replaced a fragmented, manual monthly report-assembly process with a real-time, scannable tenant view",
      "Unified 12+ core user stories into one consistent module pattern",
      "Expanded to a V2 with additional modules while preserving the established design system",
    ],
    learnings: "Taking a dense, multi-domain data problem and designing a clear, modular, user-centered solution comes down to structured thinking and iterative craft, not just visual polish.",
    screens: [
      { src: "/projects/tenant-360/slide-01.png", alt: "Tenant 360 presentation, slide 1 of 17" },
      { src: "/projects/tenant-360/slide-02.png", alt: "Tenant 360 presentation, slide 2 of 17" },
      { src: "/projects/tenant-360/slide-03.png", alt: "Tenant 360 presentation, slide 3 of 17" },
      { src: "/projects/tenant-360/slide-04.png", alt: "Tenant 360 presentation, slide 4 of 17" },
      { src: "/projects/tenant-360/slide-05.png", alt: "Tenant 360 presentation, slide 5 of 17" },
      { src: "/projects/tenant-360/slide-06.png", alt: "Tenant 360 presentation, slide 6 of 17" },
      { src: "/projects/tenant-360/slide-07.png", alt: "Tenant 360 presentation, slide 7 of 17" },
      { src: "/projects/tenant-360/slide-08.png", alt: "Tenant 360 presentation, slide 8 of 17" },
      { src: "/projects/tenant-360/slide-09.png", alt: "Tenant 360 presentation, slide 9 of 17" },
      { src: "/projects/tenant-360/slide-10.png", alt: "Tenant 360 presentation, slide 10 of 17" },
      { src: "/projects/tenant-360/slide-11.png", alt: "Tenant 360 presentation, slide 11 of 17" },
      { src: "/projects/tenant-360/slide-12.png", alt: "Tenant 360 presentation, slide 12 of 17" },
      { src: "/projects/tenant-360/slide-13.png", alt: "Tenant 360 presentation, slide 13 of 17" },
      { src: "/projects/tenant-360/slide-14.png", alt: "Tenant 360 presentation, slide 14 of 17" },
      { src: "/projects/tenant-360/slide-15.png", alt: "Tenant 360 presentation, slide 15 of 17" },
      { src: "/projects/tenant-360/slide-16.png", alt: "Tenant 360 presentation, slide 16 of 17" },
      { src: "/projects/tenant-360/slide-17.png", alt: "Tenant 360 presentation, slide 17 of 17" },
    ],
  },
  {
    id: "sales-advisor",
    world: "growth",
    title: "Sales Advisor",
    tagline: "An AI co-pilot for enterprise sales motions.",
    role: "Lead Product Designer",
    party: ["Sales Ops", "Data Science", "Field Sellers"],
    difficulty: 4,
    estimatedMinutes: 4,
    reward: "Measurable lift in deal velocity",
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
    screens: [
      { src: "/projects/sales-advisor/slide-01.png", alt: "Sales Advisor presentation, slide 1 of 20" },
      { src: "/projects/sales-advisor/slide-02.png", alt: "Sales Advisor presentation, slide 2 of 20" },
      { src: "/projects/sales-advisor/slide-03.png", alt: "Sales Advisor presentation, slide 3 of 20" },
      { src: "/projects/sales-advisor/slide-04.png", alt: "Sales Advisor presentation, slide 4 of 20" },
      { src: "/projects/sales-advisor/slide-05.png", alt: "Sales Advisor presentation, slide 5 of 20" },
      { src: "/projects/sales-advisor/slide-06.png", alt: "Sales Advisor presentation, slide 6 of 20" },
      { src: "/projects/sales-advisor/slide-07.png", alt: "Sales Advisor presentation, slide 7 of 20" },
      { src: "/projects/sales-advisor/slide-08.png", alt: "Sales Advisor presentation, slide 8 of 20" },
      { src: "/projects/sales-advisor/slide-09.png", alt: "Sales Advisor presentation, slide 9 of 20" },
      { src: "/projects/sales-advisor/slide-10.png", alt: "Sales Advisor presentation, slide 10 of 20" },
      { src: "/projects/sales-advisor/slide-11.png", alt: "Sales Advisor presentation, slide 11 of 20" },
      { src: "/projects/sales-advisor/slide-12.png", alt: "Sales Advisor presentation, slide 12 of 20" },
      { src: "/projects/sales-advisor/slide-13.png", alt: "Sales Advisor presentation, slide 13 of 20" },
      { src: "/projects/sales-advisor/slide-14.png", alt: "Sales Advisor presentation, slide 14 of 20" },
      { src: "/projects/sales-advisor/slide-15.png", alt: "Sales Advisor presentation, slide 15 of 20" },
      { src: "/projects/sales-advisor/slide-16.png", alt: "Sales Advisor presentation, slide 16 of 20" },
      { src: "/projects/sales-advisor/slide-17.png", alt: "Sales Advisor presentation, slide 17 of 20" },
      { src: "/projects/sales-advisor/slide-18.png", alt: "Sales Advisor presentation, slide 18 of 20" },
      { src: "/projects/sales-advisor/slide-19.png", alt: "Sales Advisor presentation, slide 19 of 20" },
      { src: "/projects/sales-advisor/slide-20.png", alt: "Sales Advisor presentation, slide 20 of 20" },
      { src: "/projects/sales-advisor-fy25/slide-01.png", alt: "Sales Advisor FY25 results presentation, slide 1 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-02.png", alt: "Sales Advisor FY25 results presentation, slide 2 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-03.png", alt: "Sales Advisor FY25 results presentation, slide 3 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-04.png", alt: "Sales Advisor FY25 results presentation, slide 4 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-05.png", alt: "Sales Advisor FY25 results presentation, slide 5 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-06.png", alt: "Sales Advisor FY25 results presentation, slide 6 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-07.png", alt: "Sales Advisor FY25 results presentation, slide 7 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-08.png", alt: "Sales Advisor FY25 results presentation, slide 8 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-09.png", alt: "Sales Advisor FY25 results presentation, slide 9 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-10.png", alt: "Sales Advisor FY25 results presentation, slide 10 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-11.png", alt: "Sales Advisor FY25 results presentation, slide 11 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-12.png", alt: "Sales Advisor FY25 results presentation, slide 12 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-13.png", alt: "Sales Advisor FY25 results presentation, slide 13 of 14" },
      { src: "/projects/sales-advisor-fy25/slide-14.png", alt: "Sales Advisor FY25 results presentation, slide 14 of 14" },
    ],
  },
];

export interface BehanceProject {
  id: string;
  title: string;
  description: string;
  year: string;
  fields: string[];
  tools: string[];
  cover: string;
  url: string;
  credit?: string;
}

export const BEHANCE_PROJECTS: BehanceProject[] = [
  {
    id: "miu-skincare-app",
    title: "MIU: A Skincare App",
    description: "A mobile app concept that pairs dermatology-backed guidance with a friendly, routine-first UX to help people build skincare habits they'll actually stick to.",
    year: "2023",
    fields: ["Interaction Design", "UI/UX", "App Design"],
    tools: ["Illustrator", "Figma"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/3e3d7b185738397.Y3JvcCwxNTI3LDExOTUsMjU3LDA.png",
    url: "https://www.behance.net/gallery/185738397/MIU-A-Skincare-App",
  },
  {
    id: "netflix-store",
    title: "Netflix Store in Netflix App",
    description: "A UI/UX case study imagining a native merchandise store inside the Netflix app, letting fans shop show-branded products without ever leaving what they're watching.",
    year: "2023",
    fields: ["Interaction Design", "UI/UX", "Visual Effects"],
    tools: ["Figma"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/b46273184391475.Y3JvcCwxNTY1LDEyMjQsNjg5LDg5NQ.png",
    url: "https://www.behance.net/gallery/184391475/Netflix-Store-in-Netflix-App-UIUX-Case-Study",
  },
  {
    id: "ramayana-the-game",
    title: "Ramayana: The Game",
    description: "A character-design and app-concept exploration reimagining the Ramayana as an interactive game, blending Indian mythology and culture with modern digital illustration.",
    year: "2023",
    fields: ["Interaction Design", "Character Design", "App Design"],
    tools: ["Illustrator", "Animate", "Figma"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/68d928171038049.Y3JvcCwxOTIwLDE1MDEsMCwxODA.png",
    url: "https://www.behance.net/gallery/171038049/Ramayana-The-game",
  },
  {
    id: "space-tourism-application",
    title: "Space Tourism Application",
    description: "An app for space tourism to reach Mars, the Moon, and the exosphere — designed end-to-end with a partner, from brand identity through booking flows.",
    year: "2023",
    fields: ["Interaction Design", "Graphic Design", "UI/UX"],
    tools: ["Photoshop", "Illustrator", "Figma"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/72eba5167191941.Y3JvcCwxMzY0LDEwNjcsNzAsMA.jpeg",
    url: "https://www.behance.net/gallery/167191941/Space-Tourism-Application",
    credit: "with Pratheep C",
  },
  {
    id: "kaarigar-art-exploration",
    title: "Kaarigar: An Art Exploration",
    description: "A publishing and visualization project celebrating Indian craft and artisans, pairing photography and layout design to document culture and history.",
    year: "2023",
    fields: ["Visualization", "Interaction Design", "Photography"],
    tools: ["Illustrator", "InDesign", "Photoshop"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/ca3bd7164429303.Y3JvcCwyNTA1LDE5NjAsMTQ4LDA.jpg",
    url: "https://www.behance.net/gallery/164429303/Kaarigar-An-art-exploration",
    credit: "team project",
  },
  {
    id: "nng-website-redesign",
    title: "NN/g Website Redesign",
    description: "A UX-focused redesign of the Nielsen Norman Group website, sharpening information architecture and visual hierarchy around their research and courses.",
    year: "2023",
    fields: ["Interaction Design", "UI/UX", "Web Design"],
    tools: ["Figma"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/cbe7e2171039447.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
    url: "https://www.behance.net/gallery/171039447/NNg-website-redesign",
  },
  {
    id: "nasa-website-redesign",
    title: "NASA Website Redesign",
    description: "A landing-page and UI/UX redesign concept for NASA.gov, focused on clearer navigation and a more visually compelling front door to space exploration content.",
    year: "2023",
    fields: ["UI/UX", "Web Design", "Interaction Design"],
    tools: ["Figma"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/d774b1171039287.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
    url: "https://www.behance.net/gallery/171039287/NASA-website-redesign",
  },
  {
    id: "seekh-ideation",
    title: "Seek'H Ideation",
    description: "An early-stage information architecture and low-fidelity wireframe exploration, mapping out landing page structure and interface flows from first principles.",
    year: "2023",
    fields: ["Interaction Design", "UI/UX", "Web Design"],
    tools: ["Illustrator"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/7cd3c8164564721.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
    url: "https://www.behance.net/gallery/164564721/SeekH-Ideation",
  },
  {
    id: "charcoal-ui-atoms",
    title: "Charcoal UI Atoms",
    description: "A visual identity and UI atoms exploration — typography, texture, and theming experiments that build toward a cohesive, reusable interface language.",
    year: "2023",
    fields: ["Interaction Design", "Graphic Design", "UI/UX"],
    tools: ["Illustrator"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/895a11164460305.Y3JvcCwxMzgwLDEwODAsMjMyLDA.png",
    url: "https://www.behance.net/gallery/164460305/Charcoal-UI-Atoms",
  },
  {
    id: "good-touch-bad-touch-book",
    title: "Good Touch and Bad Touch Book for Children",
    description: "We are educating children about critical and harsh knowledge of good and bad touch in an understandable manner without overloading or frightening them.",
    year: "2023",
    fields: ["Graphic Design", "Illustration"],
    tools: ["Figma"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/5df6f8160468097.Y3JvcCwyNDMwLDE5MDAsMzg1LDEzOA.png",
    url: "https://www.behance.net/gallery/160468097/Good-Touch-and-Bad-Touch-Book-for-Children",
    credit: "team project",
  },
  {
    id: "knill-know-your-pill",
    title: "KNILL: Know Your Pill",
    description: "A UI/UX and product design project helping people identify and understand medication safely, spanning packaging design through digital interface.",
    year: "2023",
    fields: ["UI/UX", "Product Design", "Interaction Design"],
    tools: ["Figma", "CATIA", "Keyshot"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/cb203a184534505.Y3JvcCw2NzMsNTI2LDY2LDgw.png",
    url: "https://www.behance.net/gallery/184534505/KNILL-Know-Your-Pill-UIUX-Project",
  },
  {
    id: "brand-swap-chupa-chups",
    title: "Brand Swap: Chupa Chups x The Ordinary",
    description: "A branding and packaging exploration imagining what happens when a playful confectionery brand and a clinical skincare brand swap identities.",
    year: "2023",
    fields: ["Graphic Design", "Branding", "Logo Design"],
    tools: ["Illustrator", "Photoshop"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/dc86c2184130481.Y3JvcCwxOTcxLDE1NDIsMzM2LDI5.jpg",
    url: "https://www.behance.net/gallery/184130481/Brand-Swap-Chupa-Chups-x-The-Ordinary",
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
  { id: "dance", title: "Dance", description: "Treasurer of the MStepUp Dance Club — taught 2 workshops as an instructor, the same timing instinct behind great motion design.", emoji: "🦰", rotation: -6 },
  { id: "ux-day", title: "UX Day", description: "Helped organize Microsoft UX Day 2026, coordinating sessions and volunteers for 600+ participants.", emoji: "🎤", rotation: 4 },
  { id: "hackathons", title: "Hackathons", description: "Multiple hackathon wins turning wild ideas into working prototypes overnight.", emoji: "⚡", rotation: -3 },
  { id: "mentorship", title: "Mentorship", description: "Ramped up a new design owner on a live project mid-transition, protecting continuity and momentum.", emoji: "🌱", rotation: 5 },
];
