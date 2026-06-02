"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const useNavItems = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return [
    {
         label: "Inicio",
         href: "/",
         active: mounted && pathname === "/",
       },
       {
         label: "Nosotros",
         href: "/nosotros",
         active: mounted && pathname?.startsWith("/nosotros"),
       },
       {
         label: "Productos",
         href: "/productos",
         active: mounted && pathname?.startsWith("/productos"),
       },
       {
         label: "Blog",
         href: "/blog",
         active: mounted && pathname?.startsWith("/blog"),
       },
       {
         label: "Contacto",
         href: "/contacto",
         active: mounted && pathname?.startsWith("/contacto"),
       },
  ]
}
