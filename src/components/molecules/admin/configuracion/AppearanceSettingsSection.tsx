"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { Brush, ChevronDown, Edit3, ImageIcon, Palette, Trash2, UploadCloud } from "lucide-react";


function BlockTitle({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#203565]/10 dark:bg-white/5 shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-[#0D1030] dark:text-white">{title}</h3>
        <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}


function UploadZone({
  label,
  file,
  onFileChange,
  onClear,
  bgClass,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File) => void;
  onClear: () => void;
  bgClass: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) onFileChange(selected);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed
          min-h-[140px] cursor-pointer select-none transition-all duration-200 overflow-hidden
          ${bgClass}
          ${dragging
            ? "border-[#203565] dark:border-white/40"
            : "border-gray-200 dark:border-white/10 hover:border-[#203565] dark:hover:border-white/30"
          }
        `}
      >
        {preview ? (
          <img
            src={preview}
            alt={`Vista previa ${label}`}
            className="max-h-24 max-w-full object-contain rounded-lg p-2"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 py-6 px-4 text-center">
            <UploadCloud className="w-7 h-7 text-gray-300 dark:text-white/20" />
            <p className="text-sm font-medium text-gray-400 dark:text-white/40">Subir imagen</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.svg"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      <p className="text-xs text-gray-400 dark:text-white/40">JPG, PNG o SVG · Máx. 2MB</p>

      <div className="flex gap-2">
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 text-xs font-semibold border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-[#0D1030] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Cambiar
        </button>
        <button
          onClick={onClear}
          disabled={!file}
          className="flex items-center gap-1.5 text-xs font-semibold border border-red-200 dark:border-red-500/20 rounded-lg px-3 py-1.5 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="w-3.5 h-3.5" />
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

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#1C2347] shadow-sm overflow-hidden">

      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between px-6 py-5 text-left border-b border-gray-100 dark:border-white/5 transition-colors hover:bg-gray-50/70 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#203565]/10 dark:bg-white/5">
            <Palette className="w-4 h-4 text-[#203565] dark:text-white/60" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1030] dark:text-white">Apariencia</h2>
            <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">
              Personaliza la identidad visual de tu empresa
            </p>
          </div>
        </div>
        <ChevronDown
          className={`mt-1 w-5 h-5 text-gray-400 dark:text-white/40 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {open && (
        <div className="divide-y divide-gray-100 dark:divide-white/5">

          {/* Logos */}
          <div className="px-6 py-6">
            <BlockTitle
              icon={<ImageIcon className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Logos"
              subtitle="Sube el logo para cada tema del sitio"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <UploadZone
                label="Logo claro (para tema claro)"
                file={logoClaro}
                onFileChange={setLogoClaro}
                onClear={() => setLogoClaro(null)}
                bgClass="bg-gray-50 dark:bg-white/5"
              />
              <UploadZone
                label="Logo oscuro (para tema oscuro)"
                file={logoOscuro}
                onFileChange={setLogoOscuro}
                onClear={() => setLogoOscuro(null)}
                bgClass="bg-[#0D1030]/5 dark:bg-[#0D1030]/40"
              />
            </div>
          </div>

          {/* Nombre empresa */}
          <div className="px-6 py-6">
            <BlockTitle
              icon={<Brush className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Información de la empresa"
              subtitle="Datos que aparecen en el sitio público"
            />
            <div className="flex flex-col gap-1.5 max-w-sm">
              <label className="text-sm font-semibold text-[#0D1030] dark:text-white">
                Nombre de la empresa
              </label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Ej. Yuntas"
                className="border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white placeholder-gray-300 dark:placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-white/5 flex justify-end">
            <button className="px-6 py-2.5 rounded-xl bg-[#203565] hover:bg-[#162548] text-white text-sm font-semibold transition-colors shadow-sm">
              Guardar cambios
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
