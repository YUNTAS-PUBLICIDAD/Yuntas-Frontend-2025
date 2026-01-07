import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos - Yuntas Publicidad",
  description: "Descubre nuestro catálogo completo de productos publicitarios: banners, gigantografías, vinilos y más.",
  keywords: "publicidad, banners, gigantografías, vinilos, productos publicitarios",
  openGraph: {
    title: "Productos - Yuntas Publicidad",
    description: "Catálogo completo de productos publicitarios",
    images: [{ url: "https://yuntaspublicidad.com/og-default.jpg" }],
  },
};

export default function ProductoLayout({ children, }: { children: React.ReactNode; }) {
  return <>{children}</>;
}