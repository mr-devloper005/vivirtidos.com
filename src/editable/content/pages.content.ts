import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Local Directory and Reference Library',
      description: 'Explore local records, reference guides, articles, images, and curated posts through a polished discovery experience.',
      openGraphTitle: 'Local Directory and Reference Library',
      openGraphDescription: 'Find useful local records and downloadable guides through a calmer discovery experience.',
      keywords: ['local directory', 'reference library', 'guide downloads', 'content discovery'],
    },
    hero: {
      badge: 'Local Directory + Reference Library',
      title: ['Useful local records,', 'guides, and reports in one place.'],
      description: 'Browse practical local entries, downloadable reference guides, and supporting articles through a polished, easy-scanning library.',
      primaryCta: { label: 'Explore directory', href: '/listing' },
      secondaryCta: { label: 'Browse guides', href: '/pdf' },
      searchPlaceholder: 'Search local records, guides, reports, and topics',
      focusLabel: 'Focus',
      featureCardBadge: 'latest rotation',
      featureCardTitle: 'Fresh entries shape the homepage as they publish.',
      featureCardDescription: 'Recent images, guides, and local records stay at the center without changing platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and connecting useful local context.',
      paragraphs: [
        'This site brings together local discovery, reference material, article-style reading, and visual browsing so visitors can move naturally between useful content types.',
        'Instead of separating records, guides, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place.',
        'Whether someone starts with a local entry, an image-led post, an article, or a guide, they can keep discovering related context without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on useful entries and imagery.',
        'Connected sections for articles, visuals, local records, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore local records, guides, and resources through one connected experience.',
      description: 'Move between articles, image-led posts, local records, and reference guides through one clearer visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest entries in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer place to explore useful information.',
    description: `${slot4BrandConfig.siteName} helps people browse, read, compare, and return to useful content without unnecessary noise.`,
    paragraphs: [
      'The experience is organized around clarity: strong page hierarchy, clean browsing paths, and enough context for visitors to understand what they are looking at.',
      'Every section is designed to feel connected, so people can move from a quick overview into deeper reading or action without losing their place.',
      'The goal is simple: make useful information easier to find, easier to trust, and easier to revisit.',
    ],
    values: [
      {
        title: 'Clarity first',
        description: 'Pages are structured for scanning, reading, and confident decisions instead of visual clutter.',
      },
      {
        title: 'Connected paths',
        description: 'Related information stays close at hand, helping visitors move naturally from one useful entry to the next.',
      },
      {
        title: 'Trustworthy rhythm',
        description: 'Consistent patterns, readable details, and practical calls to action make the site feel dependable.',
      },
    ],
    stats: [
      { value: '01', label: 'Focused browsing' },
      { value: '02', label: 'Readable context' },
      { value: '03', label: 'Simple actions' },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Send the right note to the right place.',
    description: 'Share what you are trying to publish, correct, request, or clarify. The message stays focused so the next step is easier.',
    formTitle: 'Send a message',
    lanes: [
      { title: 'Publishing requests', body: 'Send new material, updates, corrections, or context that should be reviewed.' },
      { title: 'Partnership notes', body: 'Ask about collaborations, coverage, attribution, or ongoing publishing needs.' },
      { title: 'Support questions', body: 'Flag anything that needs attention, from account access to content details.' },
    ],
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search local records, guides, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find local records, guides, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover entries from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable entries',
  },
  create: {
    metadata: {
      title: 'Submit',
      description: 'Submit useful entries for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Sign in to open the submission workspace.',
      description: 'Your account keeps drafts, contact details, and submitted entries tied to one clean workspace.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Prepare a polished entry with the details visitors need.',
      description: 'Choose the section, add the essentials, and save a clean submission with links, images, summary, and body content.',
    },
    formTitle: 'Entry details',
    submitLabel: 'Submit entry',
    successTitle: 'Entry submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign-in page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your workspace.',
      description: 'Sign in to continue preparing submissions, checking saved details, and moving through the site with your account.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in successfully. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Account creation page for this site.',
      badge: 'Site access',
      title: 'Create an account for a cleaner workflow.',
      description: 'Use your account to keep submissions and profile details organized as the site grows.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related local records',
      fallbackTitle: 'Local record details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
