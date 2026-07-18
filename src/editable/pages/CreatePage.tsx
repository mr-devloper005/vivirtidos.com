'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const displayTaskLabel = (key: TaskKey, fallback: string) => {
  if (key === 'listing') return 'Local Directory'
  if (key === 'pdf') return 'Reference Library'
  return fallback
}

const fieldClass = 'rounded-[18px] border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--editable-page-text)] outline-none transition placeholder:text-[var(--slot4-soft-muted-text)] focus:border-[var(--slot4-accent)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--slot4-panel-bg)] px-6 py-[100px] text-[var(--editable-page-text)]">
          <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 rounded-[24px] border border-[var(--editable-border)] bg-white p-7 shadow-[0_8px_28px_rgba(20,20,43,0.10)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <EditableReveal className="flex h-full min-h-72 items-center justify-center rounded-[24px] bg-[var(--slot4-dark-bg)] text-white">
              <Lock className="h-20 w-20 opacity-80" />
            </EditableReveal>
            <EditableReveal index={1} className="self-center">
              <p className={dc.type.eyebrow}>{pagesContent.create.locked.badge}</p>
              <h1 className="editable-display mt-5 text-[42px] font-bold leading-[1.12] sm:text-[52px]">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-[1.75] text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className={dc.button.primary}>Sign in <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className={dc.button.secondary}>Get started</Link>
              </div>
            </EditableReveal>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[var(--editable-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-6 py-[100px]">
          <div className="grid gap-8 rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 lg:grid-cols-[0.88fr_1.12fr] lg:p-10">
            <EditableReveal as="aside">
              <p className={dc.type.eyebrow}>{pagesContent.create.hero.badge}</p>
              <h1 className="editable-display mt-5 text-[42px] font-bold leading-[1.12] sm:text-[52px]">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-[1.75] text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-[20px] border p-4 text-left transition duration-300 hover:scale-[0.98] ${active ? 'border-[var(--slot4-dark-bg)] bg-[var(--slot4-dark-bg)] text-white' : 'border-[var(--editable-border)] bg-white text-[var(--slot4-page-text)]'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-3 block text-sm font-bold">{displayTaskLabel(item.key, item.label)}</span>
                      <span className="mt-1 block text-xs font-semibold opacity-65">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </EditableReveal>

            <EditableReveal index={1}>
              <form onSubmit={submit} className="rounded-[24px] border border-[var(--editable-border)] bg-white p-5 shadow-[0_8px_28px_rgba(20,20,43,0.10)] sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">Submit {activeTask ? displayTaskLabel(activeTask.key, activeTask.label) : 'entry'}</p>
                    <h2 className="editable-display mt-1 text-3xl font-bold">{pagesContent.create.formTitle}</h2>
                  </div>
                  <span className="rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-xs font-bold">{session.name}</span>
                </div>

                <div className="mt-6 grid gap-4">
                  <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Entry title" required />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                    <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                  </div>
                  <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                  <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                  <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
                </div>

                {created ? (
                  <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                    <p className="flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                    <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                  </div>
                ) : null}

                <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-6 text-sm font-bold text-white transition hover:scale-[0.98]">
                  <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
                </button>
              </form>
            </EditableReveal>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
