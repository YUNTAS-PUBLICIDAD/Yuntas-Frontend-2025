export function normalizeToEmbedUrl(rawUrl?: string | null): string {
    if (!rawUrl) return "";
    let url = rawUrl.trim();

    // 0. Seguridad: Si no es de Google Maps ni un iframe, descartar
    const isGoogleMaps =
        url.includes("google.com/maps") ||
        url.includes("maps.google.com") ||
        url.includes("maps.app.goo.gl") ||
        url.includes("goo.gl/maps") ||
        url.includes("<iframe");

    if (!isGoogleMaps) return "";

    // 1. Si pegaron el iframe completo
    if (url.includes("<iframe") && url.includes("src=")) {
        const match = url.match(/src="([^"]+)"/);
        if (match?.[1]) url = match[1];
    }

    // 2. Si ya es embed directo
    if (url.includes("/embed") || url.includes("output=embed")) {
        return url;
    }

    // 3. Normalizar lugares (/place/)
    if (url.includes("/place/")) {
        const match = url.match(/\/place\/([^\/]+)/);
        if (match?.[1]) return `https://www.google.com/maps?q=${match[1]}&output=embed`;
    }

    // 4. Normalizar coordenadas (@lat,lng)
    const coordsMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordsMatch?.[1] && coordsMatch?.[2]) {
        return `https://www.google.com/maps?q=${coordsMatch[1]},${coordsMatch[2]}&output=embed`;
    }

    // 5. Si tiene identificador cid (Customer ID de Google Maps)
    if (url.includes("cid=")) {
        const match = url.match(/[?&]cid=([^&]+)/);
        if (match?.[1]) {
            return `https://maps.google.com/maps?cid=${match[1]}&output=embed`;
        }
    }

    // 6. Normalizar parámetro q=
    try {
        const urlObj = new URL(url);
        const q = urlObj.searchParams.get("q");
        if (q) return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    } catch { }

    // 7. Filtro final: Si no se pudo transformar a embed válido, descartar
    if (!url.includes("/embed") && !url.includes("output=embed")) {
        return "";
    }

    return url;
}
