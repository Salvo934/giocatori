import type { AthleteProfile } from "@/lib/types/athlete";

type Props = { athlete: AthleteProfile };

export function VerificationStrip({ athlete }: Props) {
  const badges = athlete.verifications;

  return (
    <div className="border-b border-white/6 bg-black/35 py-6 md:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-600">Verification</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                b.ok
                  ? "border-accent/35 bg-accent/10 text-accent"
                  : "border-white/12 bg-white/4 text-zinc-500"
              }`}
            >
              <span className={`size-1.5 shrink-0 rounded-full ${b.ok ? "bg-accent" : "bg-zinc-600"}`} aria-hidden />
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
