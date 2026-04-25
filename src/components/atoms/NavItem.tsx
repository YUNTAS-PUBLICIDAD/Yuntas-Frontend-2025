'use client';

import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface NavItemProps {
    label: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
    activeClassName?: string;
    inactiveClassName?: string;
}

export default function NavItem({
    label,
    href,
    icon: Icon,
    isActive,
}: NavItemProps) {
    return (
        <li className="relative px-4 "> 
            <Link
                href={href}
                className={`group relative flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all duration-200 ${
                    isActive
                        ? "bg-[#23C1DE]/15 text-[#0D1030] dark:bg-[#23C1DE]/20 dark:text-white ring-1 ring-[#23C1DE]/40 shadow-sm"
                        : "text-[#203565] dark:text-white/85 hover:bg-[#23C1DE]/10 dark:hover:bg-[#293296]/40"
                }`}
            >
                <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors shrink-0 ${
                        isActive
                            ? "bg-[#23C1DE]/25 text-[#0D1030] dark:bg-[#23C1DE]/25 dark:text-white"
                            : "bg-gray-100 text-[#4F5F86] dark:bg-white/10 dark:text-white/80"
                    }`}
                >
                    <Icon size={17} strokeWidth={2.1} />
                </span>
                <span className={`text-[15px] ${isActive ? "font-semibold" : "font-medium"}`}>
                    {label}
                </span>
            </Link>
            {isActive && (
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-[#23C1DE]" />
            )}
        </li>
    );
}