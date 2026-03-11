interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  color?:string,
}

export default function MenuItem({ href, children, active,color='text-gray-800' }: MenuItemProps) {
  const defaultStyles = "text-gray-800 hover:text-blue-700 px-4 py-2";

  const finalStyles = color ? color : defaultStyles;

  return (
   <a href={href} className={`transition ${active ? "text-blue-600 font-bold px-4 py-2" : finalStyles}`}>
      {children}
    </a>
  );
}