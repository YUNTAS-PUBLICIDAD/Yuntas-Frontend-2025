'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/atoms/Loader";

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/admin/seguimiento");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader size="lg" />
        </div>
    );
}