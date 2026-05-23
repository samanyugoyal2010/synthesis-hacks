export const holmesNav = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const holmesMacRows = [
  {
    kicker: "Context Menu (⌥ + Space)",
    title: "holmes watches your screen continuously, reading context, apps, emails, and files to understand exactly what you're working on right now.",
    image: "/images/holmes/feature-1.jpg",
    imageSide: "right" as const,
  },
  {
    kicker: "Command Bar ( ⌃ + Space)",
    title:
      "holmes's built in spotlight bar allows for infinite questions and / commands",
    image: "/images/holmes/feature-2.jpg",
    imageSide: "left" as const,
  },
  {
    kicker: "holmes!",
    title:
      "our clippy style desktop assistant who's always watching",
    image: "/images/holmes/feature-3.jpg",
    imageSide: "right" as const,
  },
];

export const holmesIntelligenceCards = [
  {
    title: "Content Creation",
    body:
      "Bring stories, posts, and ideas to life with words that flow naturally.",
    image: "/images/holmes/card-content.jpg",
  },
  {
    title: "Coding Help",
    body:
      "Solve bugs, generate snippets, and navigate code with unseen precision.",
    image: "/images/holmes/card-coding.jpg",
  },
  {
    title: "Research & Insights",
    body:
      "Condense knowledge into clarity, summaries, analysis, and hidden connections revealed.",
    image: "/images/holmes/card-research.jpg",
  },
  {
    title: "Focus & Productivity",
    body:
      "Bring stories, posts, and ideas to life with words that flow naturally.",
    image: "/images/holmes/card-focus.jpg",
  },
];

export const holmesPipelineSteps = [
  {
    label: "Observe",
    body:
      "Holmes runs silently in the background, reading your screen pixels, active windows, clipboard, and cursor position.",
  },
  {
    label: "Understand",
    body:
      "Holmes connects what it sees to your goals, surfacing the right context at the right moment.",
  },
  {
    label: "Execute",
    body:
      "Holmes takes action across apps with your approval — drafts, searches, reminders, and multi-step workflows.",
  },
  {
    label: "Report",
    body:
      "Holmes summarizes outcomes so you stay in flow without losing track of what changed.",
  },
];

export const holmesSlashCommands = [
  {
    cmd: "/run",
    desc: "Execute a complex multi-app task end-to-end",
  },
  {
    cmd: "/search",
    desc: "Deep search across all apps and files on your Mac",
  },
  {
    cmd: "/remind",
    desc: "Set context-aware reminders tied to what you see",
  },
];

export const holmesCapabilities = [
  {
    title: "Screen Awareness",
    body:
      "Reads what's on screen without invading privacy. Processes locally, never uploads raw content.",
  },
  {
    title: "Zero-Prompt",
    body:
      "holmes acts autonomously based on observed context and learned preferences.",
  },
  {
    title: "MacOS Native",
    body:
      "Stay sharp with gentlBuilt with Swift and SwiftUI. Lives in your notch, your menu bar, your workflow.",
  },
  {
    title: "Privacy First",
    body:
      "All inference runs on-device via CoreML. Your data never leaves your Mac. No cloud processing, ever.",
  },
  {
    title: "Learns Your Style",
    body:
      "Over days and weeks, holmes calibrates to your habits — the apps you use, the files you touch, how you write.",
  },
  {
    title: "Slash Commands",
    body:
      "Five powerful primitives — /run, /watch, /draft, /search, /remind — that compose into infinite workflows.",
  },
];

export const holmesFaq = [
  {
    q: "How does Holmes know what I'm working on?",
    a:
      "Holmes observes on-screen context locally — active windows, selections, and recent activity — to infer what matters, without sending raw screen data to the cloud.",
  },
  {
    q: "What macOS version is required?",
    a:
      "Holmes targets recent macOS releases with native SwiftUI integration; exact minimum version will be confirmed at launch.",
  },
  {
    q: "Is my screen data sent to the cloud?",
    a:
      "No. Processing is designed to stay on your Mac with on-device inference via CoreML.",
  },
  {
    q: "Can Holmes control my apps autonomously?",
    a:
      "Holmes proposes and executes actions with clear intent; you stay in control of what runs and when.",
  },
];
