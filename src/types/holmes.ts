export interface HolmesNavItem {
  label: string;
  href: string;
}

export interface HolmesMacRow {
  kicker: string;
  title: string;
  image: string;
  imageSide: "left" | "right";
}

export interface HolmesIntelligenceCard {
  title: string;
  body: string;
  image: string;
}

export interface HolmesPipelineStep {
  label: string;
  body: string;
}

export interface HolmesSlashCommand {
  cmd: string;
  desc: string;
}

export interface HolmesCapability {
  title: string;
  body: string;
}

export interface HolmesFaqItem {
  q: string;
  a: string;
}
