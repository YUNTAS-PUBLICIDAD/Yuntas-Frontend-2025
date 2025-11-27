interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  color?:string,
}

export default function MenuItem({ href, children, active,color='text-gray-800' }: MenuItemProps) {
  return (
    <a href={href} className={` px-4 py-2 font-medium transition ${active ? "text-blue-600 font-bold" : `${color} hover:text-blue-700`}`}>
      {children}
    </a>
  );
}