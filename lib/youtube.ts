/**
 * Restituisce l'URL base dell'embed YouTube (privacy-enhanced) se il link è riconosciuto,
 * altrimenti stringa vuota. L'iframe può aggiungere query (es. ?rel=0).
 */
export function youtubeEmbedUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";

  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();

    let id: string | null = null;

    if (host === "youtu.be") {
      id = u.pathname.replace(/^\//, "").split("/")[0] ?? null;
    } else if (host === "youtube.com" || host === "m.youtube.com" || host === "www.youtube.com") {
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

    if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) {
      return "";
    }

    return `https://www.youtube-nocookie.com/embed/${id}`;
  } catch {
    return "";
  }
}
