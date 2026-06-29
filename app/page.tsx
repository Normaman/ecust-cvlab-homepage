import {
  getCommunityContent,
  getNewsItems,
  getProjectItems,
  getPublications,
  getResearchItems,
  getSiteContent,
  getTeamMembers,
  getTimelineItems
} from "@/lib/content";
import {
  CommunitySection,
  FacultySection,
  HeroSection,
  JoinSection,
  ProjectsSection,
  PublicationsSection,
  ResearchSection,
  SiteFooter
} from "@/components/home/home-sections";
import { AmbientStage } from "@/components/home/ambient-stage";
import { NewsCarousel } from "@/components/news-carousel";
import { SectionReveal } from "@/components/section-reveal";
import { TeamGallery } from "@/components/team-gallery";

const navItems = [
  { href: "#about", label: "关于我们" },
  { href: "#news", label: "最新动态" },
  { href: "#team", label: "指导教师" },
  { href: "#research", label: "研究方向" },
  { href: "#publications", label: "研究成果" },
  { href: "#projects", label: "科研项目" },
  { href: "#community", label: "团队成员" },
  { href: "#gallery", label: "团队氛围" },
];

export default function HomePage() {
  const site = getSiteContent();
  const teamMembers = getTeamMembers();
  const researchItems = getResearchItems();
  const publications = getPublications();
  const timelineItems = getTimelineItems();
  const newsItems = getNewsItems();
  const projectItems = getProjectItems();
  const community = getCommunityContent();
  const doctoralStudents = community.students.filter((student) => student.degree.includes("博士"));
  const masterStudents = community.students.filter((student) => student.degree.includes("硕士"));
  
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/55 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/38 transition-all duration-500">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a href="#top" className="text-sm font-semibold tracking-[0.25em] text-slate-900 transition hover:opacity-70 sm:text-base uppercase">
              {site.labShortName || "ECUST CV LAB"}
            </a>
          </div>
          <div className="mt-3 flex gap-8 overflow-x-auto pb-2 text-[17px] font-medium text-slate-400 scrollbar-hide">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="apple-nav-link whitespace-nowrap hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <AmbientStage className="apple-ambient-stage relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/70">
        <div className="apple-ambient-orb apple-ambient-orb-primary pointer-events-none absolute left-1/2 top-[-8rem] -z-10 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-blue-200/28 blur-[136px]" />
        <div className="apple-ambient-orb apple-ambient-orb-secondary pointer-events-none absolute right-[8%] top-24 -z-10 h-[22rem] w-[22rem] rounded-full blur-[110px]" />
        <div className="apple-ambient-wash pointer-events-none absolute inset-x-0 top-[58%] -z-10 h-40 bg-gradient-to-b from-transparent via-white/72 to-white/92" />
        <HeroSection site={site} />

        <main className="relative z-10 mx-auto max-w-7xl px-4 pt-0 pb-12 sm:px-6 lg:px-8">
          <SectionReveal as="div" variant="media" className="mb-14" delay={20}>
            <NewsCarousel items={newsItems} />
          </SectionReveal>
          <FacultySection teamMembers={teamMembers} />
          <ResearchSection items={researchItems} />
          <PublicationsSection publications={publications} />
          <ProjectsSection projects={projectItems} />
          <CommunitySection community={community} doctoralStudents={doctoralStudents} masterStudents={masterStudents} />

          <SectionReveal id="gallery" variant="media" className="mb-24 scroll-mt-36" delay={140}>
            <div className="reveal-stagger reveal-stagger-text mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2 sm:px-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
                    团队氛围
                  </h2>
                  <a
                    href="https://mejistus.github.io/gallery/"
                    target="_blank"
                    rel="noreferrer"
                    className="apple-panel inline-flex items-center gap-2 rounded-full bg-white/82 px-4 py-2 text-[13px] font-semibold text-slate-600 ring-1 ring-slate-900/5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                  >
                    查看更多瞬间
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </div>
                <p className="text-[13px] font-medium tracking-[0.25em] text-slate-400 uppercase pl-1">
                  Moments
                </p>
              </div>
            </div>
            <TeamGallery items={timelineItems} />
          </SectionReveal>

          <JoinSection site={site} />
        </main>
      </AmbientStage>

      <SiteFooter site={site} />
    </>
  );
}
