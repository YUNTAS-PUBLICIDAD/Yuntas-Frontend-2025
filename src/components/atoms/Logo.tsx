type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  src?: string;
  darkSrc?: string;
  alt?: string;
};

export default function Logo({
  size = "md",
  src = "/logo.svg",
  darkSrc,
  alt = "Yuntas Publicidad",
}: LogoProps) {
  const sizeClass =
    size === "sm" ? "h-10"
    : size === "lg" ? "h-16"
    : size === "xl" ? "h-20"
    : size === "2xl" ? "h-32"
    : "h-12";

  if (darkSrc) {
    return (
      <>
        <img src={src} alt={alt} title={alt} className={`${sizeClass} w-auto dark:hidden`} />
        <img src={darkSrc} alt={alt} title={alt} className={`${sizeClass} w-auto hidden dark:block`} />
      </>
    );
  }

  return (
    <img src={src} alt={alt} title={alt} className={`${sizeClass} w-auto`} />
  );
}