type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  src?: string;
  alt?: string;
};

export default function Logo({ size = "md", src = "/logo.svg", alt = "Yuntas Publicidad" }: LogoProps) {
  const sizeClass =
    size === "sm" ? "h-10"
    : size === "lg" ? "h-16"
    : size === "xl" ? "h-20"
    : size === "2xl" ? "h-32"
    : "h-12";
  return (
    <img src={src} alt={alt} className={`${sizeClass} w-auto`} />
  );
}