"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, RefObject } from "react";
import { ChevronDown, ChevronUp, Edit3, Palette, SunMedium, Trash2, UploadCloud } from "lucide-react";

function UploadZone({
  label,
  file,
  onFileChange,
  onClear,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [file]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      onFileChange(droppedFile);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-white/80">{label}</span>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          flex min-h-40 cursor-pointer select-none flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed
          transition-all duration-200
          ${dragging
            ? "border-gray-400 bg-gray-100 dark:border-white/40 dark:bg-white/10"
            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 dark:border-white/15 dark:bg-white/5 dark:hover:border-white/30 dark:hover:bg-white/10"
          }
        `}
      >
        {preview ? (
          <img src={preview} alt={`Vista previa ${label}`} className="h-full w-full rounded-xl object-contain p-3" />
        ) : (
          <>
            <UploadCloud className="h-9 w-9 text-gray-400 dark:text-white/40" />
            <span className="text-sm text-gray-500 dark:text-white/50">Subir imagen</span>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.svg"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-white/40">JPG, PNG o SVG, Máx. 2MB</p>

      <div className="flex gap-2">
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <Edit3 className="h-4 w-4" />
          Cambiar
        </button>
        <button
          onClick={onClear}
          disabled={!file}
          className="flex items-center gap-1.5 rounded-lg border border-red-100 bg-white px-4 py-2 text-sm font-medium text-red-500 shadow-sm transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-white/5 dark:hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default function AppearanceSettingsSection() {
  const [open, setOpen] = useState(true);
  const [logoClaro, setLogoClaro] = useState<File | null>(null);
  const [logoOscuro, setLogoOscuro] = useState<File | null>(null);
  const [empresa, setEmpresa] = useState("");
  const [tema, setTema] = useState("Claro");

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#1C2347]">
      <button
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-start justify-between px-8 py-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Apariencia</h2>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-white/50">Personaliza la identidad visual de tu empresa</p>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 text-gray-400 transition-transform duration-300 dark:text-white/40 ${open ? "rotate-0" : "-rotate-90"}`}
        />
      </button>

      {open && (
        <div className="space-y-8 border-t border-gray-100 px-8 pb-8 dark:border-white/5">
          <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2">
            <UploadZone
              label="Logo claro (para tema claro)"
              file={logoClaro}
              onFileChange={setLogoClaro}
              onClear={() => setLogoClaro(null)}
            />
            <UploadZone
              label="Logo oscuro (para tema oscuro)"
              file={logoOscuro}
              onFileChange={setLogoOscuro}
              onClear={() => setLogoOscuro(null)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-white/80">Nombre de la empresa</label>
              <input
                type="text"
                placeholder="Ej: Yuntas"
                value={empresa}
                onChange={(event) => setEmpresa(event.target.value)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30 dark:focus:ring-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-white/80">Tema del sistema</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <SunMedium className="h-4 w-4 text-gray-500 dark:text-white/40" />
                </span>
                <select
                  value={tema}
                  onChange={(event) => setTema(event.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-white/20"
                >
                  <option value="Claro">Claro</option>
                  <option value="Oscuro">Oscuro</option>
                  <option value="Sistema">Sistema</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <ChevronUp className="h-4 w-4 rotate-180 text-gray-400 dark:text-white/30" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-white/40">
            <Palette className="h-4 w-4" />
            Vista inicial de configuración visual, lista para conectar al backend cuando se defina el contrato.
          </div>
        </div>
      )}
    </div>
  );
}
