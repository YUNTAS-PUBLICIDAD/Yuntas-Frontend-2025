'use client';

import { usePathname } from "next/navigation";
import NavItem from "@/components/atoms/NavItem";

interface NavListItem {
    label: string;
    href: string;
}

interface NavListProps {
    items: NavListItem[];
    className?: string;
}

export default function NavList({ items, className = "" }: NavListProps) {
    const pathname = usePathname();

    return (
        <ul className={`flex flex-col gap-2 ${className}`}>
            {items.map((item) => (
                <NavItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    isActive={pathname === item.href}
                />
            ))}
        </ul>
    );
}