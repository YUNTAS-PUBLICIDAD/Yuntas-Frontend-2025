interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  color?:string;
  className?: string;
}

export default function MenuItem({ href, children, active, color = 'text-gray-800', className = "" }: MenuItemProps) {
 return (
    <a 
      href={href} 
      className={`block transition duration-300 ${active ? "text-blue-600 font-bold px-4 py-2" : `${color} px-4 py-2 hover:text-blue-700`} ${className}`}
    >
      {children}
    </a>
  );
}