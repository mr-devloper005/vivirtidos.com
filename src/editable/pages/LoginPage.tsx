import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, LogIn } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-[var(--editable-container)] items-center gap-10 px-6 py-[100px] lg:grid-cols-[1fr_0.86fr]">
          <EditableReveal>
            <p className={dc.type.eyebrow}>{pagesContent.auth.login.badge}</p>
            <h1 className="editable-display mt-5 max-w-2xl text-[42px] font-bold leading-[1.12] sm:text-[52px]">{pagesContent.auth.login.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>
            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
              {['Saved details', 'Submission access', 'Simple account'].map((item) => (
                <div key={item} className="rounded-[20px] border border-[var(--editable-border)] bg-white p-5">
                  <CheckCircle2 className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-4 text-sm font-bold">{item}</p>
                </div>
              ))}
            </div>
          </EditableReveal>

          <EditableReveal index={1} className="rounded-[24px] border border-[var(--editable-border)] bg-white p-7 shadow-[0_8px_28px_rgba(20,20,43,0.10)] sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
              <LogIn className="h-6 w-6" />
            </div>
            <h2 className="editable-display mt-6 text-[32px] font-bold leading-tight">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              New here? <Link href="/signup" className="font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link>
            </p>
            <Link href="/search" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-page-text)]">
              Continue browsing <ArrowRight className="h-4 w-4" />
            </Link>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
