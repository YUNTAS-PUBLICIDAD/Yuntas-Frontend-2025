import Icon from "@/components/atoms/Icon";
import Link from "next/link";
import UserImg from "@/assets/inicio/user-1.png"; // <-- IMPORTA TU IMAGEN

type UserSectionProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
  fill?: string;
};

export default function UserSection({
  size = "md",
  color = "bg-blue-900",
}: UserSectionProps) {
  const scaleClass =
    size === "sm" ? "scale-100" : size === "lg" ? "scale-125" : "scale-110";

  return (
    <Link href={"/login"}>
      <div className={`flex items-center gap-2 ${scaleClass}`}>
        <Icon size={size} bgColor={color}>
          <img
            src={UserImg.src}
            alt="User Icon"
            className="w-7 h-7 object-contain"
          />
        </Icon>
      </div>
    </Link>
  );
}
