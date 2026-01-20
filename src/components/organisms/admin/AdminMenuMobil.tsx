'use client';

import MenuItem from "@/components/atoms/MenuItem";
import { SlArrowDown } from "react-icons/sl";
import { usePathname } from "next/navigation";

type Props = {
  isOpen?: boolean;
  onToggle?: () => void;
};

const AdminMenuMobil = ({ isOpen = false, onToggle }: Props) => {
  const pathname = usePathname();
  const isAdminActive = pathname.startsWith("/admin");

  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-4 py-2 font-medium uppercase tracking-wider transition ${
        isAdminActive ? "text-white font-bold" : "text-white"
      }`}
    >
      <span className="font-bold">ADMI</span>
      <SlArrowDown
        className={`text-base transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

export default AdminMenuMobil;