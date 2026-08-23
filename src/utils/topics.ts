// Cycles posts through three brand-derived "topic" tones by hashing a tag,
// so the grid reads as color-coded without a dedicated content field.
export function topicIndex(tag?: string): number {
  if (!tag) return 1;
  let sum = 0;
  for (const ch of tag) sum += ch.charCodeAt(0);
  return sum % 3;
}

export const TOPIC_ICON = ['nodes', 'terminal', 'layers'] as const;

export const ICON_PATHS: Record<(typeof TOPIC_ICON)[number], string> = {
  nodes: '<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M8 6.6h8M7.4 8L11 16M16.6 8L13 16"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
};

// Solid cover-block backgrounds (see --color-cover-1/2/3 in global.css).
export const TOPIC_COVER_BG = ['bg-cover-1', 'bg-cover-2', 'bg-cover-3'];

// Cover 3 (silver) is light, so its icon needs a dark stroke; the other two get a light one.
export const TOPIC_ICON_COLOR = ['text-text-dark', 'text-text-dark', 'text-background-dark'];

// Text-only accent per topic, tuned for contrast in both light and dark mode.
export const TOPIC_TEXT = [
  'text-secondary dark:text-primary',
  'text-[#33353f] dark:text-[#9a9cad]',
  'text-muted-light dark:text-muted-dark',
];

// Tinted chip background to pair with TOPIC_TEXT.
export const TOPIC_CHIP_BG = [
  'bg-secondary/10 dark:bg-primary/15',
  'bg-[#33353f]/10 dark:bg-[#9a9cad]/15',
  'bg-muted-light/10 dark:bg-muted-dark/15',
];
