"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { useNavItems } from "@/hooks/useNavItems";

export default function NavMenuFooter(){
  const items = useNavItems();

  return (
    <div>
      <span className="text-brand-cyan font-bold text-xl mb-4 inline-block">Enlaces</span>
      <nav className="flex flex-col gap-y-4">
        {
          items.map((item) => (
            <MenuItem key={item.href} href={item.href} baseColor="text-white/80 hover:text-brand-cyan">
              {
                item.label
              }
            </MenuItem>
          ))
        }
      </nav>
    </div>
  )
}
