"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { usePathname } from "next/navigation";

type NavMenuProps = {
  size?: "sm" | "md" | "lg";
variant?: "mobile" | "desktop" | "footer";
scrolled: boolean;
};
const variantMap = {
  mobile: "flex flex-col gap-y-8 w-full px-4 pt-4",
  desktop: "flex flex-row gap-x-10 items-center uppercase",
  footer: "flex flex-col gap-y-6 items-start text-white capitalize"
};
export default function NavMenu({ size = "md" ,variant="desktop", scrolled = false}: NavMenuProps) {
  const pathname = usePathname();

  const sizeClass =
    size === "sm"
      ? "text-base"
      : size === "lg"
      ? "text-xl"
      : "text-lg";

  // Color base según estado
  const baseColor = scrolled ? "text-gray-800 hover:text-[#6DE1E3]" : "text-white/90 hover:text-white";

  const activeColor = scrolled ? "text-[#0f172a]" : "text-white";

  return (
   <nav className={ ` ${variantMap[variant]} ${sizeClass} font-medium`}>

{variant === "footer" && (
  <h3 className="font-bold text-[#6DE1E3] text-xl tracking-wide">
    Enlaces
  </h3>
)}
<MenuItem
  href="/"
  active={variant !== "footer" && pathname === "/"}
  color={
    variant === "mobile"
          // color oscuro, letras mayúsculas separadas y el mismo padding (px-4 py-2) para que no se aplaste
          ? "text-[#04041C] uppercase tracking-widest px-4 py-2 hover:text-blue-700"
          : variant === "footer"
          ? "text-white hover:text-[#6de1e3] transition-colors duration-300"
          : ""
  }>
  Inicio
</MenuItem>

<MenuItem
  href="/nosotros"
  active={variant !== "footer" && pathname.startsWith("/nosotros")}
  color={
    variant === "mobile"
          ? "text-[#04041C] uppercase tracking-widest px-4 py-2 hover:text-blue-700"
          : variant === "footer"
          ? "text-white hover:text-[#6de1e3] transition-colors duration-300"
          : ""
  }>
  Nosotros
</MenuItem>

<MenuItem
  href="/productos"
  active={variant !== "footer" && pathname.startsWith("/productos")}
  color={
    variant === "mobile"
          ? "text-[#04041C] uppercase tracking-widest px-4 py-2 hover:text-blue-700"
          : variant === "footer"
          ? "text-white hover:text-[#6de1e3] transition-colors duration-300"
          : ""
  }>
  Productos
</MenuItem>

<MenuItem
  href="/blog"
  active={variant !== "footer" && pathname.startsWith("/blog")}
  color={
   variant === "mobile"
          ? "text-[#04041C] uppercase tracking-widest px-4 py-2 hover:text-blue-700"
          : variant === "footer"
          ? "text-white hover:text-[#6de1e3] transition-colors duration-300"
          : ""
  }>
  Blog
</MenuItem>

<MenuItem
  href="/contacto"
  active={variant !== "footer" && pathname.startsWith("/contacto")}
  color={
   variant === "mobile"
          ? "text-[#04041C] uppercase tracking-widest px-4 py-2 hover:text-blue-700"
          : variant === "footer"
          ? "text-white hover:text-[#6de1e3] transition-colors duration-300"
          : ""
  }>
  Contacto
</MenuItem>
    </nav>
  );
}
