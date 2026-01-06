"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useTokenValidation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // obtener cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };
    const token = getCookie("auth_token");
    const isProtectedRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/login";

    // proteger
    if (isProtectedRoute && !token) {
      router.replace(`/login?redirect=${pathname}`);
    } else if (isLoginPage && token) {
      
      router.replace("/admin");
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);

  return { isLoading };
}