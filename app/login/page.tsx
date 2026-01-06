// LoginPage.tsx
'use client';
import FormSection from "@/components/organisms/login/FormSection";
import HeroSection from "@/components/organisms/login/HeroSection";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      router.replace("/admin");
    }
  }, [router]);

  return (
    <main className="min-h-screen relative md:grid md:grid-cols-2">      
      <HeroSection />

      <div className="absolute inset-2 flex top-40 items-center justify-center
                    md:bg-gray-200 md:static md:flex md:items-center md:justify-center">
        <FormSection />
      </div>
    </main>
  );
}
