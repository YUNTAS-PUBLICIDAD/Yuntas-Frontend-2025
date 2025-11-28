import Icon from "@/components/atoms/Icon";
import Link from "next/link";

type UserSectionProps = {
  size?: "sm" | "md" | "lg";
  color?:string,
  fill?:string
};

export default function UserSection({ size = "md" ,color="bg-blue-900",fill="white"}: UserSectionProps) {
  const scaleClass = size === "sm" ? "scale-100" : size === "lg" ? "scale-125" : "scale-110";
  return (
        <Link href={"/login"}>
          <div  className={`flex items-center gap-2 ${scaleClass}`}>
            <Icon size={size} bgColor={color}>
              <svg width="24" height="24" fill={fill} viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
              </svg>
            </Icon>
            {/* Aquí puedes agregar el menú de usuario si lo necesitas */}
          </div>
        </Link>
  );
}
