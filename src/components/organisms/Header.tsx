import Logo from "@/components/atoms/Logo";
import NavMenu from "@/components/molecules/header/NavMenu";
import UserSection from "@/components/molecules/header/UserSection";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white flex items-center px-16 py-5 shadow h-24">
      <div className="flex flex-col items-center w-56">
        <Logo src="/logo.svg" size="xl" alt="Yuntas Publicidad" />
      </div>
      <div className="flex items-center gap-x-14 ml-auto">
        <NavMenu size="lg" />
        <UserSection size="lg" />
      </div>
    </header>
  );
}
