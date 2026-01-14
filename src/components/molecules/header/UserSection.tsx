import Icon from "@/components/atoms/Icon";
import Link from "next/link";
import UserImg from "@/assets/inicio/user-1.png";

type UserSectionProps = {
  size?: "sm" | "md" | "lg";
};

export default function UserSection({ size = "md" }: UserSectionProps) {
  const scaleClass =
    size === "sm" ? "scale-100" : size === "lg" ? "scale-125" : "scale-110";
  const imgClass =
    size === "sm" ? "w-6 h-6" : size === "lg" ? "w-7 h-7" : "w-7 h-7";

  return (
    <Link href={"/login"}>
      <div className={`flex items-center justify-center ${scaleClass}`}>
        <Icon
          size={size}
          bgColor="
            bg-blue-900
            dark:bg-white
          "
          className="
            text-white
            dark:text-gray-400
          "
        >
          <img
            src={UserImg.src}
            alt="User Icon"
            className="
              w-7 h-7 object-contain
              filter
              dark:invert-[0.6]
            "
          />
        </Icon>
      </div>
    </Link>
  );
}
