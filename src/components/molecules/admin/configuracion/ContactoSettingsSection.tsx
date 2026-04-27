"use client";

import { useState } from "react";
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Share2,
  Settings2,
  ExternalLink,
} from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface HorarioDia {
  desde: string;
  hasta: string;
  cerrado: boolean;
}

interface ContactoConfig {
  codigoPais: string;
  telefono: string;
  correo: string;
  direccion: string;
  horario: {
    lunesViernes: HorarioDia;
    sabado: HorarioDia;
    domingo: HorarioDia;
  };
  mensajeWhatsapp: string;
  redes: {
    facebook: string;
    tiktok: string;
    instagram: string;
    youtube: string;
  };
  mostrarFooter: boolean;
  mostrarPaginaContacto: boolean;
  mapaUrl: string;
}

// ─── SVG Iconos ────────────────────────────────────────────────────────
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

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

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, hint, children }: { label?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>}
      {children}
      {hint && <p className="text-xs text-gray-400 dark:text-white/30">{hint}</p>}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
function Input({ icon, value, onChange, placeholder, type = "text" }: {
  icon?: React.ReactNode; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div className="relative flex items-center">
      {icon && <span className="absolute left-3 text-gray-400 dark:text-white/30 pointer-events-none">{icon}</span>}
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full border border-gray-200 dark:border-white/10 rounded-xl py-2.5 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white placeholder-gray-300 dark:placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:focus:ring-white/20 transition-shadow ${icon ? "pl-9 pr-4" : "px-4"}`}
      />
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${checked ? "bg-[#41effb]" : "bg-gray-200 dark:bg-white/10"}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

// ─── Horario Row ──────────────────────────────────────────────────────────────
function HorarioRow({ label, value, onChange }: {
  label: string; value: HorarioDia; onChange: (v: HorarioDia) => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap py-2.5">
      <span className="text-sm text-[#0D1030] dark:text-white w-28 shrink-0">{label}</span>
      {value.cerrado ? (
        <span className="text-sm text-gray-400 dark:text-white/30 italic flex-1">Cerrado</span>
      ) : (
        <div className="flex items-center gap-2 flex-1">
          <input type="time" value={value.desde}
            onChange={(e) => onChange({ ...value, desde: e.target.value })}
            className="border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:focus:ring-white/20"
          />
          <span className="text-sm text-gray-400 dark:text-white/30">a</span>
          <input type="time" value={value.hasta}
            onChange={(e) => onChange({ ...value, hasta: e.target.value })}
            className="border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:focus:ring-white/20"
          />
        </div>
      )}
      <div className="flex items-center gap-2 ml-auto">
        <Toggle checked={value.cerrado} onChange={(cerrado) => onChange({ ...value, cerrado })} />
        <span className="text-xs text-gray-400 dark:text-white/30">Cerrado</span>
      </div>
    </div>
  );
}

// ─── Vista previa ─────────────────────────────────────────────────────────────
function VistaPrevia({ config }: { config: ContactoConfig }) {
  const formatTime = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  };
  const horarioTexto = (dia: HorarioDia) =>
    dia.cerrado ? "Cerrado" : `${formatTime(dia.desde)} – ${formatTime(dia.hasta)}`;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest">Vista previa</p>
      <p className="text-xs text-gray-400 dark:text-white/30 mb-2">Así se verá en tu sitio web</p>
      <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0D1030]/40 p-5 space-y-4">
        <h4 className="text-sm font-bold text-[#0D1030] dark:text-white">Contáctanos</h4>

        {config.telefono && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0D1030] dark:text-white">Whatsapp</p>
              <p className="text-xs text-gray-500 dark:text-white/40">{config.codigoPais} {config.telefono}</p>
            </div>
          </div>
        )}

        {config.correo && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0D1030] dark:text-white">Correo</p>
              <p className="text-xs text-gray-500 dark:text-white/40">{config.correo}</p>
            </div>
          </div>
        )}

        {config.direccion && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0D1030] dark:text-white">Dirección</p>
              <p className="text-xs text-gray-500 dark:text-white/40">{config.direccion}</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#0D1030] dark:text-white">Horario de atención</p>
            <p className="text-xs text-gray-500 dark:text-white/40">Lunes - Viernes: {horarioTexto(config.horario.lunesViernes)}</p>
            <p className="text-xs text-gray-500 dark:text-white/40">Sábado: {horarioTexto(config.horario.sabado)}</p>
            <p className="text-xs text-gray-500 dark:text-white/40">Domingo: {horarioTexto(config.horario.domingo)}</p>
          </div>
        </div>

        {config.telefono && (
          <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-xl py-3 transition-colors">
            <WhatsAppIcon className="w-4 h-4" />
            Escríbenos por WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactoSettingsSection() {
  const [open, setOpen] = useState(true);
  const [config, setConfig] = useState<ContactoConfig>({
    codigoPais: "+51",
    telefono: "",
    correo: "",
    direccion: "",
    horario: {
      lunesViernes: { desde: "09:00", hasta: "18:00", cerrado: false },
      sabado: { desde: "09:00", hasta: "13:00", cerrado: false },
      domingo: { desde: "09:00", hasta: "13:00", cerrado: true },
    },
    mensajeWhatsapp: "¡Hola! 👋\nMe gustaría obtener más información.",
    redes: { facebook: "", tiktok: "", instagram: "", youtube: "" },
    mostrarFooter: true,
    mostrarPaginaContacto: true,
    mapaUrl: "",
  });

  const set = <K extends keyof ContactoConfig>(key: K, value: ContactoConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#1C2347] shadow-sm overflow-hidden">

      {/*Header*/}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between px-6 py-5 text-left border-b border-gray-100 dark:border-white/5 transition-colors hover:bg-gray-50/70 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#203565]/10 dark:bg-white/5">
            <Phone className="w-4 h-4 text-[#203565] dark:text-white/60" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1030] dark:text-white">Contacto</h2>
            <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">
              Configura la información de contacto y canales de comunicación
            </p>
          </div>
        </div>
        <ChevronDown className={`mt-1 w-5 h-5 text-gray-400 dark:text-white/40 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      {open && (
        <div className="divide-y divide-gray-100 dark:divide-white/5">

          {/* Información principal + Vista previa*/}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              <div>
                <BlockTitle
                  icon={<Phone className="w-4 h-4 text-[#203565] dark:text-white/60" />}
                  title="Información principal"
                  subtitle="Estos datos se mostrarán en tu sitio web"
                />
                <div className="flex flex-col gap-4">
                  <Field label="Teléfono / WhatsApp" hint="Este número se usará para enlaces de WhatsApp">
                    <div className="flex gap-2">
                      <input
                        type="text" value={config.codigoPais}
                        onChange={(e) => set("codigoPais", e.target.value)}
                        className="w-20 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:focus:ring-white/20"
                      />
                      <Input
                        icon={<Phone className="w-4 h-4" />}
                        value={config.telefono} onChange={(v) => set("telefono", v)}
                        placeholder="Ej: 999 888 777" type="tel"
                      />
                    </div>
                  </Field>
                  <Field label="Correo electrónico" hint="Este correo se mostrará como contacto personal">
                    <Input icon={<Mail className="w-4 h-4" />} value={config.correo}
                      onChange={(v) => set("correo", v)} placeholder="Ej: example@gmail.com" type="email" />
                  </Field>
                  <Field label="Dirección" hint="Dirección de tu tienda o empresa">
                    <Input icon={<MapPin className="w-4 h-4" />} value={config.direccion}
                      onChange={(v) => set("direccion", v)}
                      placeholder="Ej: Av. Los Próceres 123, Santiago de Surco, Lima, Perú" />
                  </Field>
                  <Field label="Horario de atención">
                    <div className="flex flex-col divide-y divide-gray-100 dark:divide-white/5 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 px-3">
                      <HorarioRow label="Lunes - Viernes" value={config.horario.lunesViernes}
                        onChange={(v) => set("horario", { ...config.horario, lunesViernes: v })} />
                      <HorarioRow label="Sábado" value={config.horario.sabado}
                        onChange={(v) => set("horario", { ...config.horario, sabado: v })} />
                      <HorarioRow label="Domingo" value={config.horario.domingo}
                        onChange={(v) => set("horario", { ...config.horario, domingo: v })} />
                    </div>
                  </Field>
                </div>
              </div>
             
              <VistaPrevia config={config} />
            </div>
          </div>

         
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Mensaje WhatsApp */}
              <div>
                <BlockTitle
                  icon={<MessageCircle className="w-4 h-4 text-[#203565] dark:text-white/60" />}
                  title="Mensaje por defecto para WhatsApp"
                  subtitle="Mensaje que se enviará automáticamente al hacer click en WhatsApp"
                />
                <div className="relative">
                  <textarea
                    value={config.mensajeWhatsapp}
                    onChange={(e) => set("mensajeWhatsapp", e.target.value)}
                    maxLength={200} rows={4}
                    className="w-full border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white placeholder-gray-300 dark:placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:focus:ring-white/20 resize-none transition-shadow"
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-white/30">
                    {config.mensajeWhatsapp.length}/200
                  </span>
                </div>
              </div>

              {/* Opciones adicionales */}
              <div>
                <BlockTitle
                  icon={<Settings2 className="w-4 h-4 text-[#203565] dark:text-white/60" />}
                  title="Opciones adicionales"
                  subtitle="Configuración extra de contacto"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
                    <div>
                      <p className="text-sm font-semibold text-[#0D1030] dark:text-white">Mostrar en el footer</p>
                      <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">Mostrar la información de contacto en el pie de página</p>
                    </div>
                    <Toggle checked={config.mostrarFooter} onChange={(v) => set("mostrarFooter", v)} />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
                    <div>
                      <p className="text-sm font-semibold text-[#0D1030] dark:text-white">Mostrar en la página de contacto</p>
                      <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">Habilitar la página de contacto en el sitio</p>
                    </div>
                    <Toggle checked={config.mostrarPaginaContacto} onChange={(v) => set("mostrarPaginaContacto", v)} />
                  </div>
                  <Field label="Mapa de ubicación (Google Maps)" hint="Enlace de Google Maps para mostrar la ubicación">
                    <Input
                      icon={<ExternalLink className="w-4 h-4" />}
                      value={config.mapaUrl} onChange={(v) => set("mapaUrl", v)}
                      placeholder="Ej: https://maps.google.com/?q=Av.+Los+Proceres"
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>

          {/*Redes sociales*/}
          <div className="px-6 py-6">
            <BlockTitle
              icon={<Share2 className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Redes sociales"
              subtitle="Enlaces a tus redes sociales (opcionales)"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <Field label="Facebook">
                <Input icon={<FacebookIcon className="w-4 h-4 text-[#1877F2]" />}
                  value={config.redes.facebook}
                  onChange={(v) => set("redes", { ...config.redes, facebook: v })}
                  placeholder="Ej: https://facebook.com/tupagina" />
              </Field>
              <Field label="TikTok">
                <Input icon={<TikTokIcon className="w-4 h-4 text-[#0D1030] dark:text-white" />}
                  value={config.redes.tiktok}
                  onChange={(v) => set("redes", { ...config.redes, tiktok: v })}
                  placeholder="Ej: https://tiktok.com/@tuperfil" />
              </Field>
              <Field label="Instagram">
                <Input icon={<InstagramIcon className="w-4 h-4 text-[#E4405F]" />}
                  value={config.redes.instagram}
                  onChange={(v) => set("redes", { ...config.redes, instagram: v })}
                  placeholder="Ej: https://instagram.com/tuperfil" />
              </Field>
              <Field label="YouTube">
                <Input icon={<YouTubeIcon className="w-4 h-4 text-[#FF0000]" />}
                  value={config.redes.youtube}
                  onChange={(v) => set("redes", { ...config.redes, youtube: v })}
                  placeholder="Ej: https://youtube.com/@tucanal" />
              </Field>
            </div>
          </div>

          {/*Footer*/}
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