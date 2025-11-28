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
    activeClassName = "font-extrabold",
    inactiveClassName = "hover:font-bold"
}: NavItemProps) {
    return (
        <li>
            <Link
                href={href}
                className={`px-4 ${isActive ? activeClassName : inactiveClassName}`}
            >
                {label}
            </Link>
        </li>
    );
}