export function setToken(token: string): void {
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    
    const token = document.cookie.split("; ").find(row => row.startsWith("auth_token="))?.split("=")[1];
    
    return token || null;
}

export function removeToken(): void {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}