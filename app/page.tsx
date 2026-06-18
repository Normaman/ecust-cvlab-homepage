import {
  getCommunityContent,
  getNewsItems,
  getProjectItems,
  getPublications,
  getResearchItems,
  getSiteContent,
  getTeamMembers,
  getTimelineItems,
  type PublicationLink
} from "@/lib/content";
import { TimelineList } from "@/components/timeline-list";

const navItems = [
  { href: "#about", label: "关于我们" },
  { href: "#news", label: "最新动态" },
  { href: "#team", label: "教师团队" },
  { href: "#community", label: "学生与校友" },
  { href: "#research", label: "研究方向" },
  { href: "#publications", label: "研究成果" },
  { href: "#projects", label: "科研项目" },
  { href: "#timeline", label: "团队时间线" },
  { href: "#join", label: "Join Us" }
];

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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M11.5 4h4.5v4.5h-1.5V6.56l-6.97 6.97-1.06-1.06 6.97-6.97H11.5V4Z" />
      <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5H9v1.5H6.5v7h7V11H15v2.5A1.5 1.5 0 0 1 13.5 15h-7A1.5 1.5 0 0 1 5 13.5v-7Z" />
    </svg>
  );
}

export default function HomePage() {
  const site = getSiteContent();
  const teamMembers = getTeamMembers();
  const researchItems = getResearchItems();
  const publications = getPublications();
  const timelineItems = getTimelineItems();
  const newsItems = getNewsItems();
  const projectItems = getProjectItems();
  const community = getCommunityContent();

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-wikiBorder bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a href="#top" className="text-sm font-semibold tracking-[0.18em] text-wikiText sm:text-base">
              {site.labShortName}
            </a>
            <div className="flex items-center gap-3">
              <a
                href="#publications"
                className="rounded-md border border-wikiBorder bg-wikiSoft px-3 py-1.5 text-sm font-medium text-wikiBlue transition hover:bg-white hover:underline"
              >
                浏览代表性成果
              </a>
              <a
                href="#join"
                className="rounded-md bg-wikiBlue px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Join Us
              </a>
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="pill-link whitespace-nowrap">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header id="top" className="border-b border-wikiAccent bg-gradient-to-b from-white to-wikiSoft pt-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <section id="about" className="min-w-0 scroll-mt-36">
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-slate-500">{site.subtitle}</p>
            <h1 className="mb-5 text-3xl font-bold leading-tight text-wikiText sm:text-4xl lg:text-[2.8rem]">{site.title}</h1>
            <div className="max-w-4xl space-y-4 text-[1.03rem] leading-8 text-slate-700">
              {site.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#timeline"
                className="rounded-md bg-wikiBlue px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                查看团队发展时间线
              </a>
              <a href="#join" className="wiki-link inline-flex items-center gap-2 text-sm font-semibold">
                联系与招生
                <ArrowIcon />
              </a>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {site.stats.map((stat) => (
                <article key={stat.label} className="hero-stat-card rounded-2xl p-5">
                  <div className="text-3xl font-bold text-wikiBlue">{stat.value}</div>
                  <h2 className="mt-2 text-base font-semibold text-wikiText">{stat.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stat.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="space-y-5">
            <aside className="wiki-card h-fit overflow-hidden rounded-xl">
              <div className="border-b border-wikiBorder bg-wikiSoft px-5 py-3 text-center text-lg font-bold">课题组概览</div>
              <dl className="grid grid-cols-[92px_minmax(0,1fr)] gap-x-3 gap-y-3 px-5 py-5 text-sm leading-6">
                <dt className="font-semibold text-slate-600">机构</dt>
                <dd>{site.infobox.institution}</dd>
                <dt className="font-semibold text-slate-600">领域</dt>
                <dd>{site.infobox.domains}</dd>
                <dt className="font-semibold text-slate-600">论文</dt>
                <dd>{site.infobox.papers}</dd>
                <dt className="font-semibold text-slate-600">项目</dt>
                <dd>{site.infobox.projects}</dd>
                <dt className="font-semibold text-slate-600">荣誉</dt>
                <dd>{site.infobox.honors}</dd>
              </dl>
            </aside>

            <aside className="wiki-card rounded-xl p-5">
              <h2 className="mb-3 text-lg font-bold">联系方式</h2>
              <div className="space-y-2 text-sm leading-7 text-slate-700">
                <p>
                  <span className="font-semibold text-slate-600">邮箱：</span>
                  <a className="wiki-link" href={`mailto:${site.infobox.email}`}>
                    {site.infobox.email}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-slate-600">地址：</span>
                  {site.infobox.address}
                </p>
                <p>
                  <span className="font-semibold text-slate-600">实验室：</span>
                  {site.infobox.office}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section id="news" className="mb-14 scroll-mt-36">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title mb-0 text-2xl">最新动态</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">聚焦近期论文录用、学术交流与学生培养进展，便于访客快速了解团队近期活跃度。</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {newsItems.map((item) => (
              <article key={`${item.date}-${item.title}`} className="wiki-card rounded-xl p-6">
                <div className="mb-3 text-sm font-semibold tracking-[0.18em] text-wikiBlue">{item.date}</div>
                <h3 className="text-lg font-bold text-wikiText">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="team" className="mb-14 scroll-mt-36">
          <h2 className="section-title text-2xl">教师团队</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="wiki-card rounded-xl p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <span className="rounded-full bg-wikiSoft px-3 py-1 text-xs font-semibold text-slate-600">{member.role}</span>
                </div>
                <p className="mb-3 text-slate-700">研究方向：{member.research}</p>
                <p className="text-sm leading-7 text-slate-600">{member.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="community" className="mb-14 scroll-mt-36">
          <h2 className="section-title text-2xl">学生与校友</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="wiki-card rounded-xl p-6">
              <h3 className="mb-4 text-lg font-bold">在读学生</h3>
              <div className="space-y-4">
                {community.students.map((student) => (
                  <div key={`${student.name}-${student.degree}`} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-semibold text-wikiText">{student.name}</h4>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{student.degree}</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{student.direction}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="wiki-card rounded-xl p-6">
              <h3 className="mb-4 text-lg font-bold">优秀校友</h3>
              <div className="space-y-4">
                {community.alumni.map((alumnus) => (
                  <div key={`${alumnus.name}-${alumnus.destination}`} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-semibold text-wikiText">{alumnus.name}</h4>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{alumnus.destination}</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{alumnus.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="mb-14 scroll-mt-36">
          <h2 className="section-title text-2xl">研究方向</h2>
          <div className="grid gap-6 xl:grid-cols-2">
            {researchItems.map((item, index) => (
              <article key={item.title} className={`wiki-card rounded-2xl p-6 ${index === researchItems.length - 1 ? "xl:col-span-2" : ""}`}>
                <div className={`grid gap-5 ${index === researchItems.length - 1 ? "lg:grid-cols-[minmax(0,1fr)_280px]" : "md:grid-cols-[minmax(0,1fr)_220px]"}`}>
                  <div>
                    <h3 className="mb-3 text-lg font-bold">{item.title}</h3>
                    <p className="leading-7 text-slate-700">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={`${item.title}-${tag}`} className="rounded-full bg-wikiSoft px-3 py-1 text-xs font-semibold text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="research-visual flex min-h-[152px] flex-col justify-between rounded-2xl p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-wikiBlue">Research Focus</div>
                    <div className="text-xl font-bold text-slate-800">{item.visualLabel}</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 rounded-xl bg-white/80" />
                      <div className="h-12 rounded-xl bg-white/60" />
                      <div className="h-12 rounded-xl bg-white/80" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="publications" className="mb-14 scroll-mt-36">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title mb-0 text-2xl">研究成果与发表</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">展示代表性论文成果，并对重要会议亮点与代码资源进行清晰区分与高亮。</p>
          </div>
          <div className="wiki-card overflow-hidden rounded-xl">
            <div className="divide-y divide-slate-200">
              {publications.map((paper) => (
                <article key={`${paper.title}-${paper.year}`} className="px-6 py-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{paper.venue}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{paper.year}</span>
                    {paper.note ? (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{paper.note}</span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-8 text-slate-800">{paper.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    {paper.links.map((link) => (
                      <a key={`${paper.title}-${link.label}`} href={link.url} className="publication-link">
                        <LinkIcon label={link.label} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mb-14 scroll-mt-36">
          <h2 className="section-title text-2xl">科研项目</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {projectItems.map((project) => (
              <article key={project.title} className="wiki-card rounded-xl p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-wikiSoft px-3 py-1 text-xs font-semibold text-slate-600">{project.sponsor}</span>
                  <span className="rounded-full bg-wikiSoft px-3 py-1 text-xs font-semibold text-slate-600">{project.period}</span>
                </div>
                <h3 className="text-lg font-bold text-wikiText">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="timeline" className="mb-14 scroll-mt-36">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-title mb-3 text-2xl">团队发展时间线</h2>
              <p className="max-w-3xl leading-7 text-slate-700">
                通过交互式垂直时间线回顾团队建设、代表性成果、学术交流与研究方向演进，突出课题组的持续积累与学术影响力。
              </p>
            </div>
            <a href="#top" className="wiki-link text-sm font-semibold">
              返回顶部
            </a>
          </div>
          <TimelineList items={timelineItems} />
        </section>

        <section id="join" className="scroll-mt-36">
          <h2 className="section-title text-2xl">{site.joinUs.title}</h2>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="wiki-card rounded-xl p-6">
              <p className="leading-8 text-slate-700">{site.joinUs.intro}</p>
              <div className="mt-5 space-y-3">
                {site.joinUs.bullets.map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <aside className="wiki-card rounded-xl p-6">
              <h3 className="mb-4 text-lg font-bold">联系课题组</h3>
              <div className="space-y-3 text-sm leading-7 text-slate-700">
                <p>
                  <span className="font-semibold text-slate-600">邮箱：</span>
                  <a className="wiki-link" href={`mailto:${site.joinUs.email}`}>
                    {site.joinUs.email}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-slate-600">地址：</span>
                  {site.joinUs.address}
                </p>
                <p>
                  <span className="font-semibold text-slate-600">建议内容：</span>
                  简要自我介绍、研究兴趣、个人简历与代表性项目经历。
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-wikiAccent bg-wikiSoft">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{site.title} 团队主页</p>
          <p>聚焦计算机视觉、人工智能、AIGC 安全与三维视觉研究</p>
        </div>
      </footer>
    </>
  );
}
