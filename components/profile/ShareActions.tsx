"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { resolveShareableProfileUrl } from "@/lib/public-site";

type Props = {
  path: string;
  whatsappUrl?: string;
  publicSiteUrl?: string | null;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ShareProfileButton({
  path,
  className = "",
  publicSiteUrl,
}: {
  path: string;
  className?: string;
  publicSiteUrl?: string | null;
}) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fullUrl = useCallback(() => resolveShareableProfileUrl(path, publicSiteUrl), [path, publicSiteUrl]);

  const onShare = async () => {
    const url = fullUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: "Player Card", text: "Profilo atleta", url });
      } catch {
        /* dismissed */
      }
      return;
    }
    if (!navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(url);
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopied(true);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={onShare}
      className={
        className ||
        `inline-flex h-10 items-center justify-center rounded-full border border-accent/50 bg-accent/12 px-5 text-sm font-semibold text-accent shadow-[0_0_28px_-8px_var(--accent-glow)] transition hover:border-accent/65 hover:bg-accent/18 ${focusRing}`
      }
    >
      {copied ? "Link copiato" : "Condividi profilo"}
    </button>
  );
}

export function ShareActions({ path, whatsappUrl, publicSiteUrl }: Props) {
  const [shareCopied, setShareCopied] = useState(false);
  const [copyCopied, setCopyCopied] = useState(false);
  const shareTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const shareUrl = useCallback(() => resolveShareableProfileUrl(path, publicSiteUrl), [path, publicSiteUrl]);

  const onShare = async () => {
    const url = shareUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Player Card",
          text: "Profilo atleta",
          url,
        });
      } catch {
        /* dismissed */
      }
      return;
    }
    if (!navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(url);
    if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
    setShareCopied(true);
    shareTimerRef.current = setTimeout(() => setShareCopied(false), 2000);
  };

  const onCopy = async () => {
    const url = shareUrl();
    if (!navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(url);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    setCopyCopied(true);
    copyTimerRef.current = setTimeout(() => setCopyCopied(false), 2000);
  };

  const btnPrimary =
    `inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black shadow-[0_4px_24px_-4px_rgba(255,255,255,0.35)] transition hover:bg-zinc-100 hover:shadow-[0_6px_28px_-4px_rgba(255,255,255,0.4)] ${focusRing}`;

  const btnGhost =
    `inline-flex h-10 items-center justify-center rounded-full border border-white/22 bg-white/6 px-5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition hover:border-white/35 hover:bg-white/10 ${focusRing}`;

  const btnShare =
    `inline-flex h-10 items-center justify-center rounded-full border border-accent/50 bg-accent/12 px-5 text-sm font-semibold text-accent shadow-[0_0_28px_-8px_var(--accent-glow)] transition hover:border-accent/65 hover:bg-accent/18 ${focusRing}`;

  const btnCopy =
    `inline-flex h-10 items-center justify-center rounded-full border border-white/10 px-4 text-xs font-medium text-zinc-400 transition hover:text-white ${focusRing}`;

  return (
    <div className="flex flex-wrap gap-2">
      <a href="#video" className={btnPrimary}>
        Guarda highlights
      </a>
      <a href="#contatti" className={btnGhost}>
        Contatta procuratore
      </a>
      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-10 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/12 px-5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20 ${focusRing}`}
        >
          WhatsApp
        </a>
      ) : null}
      <button type="button" onClick={onShare} className={btnShare}>
        {shareCopied ? "Link copiato" : "Condividi profilo"}
      </button>
      <button type="button" onClick={onCopy} className={btnCopy}>
        {copyCopied ? "Link copiato" : "Copia link"}
      </button>
    </div>
  );
}
