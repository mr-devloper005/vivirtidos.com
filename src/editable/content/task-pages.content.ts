import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reading desk',
    headline: 'Long-form articles with a calm editorial rhythm.',
    description: 'Use this page for essays, guides, explainers, and story-led entries with enough space to read comfortably.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Reading surfaces need space, hierarchy, and fewer distractions.',
    chips: ['Editorial pacing', 'Topic filters', 'Long-read friendly'],
  },
  classified: {
    eyebrow: 'Notice board',
    headline: 'Fast-moving offers and time-sensitive posts.',
    description: 'Scan practical opportunities, short summaries, and action-ready details without losing the calm page rhythm.',
    filterLabel: 'Filter notice category',
    secondaryNote: 'Prioritize urgency, short summaries, and direct browsing.',
    chips: ['Fast scan', 'Offers', 'Action cues'],
  },
  sbm: {
    eyebrow: 'Saved resources',
    headline: 'Bookmarks arranged like curated collections.',
    description: 'Useful resources, tools, references, and collections are grouped for quick return visits.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Curated resources need grouping and calm metadata.',
    chips: ['Collections', 'Resources', 'Reference flow'],
  },
  profile: {
    eyebrow: 'People and profiles',
    headline: 'Profiles with identity, trust, and reputation cues.',
    description: 'People, brands, and entities feel discoverable rather than buried in a generic feed.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Make identity and credibility visible before the grid begins.',
    chips: ['Identity first', 'Trust cues', 'Profile cards'],
  },
  pdf: {
    eyebrow: 'Reference Library',
    headline: 'Reference Library guides presented as a useful download shelf.',
    description: 'Browse practical guides, reports, checklists, and reference material with clear file context.',
    filterLabel: 'Filter reference type',
    secondaryNote: 'Reference surfaces need archive cues, file context, and clear browsing.',
    chips: ['Guides', 'Reports', 'Download ready'],
  },
  listing: {
    eyebrow: 'Local Directory',
    headline: 'Local Directory records built for discovery and comparison.',
    description: 'Find practical local records with trust cues, location context, and direct action paths.',
    filterLabel: 'Filter local category',
    secondaryNote: 'Prioritize comparison, location, and direct action paths.',
    chips: ['Directory', 'Compare', 'Local discovery'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Image posts with a gallery-first browsing experience.',
    description: 'Image pages lead with visual impact, stronger cards, and a portfolio-like rhythm.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let images carry the page before long text does.',
    chips: ['Gallery', 'Visual-first', 'Portfolio mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
