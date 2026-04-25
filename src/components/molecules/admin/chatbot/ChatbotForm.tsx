'use client';

import { useState, useRef } from "react";
import {
  ChevronDown, ChevronUp, Upload, Bot,
  Palette, MessageSquare, Settings2, Power,
} from "lucide-react";

interface ChatbotConfig {
  isActive: boolean;
  primaryColor: string;
  secondaryColor: string;
  position: string;
  welcomeMessage: string;
  showAfter: string;
  closeAfter: string;
  iconPreview: string | null;
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
        checked ? "bg-blue-600" : "bg-gray-300 dark:bg-white/20"
      }`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${checked ? "translate-x-8" : "translate-x-1"}`} />
    </button>
  );
}

// ─── Color Input ──────────────────────────────────────────────────────────────
function ColorInput({ value, onChange, label, hint }: {
  value: string; onChange: (v: string) => void; label: string; hint: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>
      <div className="flex items-center gap-2 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 bg-gray-50 dark:bg-white/5 w-full">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent p-0 shrink-0"
        />
        <span className="text-sm font-mono text-[#0D1030] dark:text-white uppercase tracking-wider">{value}</span>
      </div>
      <p className="text-xs text-gray-400 dark:text-white/40">{hint}</p>
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
function Select({ value, onChange, options, label, hint }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; label: string; hint: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 pr-9 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-white dark:bg-[#1C2347]">{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none shrink-0" />
      </div>
      <p className="text-xs text-gray-400 dark:text-white/40">{hint}</p>
    </div>
  );
}

// ─── Block Title ──────────────────────────────────────────────────────────────
function BlockTitle({ icon, title, subtitle }: {
  icon: React.ReactNode; title: string; subtitle: string;
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

// ─── Divider ─────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="border-t border-gray-100 dark:border-white/5" />;
}

// ─── Main Form ────────────────────────────────────────────────────────────────
export default function ChatbotForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [config, setConfig] = useState<ChatbotConfig>({
    isActive: true,
    primaryColor: "#3D5BC9",
    secondaryColor: "#3D5BC9",
    position: "bottom-right",
    welcomeMessage: "¡Hola! Soy el asistente virtual de Yuntas.\n¿En qué puedo ayudarte hoy?",
    showAfter: "3s",
    closeAfter: "5min",
    iconPreview: null,
  });

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setConfig((c) => ({ ...c, iconPreview: URL.createObjectURL(file) }));
  };

  const positionOptions = [
    { value: "bottom-right", label: "Abajo derecha" },
    { value: "bottom-left",  label: "Abajo izquierda" },
    { value: "top-right",    label: "Arriba derecha" },
    { value: "top-left",     label: "Arriba izquierda" },
  ];

  const showAfterOptions = [
    { value: "0s",  label: "Inmediatamente" },
    { value: "3s",  label: "3 segundos" },
    { value: "5s",  label: "5 segundos" },
    { value: "10s", label: "10 segundos" },
    { value: "30s", label: "30 segundos" },
  ];

  const closeAfterOptions = [
    { value: "never", label: "Nunca" },
    { value: "1min",  label: "1 min de inactividad" },
    { value: "5min",  label: "5 min de inactividad" },
    { value: "10min", label: "10 min de inactividad" },
    { value: "30min", label: "30 min de inactividad" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#1C2347] shadow-sm overflow-hidden">

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-5 cursor-pointer select-none border-b border-gray-100 dark:border-white/5"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="flex items-center gap-3">
          {/* Badge estado */}
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
            config.isActive
              ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
              : "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-white/40"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.isActive ? "bg-green-500" : "bg-gray-400"}`} />
            {config.isActive ? "Activo" : "Inactivo"}
          </span>
          <h2 className="text-lg font-bold text-[#0D1030] dark:text-white">Configuración del Chatbot</h2>
        </div>
        <button className="text-gray-400 dark:text-white/40">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="divide-y divide-gray-100 dark:divide-white/5">

          {/* Estado */}
          <div className="px-6 py-6">
            <BlockTitle
              icon={<Power className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Estado"
              subtitle="Activa o desactiva la visibilidad del chatbot"
            />
            <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 px-4 py-3.5">
              <div>
                <p className="text-sm font-semibold text-[#0D1030] dark:text-white">Chatbot activo</p>
                <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Visible para todos los usuarios del sitio</p>
              </div>
              <Toggle
                checked={config.isActive}
                onChange={() => setConfig((c) => ({ ...c, isActive: !c.isActive }))}
              />
            </div>
          </div>

          {/* Apariencia */}
          <div className="px-6 py-6">
            <BlockTitle
              icon={<Palette className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Apariencia"
              subtitle="Personaliza el ícono, colores y posición del widget"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Ícono */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#0D1030] dark:text-white">Ícono del chatbot</label>
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 shadow-md"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {config.iconPreview
                      ? <img src={config.iconPreview} alt="icon" className="w-8 h-8 rounded-xl object-cover" />
                      : <Bot className="w-7 h-7 text-white" />
                    }
                  </div>
                  <div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0D1030] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Cambiar ícono
                    </button>
                    <p className="text-xs text-gray-400 dark:text-white/40 mt-1.5">PNG o SVG · 512×512px recomendado</p>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/png,image/svg+xml" className="hidden" onChange={handleIconUpload} />
                </div>
              </div>

              <ColorInput label="Color principal" value={config.primaryColor}
                onChange={(v) => setConfig((c) => ({ ...c, primaryColor: v }))}
                hint="Botón flotante y elementos destacados" />

              <ColorInput label="Color secundario" value={config.secondaryColor}
                onChange={(v) => setConfig((c) => ({ ...c, secondaryColor: v }))}
                hint="Burbujas de mensajes del bot" />

              <Select label="Posición en pantalla" value={config.position}
                onChange={(v) => setConfig((c) => ({ ...c, position: v }))}
                options={positionOptions} hint="Esquina donde aparece el botón flotante" />
            </div>
          </div>

          {/*  Mensaje de bienvenida */}
          <div className="px-6 py-6">
            <BlockTitle
              icon={<MessageSquare className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Mensaje de bienvenida"
              subtitle="Primer mensaje que verá el usuario al abrir el chat"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0D1030] dark:text-white">Mensaje</label>
              <textarea
                value={config.welcomeMessage}
                onChange={(e) => setConfig((c) => ({ ...c, welcomeMessage: e.target.value }))}
                maxLength={200}
                rows={3}
                className="w-full border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <p className="text-xs text-right text-gray-400 dark:text-white/40">
                {config.welcomeMessage.length}/200
              </p>
            </div>
          </div>

          {/* ── Comportamiento ── */}
          <div className="px-6 py-6">
            <BlockTitle
              icon={<Settings2 className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Comportamiento"
              subtitle="Cuándo mostrar y cuándo cerrar el chat automáticamente"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Mostrar automáticamente" value={config.showAfter}
                onChange={(v) => setConfig((c) => ({ ...c, showAfter: v }))}
                options={showAfterOptions} hint="Tiempo de espera antes de abrir el chat" />
              <Select label="Cerrar automáticamente" value={config.closeAfter}
                onChange={(v) => setConfig((c) => ({ ...c, closeAfter: v }))}
                options={closeAfterOptions} hint="Tiempo sin actividad para cerrar el chat" />
            </div>
          </div>

          {/* ── Footer / Guardar ── */}
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