'use client';

import { usePathname } from "next/navigation";
import NavItem from "@/components/atoms/NavItem";
import { type LucideIcon } from "lucide-react";

interface NavListItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface NavListProps {
    items: NavListItem[];
    className?: string;
}

export default function NavList({ items, className = "" }: NavListProps) {
    const pathname = usePathname().replace(/\/+$/, "");

    const isActive = (href: string) => {
        const cleanHref = href.replace(/\/+$/, "");

        if (cleanHref === "/admin") return pathname === "/admin";
        return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
    };

    return (
        <ul className={`flex flex-col gap-1 ${className}`}>
            {items.map((item) => (
                <NavItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    isActive={isActive(item.href)}
                />
            ))}
        </ul>
    );
}