'use client';

import FormSection from "@/components/organisms/login/FormSection";
import HeroSection from "@/components/organisms/login/HeroSection";
import { getToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace("/admin");
    }
  }, [router]);

  return (
    <main className="min-h-screen w-full bg-transparent">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-stretch">
        <div className="hidden md:block">
          <HeroSection />
        </div>
        <FormSection />
      </div>
    </main>
  );
}
