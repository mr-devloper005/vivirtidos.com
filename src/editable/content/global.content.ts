import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Directory and reference platform',
    primaryLinks: [
      { label: 'Articles', href: '/articles' },
      { label: 'Visuals', href: '/image-sharing' },
      { label: 'Local Directory', href: '/listing' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/' },
      secondary: { label: 'Submit', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Local records and reference guides',
    description: 'Explore records and guides.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/articles' },
          { label: 'Local Directory', href: '/listing' },
          { label: 'Images', href: '/image-sharing' },
          { label: 'Reference Library', href: '/pdf' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and connected publishing.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
