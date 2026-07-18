'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

const displayTaskLabel = (key: string, label: string) => {
  if (key === 'listing') return 'Local Directory'
  if (key === 'pdf') return 'Reference Library'
  return label
}

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[var(--editable-border)] bg-white text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-6 py-16">
        <div className="grid gap-6 rounded-[24px] bg-[var(--slot4-dark-bg)] p-8 text-white md:grid-cols-[1fr_auto] md:items-center lg:p-12">
          <div>
            <p className="text-sm font-semibold text-white/65">Ready to share a resource?</p>
            <h2 className="editable-display mt-2 text-[32px] font-bold leading-tight">Add a useful local record or reference guide.</h2>
          </div>
          <Link href="/create" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[var(--slot4-dark-bg)] transition duration-300 hover:scale-[0.98]">
            Submit <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-white shadow-[0_2px_7px_rgba(20,20,43,0.06)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
              </span>
              <span className="editable-display text-[22px] font-bold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
            
          </div>

          <FooterColumn title="Directory" links={taskLinks.map((task) => ({ label: displayTaskLabel(task.key, task.label), href: task.route }))} />
          <FooterColumn title="Resources" links={[{ label: 'Search', href: '/search' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]} />
          <FooterColumn title="Account" links={session ? [{ label: 'Submit', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Get started', href: '/signup' }]} />
          <div>
            <h3 className="text-sm font-bold text-[var(--slot4-page-text)]">Status</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">Fresh directory records and reference guides are indexed as they publish.</p>
            {session ? <button type="button" onClick={logout} className={`${dc.button.secondary} mt-5 py-3`}>Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-6 py-6 text-center text-sm text-[var(--slot4-muted-text)]">
        Copyright © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-[var(--slot4-page-text)]">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <Link key={`${link.href}-${link.label}`} href={link.href} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
            {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        ))}
      </div>
    </div>
  )
}
