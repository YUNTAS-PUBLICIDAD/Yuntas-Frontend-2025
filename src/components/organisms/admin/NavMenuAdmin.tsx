"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { useNavItems } from "@/hooks/useNavItems";

export default function NavMenuAdmin({scrolled}: {scrolled: boolean}){
  const items = useNavItems();

  const baseColor = "text-black dark:text-white/90 hover:text-brand-cyan";

  const activeColor = "text-black";

  return (
    <nav className="flex items-center gap-x-3 lg:gap-x-5 xl:gap-x-7 uppercase text-[13px] lg:text-sm tracking-[0.04em]">
      {
        items.map((item) => (
          <MenuItem key={item.href} href={item.href} active={item.active} baseColor={baseColor} activeColor={activeColor}>
            {item.label}
          </MenuItem>
        ))
      }
    </nav>
  )
}
