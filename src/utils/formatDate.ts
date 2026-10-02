// de formato ISO o cualquier formato a DD/MM/YYYY
export const formatDate = (dateString?: string | null): string => {
    if (!dateString || dateString === "-" || dateString === "Invalid Date") return "-";

    const trimmed = String(dateString).trim();

    // Si ya viene en formato DD/MM/YYYY o DD-MM-YYYY
    if (/^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/.test(trimmed)) {
        return trimmed.replace(/-/g, "/");
    }

    // Si viene en formato ISO o YYYY-MM-DD (ej: "2026-10-02T..." o "2026-10-02")
    if (trimmed.includes("-")) {
        const datePart = trimmed.split('T')[0].trim();
        const parts = datePart.split('-');
        if (parts.length === 3 && parts[0].length === 4) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
    }

    // Fallback con Date estándar
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
        const day = String(parsed.getDate()).padStart(2, "0");
        const month = String(parsed.getMonth() + 1).padStart(2, "0");
        const year = parsed.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return trimmed;
};