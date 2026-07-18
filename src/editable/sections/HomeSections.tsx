import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Camera, Download, FileText, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

const displayTaskLabel = (key: TaskKey, fallback?: string) => {
  if (key === 'listing') return 'Local Directory'
  if (key === 'pdf') return 'Reference Library'
  return fallback || key
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

const container = dc.shell.section

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 8)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover ${SITE_CONFIG.name}`
  const fallbackSections = SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 6)

  return (
    <section className="overflow-hidden bg-white">
      <div className={`${container} py-[100px] text-center`}>
        <EditableReveal>
          <p className="text-sm font-semibold text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
          <h1 className="editable-display mx-auto mt-5 max-w-4xl text-[42px] font-bold leading-[1.12] text-[var(--slot4-page-text)] sm:text-[52px]">
            {heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={primaryRoute} className={dc.button.primary}>
              Browse {displayTaskLabel(primaryTask).toLowerCase()} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/search" className={dc.button.secondary}>
              Search entries <Search className="h-4 w-4" />
            </Link>
          </div>
        </EditableReveal>
      </div>

      <div className="bg-[var(--slot4-dark-bg)] pb-[100px]">
        <div className={`${container} -mt-6`}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pool.length ? pool.slice(0, 6).map((post, index) => (
              <EditableReveal key={post.id || post.slug} index={index}>
                <Link href={postHref(primaryTask, post, primaryRoute)} className="group block overflow-hidden rounded-[20px] border border-white/10 bg-white text-[var(--slot4-page-text)] shadow-[0_8px_28px_rgba(20,20,43,0.18)] transition duration-300 hover:scale-[0.98]">
                  <div className="aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
                    <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{categoryOf(post) || 'Featured'}</p>
                    <h2 className="mt-3 line-clamp-2 text-xl font-bold leading-tight">{post.title}</h2>
                  </div>
                </Link>
              </EditableReveal>
            )) : fallbackSections.map((task, index) => {
              const Icon = taskIcon[task.key] || FileText
              return (
                <EditableReveal key={task.key} index={index}>
                  <Link href={task.route} className="group block rounded-[20px] border border-white/10 bg-white p-8 text-[var(--slot4-page-text)] shadow-[0_8px_28px_rgba(20,20,43,0.18)] transition duration-300 hover:scale-[0.98]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">Section {String(index + 1).padStart(2, '0')}</p>
                    <h2 className="mt-3 text-xl font-bold leading-tight">{displayTaskLabel(task.key, task.label)}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">Ready for fresh entries as soon as this feed publishes.</p>
                  </Link>
                </EditableReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  return (
    <section className="bg-white">
      <div className={`${container} py-[100px] lg:py-[180px]`}>
        <EditableReveal className="text-center">
          <h2 className="editable-display text-[32px] font-bold leading-[1.313] sm:text-[38px]">What you can explore</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.75] text-[var(--slot4-muted-text)]">A compact index of useful records, guides, stories, visuals, and saved resources.</p>
        </EditableReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {([
            ['Entries indexed', pool.length || posts.length, FileText],
            ['Active sections', categories.length, Building2],
            ['Reference lanes', timeSections.filter((section) => section.posts.length).length || 3, Download],
          ] as Array<[string, number, LucideIcon]>).map(([label, value, Icon], index) => (
            <EditableReveal key={String(label)} index={index} className="rounded-[20px] border border-[var(--editable-border)] bg-white p-8 text-center shadow-[0_2px_7px_rgba(20,20,43,0.06)]">
              <Icon className="mx-auto h-7 w-7 text-[var(--slot4-accent)]" />
              <p className="editable-display mt-5 text-[38px] font-bold text-[var(--slot4-page-text)]">{String(value)}</p>
              <p className="mt-2 text-sm font-medium text-[var(--slot4-muted-text)]">{String(label)}</p>
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function EntryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <EditableReveal index={index}>
      <Link href={href} className="group block h-full overflow-hidden rounded-[20px] border border-[var(--editable-border)] bg-white shadow-[0_2px_7px_rgba(20,20,43,0.06)] transition duration-300 hover:scale-[0.98]">
        <div className="aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{categoryOf(post) || `No. ${String(index + 1).padStart(2, '0')}`}</p>
          <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getExcerpt(post, 140)}</p>
        </div>
      </Link>
    </EditableReveal>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 12)
  if (!activity.length) return null
  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`${container} py-[100px] lg:py-[180px]`}>
        <EditableReveal className="mx-auto max-w-2xl text-center">
          <h2 className="editable-display text-[32px] font-bold leading-[1.313] sm:text-[38px]">Main discovery shelf</h2>
          <p className="mt-4 text-base leading-[1.75] text-[var(--slot4-muted-text)]">A quick scan of the newest useful entries across {SITE_CONFIG.name}.</p>
        </EditableReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activity.slice(0, 9).map((post, index) => (
            <EntryCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 4), href: primaryRoute },
          { key: 'browse', posts: posts.slice(4, 8), href: primaryRoute },
          { key: 'index', posts: posts.slice(8, 12), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.slice(0, 3).map((section, index) => {
        const reverse = index % 2 === 1
        const lead = section.posts[0]
        const Icon = [MapPin, FileText, Camera][index] || FileText
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-white' : 'bg-[var(--slot4-panel-bg)]'}>
            <div className={`${container} grid gap-10 py-[100px] lg:grid-cols-2 lg:items-center lg:py-[140px]`}>
              <EditableReveal index={0} className={reverse ? 'lg:order-2' : ''}>
                <div className="rounded-[20px] border border-[var(--editable-border)] bg-white p-8 shadow-[0_2px_7px_rgba(20,20,43,0.06)] lg:p-12">
                  <Icon className="h-8 w-8 text-[var(--slot4-accent)]" />
                  <h2 className="editable-display mt-6 text-[32px] font-bold leading-[1.313]">Fresh shelf {index + 1}</h2>
                  <p className="mt-4 text-base leading-[1.75] text-[var(--slot4-muted-text)]">Explore a focused set of recently indexed entries with clean summaries and direct paths.</p>
                  <Link href={section.href || primaryRoute} className={`${dc.button.primary} mt-7`}>
                    View shelf <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </EditableReveal>
              {lead ? (
                <EntryCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} index={index + 1} />
              ) : null}
            </div>
          </section>
        )
      })}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[linear-gradient(to_bottom,var(--slot4-panel-bg)_28%,white_28%)]">
      <div className={`${container} py-[100px]`}>
        <EditableReveal className="grid gap-6 rounded-[24px] bg-[var(--slot4-dark-bg)] p-8 text-white md:grid-cols-[1fr_auto] md:items-center lg:p-12">
          <div>
            <p className="text-sm font-semibold text-white/65">{pagesContent.home.cta.badge}</p>
            <h2 className="editable-display mt-2 max-w-3xl text-[32px] font-bold leading-tight">{pagesContent.home.cta.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{pagesContent.home.cta.description}</p>
          </div>
          <Link href="/create" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[var(--slot4-dark-bg)] transition duration-300 hover:scale-[0.98]">
            Submit <ArrowRight className="h-4 w-4" />
          </Link>
        </EditableReveal>
      </div>
    </section>
  )
}
