export function setPermissions(permissions: string[]): void {
    localStorage.setItem(
        "auth_permissions",
        JSON.stringify(permissions)
    );

    window.dispatchEvent(new Event("auth-change"));
}

export function getPermissions(): string[] {
    if (typeof window === "undefined") return [];

    const permissions = localStorage.getItem("auth_permissions");

    return permissions ? JSON.parse(permissions) : [];
}

export function removePermissions(): void {
    localStorage.removeItem("auth_permissions");
    window.dispatchEvent(new Event("auth-change"));
}

export function hasPermissions(permission: string): boolean {
    return getPermissions().includes(permission);
}