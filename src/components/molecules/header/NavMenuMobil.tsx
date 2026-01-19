"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import AdminMenuMobil from "@/components/organisms/admin/AdminMenuMobil";


type NavMenuMobilProps = {
  size?: "sm" | "md" | "lg";
  variant?: "mobile" | "desktop"
};
const variantMap = {
  mobile: "flex flex-col gap-y-1 w-full text-white uppercase tracking-wider text-sm font-medium",
  desktop: "flex flex-row gap-x-10 items-center"
};
export default function NavMenuMobil({ size = "md", variant = "desktop" }: NavMenuMobilProps) {
  const pathname = usePathname();

  const sizeClass =
    size === "sm"
      ? "text-base"
      : size === "lg"
        ? "text-xl"
        : "text-lg";

  // Mobile variant: render vertical left divider and remove horizontal separators
  if (variant === 'mobile') {
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    const adminItems = [
      //{ label: "DASHBOARD", href: "/admin" },//comentado por ahora
      { label: "SEGUIMIENTO", href: "/admin/seguimiento" },
      { label: "BLOGS", href: "/admin/blogs" },
      { label: "PRODUCTOS", href: "/admin/productos" },
      { label: "USUARIOS", href: "/admin/usuarios" },
    ];

    return (
      <div className="relative w-full">
        {/* Vertical divider on the left */}
        <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" aria-hidden />

        <nav className={`${variantMap[variant]} ${sizeClass} pl-2`}>
          <MenuItem href="/" active={pathname === "/"} color="text-white">
            <span className="block py-0">INICIO</span>
          </MenuItem>

          <MenuItem href="/productos" active={pathname.startsWith("/productos")} color="text-white">
            <span className="block py-0">PRODUCTOS</span>
          </MenuItem>

          <MenuItem href="/nosotros" active={pathname === "/nosotros"} color="text-white">
            <span className="block py-0">NOSOTROS</span>
          </MenuItem>

          <MenuItem href="/blog" active={pathname.startsWith("/blog")} color="text-white">
            <span className="block py-0">BLOG</span>
          </MenuItem>

          <MenuItem href="/contacto" active={pathname === "/contacto"} color="text-white">
            <span className="block py-0">CONTACTO</span>
          </MenuItem>

          <AdminMenuMobil isOpen={isAdminOpen} onToggle={() => setIsAdminOpen(!isAdminOpen)} />
        </nav>

        {/* Admin submenu rendered in-flow */}
        {isAdminOpen && (
          <div className="pl-12 mt-1 space-y-0">
            {adminItems.map((item) => (
              <div key={item.href} className="py-1">
                <MenuItem
                  href={item.href}
                  active={pathname === item.href}
                  color="text-white"
                >
                  <span className="text-xs font-medium tracking-wide text-white uppercase">
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

  return (
    <nav className={`${variantMap[variant]} ${sizeClass} `}>
      <div className="w-full px-4">
        <MenuItem href="/" active={pathname === "/"}>INICIO</MenuItem>
      </div>
      <div className="w-full px-4 ">
        <MenuItem href="/productos" active={pathname.startsWith("/productos")}>
          PRODUCTOS
        </MenuItem>
      </div>
      <div className="w-full px-4">
        <MenuItem href="/nosotros" active={pathname === "/nosotros"}>
          NOSOTROS
        </MenuItem>
      </div >
      <div className="w-full px-4">
        <MenuItem href="/blog" active={pathname.startsWith("/blog")}>
          BLOG
        </MenuItem>
      </div>
      <div className="w-full px-4">
        <MenuItem href="/contacto" active={pathname === "/contacto"}>
          CONTACTO
        </MenuItem>
      </div>

      <div className="w-full px-4">
        <AdminMenuMobil />
      </div>
    </nav>
  );
}