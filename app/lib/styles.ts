export const STYLES = {
  // Layouts
  container: "mx-auto max-w-6xl px-4 py-8 md:py-12 sm:px-6 lg:px-8",
  section: "space-y-6 mt-12 first:mt-0",
  
  // Typography
  h1: "text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 bg-clip-text text-transparent",
  h2: "text-2xl md:text-3xl font-bold tracking-tight text-slate-800",
  h3: "text-xl font-semibold text-slate-950",
  subtitle: "mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl",
  
  // Cards
  card: "relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300",
  cardHover: "hover:border-teal-100 hover:shadow-teal-100/40 hover:-translate-y-0.5",
  cardActive: "relative overflow-hidden rounded-2xl border-2 border-teal-500 bg-teal-50/20 p-6 shadow-md transition-all duration-300",
  
  // Buttons
  btnPrimary: "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:from-teal-500 hover:to-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-all duration-300 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
  btnSecondary: "inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition-all duration-300 cursor-pointer active:scale-[0.98]",
  btnDanger: "inline-flex items-center justify-center rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 ring-1 ring-inset ring-rose-100 hover:bg-rose-100 transition-all duration-300 cursor-pointer",
  
  // Forms & Inputs
  input: "block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all outline-none text-sm shadow-inner-sm",
  label: "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2",
  textarea: "block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all outline-none text-sm min-h-[120px] resize-y shadow-inner-sm",
  
  // Badges & Tag styles
  badgeTeal: "inline-flex items-center rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-600/10",
  badgeBlue: "inline-flex items-center rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 ring-1 ring-inset ring-sky-600/10",
  badgeGray: "inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-500/10",
  badgeOrange: "inline-flex items-center rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/10",
  
  // Grids
  grid3: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  grid2: "mt-8 grid gap-6 md:grid-cols-2",
};
