export const STYLES = {
  container: "mx-auto w-full max-w-6xl px-6 md:px-8",
  page: "min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text)]",
  section: "mt-12",
  sectionPlain: "mt-12 rounded-2xl bg-[color:var(--color-surface)] px-6 py-8 md:px-8 md:py-10",
  sectionAlt: "mt-12 rounded-2xl bg-[color:var(--color-background-alt)] px-6 py-8 md:px-8 md:py-10",
  sectionWarm: "mt-12 rounded-2xl bg-[color:var(--color-background-warm)] px-6 py-8 md:px-8 md:py-10",
  h1: "text-4xl font-semibold leading-tight tracking-tight text-[color:var(--color-primary-dark)] md:text-5xl",
  h2: "text-2xl font-semibold leading-snug text-[color:var(--color-primary-dark)] md:text-3xl",
  h3: "text-xl font-semibold leading-snug text-[color:var(--color-primary-dark)] md:text-2xl",
  body: "text-base leading-8 text-[color:var(--color-text)]",
  subtitle: "text-lg leading-8 text-[color:var(--color-text-muted)]",
  card: "rounded-xl border border-[color:var(--color-border)] border-t-[color:var(--color-primary)] bg-[color:var(--color-surface)] p-6",
  cardSelected:
    "rounded-xl border border-[color:var(--color-primary)] border-t-[color:var(--color-primary)] bg-[color:var(--color-surface)] p-6",
  cardLabel:
    "text-xs font-medium uppercase tracking-wide text-[color:var(--color-text-muted)]",
  cardTitle:
    "mt-3 text-lg font-semibold leading-snug text-[color:var(--color-primary-dark)]",
  cardBody:
    "mt-4 text-base leading-7 text-[color:var(--color-text)]",
  buttonPrimary:
    "inline-flex items-center justify-center rounded-lg border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-5 py-3 text-sm font-medium text-[color:var(--color-surface)] transition-colors duration-150 hover:bg-[color:var(--color-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2",
  buttonSecondary:
    "inline-flex items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-3 text-sm font-medium text-[color:var(--color-text)] transition-colors duration-150 hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2",
  input:
    "w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 text-base text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]",
  textarea:
    "w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 text-base leading-7 text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]",
  label:
    "text-sm font-medium text-[color:var(--color-text)]",
  badge:
    "inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-medium text-[color:var(--color-primary-dark)]",
  divider: "border-t border-[color:var(--color-border)]",
  navLink:
    "text-[color:var(--color-primary-dark)] transition-colors duration-150 hover:text-[color:var(--color-primary)]",
  communityCard:
    "rounded-xl border border-[color:var(--color-border)] border-t-[color:var(--color-primary)] bg-[color:var(--color-surface)] p-6",
  communityValue: "text-[color:var(--color-community)]",
  communityValuePositive: "text-[color:var(--color-community)]",
  segmented:
    "inline-flex rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-1",
  segment:
    "rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200",
  segmentActive:
    "bg-[color:var(--color-primary)] text-[color:var(--color-surface)] font-semibold shadow-sm",
  segmentInactive:
    "bg-transparent text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-background)]",
  grid2: "grid gap-4 md:grid-cols-2",
  grid3: "grid gap-4 md:grid-cols-3",
} as const;
