import Link from "next/link";  

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export default function MenuItem({ href, children, active }: MenuItemProps) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 font-medium hover:text-blue-700 transition ${active ? 'font-bold text-black' : 'text-gray-800'}`}
    >
      {children}
    </Link>
  );
}
