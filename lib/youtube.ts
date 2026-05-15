/**
 * Risolve l'ID video da URL YouTube (watch, youtu.be, shorts, embed, /v/).
 */
export function youtubeVideoId(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();

    let id: string | null = null;

    if (host === "youtu.be") {
      id = u.pathname.replace(/^\//, "").split("/")[0] ?? null;
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      const path = u.pathname;
      if (path === "/watch" || path.startsWith("/watch/")) {
        id = u.searchParams.get("v");
      } else if (path.startsWith("/embed/")) {
        id = path.slice("/embed/".length).split("/")[0] ?? null;
      } else if (path.startsWith("/shorts/")) {
        id = path.slice("/shorts/".length).split("/")[0] ?? null;
      } else if (path.startsWith("/v/")) {
        id = path.slice("/v/".length).split("/")[0] ?? null;
      }
    }

    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

/**
 * Cover di anteprima (Media Quality) da URL YouTube, se riconosciuto.
 */
export function youtubeThumbnailUrl(rawUrl: string): string | null {
  const id = youtubeVideoId(rawUrl);
  return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : null;
}

/**
 * Restituisce l'URL base dell'embed YouTube (privacy-enhanced) se il link è riconosciuto,
 * altrimenti stringa vuota. L'iframe può aggiungere query (es. ?rel=0).
 */
export function youtubeEmbedUrl(rawUrl: string): string {
  const id = youtubeVideoId(rawUrl);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : "";
}
