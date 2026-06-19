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
  avatarLabel?: string;
  avatar?: string;
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
  visualLabel?: string;
  image?: string;
  links: PublicationLink[];
};

export type GalleryItem = {
  year: number;
  description: string;
  image: string;
  alt: string;
  layout?: "portrait" | "landscape" | "square";
  width: number;
  height: number;
};

type GalleryItemSource = {
  year: number;
  description: string;
  image: string;
  alt: string;
  layout?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
};

export type NewsItem = {
  date: string;
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
};

type NewsItemSource = {
  date: string;
  title: string;
  description: string;
  image: string;
  width?: number;
  height?: number;
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

function getImageFilePath(publicPath: string) {
  return path.join(process.cwd(), "public", publicPath.replace(/^\/+/, "").replaceAll("/", path.sep));
}

function getSvgDimensions(filePath: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const viewBoxMatch = content.match(/viewBox=["']\s*[\d.\-]+\s+[\d.\-]+\s+([\d.\-]+)\s+([\d.\-]+)\s*["']/i);

  if (viewBoxMatch) {
    return {
      width: Number(viewBoxMatch[1]),
      height: Number(viewBoxMatch[2])
    };
  }

  const widthMatch = content.match(/width=["']([\d.]+)(px)?["']/i);
  const heightMatch = content.match(/height=["']([\d.]+)(px)?["']/i);

  if (widthMatch && heightMatch) {
    return {
      width: Number(widthMatch[1]),
      height: Number(heightMatch[1])
    };
  }

  return null;
}

function getPngDimensions(buffer: Buffer) {
  if (buffer.length < 24) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function getGifDimensions(buffer: Buffer) {
  if (buffer.length < 10) {
    return null;
  }

  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8)
  };
}

function getJpegDimensions(buffer: Buffer) {
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const blockLength = buffer.readUInt16BE(offset + 2);

    if (
      marker >= 0xc0 &&
      marker <= 0xcf &&
      ![0xc4, 0xc8, 0xcc].includes(marker)
    ) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7)
      };
    }

    offset += 2 + blockLength;
  }

  return null;
}

function getImageDimensions(publicPath: string) {
  const filePath = getImageFilePath(publicPath);
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".svg") {
    return getSvgDimensions(filePath);
  }

  const buffer = fs.readFileSync(filePath);

  if (extension === ".png") {
    return getPngDimensions(buffer);
  }

  if (extension === ".gif") {
    return getGifDimensions(buffer);
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return getJpegDimensions(buffer);
  }

  return null;
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
  const items = readYamlFile<GalleryItemSource[]>("timeline.yml");

  return items.map((item) => {
    const dimensions =
      item.width && item.height
        ? { width: item.width, height: item.height }
        : getImageDimensions(item.image) ?? { width: 1200, height: 900 };

    return {
      ...item,
      width: dimensions.width,
      height: dimensions.height
    };
  });
}

export function getNewsItems() {
  const items = readYamlFile<NewsItemSource[]>("news.yml");

  return items.map((item) => {
    const dimensions =
      item.width && item.height
        ? { width: item.width, height: item.height }
        : getImageDimensions(item.image) ?? { width: 1200, height: 675 };

    return {
      ...item,
      width: dimensions.width,
      height: dimensions.height
    };
  });
}

export function getProjectItems() {
  return readYamlFile<ProjectItem[]>("projects.yml");
}

export function getCommunityContent() {
  return readYamlFile<CommunityContent>("community.yml");
}
