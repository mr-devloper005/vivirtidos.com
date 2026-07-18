'use client'

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

type EditableRevealProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  index?: number
}

export function EditableReveal({ as = 'div', children, className = '', index = 0 }: EditableRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const Tag = as as ElementType

  useEffect(() => {
    setMounted(true)
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const style = mounted ? ({ transitionDelay: `${Math.min(index, 10) * 70}ms` } as CSSProperties) : undefined

  return (
    <Tag ref={ref as never} style={style} className={`editable-reveal ${mounted ? 'editable-reveal-mounted' : ''} ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  )
}
