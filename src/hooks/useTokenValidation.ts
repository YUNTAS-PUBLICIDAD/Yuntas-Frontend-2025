"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getToken } from "@/utils/token";

export function useTokenValidation() {
    const router = useRouter();
    const pathname = usePathname();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getToken();

        const isProtectedRoute = pathname.startsWith("/admin");
        const isLoginPage = pathname === "/login";

        if (isProtectedRoute && !token) {
            router.replace(`/login?redirect=${pathname}`);
            return;
        }

        if (isLoginPage && token) {
            router.replace("/admin");
            return;
        }

        setIsLoading(false);
    }, [pathname, router]);

    return { isLoading };
}
