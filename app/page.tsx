import Image from "next/image";
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
import { NewsCarousel } from "@/components/news-carousel";
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
  const doctoralStudents = community.students.filter((student) => student.degree.includes("博士"));
  const masterStudents = community.students.filter((student) => student.degree.includes("硕士"));

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
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <section id="about" className="min-w-0 scroll-mt-36">
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-slate-500">{site.subtitle}</p>
            <h1 className="mb-5 text-3xl font-bold leading-tight text-wikiText sm:text-4xl lg:text-[2.8rem]">{site.title}</h1>
            <div className="max-w-6xl space-y-4 text-[1.03rem] leading-8 text-slate-700">
              {site.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#gallery"
                className="rounded-md bg-wikiBlue px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                浏览团队氛围相册
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
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-14">
          <NewsCarousel items={newsItems} />
        </div>

        <section id="team" className="mb-14 scroll-mt-36">
          <h2 className="section-title text-2xl">指导教师</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="wiki-card rounded-2xl p-6">
                <div className="mb-4 flex items-start gap-4">
                  {member.avatar ? (
                    <div className="relative aspect-[5/7] w-[92px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <Image
                        src={member.avatar}
                        alt={`${member.name}头像`}
                        fill
                        className="object-cover"
                        sizes="92px"
                      />
                    </div>
                  ) : (
                    <div className="teacher-avatar flex aspect-[5/7] w-[92px] shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white">
                      {member.avatarLabel ?? member.name.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <span className="rounded-full bg-wikiSoft px-3 py-1 text-xs font-semibold text-slate-600">{member.role}</span>
                    </div>
                    <p className="text-sm leading-7 text-slate-700">研究方向：{member.research}</p>
                  </div>
                </div>
                <p className="text-sm leading-7 text-slate-600">{member.description}</p>
              </article>
            ))}
          </div>
        </section>

<section id="research" className="mb-14 scroll-mt-36 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl mb-8 font-bold border-b-2 border-gray-900 pb-3">研究方向</h2>

      {/* 移除单列限制，使用多列响应式网格布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg gap-8">
        {researchItems.map((item, index) => (
          <article
            key={index}
            // group类名是实现悬停联动的核心
            className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* 1. 全屏背景图：悬停时带有轻微的缓慢放大效果 */}
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ 
                backgroundImage: `url(${item.image})`,
                backgroundColor: '#ffffff' // 建议加一个深色底色，防止图片比例不一时两侧留白太突兀
              }}
            />

            {/* 2. 黑色渐变遮罩：确保白色文字能看清，悬停时颜色变深 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            {/* 3. 内容容器（核心滑动动画所在）
                translate-y-[calc(100%-4.5rem)]：默认状态下把容器往下推，只露出顶部约 4.5rem（恰好是标题的高度）
                group-hover:translate-y-0：鼠标悬停时，整个容器滑动回原位（0点），展示出完整内容
            */}
            <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-[calc(100%-4.2rem)] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              
              {/* 标题区：默认可见 */}
              <h3 className="text-2xl font-bold text-white mb-4 line-clamp-1">
                {item.title}
              </h3>

              {/* 详情区：默认透明度为0，悬停时淡入并跟随容器滑上来 */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <p className="text-lg text-gray-300 leading-relaxed line-clamp-6 text-justify">
                  {item.description}
                </p>
                {/* 底部小点缀，增强“交互”引导感 */}
                
              </div>

            </div>
          </article>
        ))}
      </div>
    </section>

        <section id="publications" className="mb-14 scroll-mt-36">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title mb-0 text-2xl">研究成果与发表</h2>
          </div>
          <div className="wiki-card overflow-hidden rounded-2xl">
            <div className="divide-y divide-slate-200">
              {publications.map((paper) => (
                <article key={`${paper.title}-${paper.year}`} className="grid gap-5 px-6 py-5 md:grid-cols-[220px_minmax(0,1fr)]">
                  {paper.image ? (
                    <div className="relative min-h-[144px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <Image
                        src={paper.image}
                        alt={`${paper.title}配图`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 220px"
                      />
                      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/55 to-transparent px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                        {paper.venue}
                      </div>
                    </div>
                  ) : (
                    <div className="paper-visual flex min-h-[144px] flex-col justify-between rounded-2xl p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-wikiBlue">{paper.venue}</div>
                      <div className="text-lg font-bold leading-7 text-slate-800">{paper.visualLabel ?? "研究成果示意图"}</div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-10 rounded-xl bg-white/85" />
                        <div className="h-10 rounded-xl bg-white/60" />
                        <div className="h-10 rounded-xl bg-white/85" />
                      </div>
                    </div>
                  )}
                  <div>
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

        <section id="community" className="mb-14 scroll-mt-36">
          <h2 className="section-title text-2xl">团队成员</h2>
          <div className="space-y-6">
            <div className="wiki-card rounded-xl p-6">
              <h3 className="mb-5 text-lg font-bold">在读学生</h3>
              <div className="space-y-5">
                <div>
                  <h4 className="mb-3 text-base font-semibold text-wikiText">博士生</h4>
                  <div className="space-y-3">
                    {doctoralStudents.map((student) => (
                      <div key={`${student.name}-${student.degree}`} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h5 className="font-semibold text-wikiText">{student.name}</h5>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{student.degree}</span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{student.direction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-base font-semibold text-wikiText">硕士生</h4>
                  <div className="space-y-3">
                    {masterStudents.map((student) => (
                      <div key={`${student.name}-${student.degree}`} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h5 className="font-semibold text-wikiText">{student.name}</h5>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{student.degree}</span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{student.direction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="wiki-card rounded-xl p-6">
              <h3 className="mb-5 text-lg font-bold">毕业生</h3>
              <div className="space-y-3">
                {community.alumni.map((alumnus) => (
                  <div key={`${alumnus.name}-${alumnus.destination}`} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-semibold text-wikiText">{alumnus.name}</h4>
                        {alumnus.degree ? (
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{alumnus.degree}</span>
                        ) : null}
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">去向：{alumnus.destination}</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{alumnus.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="mb-14 scroll-mt-36">
          <div className="mb-8">
            <div>
              <h2 className="section-title mb-2 text-2xl">团队氛围</h2>
              <p className="italic tracking-[0.08em] text-slate-500">moments caught between blinks</p>
            </div>
          </div>
          <TeamGallery items={timelineItems} />
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
          <div className="flex flex-wrap items-center gap-4">
            <p>聚焦计算机视觉、人工智能、AIGC 安全与三维视觉研究</p>
            {/* <a href="admin/" className="wiki-link font-semibold">
              内容管理后台
            </a> */}
          </div>
        </div>
      </footer>
    </>
  );
}
