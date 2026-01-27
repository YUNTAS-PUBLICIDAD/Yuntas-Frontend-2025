export function setRole(role: string): void {
    localStorage.setItem('auth_role', role);
}

export function getRole(): string | null {
    if (typeof window === "undefined") return null;
    
    return localStorage.getItem('auth_role');
}

export function removeRole(): void {
    localStorage.removeItem('auth_role');
}
