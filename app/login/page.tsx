'use client';

import FormSection from "@/components/organisms/login/FormSection";
import HeroSection from "@/components/organisms/login/HeroSection";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (token) {
            router.replace("/admin");
        }
    }, [router]);

    return (
        <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-3 py-10">
            {/* Fondo full screen */}
            <HeroSection />

        
            {/* Form flotante */}
            <div className="relative z-10 w-full px-5 md:px-0 md:w-[520px] lg:w-[580px]">
                <FormSection />
            </div>
        </main>
    );
}