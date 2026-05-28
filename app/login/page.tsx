'use client';

import FormSection from "@/components/organisms/login/FormSection";
import HeroSection from "@/components/organisms/login/HeroSection";
import { getToken } from "@/utils/token";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace("/admin");
      return;
    }
    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#141A3F]">
        <Loader size="lg" />
      </div>
    );
  }

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
