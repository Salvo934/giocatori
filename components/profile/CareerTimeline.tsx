import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

export function CareerTimeline({ athlete }: Props) {
  const steps = athlete.career;
  const count = steps.length;

  return (
    <SectionShell
      id="carriera"
      eyebrow="Percorso"
      title="Carriera club"
      description="Cronologia stagioni e contesti competitivi — utile a staff e scouting per collocare rapidamente esperienza e categoria."
      headerActions={
        <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {count} {count === 1 ? "stagione" : "stagioni"}
        </span>
      }
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#17408B]/10 p-1 sm:p-2">
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            background:
              "radial-gradient(640px 260px at 0% 0%, rgba(100,160,255,0.1), transparent 50%), radial-gradient(520px 220px at 100% 100%, rgba(223,255,74,0.06), transparent 45%)",
          }}
          aria-hidden
        />

        <ol className="relative space-y-0 divide-y divide-white/8 px-3 py-2 sm:px-4 md:px-5">
          {steps.map((step, i) => {
            const isLatest = i === 0;
            return (
              <li key={`${step.season}-${step.club}-${i}`} className="group py-4 first:pt-3 last:pb-4 md:py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-5">
                  <div
                    className={`flex shrink-0 flex-col justify-center rounded-2xl border px-4 py-3 sm:w-36 md:w-40 ${
                      isLatest
                        ? "border-accent/40 bg-accent/12 text-white shadow-[0_0_24px_-8px_rgba(223,255,74,0.35)]"
                        : "border-white/10 bg-zinc-950/85 text-zinc-300"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Stagione</span>
                    <p
                      className={`mt-1 text-lg font-bold leading-tight md:text-xl ${isLatest ? "text-accent" : "text-white"}`}
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {step.season}
                    </p>
                    {isLatest ? (
                      <span className="mt-2 w-fit rounded-full bg-accent/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                        Current
                      </span>
                    ) : null}
                  </div>

                  <div
                    className={`min-w-0 flex-1 rounded-2xl border p-4 transition md:p-5 ${
                      isLatest
                        ? "border-accent/20 bg-zinc-950/95 shadow-[inset_0_1px_0_0_rgba(223,255,74,0.08)]"
                        : "border-white/8 bg-elevated/80 group-hover:border-white/12"
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="text-base font-bold text-white md:text-lg">{step.club}</p>
                      <span className="rounded-full border border-white/12 bg-white/4 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        {step.category}
                      </span>
                    </div>
                    {step.notes ? (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-[0.9375rem]">{step.notes}</p>
                    ) : null}
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
