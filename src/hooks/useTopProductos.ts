'use client';

import { useEffect, useState } from "react";
import { Producto } from "@/types/admin/producto";
import { getTopViewedProducts } from "@/services/trackingService";

export interface ProductoMetrics {
    views: number;
}

interface UseTopProductosReturn {
    metricsById: Record<number, ProductoMetrics>;
    isLoading: boolean;
}

// El backend solo acepta 7, 30 o 90 días; cualquier otro valor cae a 7.
const ALLOWED_DAYS = [7, 30, 90];

export function useTopProductos(productos: Producto[], days: number): UseTopProductosReturn {
    const [metricsById, setMetricsById] = useState<Record<number, ProductoMetrics>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (productos.length === 0) return;
        let cancelled = false;
        setIsLoading(true);

        const period = ALLOWED_DAYS.includes(days) ? days : 7;

        getTopViewedProducts(period)
            .then((data) => {
                if (cancelled) return;
                const mapped: Record<number, ProductoMetrics> = {};
                (data.products || []).forEach((item) => {
                    mapped[item.id] = { views: item.views_count };
                });
                setMetricsById(mapped);
            })
            .catch(() => {
                if (!cancelled) setMetricsById({});
            })
            .finally(() => { if (!cancelled) setIsLoading(false); });

        return () => { cancelled = true; };
    }, [productos, days]);

    return { metricsById, isLoading };
}
