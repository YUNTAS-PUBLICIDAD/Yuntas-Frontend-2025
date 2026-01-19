export function setToken(token: string): void {
    localStorage.setItem('auth_token', token);
}

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    
    return localStorage.getItem('auth_token');
}

export function removeToken(): void {
    localStorage.removeItem('auth_token');
}
