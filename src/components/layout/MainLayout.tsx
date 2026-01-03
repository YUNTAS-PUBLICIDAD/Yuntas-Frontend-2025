import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import HeaderMobil from "../organisms/HeaderMobil";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeaderMobil/>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
