"use client";

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type ReactNode } from "react";
import { Brush, ChevronDown, Edit3, ImageIcon, Palette, Save, Trash2, UploadCloud } from "lucide-react";
import { getImg } from "@/utils/getImg";
import { showToast } from "@/utils/showToast";
import {
  GeneralSettings,
  SettingsServiceResponse,
  UpdateGeneralSettingsInput,
} from "@/types/admin/settings";

interface AppearanceSettingsSectionProps {
  general: GeneralSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  onSave: (
    payload: UpdateGeneralSettingsInput
  ) => Promise<SettingsServiceResponse<GeneralSettings>>;
}

function BlockTitle({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#203565]/10 dark:bg-white/5">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-[#0D1030] dark:text-white">{title}</h3>
        <p className="mt-0.5 text-xs text-gray-400 dark:text-white/40">{subtitle}</p>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: "light" | "dark") => void;
  options: { value: "light" | "dark"; label: string }[];
  hint: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as "light" | "dark")}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 text-sm text-[#0D1030] transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-white dark:bg-[#1C2347]">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 shrink-0 text-gray-400" />
      </div>
      <p className="text-xs text-gray-400 dark:text-white/40">{hint}</p>
    </div>
  );
}

function UploadZone({
  label,
  file,
  existingPreview,
  onFileChange,
  onClear,
  bgClass,
}: {
  label: string;
  file: File | null;
  existingPreview: string | null;
  onFileChange: (file: File) => void;
  onClear: () => void;
  bgClass: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(existingPreview);

  useEffect(() => {
    if (!file) {
      setPreview(existingPreview);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [existingPreview, file]);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      onFileChange(dropped);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      onFileChange(selected);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-[140px] cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200 ${bgClass} ${dragging ? "border-[#203565] dark:border-white/40" : "border-gray-200 hover:border-[#203565] dark:border-white/10 dark:hover:border-white/30"}`}
      >
        {preview ? (
          <img
            src={preview}
            alt={`Vista previa ${label}`}
            className="max-h-24 max-w-full rounded-lg object-contain p-2"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
            <UploadCloud className="h-7 w-7 text-gray-300 dark:text-white/20" />
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
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#0D1030] transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
        >
          <Edit3 className="h-3.5 w-3.5" />
          Cambiar
        </button>
        <button
          onClick={onClear}
          disabled={!file}
          className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/5"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default function AppearanceSettingsSection({
  general,
  isLoading,
  isSaving,
  onSave,
}: AppearanceSettingsSectionProps) {
  const [open, setOpen] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [logoLight, setLogoLight] = useState<File | null>(null);
  const [logoDark, setLogoDark] = useState<File | null>(null);

  useEffect(() => {
    if (!general) {
      return;
    }

    setCompanyName(general.company_name || "");
    setTheme(general.theme || "light");
    setLogoLight(null);
    setLogoDark(null);
  }, [general]);

  const handleSave = async () => {
    if (!companyName.trim()) {
      showToast.warning("El nombre de la empresa es obligatorio");
      return;
    }

    const result = await onSave({
      company_name: companyName.trim(),
      theme,
      logo_light: logoLight,
      logo_dark: logoDark,
    });

    if (result.success) {
      showToast.success("Configuración de apariencia guardada correctamente");
      return;
    }

    showToast.error(result.message || "No se pudo guardar la configuración de apariencia");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#1C2347]">
      <button
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-start justify-between border-b border-gray-100 px-6 py-5 text-left transition-colors hover:bg-gray-50/70 dark:border-white/5 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#203565]/10 dark:bg-white/5">
            <Palette className="h-4 w-4 text-[#203565] dark:text-white/60" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1030] dark:text-white">Apariencia</h2>
            <p className="mt-0.5 text-xs text-gray-400 dark:text-white/40">Personaliza la identidad visual de tu empresa</p>
          </div>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 text-gray-400 transition-transform duration-300 dark:text-white/40 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {open && (
        <div className="divide-y divide-gray-100 dark:divide-white/5">
          {isLoading && (
            <div className="bg-blue-50 px-6 py-4 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
              Cargando configuración actual...
            </div>
          )}

          <div className="px-6 py-6">
            <BlockTitle
              icon={<ImageIcon className="h-4 w-4 text-[#203565] dark:text-white/60" />}
              title="Logos"
              subtitle="Sube el logo para cada tema del sitio"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <UploadZone
                label="Logo claro (tema claro)"
                file={logoLight}
                existingPreview={general?.logo_light ? getImg(general.logo_light) : null}
                onFileChange={setLogoLight}
                onClear={() => setLogoLight(null)}
                bgClass="bg-gray-50 dark:bg-white/5"
              />
              <UploadZone
                label="Logo oscuro (tema oscuro)"
                file={logoDark}
                existingPreview={general?.logo_dark ? getImg(general.logo_dark) : null}
                onFileChange={setLogoDark}
                onClear={() => setLogoDark(null)}
                bgClass="bg-[#0D1030]/5 dark:bg-[#0D1030]/40"
              />
            </div>
          </div>

          <div className="px-6 py-6">
            <BlockTitle
              icon={<Brush className="h-4 w-4 text-[#203565] dark:text-white/60" />}
              title="Información de la empresa"
              subtitle="Datos que aparecen en el sitio público"
            />
            <div className="flex max-w-sm flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0D1030] dark:text-white">Nombre de la empresa</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Ej. Yuntas"
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[#0D1030] placeholder-gray-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/20"
              />
            </div>
          </div>

          <div className="px-6 py-6">
            <BlockTitle
              icon={<Palette className="h-4 w-4 text-[#203565] dark:text-white/60" />}
              title="Tema"
              subtitle="Define el tema visual principal del sitio"
            />
            <div className="max-w-sm">
              <SelectField
                label="Tema del sitio"
                value={theme}
                onChange={setTheme}
                options={[
                  { value: "light", label: "Claro" },
                  { value: "dark", label: "Oscuro" },
                ]}
                hint="El backend guardará el tema predeterminado"
              />
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 dark:bg-white/5 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#203565] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#162548] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
