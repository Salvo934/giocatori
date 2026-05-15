import type { AthleteProfile } from "@/lib/types/athlete";
import { ShareProfileButton } from "./ShareActions";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

function QuickAction({
  href,
  label,
  sub,
  primary,
  external,
}: {
  href: string;
  label: string;
  sub?: string;
  primary?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group flex min-h-13 flex-1 flex-col items-center justify-center rounded-xl border px-4 py-3 text-center transition sm:min-h-0 sm:flex-row sm:gap-2 sm:py-3.5 ${
        primary
          ? "border-white bg-white text-black hover:bg-zinc-200"
          : "border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
      }`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={`text-sm font-bold ${primary ? "text-black" : "text-white"}`}>{label}</span>
      {sub ? (
        <span
          className={`mt-0.5 text-[10px] font-medium uppercase tracking-wider sm:mt-0 ${primary ? "text-zinc-600" : "text-zinc-500"}`}
        >
          {sub}
        </span>
      ) : null}
    </a>
  );
}

export function ContactsPanel({ athlete }: Props) {
  const c = athlete.contacts;
  const mail = c.representative.email ?? c.athleteEmail;
  const phoneClean = c.representative.phone?.replace(/\s/g, "") ?? "";
  const availabilitySubject = `Disponibilità ${athlete.header.name}`;
  const mailAvailability = mail
    ? `mailto:${mail}?subject=${encodeURIComponent(availabilitySubject)}`
    : "#contatti";

  return (
    <SectionShell
      id="contatti"
      eyebrow="Linee dirette"
      title="Contatti"
      description="Un solo punto per club, scouting e media: referente nominale, canali verificabili e azioni rapide senza passare dai social."
      headerActions={
        <>
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
            Canale ufficiale
          </span>
          {mail ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold text-zinc-400">
              Risposta dal referente
            </span>
          ) : null}
        </>
      }
    >
      <div className="space-y-5">
        {/* Azioni rapide */}
        <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/8 via-elevated to-black p-4 md:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Azioni rapide</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {mail ? (
              <QuickAction
                primary
                href={`mailto:${mail}?subject=${encodeURIComponent(`Richiesta su ${athlete.header.name}`)}`}
                label="Scrivi al referente"
                sub="Email diretta"
              />
            ) : null}
            {phoneClean ? (
              <QuickAction href={`tel:${phoneClean}`} label="Chiama" sub="Telefono" />
            ) : null}
            {c.whatsapp ? (
              <QuickAction href={c.whatsapp} label="WhatsApp" sub="Se autorizzato" external />
            ) : null}
            <div className="flex flex-1 sm:min-w-[140px]">
              <ShareProfileButton
                path={`/${athlete.slug}`}
                publicSiteUrl={athlete.seo.publicSiteUrl}
                className="flex h-full min-h-13 w-full items-center justify-center rounded-xl border border-accent/35 bg-accent/10 px-4 text-sm font-bold text-accent transition hover:bg-accent/20"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Referente — hero card */}
          <article className="relative overflow-hidden rounded-2xl border border-accent/25 bg-zinc-950/90 p-5 shadow-[inset_0_1px_0_0_rgba(223,255,74,0.08)] md:p-6 lg:col-span-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" aria-hidden />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Referente operativo</p>
            <h3 className="mt-1 text-xl font-bold text-white md:text-2xl">{c.representative.name}</h3>
            <p className="mt-1 text-sm text-accent/90">{c.representative.role}</p>

            <dl className="relative mt-6 space-y-3 text-sm">
              {phoneClean ? (
                <div className="flex flex-col gap-1 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Telefono</dt>
                  <dd>
                    <a href={`tel:${phoneClean}`} className="font-semibold text-white hover:text-accent">
                      {c.representative.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div className="flex flex-col gap-1 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Email</dt>
                <dd>
                  {mail ? (
                    <a href={`mailto:${mail}`} className="break-all font-semibold text-accent hover:underline">
                      {mail}
                    </a>
                  ) : (
                    <span className="text-zinc-500">Su richiesta</span>
                  )}
                </dd>
              </div>
            </dl>

            <div className="relative mt-6 flex flex-wrap gap-2">
              {mail ? (
                <a
                  href={`mailto:${mail}?subject=${encodeURIComponent(`Proposta / valutazione — ${athlete.header.name}`)}`}
                  className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-xs font-bold uppercase tracking-wide text-black hover:bg-accent/90"
                >
                  Proposta operativa
                </a>
              ) : null}
              <a
                href={mailAvailability}
                className="inline-flex h-10 items-center rounded-full border border-white/20 px-5 text-xs font-bold uppercase tracking-wide text-white hover:border-white/40"
              >
                Richiedi disponibilità
              </a>
            </div>
          </article>

          {/* Colonna servizi */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-elevated p-5 md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Struttura</p>
              <h4 className="mt-2 text-base font-bold text-white">{c.agency.name}</h4>
              {c.agency.website ? (
                <a
                  href={c.agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline"
                >
                  Sito →
                </a>
              ) : null}
            </div>

            <div className="rounded-2xl border border-white/10 bg-elevated p-5 md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Social giocatore</p>
              {c.social.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {c.social.map((s) => (
                    <li key={`${s.platform}-${s.handle}`}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 rounded-lg border border-white/6 bg-white/3 px-3 py-2 text-sm transition hover:border-white/15"
                      >
                        <span className="font-semibold text-white">{s.platform}</span>
                        <span className="truncate text-zinc-400">{s.handle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-zinc-500">Nessun profilo pubblico indicato.</p>
              )}
              {c.contactFormUrl ? (
                <a
                  href={c.contactFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white"
                >
                  Modulo richiesta →
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
