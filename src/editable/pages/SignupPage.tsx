import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, UserPlus } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Get started', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-[var(--editable-container)] items-center gap-10 px-6 py-[100px] lg:grid-cols-[0.9fr_1fr]">
          <EditableReveal className="rounded-[24px] border border-[var(--editable-border)] bg-white p-7 shadow-[0_8px_28px_rgba(20,20,43,0.10)] sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
              <UserPlus className="h-6 w-6" />
            </div>
            <h1 className="editable-display mt-6 text-[32px] font-bold leading-tight">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              Already have an account? <Link href="/login" className="font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link>
            </p>
          </EditableReveal>

          <EditableReveal index={1}>
            <p className={dc.type.eyebrow}>{pagesContent.auth.signup.badge}</p>
            <h2 className="editable-display mt-5 max-w-2xl text-[42px] font-bold leading-[1.12] sm:text-[52px]">{pagesContent.auth.signup.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-[var(--slot4-muted-text)]">{pagesContent.auth.signup.description}</p>
            <div className="mt-10 rounded-[24px] bg-[var(--slot4-dark-bg)] p-8 text-white">
              <h3 className="editable-display text-2xl font-bold">What your account unlocks</h3>
              <div className="mt-6 grid gap-4">
                {['A cleaner submission workflow', 'Saved identity details', 'A faster return path'].map((item) => (
                  <p key={item} className="flex items-center gap-3 text-sm font-semibold text-white/75">
                    <CheckCircle2 className="h-4 w-4 text-[var(--slot4-accent)]" /> {item}
                  </p>
                ))}
              </div>
            </div>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
