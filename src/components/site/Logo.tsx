export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`grid size-9 place-items-center rounded-full ${inverted ? "bg-ink-foreground text-ink" : "bg-primary-gradient text-primary-foreground"}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 10c1.5 3.5 4 5 6 5s4.5-1.5 6-5" />
          <circle cx="9" cy="7" r="0.6" fill="currentColor" />
          <circle cx="15" cy="7" r="0.6" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-2xl leading-none">
        Sorriso <em className="italic">Vivo</em>
      </span>
    </span>
  );
}
