import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

export function HonorsPanel({ athlete }: Props) {
  const items = athlete.honors;
  const count = items.length;

  return (
    <SectionShell
      id="honors"
      eyebrow="Palmares"
      title="Convocazioni e premi"
      description="Riconoscimenti ufficiali, convocazioni e risultati in eventi che danno contesto alla traiettoria — utile a scouting e media."
      headerActions={
        <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {count} {count === 1 ? "voce" : "voci"} in archivio
        </span>
      }
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/6 via-transparent to-accent/5 p-1 sm:p-2">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(700px 280px at 0% 20%, rgba(223,255,74,0.08), transparent 50%), radial-gradient(600px 240px at 100% 80%, rgba(255,255,255,0.04), transparent 45%)",
          }}
          aria-hidden
        />

        <ol className="relative divide-y divide-white/8 px-3 py-2 sm:px-4 md:px-5">
          {items.map((h, i) => {
            const isLatest = i === 0;
            return (
              <li key={`${h.title}-${h.year ?? i}`} className="group py-4 first:pt-3 last:pb-4 md:py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-5">
                  <div
                    className={`flex shrink-0 flex-col items-center justify-center rounded-2xl px-4 py-3 sm:w-28 md:w-32 ${
                      isLatest
                        ? "border border-accent/40 bg-accent/15 text-accent shadow-[0_0_28px_-8px_rgba(223,255,74,0.4)]"
                        : "border border-white/10 bg-zinc-950/80 text-zinc-300"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Anno</span>
                    <span
                      className={`mt-1 text-2xl leading-none md:text-3xl ${isLatest ? "text-accent" : "text-white"}`}
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {h.year ?? "—"}
                    </span>
                    {isLatest ? (
                      <span className="mt-2 rounded-full bg-accent/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                        Latest
                      </span>
                    ) : null}
                  </div>

                  <div
                    className={`min-w-0 flex-1 rounded-2xl border p-4 transition md:p-5 ${
                      isLatest
                        ? "border-accent/25 bg-zinc-950/90 shadow-[inset_0_1px_0_0_rgba(223,255,74,0.1)]"
                        : "border-white/8 bg-elevated/80 group-hover:border-white/12"
                    }`}
                  >
                    <p className="text-base font-bold text-white md:text-lg">{h.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-[0.9375rem]">{h.detail}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}
