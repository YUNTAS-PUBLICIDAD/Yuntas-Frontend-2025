'use client';

import Link from "next/link";

interface NavItemProps {
    label: string;
    href: string;
    isActive: boolean;
    activeClassName?: string;
    inactiveClassName?: string;
}

export default function NavItem({
    label,
    href,
    isActive,
}: NavItemProps) {
    return (
        <li className="relative">
            <Link
                href={href}
                className={`block px-4 transition-all ${isActive
                        ? "font-semibold text-[#23C1DE]"
                        : "hover:text-[#203565] hover:font-medium"
                    }`}
            >
                {label}
            </Link>
            {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#23C1DE] rounded-r-full" />
            )}
        </li>
    );
}