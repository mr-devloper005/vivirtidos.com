'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

const staticLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const authLinks = session
    ? [{ label: 'Submit', href: '/create', icon: PlusCircle }]
    : [
        { label: 'Sign in', href: '/login', icon: LogIn },
        { label: 'Get started', href: '/signup', icon: UserPlus },
      ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/95 text-[var(--editable-nav-text)] backdrop-blur-md">
      <nav className="mx-auto flex min-h-[92px] w-full max-w-[var(--editable-container)] items-center gap-6 px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-white shadow-[0_2px_7px_rgba(20,20,43,0.06)] transition duration-300 group-hover:scale-[0.98]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="editable-display block max-w-[220px] truncate text-[22px] font-bold leading-none">{SITE_CONFIG.name}</span>
            <span className="mt-1 hidden max-w-[220px] truncate text-xs font-medium text-[var(--slot4-muted-text)] sm:block">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {staticLinks.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={`${dc.button.ghost} ${active ? 'text-[var(--slot4-page-text)]' : ''}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/search" aria-label="Search" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] bg-white text-[var(--slot4-muted-text)] shadow-[0_2px_7px_rgba(20,20,43,0.06)] transition duration-300 hover:scale-[0.98] hover:text-[var(--slot4-page-text)]">
            <Search className="h-5 w-5" />
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            {authLinks.map((item, index) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className={index === authLinks.length - 1 ? dc.button.primary : dc.button.secondary}>
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={logout} className={dc.button.secondary}>
                Logout
              </button>
            ) : null}
          </div>

          <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] bg-white lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-6 py-5 lg:hidden">
          <div className="grid gap-2">
            {[...staticLinks, { label: 'Search', href: '/search' }, ...authLinks].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-full px-4 py-3 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-full px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
