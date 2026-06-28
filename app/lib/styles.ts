export const STYLES = {
  container: "mx-auto w-full max-w-6xl px-6 md:px-8",
  page: "min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text)]",
  shadowStructure: "shadow-[6px_6px_0_var(--color-primary-dark)]",
  shadowAction: "shadow-[4px_4px_0_var(--color-primary)]",
  shadowCommunity: "shadow-[6px_6px_0_var(--color-community)]",
  shadowPedagogic: "shadow-[6px_6px_0_var(--color-sand-deep)]",
  section: "mt-12",
  sectionPlain: "mt-12 rounded-3xl bg-[color:var(--color-surface)] px-6 py-10 md:px-8 md:py-12",
  sectionAlt: "mt-12 rounded-3xl bg-[color:var(--color-background)] px-6 py-10 md:px-8 md:py-12",
  sectionWarm: "mt-12 rounded-3xl bg-[color:var(--color-sand)] px-6 py-10 md:px-8 md:py-12",
  h1: "font-[family-name:var(--font-display)] text-[40px] font-extrabold leading-[0.95] tracking-[-0.03em] text-[color:var(--color-primary-dark)] md:text-[56px] lg:text-[64px]",
  h2: "font-[family-name:var(--font-display)] text-[34px] font-bold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-primary-dark)] md:text-[40px]",
  h3: "font-[family-name:var(--font-display)] text-[22px] font-semibold leading-[1.15] text-[color:var(--color-primary-dark)] md:text-[24px]",
  body: "font-[family-name:var(--font-body)] text-[17px] leading-[1.8] tracking-[0.01em] text-[color:var(--color-text)] md:text-[18px]",
  subtitle: "font-[family-name:var(--font-body)] text-[15px] leading-[1.7] text-[color:var(--color-text-muted)] md:text-[16px]",
  card: "rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-[6px_6px_0_var(--color-primary-dark)]",
  cardSelected:
    "rounded-2xl border border-[color:var(--color-primary)] bg-[color:var(--color-surface)] p-6 shadow-[6px_6px_0_var(--color-primary-dark)]",
  cardLabel:
    "font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--color-text-muted)]",
  cardTitle:
    "mt-3 font-[family-name:var(--font-display)] text-[22px] font-semibold leading-tight text-[color:var(--color-primary-dark)]",
  cardBody:
    "mt-4 font-[family-name:var(--font-body)] text-[17px] leading-[1.7] text-[color:var(--color-text)]",
  buttonPrimary:
    "inline-flex items-center justify-center rounded-xl bg-[color:var(--color-primary)] px-6 py-3 font-[family-name:var(--font-display)] text-[16px] font-semibold text-white shadow-[4px_4px_0_var(--color-primary)] transition-colors duration-150 hover:bg-[color:var(--color-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2",
  buttonSecondary:
    "inline-flex items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-3 font-[family-name:var(--font-display)] text-[16px] font-semibold text-[color:var(--color-primary-dark)] transition-colors duration-150 hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2",
  input:
    "w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 font-[family-name:var(--font-body)] text-[17px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]",
  textarea:
    "w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 font-[family-name:var(--font-body)] text-[17px] leading-[1.7] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]",
  label:
    "font-[family-name:var(--font-display)] text-sm font-semibold text-[color:var(--color-primary-dark)]",
  badge:
    "inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-sand)] px-3 py-1 font-[family-name:var(--font-display)] text-xs font-semibold text-[color:var(--color-primary-dark)]",
  divider: "border-t border-[color:var(--color-border)]",
  navLink:
    "font-[family-name:var(--font-display)] text-[15px] font-semibold text-[color:var(--color-primary-dark)] transition-colors duration-150 hover:text-[color:var(--color-primary)]",
  communityCard:
    "rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-[6px_6px_0_var(--color-community)]",
  communityValue: "font-[family-name:var(--font-display)] text-[color:var(--color-community)]",
  communityValuePositive: "font-[family-name:var(--font-display)] text-[color:var(--color-community)]",
  segmented:
    "inline-flex rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-1",
  segment:
    "rounded-lg px-6 py-2.5 font-[family-name:var(--font-display)] text-[16px] font-semibold transition-colors duration-200",
  segmentActive:
    "bg-[color:var(--color-primary)] text-[color:var(--color-surface)] shadow-[2px_2px_0_var(--color-primary)]",
  segmentInactive:
    "bg-transparent text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-background)]",
  grid2: "grid gap-4 md:grid-cols-2",
  grid3: "grid gap-4 md:grid-cols-3",
} as const;
