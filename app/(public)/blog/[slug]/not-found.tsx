import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <SearchX className="w-14 h-14 text-gray-400 mb-4"/>

      <h2 className="text-2xl font-semibold mb-2">
        Blog no encontrado
      </h2>

      <p className="text-gray-500 mb-6 max-w-md">
        El contenido que buscas no existe o fue removido.
      </p>

      <Link href="/blog" className="px-5 py-2 rounded-lg bg-[#28BEDA] text-white hover:bg-[#1fa4bd] transition">
        Volver al blog
      </Link>
    </div>
  )
}
