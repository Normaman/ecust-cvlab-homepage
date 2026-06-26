import Image from "next/image";
import { SectionReveal } from "@/components/section-reveal";
import type {
  CommunityContent,
  ProjectItem,
  Publication,
  PublicationLink,
  ResearchItem,
  SiteContent,
  TeamMember
} from "@/lib/content";

function LinkIcon({ label }: { label: PublicationLink["label"] }) {
  if (label === "Code") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M7.5 5.75 3.25 10l4.25 4.25 1.06-1.06L5.38 10l3.18-3.19L7.5 5.75Zm5 0-1.06 1.06L14.62 10l-3.18 3.19 1.06 1.06L16.75 10 12.5 5.75Z" />
      </svg>
    );
  }

  if (label === "Project") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M4.5 3.5h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm1 3v2h9v-2h-9Zm0 4v4h4v-4h-4Zm5 0v1.5H14v-1.5h-3.5Zm0 3v1H14v-1h-3.5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M5.5 3.5h6.38l2.62 2.62v10.38a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Zm5.5 1.5v2h2L11 5Zm-4 5v1.5h6V10h-6Zm0 3v1.5h6V13h-6Zm0-6v1.5h3V7h-3Z" />
    </svg>
  );
}

type HeroSectionProps = {
  site: SiteContent;
};

export function HeroSection({ site }: HeroSectionProps) {
  return (
    <header
      id="top"
      className="apple-hero-shell relative overflow-hidden bg-transparent pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal id="about" variant="text" className="flex flex-col items-center text-center scroll-mt-36" distance={16} blur={10} scale={0.992}>
          <div className="reveal-stagger reveal-stagger-text max-w-4xl space-y-6">
            <h1 className="apple-title-gradient text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.8rem]">
              {site.title}
            </h1>
            <p className="mx-auto max-w-2xl text-[1.12rem] font-medium leading-relaxed text-slate-500 sm:text-[1.2rem]">
              {site.about}
            </p>
          </div>

          <div className="reveal-stagger reveal-stagger-text mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="#join"
              className="apple-panel rounded-full bg-slate-900 px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-slate-900/18 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
            >
              联系与招生
            </a>
            <a
              href="#gallery"
              className="group flex items-center gap-2 text-[15px] font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              浏览团队氛围相册
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="reveal-stagger reveal-stagger-cards mt-16 grid w-full gap-6 md:grid-cols-3 lg:mt-20">
            {site.stats.map((stat) => (
              <article
                key={stat.label}
                className="apple-glass-card apple-panel group relative overflow-hidden rounded-[2.75rem] p-10 text-left transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/90 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]"
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent opacity-80"></div>
                <div className="mb-3 text-[4rem] font-light tracking-tighter text-slate-900 transition-transform duration-500 group-hover:origin-bottom-left">
                  {stat.value}
                </div>
                <h2 className="text-[17px] font-semibold tracking-wide text-slate-800">{stat.label}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-500">{stat.detail}</p>
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blue-100/60 blur-[42px] transition-transform duration-700 group-hover:scale-150"></div>
              </article>
            ))}
          </div>
        </SectionReveal>
      </div>

    </header>
  );
}

type FacultySectionProps = {
  teamMembers: TeamMember[];
};

export function FacultySection({ teamMembers }: FacultySectionProps) {
  return (
    <SectionReveal id="team" variant="cards" className="mb-24 scroll-mt-36" delay={40}>
      <div className="reveal-stagger reveal-stagger-text mb-12 flex flex-col justify-between gap-6 px-2 sm:px-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-3xl">指导教师</h2>
          <p className="pl-1 text-[13px] font-medium uppercase tracking-[0.25em] text-slate-400">Faculty</p>
        </div>
      </div>

      <div className="reveal-stagger reveal-stagger-cards grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="apple-panel group flex flex-col overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:p-10"
          >
            <div className="mb-8 flex items-center gap-6">
              {member.avatar ? (
                <div className="relative aspect-[4/5] w-[100px] shrink-0 overflow-hidden rounded-[1.5rem] ring-1 ring-slate-900/5 shadow-sm transition-transform duration-500">
                  <Image src={member.avatar} alt={`${member.name}头像`} fill className="object-cover" sizes="100px" />
                </div>
              ) : (
                <div className="flex aspect-[4/5] w-[100px] shrink-0 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-slate-100 text-3xl font-light text-slate-400 ring-1 ring-slate-900/5 shadow-sm transition-transform duration-500 group-hover:scale-105">
                  {member.avatarLabel ?? member.name.slice(0, 1)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h3 className="mb-1.5 text-2xl font-bold tracking-tight text-slate-900">{member.name}</h3>
                <p className="text-[13px] font-semibold uppercase tracking-widest text-slate-400">{member.role}</p>
              </div>
            </div>

            <div className="mb-5 inline-flex w-fit items-center rounded-full bg-slate-50 px-4 py-1.5 text-[13px] font-medium text-slate-600 ring-1 ring-inset ring-slate-900/5">
              <span className="mr-2 text-slate-400">研究方向 /</span>
              <span className="font-semibold tracking-wide text-slate-800">{member.research}</span>
            </div>

            <p className="text-balance text-[14.5px] leading-[1.8] text-slate-500">{member.description}</p>
          </article>
        ))}
      </div>
    </SectionReveal>
  );
}

