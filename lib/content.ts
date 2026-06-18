import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type SiteContent = {
  title: string;
  subtitle: string;
  labShortName: string;
  about: string[];
  stats: Array<{
    value: string;
    label: string;
    detail: string;
  }>;
  infobox: {
    institution: string;
    domains: string;
    papers: string;
    projects: string;
    honors: string;
    email: string;
    address: string;
    office: string;
  };
  joinUs: {
    title: string;
    intro: string;
    bullets: string[];
    email: string;
    address: string;
  };
};

export type TeamMember = {
  name: string;
  role: string;
  research: string;
  description: string;
};

export type ResearchItem = {
  title: string;
  description: string;
  tags: string[];
  visualLabel: string;
};

export type PublicationLink = {
  label: string;
  url: string;
};

export type Publication = {
  title: string;
  venue: string;
  year: number;
  note?: string;
  links: PublicationLink[];
};

export type TimelineItem = {
  year: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  caption: string;
};

export type NewsItem = {
  date: string;
  title: string;
  description: string;
};

export type ProjectItem = {
  title: string;
  sponsor: string;
  period: string;
  summary: string;
};

export type CommunityMember = {
  name: string;
  degree: string;
  direction?: string;
  destination?: string;
  note?: string;
};

export type CommunityContent = {
  students: CommunityMember[];
  alumni: CommunityMember[];
};

function readYamlFile<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), "data", fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  return YAML.parse(raw) as T;
}

export function getSiteContent() {
  return readYamlFile<SiteContent>("site.yml");
}

export function getTeamMembers() {
  return readYamlFile<TeamMember[]>("team.yml");
}

export function getResearchItems() {
  return readYamlFile<ResearchItem[]>("research.yml");
}

export function getPublications() {
  const items = readYamlFile<Publication[]>("publications.yml");
  return items.sort((a, b) => b.year - a.year);
}

export function getTimelineItems() {
  return readYamlFile<TimelineItem[]>("timeline.yml");
}

export function getNewsItems() {
  return readYamlFile<NewsItem[]>("news.yml");
}

export function getProjectItems() {
  return readYamlFile<ProjectItem[]>("projects.yml");
}

export function getCommunityContent() {
  return readYamlFile<CommunityContent>("community.yml");
}
