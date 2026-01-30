"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { usePathname } from "next/navigation";

type NavMenuProps = {
  size?: "sm" | "md" | "lg";
  variant?:"mobile"|"desktop"
};
const variantMap = {
  mobile: "flex flex-col gap-y-4 w-full text-white", 
  desktop: "flex flex-row gap-x-10 items-center"
};
export default function NavMenu({ size = "md" ,variant="desktop"}: NavMenuProps) {
  const pathname = usePathname(); 

  const sizeClass =
    size === "sm"
      ? "text-base"
      : size === "lg"
      ? "text-xl"
      : "text-lg";

  return (
    <nav className={`${variantMap[variant]} ${sizeClass} font-medium`}>
      <MenuItem href="/" active={pathname === "/"} color={variant==='mobile'? "text-white":""}>INICIO</MenuItem>

      <MenuItem href="/nosotros" active={pathname === "/nosotros"} color={variant==='mobile'? "text-white":""}>
        NOSOTROS
      </MenuItem>
      
      <MenuItem href="/productos" active={pathname.startsWith("/productos")} color={variant==='mobile'? "text-white":""}>
        PRODUCTOS
      </MenuItem>
      
      <MenuItem href="/blog" active={pathname.startsWith("/blog")} color={variant==='mobile'? "text-white":""}>
        BLOG
      </MenuItem>
      <MenuItem href="/contacto" active={pathname === "/contacto"} color={variant==='mobile'? "text-white":""}>
        CONTACTO
      </MenuItem>
    </nav>
  );
}
