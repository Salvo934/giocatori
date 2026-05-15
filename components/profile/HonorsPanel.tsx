import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

export function HonorsPanel({ athlete }: Props) {
  const items = athlete.honors;

  return (
    <SectionShell id="titoli" eyebrow="Palmares" title="Titoli">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((it, idx) => (
          <li key={`${it.title}-${idx}`} className="rounded-2xl border border-white/8 bg-black/35 p-4">
            {it.year ? (
              <p className="text-[10px] font-bold uppercase tracking-wider text-accent">{it.year}</p>
            ) : null}
            <p className="mt-2 text-lg font-bold text-white">{it.title}</p>
            <p className="mt-2 text-sm text-zinc-400">{it.detail}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
