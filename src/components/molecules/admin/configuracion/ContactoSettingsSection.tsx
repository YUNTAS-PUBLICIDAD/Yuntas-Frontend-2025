"use client";

import { useEffect, useState, type ReactNode } from "react";
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
import {
  BusinessHours,
  ContactSettings,
  SettingsServiceResponse,
  SocialLink,
  UpdateContactSettingsInput,
} from "@/types/admin/settings";
import { showToast } from "@/utils/showToast";

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

interface ContactoSettingsSectionProps {
  contact: ContactSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  onSave: (
    payload: UpdateContactSettingsInput
  ) => Promise<SettingsServiceResponse<ContactSettings>>;
}

const DEFAULT_CONFIG: ContactoConfig = {
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
};

const DAY_LABELS = {
  lunesViernes: "Lunes - Viernes",
  sabado: "Sábado",
  domingo: "Domingo",
} as const;

const SOCIAL_PLATFORMS = ["facebook", "tiktok", "instagram", "youtube"] as const;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function splitPhone(phone: string | null | undefined) {
  const trimmed = phone?.trim() || "";

  if (!trimmed) {
    return { codigoPais: "+51", telefono: "" };
  }

  const match = trimmed.match(/^(\+\d{1,4})(?:\s+(.*))?$/);
  if (match) {
    return {
      codigoPais: match[1],
      telefono: match[2] || "",
    };
  }

  return {
    codigoPais: "+51",
    telefono: trimmed,
  };
}

function mapBusinessHoursToForm(hours: BusinessHours[] | null | undefined) {
  const getHour = (label: string, fallback: HorarioDia): HorarioDia => {
    const found = hours?.find((item) => normalizeText(item.day) === normalizeText(label));

    if (!found) {
      return fallback;
    }

    const closed = !found.start_time || !found.end_time;

    return {
      desde: found.start_time || fallback.desde,
      hasta: found.end_time || fallback.hasta,
      cerrado: closed,
    };
  };

  return {
    lunesViernes: getHour(DAY_LABELS.lunesViernes, DEFAULT_CONFIG.horario.lunesViernes),
    sabado: getHour(DAY_LABELS.sabado, DEFAULT_CONFIG.horario.sabado),
    domingo: getHour(DAY_LABELS.domingo, DEFAULT_CONFIG.horario.domingo),
  };
}

function mapSocialLinksToForm(links: SocialLink[] | null | undefined) {
  return SOCIAL_PLATFORMS.reduce(
    (accumulator, platform) => {
      const found = links?.find((item) => normalizeText(item.platform) === normalizeText(platform));
      accumulator[platform] = found?.url || "";
      return accumulator;
    },
    {
      facebook: "",
      tiktok: "",
      instagram: "",
      youtube: "",
    }
  );
}

function mapContactToForm(contact: ContactSettings | null): ContactoConfig {
  if (!contact) {
    return DEFAULT_CONFIG;
  }

  const { codigoPais, telefono } = splitPhone(contact.phone);

  return {
    codigoPais,
    telefono,
    correo: contact.email || "",
    direccion: contact.address || "",
    horario: mapBusinessHoursToForm(contact.business_hours),
    mensajeWhatsapp: contact.whatsapp_message || DEFAULT_CONFIG.mensajeWhatsapp,
    redes: mapSocialLinksToForm(contact.social_links),
    mostrarFooter: contact.show_in_footer,
    mostrarPaginaContacto: contact.show_contact_page,
    mapaUrl: contact.map_url || "",
  };
}

function buildBusinessHoursPayload(horario: ContactoConfig["horario"]): BusinessHours[] {
  return [
    {
      day: DAY_LABELS.lunesViernes,
      start_time: horario.lunesViernes.cerrado ? "" : horario.lunesViernes.desde,
      end_time: horario.lunesViernes.cerrado ? "" : horario.lunesViernes.hasta,
    },
    {
      day: DAY_LABELS.sabado,
      start_time: horario.sabado.cerrado ? "" : horario.sabado.desde,
      end_time: horario.sabado.cerrado ? "" : horario.sabado.hasta,
    },
    {
      day: DAY_LABELS.domingo,
      start_time: horario.domingo.cerrado ? "" : horario.domingo.desde,
      end_time: horario.domingo.cerrado ? "" : horario.domingo.hasta,
    },
  ];
}

