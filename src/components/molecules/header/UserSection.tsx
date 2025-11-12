import Icon from "@/components/atoms/Icon";

type UserSectionProps = {
  size?: "sm" | "md" | "lg";
};

export default function UserSection({ size = "md" }: UserSectionProps) {
  const scaleClass = size === "sm" ? "scale-100" : size === "lg" ? "scale-125" : "scale-110";
  return (
    <div className={`flex items-center gap-2 ${scaleClass}`}>
      <Icon size={size} bgColor="bg-blue-900">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
        </svg>
      </Icon>
      {/* Aquí puedes agregar el menú de usuario si lo necesitas */}
    </div>
  );
}
