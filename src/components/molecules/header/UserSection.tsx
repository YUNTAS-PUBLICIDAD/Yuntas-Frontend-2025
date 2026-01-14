import Icon from "@/components/atoms/Icon";
import Link from "next/link";
import UserImg from "@/assets/inicio/user-1.png";

type UserSectionProps = {
  size?: "sm" | "md" | "lg";
  enableDarkMode?: boolean;
};

export default function UserSection({
  size = "md",
  enableDarkMode = false,
}: UserSectionProps) {
  const scaleClass =
    size === "sm" ? "scale-100" : size === "lg" ? "scale-125" : "scale-110";

  return (
    <Link href="/login">
      <div className={`flex items-center justify-center ${scaleClass}`}>
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
            src={UserImg.src}
            alt="User Icon"
            className={`
              w-7 h-7 object-contain
              ${enableDarkMode ? "filter dark:invert-[0.6]" : ""}
            `}
          />
        </Icon>
      </div>
    </Link>
  );
}
