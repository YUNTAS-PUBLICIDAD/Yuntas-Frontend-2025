import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center">
      <Loader2 className="w-10 h-10 animate-spin text-[#28BeDA]"/>
      <p className="text-lg font-medium text-gray-600">
        Cargando contenido...
      </p>
    </div>
  )
}
