import Image from "next/image";
import {
  getPublications,
  getResearchItems,
  getSiteContent,
  getTeamMembers,
  getTimelineItems
} from "@/lib/content";

export default function HomePage() {
  const site = getSiteContent();
  const teamMembers = getTeamMembers();
  const researchItems = getResearchItems();
  const publications = getPublications();
  const timelineItems = getTimelineItems();

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-wikiBorder bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="text-sm font-semibold tracking-wide text-wikiText sm:text-base">
            {site.labShortName}
          </a>
          <div className="hidden items-center gap-5 text-sm md:flex">
            <a href="#about" className="wiki-link">
              关于我们
            </a>
            <a href="#team" className="wiki-link">
              团队成员
            </a>
            <a href="#research" className="wiki-link">
              研究方向
            </a>
            <a href="#publications" className="wiki-link">
              研究成果
            </a>
            <a href="#timeline" className="wiki-link">
              时间线
            </a>
          </div>
          <a
            href="#timeline"
            className="rounded-md border border-wikiBorder bg-wikiSoft px-3 py-1.5 text-sm font-medium text-wikiBlue transition hover:bg-white hover:underline"
          >
            查看团队发展时间线
          </a>
        </div>
      </nav>

      <header id="top" className="border-b border-wikiAccent bg-gradient-to-b from-white to-wikiSoft pt-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <section id="about" className="min-w-0 scroll-mt-28">
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-slate-500">{site.subtitle}</p>
            <h1 className="mb-5 text-3xl font-bold leading-tight text-wikiText sm:text-4xl lg:text-[2.6rem]">
              {site.title}
            </h1>
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
              <a href="#publications" className="wiki-link text-sm font-semibold">
                浏览代表性论文
              </a>
            </div>
          </section>

          <aside className="wiki-card h-fit overflow-hidden rounded-xl">
            <div className="border-b border-wikiBorder bg-wikiSoft px-5 py-3 text-center text-lg font-bold">
              课题组信息框
            </div>
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
              <dt className="font-semibold text-slate-600">导航</dt>
              <dd>
                <a href="#timeline" className="wiki-link">
                  查看团队发展时间线
                </a>
              </dd>
            </dl>
          </aside>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section id="team" className="mb-14 scroll-mt-28">
          <h2 className="section-title text-2xl">团队成员</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="wiki-card rounded-xl p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <span className="rounded-full bg-wikiSoft px-3 py-1 text-xs font-semibold text-slate-600">
                    {member.role}
                  </span>
                </div>
                <p className="mb-3 text-slate-700">研究方向为{member.research}。</p>
                <p className="text-sm leading-7 text-slate-600">{member.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="mb-14 scroll-mt-28">
          <h2 className="section-title text-2xl">研究方向</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {researchItems.map((item, index) => (
              <div
                key={item.title}
                className={`wiki-card rounded-xl p-6 ${index === researchItems.length - 1 ? "lg:col-span-2" : ""}`}
              >
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="leading-7 text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="publications" className="mb-14 scroll-mt-28">
          <h2 className="section-title text-2xl">研究成果与发表</h2>
          <div className="wiki-card overflow-hidden rounded-xl">
            <div className="border-b border-wikiBorder bg-wikiSoft px-6 py-4 text-sm text-slate-600">
              论文数据来自 YAML 数据库，后续新增论文只需要修改 `data/publications.yml`。
            </div>
            <div className="divide-y divide-slate-200">
              {publications.map((paper) => (
                <article key={`${paper.title}-${paper.year}`} className="px-6 py-5">
                  <p className="text-base leading-7 text-slate-800">
                    <span className="font-semibold">{paper.title}</span>, {paper.venue}, {paper.year}
                    {paper.note ? ` (${paper.note})` : ""}.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm">
                    {paper.links.map((link) => (
                      <a key={`${paper.title}-${link.label}`} href={link.url} className="wiki-link font-semibold">
                        [{link.label}]
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="scroll-mt-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-title mb-3 text-2xl">团队发展时间线</h2>
              <p className="max-w-3xl leading-7 text-slate-700">
                时间线数据和图片路径已解耦，后续只需要改 `data/timeline.yml` 和 `public/images/timeline/`。
              </p>
            </div>
            <a href="#top" className="wiki-link text-sm font-semibold">
              返回顶部
            </a>
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="timeline-line" />
            {timelineItems.map((item, index) => {
              const sideClass = index % 2 === 0 ? "left md:ml-0 md:pr-10" : "right md:ml-auto md:pl-10";

              return (
                <article key={`${item.year}-${item.title}`} className={`timeline-item mb-10 ml-10 md:w-1/2 ${sideClass}`}>
                  <div className="wiki-card overflow-hidden rounded-2xl">
                    <div className="relative h-56 w-full">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        priority={index === 0}
                        className="rounded-b-none object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-wikiBlue">
                        {item.year}
                      </div>
                      <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                      <p className="leading-7 text-slate-700">{item.description}</p>
                      <p className="mt-3 text-sm text-slate-500">{item.caption}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-wikiAccent bg-wikiSoft">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{site.title} 团队主页</p>
          <p>Next.js + TailwindCSS + YAML 数据库 + GitHub Pages</p>
        </div>
      </footer>
    </>
  );
}
