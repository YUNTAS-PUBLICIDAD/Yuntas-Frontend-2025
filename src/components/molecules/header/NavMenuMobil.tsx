"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import AdminMenuMobil from "@/components/organisms/admin/AdminMenuMobil";
import { useAdmin } from "@/hooks/useAdmin";
import { getAdminItems, NAV_ITEMS } from "@/data/header/navItems";

export default function NavMenuMobil({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const isAdmin = useAdmin();
  const [adminOpen, setAdminOpen] = useState(false);

  // Cierre automático
  useEffect(() => {
    onClose?.();
  }, [pathname]);

  // Para nav principal
  const isActive = (pathName: string, href: string) => {
    if (href === "/") return pathName === "/";
    return pathName === href || pathName.startsWith(href + "/");
  };


  const isAdminItemActive = (pathName: string, href: string) => {
  const clean = pathName.replace(/\/$/, "");
  return clean === href;
};

  return (
    <div className="relative w-full">
      <span
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#04061a] dark:bg-white"
        aria-hidden
      />

      <nav className="flex flex-col gap-y-1 pl-3 text-sm font-medium uppercase tracking-wider text-[#04061a] dark:text-white">
        {NAV_ITEMS.map((item) => (
          <MenuItem
            key={item.href}
            href={item.href}
            active={isActive(pathname, item.href)}
            baseColor="text-[#04061a] dark:text-white"
            activeColor="text-black dark:text-white"
          >
            <span className="font-bold">{item.label}</span>
          </MenuItem>
        ))}
          {/*ADMIN*/}
        {isAdmin && (
          <AdminMenuMobil
            isOpen={adminOpen}
            onToggle={() => setAdminOpen((prev) => !prev)}
          />
        )}
      </nav>

        {/* Submenu admin */}
      {isAdmin && adminOpen && (
        <div className="pl-12 mt-2 space-y-1">
          {getAdminItems().map((item) => (
            <div key={item.href} className="py-1">
              <MenuItem
                href={item.href}
                active={isAdminItemActive(pathname, item.href)} 
                baseColor="text-[#04061a] dark:text-white"
                activeColor="text-black dark:text-white"
              >
                <span className="text-xs font-bold tracking-wide">
                  {item.label}
                </span>
              </MenuItem>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
