"use client";

import { Bot, ChevronDown, ChevronUp, MessageSquare, Palette, Power, Save, Settings2, Upload } from "lucide-react";
import { ChatbotPosition } from "@/types/admin/settings";
import { getImg } from "@/utils/getImg";
import { ChatbotSettingsFormConfig } from "./configuracion.types";
import ChatbotPreview from "./ChatbotPreview";

interface ChatbotSettingsSectionProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  config: ChatbotSettingsFormConfig;
  setConfig: (updater: (prev: ChatbotSettingsFormConfig) => ChatbotSettingsFormConfig) => void;
  isLoading: boolean;
  isSaving: boolean;
  onSave: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onIconUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-white dark:bg-[#1C2347]">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none shrink-0" />
      </div>
      <p className="text-xs text-gray-400 dark:text-white/40">{hint}</p>
    </div>
  );
}

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

export default function ChatbotSettingsSection({
  isOpen,
  onToggleOpen,
  config,
  setConfig,
  isLoading,
  isSaving,
  onSave,
  fileInputRef,
  onIconUpload,
}: ChatbotSettingsSectionProps) {
  const positionOptions = [
    { value: "bottom-right", label: "Abajo derecha" },
    { value: "bottom-left", label: "Abajo izquierda" },
  ];

  const showAfterOptions = [
    { value: "0", label: "Inmediatamente" },
    { value: "3", label: "3 segundos" },
    { value: "5", label: "5 segundos" },
    { value: "10", label: "10 segundos" },
    { value: "30", label: "30 segundos" },
  ];

  const closeAfterOptions = [
    { value: "never", label: "Nunca" },
    { value: "60", label: "1 min de inactividad" },
    { value: "300", label: "5 min de inactividad" },
    { value: "600", label: "10 min de inactividad" },
    { value: "1800", label: "30 min de inactividad" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#1C2347] shadow-sm overflow-hidden">
      <button
        onClick={onToggleOpen}
        className="flex w-full items-start justify-between px-6 py-5 text-left border-b border-gray-100 dark:border-white/5 transition-colors hover:bg-gray-50/70 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#203565]/10 dark:bg-white/5">
            <Bot className="w-4 h-4 text-[#203565] dark:text-white/60" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1030] dark:text-white">Chatbot</h2>
            <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Ajustes del chatbot y comportamiento</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            config.isActive
              ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
              : "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-white/40"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${config.isActive ? "bg-green-500" : "bg-gray-400"}`} />
            {config.isActive ? "Activo" : "Inactivo"}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 dark:text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
      </button>


      {isOpen && (
        <div className="divide-y divide-gray-100 dark:divide-white/5">
          {isLoading && (
            <div className="px-6 py-4 bg-blue-50 text-blue-700 text-sm dark:bg-blue-500/10 dark:text-blue-200">
              Cargando configuracion actual...
            </div>
          )}

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
                onChange={() => setConfig((current) => ({ ...current, isActive: !current.isActive }))}
              />
            </div>
          </div>

          <div className="px-6 py-6">
            <BlockTitle
              icon={<Palette className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Apariencia"
              subtitle="Personaliza el ícono, colores y posición del widget"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Columna izquierda: controles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#0D1030] dark:text-white">Ícono del chatbot</label>
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 shadow-md"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      {config.iconPreview ? (
                        <img src={getImg(config.iconPreview)} alt="icon" className="w-8 h-8 rounded-xl object-cover" />
                      ) : (
                        <Bot className="w-7 h-7 text-white" />
                      )}
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
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/svg+xml"
                      className="hidden"
                      onChange={onIconUpload}
                    />
                  </div>
                </div>

                <ColorInput
                  label="Color principal"
                  value={config.primaryColor}
                  onChange={(value) => setConfig((current) => ({ ...current, primaryColor: value }))}
                  hint="Botón flotante y elementos destacados"
                />

                <ColorInput
                  label="Color secundario"
                  value={config.secondaryColor}
                  onChange={(value) => setConfig((current) => ({ ...current, secondaryColor: value }))}
                  hint="Burbujas de mensajes del bot"
                />

                <Select
                  label="Posición en pantalla"
                  value={config.position}
                  onChange={(value) => setConfig((current) => ({ ...current, position: value as ChatbotPosition }))}
                  options={positionOptions}
                  hint="Esquina donde aparece el botón flotante"
                />
              </div>

              {/* Columna derecha: vista previa */}
              <ChatbotPreview config={config} />

            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#0D1030] dark:text-white">Ícono del chatbot</label>
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 shadow-md"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {config.iconPreview ? (
                      <img src={getImg(config.iconPreview)} alt="icon" className="w-8 h-8 rounded-xl object-cover" />
                    ) : (
                      <Bot className="w-7 h-7 text-white" />
                    )}
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
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/svg+xml"
                    className="hidden"
                    onChange={onIconUpload}
                  />
                </div>
              </div>

              <ColorInput
                label="Color principal"
                value={config.primaryColor}
                onChange={(value) => setConfig((current) => ({ ...current, primaryColor: value }))}
                hint="Botón flotante y elementos destacados"
              />

              <ColorInput
                label="Color secundario"
                value={config.secondaryColor}
                onChange={(value) => setConfig((current) => ({ ...current, secondaryColor: value }))}
                hint="Burbujas de mensajes del bot"
              />

              <Select
                label="Posición en pantalla"
                value={config.position}
                onChange={(value) => setConfig((current) => ({ ...current, position: value as ChatbotPosition }))}
                options={positionOptions}
                hint="Esquina donde aparece el botón flotante"
              />
            </div>
          </div>

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
                onChange={(e) => setConfig((current) => ({ ...current, welcomeMessage: e.target.value }))}
                maxLength={200}
                rows={3}
                className="w-full border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <p className="text-xs text-right text-gray-400 dark:text-white/40">{config.welcomeMessage.length}/200</p>
            </div>
          </div>

          <div className="px-6 py-6">
            <BlockTitle
              icon={<Settings2 className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Comportamiento"
              subtitle="Cuándo mostrar y cuándo cerrar el chat automáticamente"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Mostrar automáticamente"
                value={config.showAfterSeconds}
                onChange={(value) => setConfig((current) => ({ ...current, showAfterSeconds: value }))}
                options={showAfterOptions}
                hint="Tiempo de espera antes de abrir el chat"
              />
              <Select
                label="Cerrar automáticamente"
                value={config.closeAfterSeconds}
                onChange={(value) => setConfig((current) => ({ ...current, closeAfterSeconds: value }))}
                options={closeAfterOptions}
                hint="Tiempo sin actividad para cerrar el chat"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 dark:bg-white/5 flex justify-end">
            <button
              onClick={onSave}
              disabled={isSaving || isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#203565] hover:bg-[#162548] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-sm"
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
