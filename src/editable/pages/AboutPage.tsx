import Link from 'next/link'
import { ArrowRight, CheckCircle2, Layers3 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="overflow-hidden bg-[linear-gradient(to_bottom,white_58%,var(--slot4-dark-bg)_58%)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-6 py-[100px]">
            <EditableReveal className="mx-auto max-w-4xl text-center">
              <p className={dc.type.eyebrow}>{pagesContent.about.badge}</p>
              <h1 className="editable-display mt-5 text-[42px] font-bold leading-[1.12] sm:text-[52px]">About {SITE_CONFIG.name}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/search" className={dc.button.primary}>Start exploring <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/contact" className={dc.button.secondary}>Contact us</Link>
              </div>
            </EditableReveal>

            <EditableReveal index={1} className="mt-16 grid gap-6 md:grid-cols-3">
              {pagesContent.about.stats.map((stat) => (
                <div key={stat.label} className="rounded-[20px] border border-[var(--editable-border)] bg-white p-8 text-center shadow-[0_8px_28px_rgba(20,20,43,0.10)]">
                  <p className="editable-display text-[38px] font-bold text-[var(--slot4-accent)]">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--slot4-muted-text)]">{stat.label}</p>
                </div>
              ))}
            </EditableReveal>
          </div>
        </section>

        <section className="bg-[var(--slot4-dark-bg)] text-white">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-6 pb-[100px] lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <EditableReveal className="rounded-[24px] border border-white/10 bg-white/5 p-8 lg:p-12">
              <Layers3 className="h-9 w-9 text-[var(--slot4-accent)]" />
              <h2 className="editable-display mt-6 text-[32px] font-bold leading-[1.313]">{pagesContent.about.title}</h2>
              <div className="mt-6 space-y-5 text-base leading-[1.75] text-white/70">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </EditableReveal>

            <div className="grid gap-5">
              {pagesContent.about.values.map((value, index) => (
                <EditableReveal key={value.title} index={index} className="rounded-[20px] border border-white/10 bg-white p-7 text-[var(--slot4-page-text)] shadow-[0_8px_28px_rgba(20,20,43,0.14)]">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="editable-display text-xl font-bold">{value.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                    </div>
                  </div>
                </EditableReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
