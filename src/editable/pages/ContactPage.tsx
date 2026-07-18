'use client'

import { Mail, MessageSquareText, Send, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

const laneIcons = [Send, Sparkles, MessageSquareText]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="bg-[linear-gradient(to_bottom,white_62%,var(--slot4-panel-bg)_62%)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-6 py-[100px]">
            <EditableReveal className="mx-auto max-w-3xl text-center">
              <p className={dc.type.eyebrow}>{pagesContent.contact.eyebrow}</p>
              <h1 className="editable-display mt-5 text-[42px] font-bold leading-[1.12] sm:text-[52px]">{pagesContent.contact.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            </EditableReveal>

            <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <aside className="grid gap-5">
                {pagesContent.contact.lanes.map((lane, index) => {
                  const Icon = laneIcons[index] || Mail
                  return (
                    <EditableReveal key={lane.title} index={index} className="rounded-[20px] border border-[var(--editable-border)] bg-white p-6 shadow-[0_2px_7px_rgba(20,20,43,0.06)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="editable-display mt-5 text-xl font-bold">{lane.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                    </EditableReveal>
                  )
                })}
              </aside>

              <EditableReveal index={1} className="rounded-[24px] border border-[var(--editable-border)] bg-white p-6 shadow-[0_8px_28px_rgba(20,20,43,0.10)] lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--slot4-accent)]">Direct message</p>
                    <h2 className="editable-display mt-2 text-[32px] font-bold leading-tight">{pagesContent.contact.formTitle}</h2>
                  </div>
                  <span className="hidden rounded-full border border-[var(--editable-border)] px-4 py-2 text-xs font-semibold text-[var(--slot4-muted-text)] sm:inline-flex">Usually reviewed soon</span>
                </div>
                <EditableContactLeadForm />
              </EditableReveal>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
