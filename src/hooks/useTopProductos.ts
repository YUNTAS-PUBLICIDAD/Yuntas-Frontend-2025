'use client';

import { useEffect, useState } from "react";
import { Producto } from "@/types/admin/producto";
import { getTopViewedProducts, TopProductApiItem } from "@/services/trackingService";

export interface ProductoMetrics {
    views: number;
    growth: number;
    conversion: number;
}

interface UseTopProductosReturn {
    metricsById: Record<number, ProductoMetrics>;
    isLoading: boolean;
    isMock: boolean;
}

// Genera métricas deterministas (mismo producto y periodo -> mismo resultado)
// para poder mostrar el diseño mientras el backend no expone /dashboard/top-products.
function mockMetrics(id: number, days: number): ProductoMetrics {
    const wave = 1 + 0.15 * Math.sin(id * 1.7);
    const views = Math.round((40 + ((id * 37) % 460)) * (days / 7) * wave);
    const growth = Math.round((((id * 53 + days * 3) % 140) - 40) * 10) / 10;
    const conversion = 4 + ((id * 7) % 12);
    return { views, growth, conversion };
}

export function useTopProductos(productos: Producto[], days: number): UseTopProductosReturn {
    const [metricsById, setMetricsById] = useState<Record<number, ProductoMetrics>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isMock, setIsMock] = useState(false);

    useEffect(() => {
        if (productos.length === 0) return;
        let cancelled = false;
        setIsLoading(true);

        const fallbackToMock = () => {
            const fallback: Record<number, ProductoMetrics> = {};
            productos.forEach((p) => { fallback[p.id] = mockMetrics(p.id, days); });
            if (!cancelled) {
                setMetricsById(fallback);
                setIsMock(true);
            }
        };

        getTopViewedProducts(days)
            .then((data: TopProductApiItem[]) => {
                if (cancelled) return;
                if (!Array.isArray(data) || data.length === 0) {
                    fallbackToMock();
                    return;
                }
                const mapped: Record<number, ProductoMetrics> = {};
                data.forEach((item) => {
                    mapped[item.id] = {
                        views: item.views_count,
                        growth: item.growth,
                        conversion: item.conversion_rate,
                    };
                });
                setMetricsById(mapped);
                setIsMock(false);
            })
            .catch(fallbackToMock)
            .finally(() => { if (!cancelled) setIsLoading(false); });

        return () => { cancelled = true; };
    }, [productos, days]);

    return { metricsById, isLoading, isMock };
}