type ResearchSectionProps = {
  items: ResearchItem[];
};

export function ResearchSection({ items }: ResearchSectionProps) {
  return (
    <SectionReveal id="research" variant="media" className="mx-auto mb-14 max-w-7xl scroll-mt-36 px-4" delay={60}>
      <div className="reveal-stagger reveal-stagger-text mb-5 flex flex-col justify-between gap-6 px-2 sm:px-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-3xl">研究方向</h2>
          <p className="pl-1 text-[13px] font-medium uppercase tracking-[0.25em] text-slate-400">Directions</p>
        </div>
      </div>

      <div className="reveal-stagger reveal-stagger-media grid grid-cols-1 gap-8 md:grid-cols-2 lg">
        {items.map((item, index) => (
          <article key={index} className="apple-panel group relative h-[450px] cursor-pointer overflow-hidden rounded-2xl shadow-lg">
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundColor: "#ffffff"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-4.2rem)] transform p-6 transition-transform duration-500 ease-in-out group-hover:translate-y-0">
              <h3 className="mb-4 line-clamp-1 text-2xl font-bold text-white">{item.title}</h3>
              <div className="opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                <p className="line-clamp-6 text-justify text-lg leading-relaxed text-gray-300">{item.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionReveal>
  );
}

type PublicationsSectionProps = {
  publications: Publication[];
};

export function PublicationsSection({ publications }: PublicationsSectionProps) {
  return (
    <SectionReveal id="publications" variant="cards" className="mb-24 scroll-mt-36" delay={80}>
      <div className="reveal-stagger reveal-stagger-text mb-8 flex flex-col justify-between gap-6 px-2 sm:px-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-3xl">研究成果</h2>
          <p className="pl-1 text-[13px] font-medium uppercase tracking-[0.25em] text-slate-400">Publications</p>
        </div>
      </div>

      <div className="reveal-stagger reveal-stagger-cards space-y-6">
        {publications.map((paper) => (
          <article
            key={`${paper.title}-${paper.year}`}
            className="apple-panel group relative flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-1 hover:ring-slate-900/10 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:flex-row md:gap-8 md:p-8"
          >
            <div className="relative w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-slate-50 to-slate-100 ring-1 ring-inset ring-slate-900/5 md:min-h-[160px] md:w-[260px]">
              {paper.image ? (
                <>
                  <Image
                    src={paper.image}
                    alt={`${paper.title}配图`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 260px"
                  />
                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/95">
                    {paper.venue}
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full min-h-[160px] flex-col justify-between p-5 transition-transform duration-700 group-hover:scale-105">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500/80">{paper.venue}</div>
                  <div className="text-[14px] font-bold uppercase tracking-widest text-slate-400/80">
                    {paper.visualLabel ?? "Research Visual"}
                  </div>
                  <div className="grid grid-cols-3 gap-2 opacity-60">
                    <div className="h-8 rounded-lg bg-slate-200/60" />
                    <div className="h-8 rounded-lg bg-slate-200/40" />
                    <div className="h-8 rounded-lg bg-slate-200/60" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
              <div className="mb-4 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[12px] font-semibold tracking-wide text-blue-600 ring-1 ring-inset ring-blue-500/20">
                  {paper.venue}
                </span>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-[12px] font-semibold text-slate-500 ring-1 ring-inset ring-slate-200">
                  {paper.year}
                </span>
                {paper.note ? (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-[12px] font-semibold tracking-wide text-amber-600 ring-1 ring-inset ring-amber-500/20">
                    {paper.note}
                  </span>
                ) : null}
              </div>

              <h3 className="mb-6 text-[18px] font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600 md:text-[20px]">
                {paper.title}
              </h3>

              <div className="mt-auto flex flex-wrap gap-3">
                {paper.links.map((link) => (
                  <a
                    key={`${paper.title}-${link.label}`}
                    href={link.url}
                    className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-[13px] font-medium text-white transition-all hover:bg-blue-600 hover:shadow-md hover:shadow-blue-500/20"
                  >
                    <div className="text-white/80">
                      <LinkIcon label={link.label} />
                    </div>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionReveal>
  );
}

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <SectionReveal id="projects" variant="cards" className="mb-24 scroll-mt-36" delay={100}>
      <div className="reveal-stagger reveal-stagger-text mb-8 flex flex-col justify-between gap-6 px-2 sm:px-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-3xl">科研项目</h2>
          <p className="pl-1 text-[13px] font-medium uppercase tracking-[0.25em] text-slate-400">Projects</p>
        </div>
      </div>

      <div className="reveal-stagger reveal-stagger-cards grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="apple-panel group relative z-0 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-2 hover:ring-slate-900/10 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
          >
            {project.image ? (
              <div className="relative -m-8 mb-6 h-48 overflow-hidden rounded-t-[2rem] bg-slate-100">
                <Image
                  src={project.image}
                  alt={`${project.title}项目配图`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/5 to-transparent" />
              </div>
            ) : null}

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue-600 ring-1 ring-inset ring-blue-500/20">
                {project.sponsor}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[12px] font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
                <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {project.period}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                {project.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-slate-500">{project.summary}</p>
            </div>

            <div className="absolute -bottom-24 -right-24 -z-10 h-48 w-48 rounded-full bg-blue-400/0 blur-3xl transition-all duration-700 group-hover:bg-blue-400/10"></div>
          </article>
        ))}
      </div>
    </SectionReveal>
  );
}

type CommunitySectionProps = {
  community: CommunityContent;
  doctoralStudents: CommunityContent["students"];
  masterStudents: CommunityContent["students"];
};

export function CommunitySection({ community, doctoralStudents, masterStudents }: CommunitySectionProps) {
  return (
    <SectionReveal id="community" variant="cards" className="mb-24 scroll-mt-36" delay={120}>
      <div className="reveal-stagger reveal-stagger-text mb-8 flex flex-col justify-between gap-6 px-2 sm:px-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-3xl">团队成员</h2>
          <p className="pl-1 text-[13px] font-medium uppercase tracking-[0.25em] text-slate-400">Members</p>
        </div>
      </div>

      <div className="reveal-stagger reveal-stagger-cards space-y-8">
        <div className="apple-panel overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 md:p-12">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">在读学生</h3>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="mb-6 flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-800">
                <span className="h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-100"></span>
                博士研究生
              </h4>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {doctoralStudents.map((student) => (
                  <div
                    key={`${student.name}-${student.degree}`}
                    className="group flex items-center gap-4 overflow-hidden rounded-[1.5rem] bg-slate-50/50 p-4 ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                  >
                    <div className="relative aspect-[3/5] w-20 shrink-0 overflow-hidden rounded-[0.75rem] bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-inset ring-slate-900/5">
                      {student.image ? (
                        <Image
                          src={student.image}
                          alt={`${student.name}照片`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xl font-light text-slate-400 transition-transform duration-500 group-hover:scale-105">
                          {student.name.slice(0, 1)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 py-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h5 className="text-[16px] font-bold text-slate-900">{student.name}</h5>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold tracking-wider text-slate-500 shadow-sm ring-1 ring-slate-200/50">
                          {student.degree}
                        </span>
                      </div>

                      <p className="truncate text-[13px] text-slate-500">
                        <span className="mr-1 text-slate-400">方向 /</span>
                        {student.direction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-6 flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-800">
                <span className="h-2 w-2 rounded-full bg-indigo-400 ring-4 ring-indigo-50"></span>
                硕士研究生
              </h4>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {masterStudents.map((student) => (
                  <div
                    key={`${student.name}-${student.degree}`}
                    className="group flex items-center gap-4 overflow-hidden rounded-[1.5rem] bg-slate-50/50 p-4 ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                  >
                    <div className="relative aspect-[3/5] w-20 shrink-0 overflow-hidden rounded-[0.75rem] bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-inset ring-slate-900/5">
                      {student.image ? (
                        <Image
                          src={student.image}
                          alt={`${student.name}照片`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xl font-light text-slate-400 transition-transform duration-500 group-hover:scale-105">
                          {student.name.slice(0, 1)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 py-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h5 className="text-[16px] font-bold text-slate-900">{student.name}</h5>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold tracking-wider text-slate-500 shadow-sm ring-1 ring-slate-200/50">
                          {student.degree}
                        </span>
                      </div>

                      <p className="truncate text-[13px] text-slate-500">
                        <span className="mr-1 text-slate-400">方向 /</span>
                        {student.direction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="apple-panel overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 md:p-12">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">毕业生</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {community.alumni.map((alumnus) => (
              <div
                key={`${alumnus.name}-${alumnus.degree}`}
                className="group flex items-center gap-4 overflow-hidden rounded-[1.5rem] bg-slate-50/50 p-4 ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <div className="relative aspect-[3/5] w-20 shrink-0 overflow-hidden rounded-[0.75rem] bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-inset ring-slate-900/5">
                  {alumnus.image ? (
                    <Image
                      src={alumnus.image}
                      alt={`${alumnus.name}照片`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xl font-light text-slate-400 transition-transform duration-500 group-hover:scale-105">
                      {alumnus.name.slice(0, 1)}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 py-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h5 className="text-[16px] font-bold text-slate-900">{alumnus.name}</h5>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold tracking-wider text-slate-500 shadow-sm ring-1 ring-slate-200/50">
                      {alumnus.degree}
                    </span>
                  </div>

                  <p className="truncate text-[13px] text-slate-500">
                    <span className="mr-1 text-slate-400">去向 /</span>
                    {alumnus.destination}
                    <span className="mr-1 text-slate-400"> /</span>
                    {alumnus.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

type JoinSectionProps = {
  site: SiteContent;
};

export function JoinSection({ site }: JoinSectionProps) {
  return (
    <SectionReveal id="join" variant="cards" className="mb-24 scroll-mt-36" delay={160}>
      <div className="reveal-stagger reveal-stagger-text mb-8 flex flex-col justify-between gap-6 px-2 sm:px-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
            {site.joinUs.title || "招生与合作"}
          </h2>
          <p className="pl-1 text-[13px] font-medium uppercase tracking-[0.25em] text-slate-400">Join Us</p>
        </div>
      </div>

      <div className="reveal-stagger reveal-stagger-cards grid gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
        <article className="apple-panel group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:p-10">
          <p className="mb-8 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{site.joinUs.intro}</p>

          <div className="space-y-4">
            {site.joinUs.bullets.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-[1.25rem] bg-slate-50/50 p-4 ring-1 ring-slate-900/5 transition-colors hover:bg-white hover:ring-slate-200"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-[15px] leading-relaxed text-slate-700">{item}</div>
              </div>
            ))}
          </div>
        </article>

        <aside className="apple-panel group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lg md:p-10">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-indigo-100 text-indigo-600 ring-1 ring-indigo-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">联系课题组</h3>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-slate-400">Email Address</p>
                <a className="inline-block text-[16px] font-medium text-blue-600 transition-colors hover:text-blue-800" href={`mailto:${site.joinUs.email}`}>
                  {site.joinUs.email}
                </a>
              </div>

              <div>
                <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-slate-400">Location</p>
                <p className="text-[14px] leading-relaxed text-slate-700">{site.joinUs.address}</p>
              </div>

              <div>
                <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-slate-400">Requirements</p>
                <p className="text-[13px] leading-relaxed text-slate-500">简要自我介绍、研究兴趣、个人简历与代表性项目经历。</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-24 -right-24 -z-10 h-48 w-48 rounded-full bg-indigo-400/0 blur-3xl transition-all duration-700 group-hover:bg-indigo-400/10"></div>
        </aside>
      </div>
    </SectionReveal>
  );
}

type SiteFooterProps = {
  site: SiteContent;
};

export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className="mt-12 border-t border-wikiAccent bg-wikiSoft">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>{site.title} 团队主页</p>
        <div className="flex flex-wrap items-center gap-4">
          <p>聚焦计算机视觉、人工智能、AIGC 安全与三维视觉研究</p>
        </div>
      </div>
    </footer>
  );
}
