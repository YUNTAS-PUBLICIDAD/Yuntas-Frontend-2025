import Icon from "@/components/atoms/Icon";
import Link from "next/link";
import { imagenes } from "@/data/imagenes";
type UserSectionProps = {
  size?: "sm" | "md" | "lg";
  enableDarkMode?: boolean;
};

export default function UserSection({
  size = "md",
  enableDarkMode = false,
}: UserSectionProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };
  const iconSizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  // const scaleClass =
  //   size === "sm" ? "scale-100" : size === "lg" ? "scale-125" : "scale-110";

  return (
    <Link href="/login">
      <div className={`flex items-center justify-center ${sizeMap[size]}`}>
        <Icon
          size={size}
          bgColor={
            enableDarkMode
              ? "bg-blue-900 dark:bg-white"
              : "bg-blue-900"
          }
          className={
            enableDarkMode
              ? "text-white dark:text-gray-400"
              : "text-white"
          }
        >
          <img
            src={imagenes.inicio.user.src}
            alt={imagenes.inicio.user.alt}
            title={imagenes.inicio.user.title}
            className={`
              w-7 h-7 object-contain ${iconSizeMap[size]}
              ${enableDarkMode ? "filter dark:invert-[0.6]" : ""}
            `}
          />
        </Icon>
      </div>
    </Link>
  );
}
