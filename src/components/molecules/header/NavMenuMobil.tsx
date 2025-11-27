"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { usePathname } from "next/navigation";

type NavMenuMobilProps = {
  size?: "sm" | "md" | "lg";
  variant?:"mobile"|"desktop"
};
const variantMap = {
  mobile: "flex flex-col gap-y-7 w-full text-white", 
  desktop: "flex flex-row gap-x-10 items-center"
};
export default function NavMenuMobil({ size = "md" ,variant="desktop"}: NavMenuMobilProps) {
  const pathname = usePathname(); 

  const sizeClass =
    size === "sm"
      ? "text-base"
      : size === "lg"
      ? "text-xl"
      : "text-lg";

  return (
    <nav className={`${variantMap[variant]} ${sizeClass} `}>
      <div className="w-full border-b-2 border-white px-4">
        <MenuItem href="/" active={pathname === "/"} color={variant==='mobile'? "text-white":""}>INICIO</MenuItem>
      </div>
      <div className="w-full border-b-2 border-white px-4 ">
        <MenuItem href="/productos" active={pathname.startsWith("/productos")} color={variant==='mobile'? "text-white":""}>
          PRODUCTOS
        </MenuItem>
      </div>
      <div className="w-full border-b-2 border-white px-4">
        <MenuItem href="/nosotros" active={pathname === "/nosotros"} color={variant==='mobile'? "text-white":""}>
          NOSOTROS
        </MenuItem>
      </div >
      <div className="w-full border-b-2 border-white px-4">
        <MenuItem href="/blog" active={pathname.startsWith("/blog")} color={variant==='mobile'? "text-white":""}>
          BLOG
        </MenuItem>
      </div>
      <div className="w-full border-b-2 border-white px-4">
        <MenuItem href="/contacto" active={pathname === "/contacto"} color={variant==='mobile'? "text-white":""}>
          CONTACTO
        </MenuItem>
      </div>
    </nav>
  );
}
