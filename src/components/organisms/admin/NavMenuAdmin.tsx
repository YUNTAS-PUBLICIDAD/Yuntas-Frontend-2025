"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { useNavItems } from "@/hooks/useNavItems";

export default function NavMenuAdmin({scrolled}: {scrolled: boolean}){
  const items = useNavItems();

  const baseColor = "text-black dark:text-white/90 hover:text-[#6DE1E3]";

  const activeColor = "text-black";

  return (
    <nav className="flex gap-x-4 lg:gap-x-10 items-center uppercase text-sm tracking-[0.06em]">
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
