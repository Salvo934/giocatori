import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

export function VerificationStrip({ athlete }: Props) {
  return (
    <SectionShell
      id="verifiche"
      eyebrow="Affidabilità"
      title="Verifiche"
      description="Badge di coerenza dati: utili a procuratori e club per comunicare il livello di diligence sul profilo."
    >
      <div className="flex flex-wrap gap-3">
        {athlete.verifications.map((b) => (
          <div
            key={b.id}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              b.ok
                ? "bg-accent/15 text-accent ring-1 ring-accent/25"
                : "bg-white/5 text-zinc-500 line-through decoration-white/20"
            }`}
          >
            <span>{b.ok ? "✓" : "○"}</span>
            {b.label}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
