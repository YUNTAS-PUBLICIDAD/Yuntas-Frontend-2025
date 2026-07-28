'use client';

import { useEffect } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import { useHistorial } from "@/hooks/useHistorial";

const columns = [
    { key: "action", label: "ACCIÓN" },
    { key: "section", label: "SECCIÓN" },
    { key: "date", label: "FECHA" },
    { key: "time", label: "HORA" },
];

export default function HistorialPage() {

    const {
        historial,
        isLoading,
        error,
        getHistorial,
    } = useHistorial();

    useEffect(() => {
        getHistorial();
    }, [getHistorial]);

    return (
        <div className="relative p-2 md:p-4 text-[#0D1030] dark:text-white transition-colors duration-300">

            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(35,193,222,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(32,53,101,0.16),_transparent_36%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(109,225,227,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(41,50,150,0.18),_transparent_36%)]" />

            <section className="mb-5 rounded-[1.75rem] border border-[#D8E7F3] bg-white/90 p-5 shadow-[0_18px_40px_rgba(13,16,48,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#1C2347]/90">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="space-y-1 flex-1">
                        <h2 className="text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white/90 md:text-4xl">
                            Historial de Cambios
                        </h2>

                        <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-white/80 md:text-base">
                            Revisa cuáles fueron los últimos cambios realizados.
                        </p>
                    </div>
                </div>

                {error && (
                    <div
                        className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <span className="font-medium">Error:</span> {error}
                    </div>
                )}
            </section>

            <AdminTable
                minRows={5}
                columns={columns}
                data={historial}
                isLoading={isLoading}
                emptyMessage="No se encontró registro de cambios"
            />

        </div>
    );
}