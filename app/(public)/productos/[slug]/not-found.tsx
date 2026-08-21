"use client";

import { PackageX } from "lucide-react";
import Link from "next/link";
import { useForceSolidHeader } from "@/context/HeaderStyleContext";

export default function NotFound() {
  useForceSolidHeader();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <PackageX className="w-16 h-16 text-[#28BEDA] mb-4" />

      <h1 className="text-6xl font-extrabold text-[#28BEDA] mb-2">
        404
      </h1>

      <h2 className="text-2xl font-bold text-black dark:text-gray-100 mb-3">
        Producto no encontrado
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        El producto que buscas no existe o fue removido. Explora nuestro catálogo completo para encontrar lo que necesitas.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/productos"
          className="px-6 py-3 rounded-lg bg-[#28BEDA] text-white font-medium hover:bg-[#1fa4bd] transition"
        >
          Ver todos los productos
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