function buildSocialLinksPayload(redes: ContactoConfig["redes"]): SocialLink[] | null {
  const links = SOCIAL_PLATFORMS
    .map((platform) => ({ platform, url: redes[platform].trim() }))
    .filter((item) => item.url.length > 0);

  return links.length > 0 ? links : null;
}

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

function Field({ label, hint, children }: { label?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>}
      {children}
      {hint && <p className="text-xs text-gray-400 dark:text-white/30">{hint}</p>}
    </div>
  );
}

function Input({
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="relative flex items-center">
      {icon && <span className="pointer-events-none absolute left-3 text-gray-400 dark:text-white/30">{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm text-[#0D1030] placeholder-gray-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/20 dark:focus:ring-white/20 ${icon ? "pl-9 pr-4" : "px-4"}`}
      />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-[#41effb]" : "bg-gray-200 dark:bg-white/10"}`}
    >
      <span
        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

function HorarioRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: HorarioDia;
  onChange: (value: HorarioDia) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-2.5">
      <span className="w-28 shrink-0 text-sm text-[#0D1030] dark:text-white">{label}</span>
      {value.cerrado ? (
        <span className="flex-1 italic text-sm text-gray-400 dark:text-white/30">Cerrado</span>
      ) : (
        <div className="flex flex-1 items-center gap-2">
          <input
            type="time"
            value={value.desde}
            onChange={(e) => onChange({ ...value, desde: e.target.value })}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-[#0D1030] focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-white/20"
          />
          <span className="text-sm text-gray-400 dark:text-white/30">a</span>
          <input
            type="time"
            value={value.hasta}
            onChange={(e) => onChange({ ...value, hasta: e.target.value })}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-[#0D1030] focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-white/20"
          />
        </div>
      )}
      <div className="ml-auto flex items-center gap-2">
        <Toggle checked={value.cerrado} onChange={(cerrado) => onChange({ ...value, cerrado })} />
        <span className="text-xs text-gray-400 dark:text-white/30">Cerrado</span>
      </div>
    </div>
  );
}

function VistaPrevia({ config }: { config: ContactoConfig }) {
  const formatTime = (time: string) => {
    if (!time) {
      return "";
    }

    const [hourText, minuteText] = time.split(":");
    const hour = Number.parseInt(hourText, 10);
    return `${hour > 12 ? hour - 12 : hour || 12}:${minuteText} ${hour >= 12 ? "PM" : "AM"}`;
  };

  const horarioTexto = (dia: HorarioDia) => (dia.cerrado ? "Cerrado" : `${formatTime(dia.desde)} – ${formatTime(dia.hasta)}`);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30">Vista previa</p>
      <p className="mb-2 text-xs text-gray-400 dark:text-white/30">Así se verá en tu sitio web</p>
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0D1030]/40">
        <h4 className="text-sm font-bold text-[#0D1030] dark:text-white">Contáctanos</h4>

        {config.telefono && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/10">
              <WhatsAppIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0D1030] dark:text-white">Whatsapp</p>
              <p className="text-xs text-gray-500 dark:text-white/40">
                {config.codigoPais} {config.telefono}
              </p>
            </div>
          </div>
        )}

        {config.correo && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/10">
              <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0D1030] dark:text-white">Correo</p>
              <p className="text-xs text-gray-500 dark:text-white/40">{config.correo}</p>
            </div>
          </div>
        )}

        {config.direccion && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-500/10">
              <MapPin className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0D1030] dark:text-white">Dirección</p>
              <p className="text-xs text-gray-500 dark:text-white/40">{config.direccion}</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#0D1030] dark:text-white">Horario de atención</p>
            <p className="text-xs text-gray-500 dark:text-white/40">
              Lunes - Viernes: {horarioTexto(config.horario.lunesViernes)}
            </p>
            <p className="text-xs text-gray-500 dark:text-white/40">Sábado: {horarioTexto(config.horario.sabado)}</p>
            <p className="text-xs text-gray-500 dark:text-white/40">Domingo: {horarioTexto(config.horario.domingo)}</p>
          </div>
        </div>

        {config.telefono && (
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3 text-xs font-semibold text-white transition-colors hover:bg-green-600">
            <WhatsAppIcon className="h-4 w-4" />
            Escríbenos por WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}

export default function ContactoSettingsSection({
  contact,
  isLoading,
  isSaving,
  onSave,
}: ContactoSettingsSectionProps) {
  const [open, setOpen] = useState(true);
  const [config, setConfig] = useState<ContactoConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    setConfig(mapContactToForm(contact));
  }, [contact]);

  const set = <K extends keyof ContactoConfig>(key: K, value: ContactoConfig[K]) =>
    setConfig((current) => ({ ...current, [key]: value }));

  const handleSave = async () => {
    const phone = `${config.codigoPais.trim()} ${config.telefono.trim()}`.trim();

    const payload: UpdateContactSettingsInput = {
      phone: phone || null,
      email: config.correo.trim() || null,
      address: config.direccion.trim() || null,
      business_hours: buildBusinessHoursPayload(config.horario),
      social_links: buildSocialLinksPayload(config.redes),
      whatsapp_message: config.mensajeWhatsapp.trim() || null,
      show_in_footer: config.mostrarFooter,
      show_contact_page: config.mostrarPaginaContacto,
      map_url: config.mapaUrl.trim() || null,
    };

    const result = await onSave(payload);

    if (result.success) {
      showToast.success("Configuración de contacto guardada correctamente");
      return;
    }

    showToast.error(result.message || "No se pudo guardar la configuración de contacto");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#1C2347]">
      <button
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-start justify-between border-b border-gray-100 px-6 py-5 text-left transition-colors hover:bg-gray-50/70 dark:border-white/5 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#203565]/10 dark:bg-white/5">
            <Phone className="h-4 w-4 text-[#203565] dark:text-white/60" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1030] dark:text-white">Contacto</h2>
            <p className="mt-0.5 text-xs text-gray-400 dark:text-white/40">
              Configura la información de contacto y canales de comunicación
            </p>
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
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <BlockTitle
                  icon={<Phone className="h-4 w-4 text-[#203565] dark:text-white/60" />}
                  title="Información principal"
                  subtitle="Estos datos se mostrarán en tu sitio web"
                />
                <div className="flex flex-col gap-4">
                  <Field label="Teléfono / WhatsApp" hint="Este número se usará para enlaces de WhatsApp">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.codigoPais}
                        onChange={(e) => set("codigoPais", e.target.value)}
                        className="w-20 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-center text-sm text-[#0D1030] focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-white/20"
                      />
                      <Input
                        icon={<Phone className="h-4 w-4" />}
                        value={config.telefono}
                        onChange={(value) => set("telefono", value)}
                        placeholder="Ej: 999 888 777"
                        type="tel"
                      />
                    </div>
                  </Field>
                  <Field label="Correo electrónico" hint="Este correo se mostrará como contacto personal">
                    <Input
                      icon={<Mail className="h-4 w-4" />}
                      value={config.correo}
                      onChange={(value) => set("correo", value)}
                      placeholder="Ej: example@gmail.com"
                      type="email"
                    />
                  </Field>
                  <Field label="Dirección" hint="Dirección de tu tienda o empresa">
                    <Input
                      icon={<MapPin className="h-4 w-4" />}
                      value={config.direccion}
                      onChange={(value) => set("direccion", value)}
                      placeholder="Ej: Av. Los Próceres 123, Santiago de Surco, Lima, Perú"
                    />
                  </Field>
                  <Field label="Horario de atención">
                    <div className="flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50 px-3 dark:divide-white/5 dark:border-white/5 dark:bg-white/5">
                      <HorarioRow
                        label="Lunes - Viernes"
                        value={config.horario.lunesViernes}
                        onChange={(value) => set("horario", { ...config.horario, lunesViernes: value })}
                      />
                      <HorarioRow
                        label="Sábado"
                        value={config.horario.sabado}
                        onChange={(value) => set("horario", { ...config.horario, sabado: value })}
                      />
                      <HorarioRow
                        label="Domingo"
                        value={config.horario.domingo}
                        onChange={(value) => set("horario", { ...config.horario, domingo: value })}
                      />
                    </div>
                  </Field>
                </div>
              </div>

              <VistaPrevia config={config} />
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <BlockTitle
                  icon={<MessageCircle className="h-4 w-4 text-[#203565] dark:text-white/60" />}
                  title="Mensaje por defecto para WhatsApp"
                  subtitle="Mensaje que se enviará automáticamente al hacer click en WhatsApp"
                />
                <div className="relative">
                  <textarea
                    value={config.mensajeWhatsapp}
                    onChange={(e) => set("mensajeWhatsapp", e.target.value)}
                    maxLength={200}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#0D1030] transition-shadow focus:outline-none focus:ring-2 focus:ring-[#203565]/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/20 dark:focus:ring-white/20"
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-white/30">
                    {config.mensajeWhatsapp.length}/200
                  </span>
                </div>
              </div>

              <div>
                <BlockTitle
                  icon={<Settings2 className="h-4 w-4 text-[#203565] dark:text-white/60" />}
                  title="Opciones adicionales"
                  subtitle="Configuración extra de contacto"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5">
                    <div>
                      <p className="text-sm font-semibold text-[#0D1030] dark:text-white">Mostrar en el footer</p>
                      <p className="mt-0.5 text-xs text-gray-400 dark:text-white/30">
                        Mostrar la información de contacto en el pie de página
                      </p>
                    </div>
                    <Toggle checked={config.mostrarFooter} onChange={(value) => set("mostrarFooter", value)} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5">
                    <div>
                      <p className="text-sm font-semibold text-[#0D1030] dark:text-white">Mostrar en la página de contacto</p>
                      <p className="mt-0.5 text-xs text-gray-400 dark:text-white/30">
                        Habilitar la página de contacto en el sitio
                      </p>
                    </div>
                    <Toggle checked={config.mostrarPaginaContacto} onChange={(value) => set("mostrarPaginaContacto", value)} />
                  </div>
                  <Field label="Mapa de ubicación (Google Maps)" hint="Enlace de Google Maps para mostrar la ubicación">
                    <Input
                      icon={<ExternalLink className="h-4 w-4" />}
                      value={config.mapaUrl}
                      onChange={(value) => set("mapaUrl", value)}
                      placeholder="Ej: https://maps.google.com/?q=Av.+Los+Proceres"
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <BlockTitle
              icon={<Share2 className="h-4 w-4 text-[#203565] dark:text-white/60" />}
              title="Redes sociales"
              subtitle="Enlaces a tus redes sociales (opcionales)"
            />
            <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Facebook">
                <Input
                  icon={<FacebookIcon className="h-4 w-4 text-[#1877F2]" />}
                  value={config.redes.facebook}
                  onChange={(value) => set("redes", { ...config.redes, facebook: value })}
                  placeholder="Ej: https://facebook.com/tupagina"
                />
              </Field>
              <Field label="TikTok">
                <Input
                  icon={<TikTokIcon className="h-4 w-4 text-[#0D1030] dark:text-white" />}
                  value={config.redes.tiktok}
                  onChange={(value) => set("redes", { ...config.redes, tiktok: value })}
                  placeholder="Ej: https://tiktok.com/@tuperfil"
                />
              </Field>
              <Field label="Instagram">
                <Input
                  icon={<InstagramIcon className="h-4 w-4 text-[#E4405F]" />}
                  value={config.redes.instagram}
                  onChange={(value) => set("redes", { ...config.redes, instagram: value })}
                  placeholder="Ej: https://instagram.com/tuperfil"
                />
              </Field>
              <Field label="YouTube">
                <Input
                  icon={<YouTubeIcon className="h-4 w-4 text-[#FF0000]" />}
                  value={config.redes.youtube}
                  onChange={(value) => set("redes", { ...config.redes, youtube: value })}
                  placeholder="Ej: https://youtube.com/@tucanal"
                />
              </Field>
            </div>
          </div>

          <div className="flex justify-end bg-gray-50 px-6 py-4 dark:bg-white/5">
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="rounded-xl bg-[#203565] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#162548] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
