'use client'

import SidebarSection from "@/components/organisms/admin/SidebarSection";
import Encabezado from "@/components/molecules/Encabezado";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import Loader from "@/components/atoms/Loader";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isLoading } = useTokenValidation();

    if (isLoading) {
        return <Loader size="lg" />;
    }

    return (
        <div className="flex flex-col">
            <Encabezado variant="azul">SECCIÓN PRINCIPAL</Encabezado>
            <div className="flex flex-1 bg-white"> {/*Color para el modo ocuro:  bg-[#203565] */}
                <SidebarSection />
                <main className="flex-1 py-16 px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}