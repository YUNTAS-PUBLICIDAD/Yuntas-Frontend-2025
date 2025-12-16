'use client';

import { useState } from 'react';
import MenuItem from "@/components/atoms/MenuItem";
import { SlArrowDown } from "react-icons/sl";
import { usePathname } from "next/navigation";



const AdminMenuMobil = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    

    const adminItems = [
    { label: "DASHBOARD", href: "/admin" },
    { label: "SEGUIMIENTO", href: "/admin/seguimiento" },
    { label: "BLOGS", href: "/admin/blogs" },
    { label: "PRODUCTOS", href: "/admin/productos" },
    { label: "USUARIOS", href: "/admin/usuarios" },
    ];

    const isAdminActive = pathname.startsWith("/admin");

    

    return (
    <div className="">
        <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 w-full flex items-center gap-8 font-medium transition ${
            isAdminActive ? "text-blue-600 font-bold" : "text-white hover:text-blue-700"
        }`}
        >
        ADMI
        <SlArrowDown
            className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
        </button>

        {isOpen && (
        <div className="pl-2 sm:pl-3 py-1 space-1">
            {adminItems.map((item) => (
            <div key={item.href} className="py-1.5 sm:py-2">
                <MenuItem
        href={item.href}
            active={pathname === item.href}
        color="text-white"
                >
                <span className="font-sans text-white text-sm font-medium tracking-wide">
            {item.label}
            </span>
                </MenuItem>

            </div>
            ))}
        </div>
        )}
    </div>
    );
};

export default AdminMenuMobil;
