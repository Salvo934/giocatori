import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

export function CareerTimeline({ athlete }: Props) {
  const steps = athlete.career;

  return (
    <SectionShell id="carriera" eyebrow="Club" title="Percorso">
      <ol className="space-y-4">
        {steps.map((step, idx) => (
          <li
            key={`${step.season}-${step.club}-${idx}`}
            className="rounded-2xl border border-white/10 bg-black/35 p-4 md:p-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent">{step.season}</p>
            <p className="mt-2 text-xl font-bold text-white" style={{ fontFamily: "var(--font-bebas)" }}>
              {step.club}
            </p>
            <span className="mt-2 inline-block rounded-full border border-white/10 bg-white/4 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-400">
              {step.category}
            </span>
            {step.notes ? <p className="mt-3 text-sm text-zinc-400">{step.notes}</p> : null}
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
