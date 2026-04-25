import Link from "next/link";

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  baseColor?: string;
  activeColor?: string;
  // color?:string;
  className?: string;
  onClick?: () => void;
}

export default function MenuItem({
  href,
  children,
  active,
  // color = 'text-gray-800',
  activeColor,
  baseColor,
  className = "",
  onClick, 
}: MenuItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick} 
      className={`group relative px-2 py-1 transition-all duration-300 
        ${active ? activeColor : baseColor} 
        ${className} 
        ${active ? "md:bg-transparent bg-black/5 md:dark:bg-transparent dark:bg-white/10 font-bold" : ""}
      `}
    >
      {children}
      {/* Underline solo desktop */}
      <span
        className={`
          hidden md:block absolute left-0 -bottom-1 h-[2px] w-full bg-[#6DE1E3]
          transition-transform duration-300
          ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </Link>
  );
}
