'use client';
import { Suspense } from "react";
import ProductoDetalleContent from "./productodetallecontent";
export default function ProductoDetallePage() {
    return (
        <Suspense fallback={<div>Cargando producto...</div>}>
        <ProductoDetalleContent />
        </Suspense>
    );
}