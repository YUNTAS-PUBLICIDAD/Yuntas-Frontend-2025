'use client';

import MenuItem from "@/components/atoms/MenuItem";
import { SlArrowDown } from "react-icons/sl";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminMenuMobil = ({ isOpen, onToggle }: Props) => {
  const pathname = usePathname();
  const isAdminActive = pathname.startsWith("/admin");

  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-2 py-1 font-medium uppercase tracking-wider transition ${
        isAdminActive
          ? "text-[#04061a] dark:text-white font-bold"
          : "text-[#04061a] dark:text-white"
      }`}
    >
      <span className="font-bold">ADMIN</span>
      <SlArrowDown
        className={`text-base transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

export default AdminMenuMobil;
