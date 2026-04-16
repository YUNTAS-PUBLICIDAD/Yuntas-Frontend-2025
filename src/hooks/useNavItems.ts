"use client"

import { usePathname } from "next/navigation"

export const useNavItems = () => {
  const pathname = usePathname();

  return [
    {
         label: "Inicio",
         href: "/",
         active: pathname === "/",
       },
       {
         label: "Nosotros",
         href: "/nosotros",
         active: pathname.startsWith("/nosotros"),
       },
       {
         label: "Productos",
         href: "/productos",
         active: pathname.startsWith("/productos"),
       },
       {
         label: "Blog",
         href: "/blog",
         active: pathname.startsWith("/blog"),
       },
       {
         label: "Contacto",
         href: "/contacto",
         active: pathname.startsWith("/contacto"),
       },
  ]
}
