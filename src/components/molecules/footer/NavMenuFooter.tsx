"use client";

import MenuItem from "@/components/atoms/MenuItem";
import { useNavItems } from "@/hooks/useNavItems";

export default function NavMenuFooter(){
  const items = useNavItems();

  return (
    <div>
      <h3 className="text-[#6DE1E3] font-bold mb-4">Enlaces</h3>
      <nav className="flex flex-col gap-y-4">
        {
          items.map((item) => (
            <MenuItem key={item.href} href={item.href} baseColor="text-white/80 hover:text-[#6DE1E3]">
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
