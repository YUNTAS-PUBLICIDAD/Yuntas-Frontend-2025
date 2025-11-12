import MenuItem from "@/components/atoms/MenuItem";

type NavMenuProps = {
  size?: "sm" | "md" | "lg";
};

export default function NavMenu({ size = "md" }: NavMenuProps) {
  const sizeClass = size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg";
  return (
    <nav className={`flex gap-x-10 items-center ${sizeClass} font-medium`}>
      <MenuItem href="/" active>INICIO</MenuItem>
      <div className="relative flex items-center">
        <MenuItem href="/productos">PRODUCTOS</MenuItem>
      </div>
      <MenuItem href="/nosotros">NOSOTROS</MenuItem>
      <MenuItem href="/blog">BLOG</MenuItem>
      <MenuItem href="/contacto">CONTACTO</MenuItem>
    </nav>
  );
}