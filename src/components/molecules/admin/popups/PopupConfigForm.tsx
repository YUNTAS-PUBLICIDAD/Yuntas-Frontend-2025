'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from "@/components/atoms/Button";
import PopupRenderer from '@/components/molecules/PopupRenderer';
import { Popup, PopupImage } from '@/types/admin/popup';
import { LeadInput } from '@/types/admin/lead';
import { showToast } from '@/utils/showToast';
import { api, API_ENDPOINTS } from '@/config';
import { sourceData } from '@/data/popup/sourceData';
import { Monitor, Save, Smartphone, X, ChevronDown, Layout, Type, Image as ImageIcon, Timer, Power, Palette } from 'lucide-react';

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL || "http://localhost:8000").replace(/\/$/, "");

// ─── Componentes de UI Locales (Estilo Configuración) ────────────────────────
function BlockTitle({
  icon,
  title,
  subtitle,
  className = "mb-5",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#203565]/10 dark:bg-white/5 shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-base font-bold text-[#0D1030] dark:text-white truncate">{title}</h3>
        <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5 truncate">{subtitle}</p>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none shrink-0 ${
        checked ? "bg-[#6DE1E3]" : "bg-gray-300 dark:bg-white/20"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked ? "translate-x-8" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function ColorInput({
  value,
  onChange,
  label,
  disabled
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${disabled ? 'opacity-50' : ''}`}>
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>
      <div className="flex items-center gap-2 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 bg-gray-50 dark:bg-white/5 w-full">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent p-0 shrink-0 disabled:cursor-not-allowed"
        />
        <span className="text-sm font-mono text-[#0D1030] dark:text-white uppercase tracking-wider truncate">
          {value}
        </span>
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  label,
  hint,
  disabled
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
  hint: string;
  disabled?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${disabled ? 'opacity-50' : ''}`}>
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 pr-9 bg-gray-50 dark:bg-white/5 text-sm text-[#0D1030] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 truncate disabled:cursor-not-allowed"
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

function Input({
  value,
  onChange,
  label,
  placeholder,
  hint,
  disabled
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${disabled ? 'opacity-50' : ''}`}>
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[#0D1030] placeholder-gray-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/20 disabled:cursor-not-allowed"
      />
      {hint && <p className="text-xs text-gray-400 dark:text-white/40 truncate">{hint}</p>}
    </div>
  );
}

function getFileNameFromPath(path?: string) {
  if (!path) return '';

  const cleanPath = path.split('?')[0].split('#')[0];
  const parts = cleanPath.split(/[\\/]/).filter(Boolean);

  return parts[parts.length - 1] || '';
}

function ImagePreview({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
      {src ? (
        <img src={src} alt={alt} className="h-32 w-full object-cover" />
      ) : (
        <div className="flex h-32 w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 text-slate-400 dark:from-white/10 dark:via-white/5 dark:to-white/10">
          <ImageIcon className="h-8 w-8" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Sin imagen</span>
        </div>
      )}
      <div className="border-t border-gray-200 px-3 py-2 text-xs text-gray-500 dark:border-white/10 dark:text-white/50">
        <p className="font-semibold text-[#0D1030] dark:text-white">{title}</p>
        <p className="truncate">{alt}</p>
      </div>
    </div>
  );
}

interface PopupConfigFormProps {
  initialData?: Popup | null;
  onSubmit: (data: Popup) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
  pageTarget: "inicio" | "product-detail";
}

export default function PopupConfigForm({ initialData, onSubmit, onCancel, isSaving, pageTarget }: PopupConfigFormProps) {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonColor, setButtonColor] = useState('#6DE1E3');
  const [delaySeconds, setDelaySeconds] = useState('5');

  const [desktopImageId, setDesktopImageId] = useState<number | undefined>(undefined);
  const [desktopImgSrc, setDesktopImgSrc] = useState('');
  const [desktopImageFile, setDesktopImageFile] = useState<File | null>(null);
  const [desktopImageName, setDesktopImageName] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  const [textImageId, setTextImageId] = useState<number | undefined>(undefined);
  const [textImgSrc, setTextImgSrc] = useState('');
  const [textImageFile, setTextImageFile] = useState<File | null>(null);
  const [textImageName, setTextImageName] = useState('');

  const [mobileImageId, setMobileImageId] = useState<number | undefined>(undefined);
  const [mobileImgSrc, setMobileImgSrc] = useState('');
  const [mobileImageFile, setMobileImageFile] = useState<File | null>(null);
  const [mobileImageName, setMobileImageName] = useState('');
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");

  const [products, setProducts] = useState<{id: number; name:string}[]>([]);

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewScale, setPreviewScale] = useState(1);
  const [previewFormData, setPreviewFormData] = useState<LeadInput>({
    name: '',
    phone: '',
    email: '',
    source_id: 1,
  });
  const previewCanvasRef = useRef<HTMLDivElement>(null);
  const desktopFileInputRef = useRef<HTMLInputElement>(null);
  const textFileInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);

  const popupBaseSize = previewMode === 'desktop'
    ? { width: 672, height: 535 }
    : { width: 350, height: 536 };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const res = await api.get(API_ENDPOINTS.PRODUCTS.GET_ALL) ;
       const fetched = res.data?.data?.data;
       if(Array.isArray(fetched)){
         setProducts(fetched);
       }else {
         setProducts([]);
       }
      }catch(err){
        console.error('Error cargando productos', err);
      }
    };
    fetchProducts();
  }, []);

  const validateWebp = (file: File): boolean => {
    const isWebpMime = file.type === "image/webp";
    const isWebpExt = file.name.toLowerCase().endsWith(".webp");

    if(!isWebpMime || !isWebpExt){
      showToast.error("Solo se permiten imágenes en formato WEBP.");
      return false;
    }
    return true;
  }

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initialData || initializedRef.current)  return;
      setActive(initialData.active !== undefined ? initialData.active : false);
      setTitle(initialData.title || '');
      setButtonText(initialData.button_text || '');
      setButtonTextColor(initialData.button_text_color || '#FFFFFF');
      setDelaySeconds(initialData.delay_seconds?.toString() || '5');
      setButtonColor(initialData.button_color || '#6DE1E3');
      setDesktopImageName('');
      setTextImageName('');
      setMobileImageName('');

      if (initialData.images && initialData.images.length > 0) {
        const dLeft = initialData.images.find(i => i.device === 'desktop' && i.slot === 'left');
        const dText = initialData.images.find(i => i.device === 'desktop' && i.slot === 'right');
        const mCenter = initialData.images.find(i => i.device === 'mobile' && i.slot === 'center');

        if (dLeft) {
          setDesktopImageId(dLeft.id);
          if (dLeft.image) setDesktopImgSrc(`${BACKEND_URL}${dLeft.image.startsWith('/') ? '' : '/'}${dLeft.image}`);
          setDesktopImageName(getFileNameFromPath(dLeft.image));
          setImageAlt(dLeft.alt || '');
          setImageTitle(dLeft.title || '');
        }
        if (dText) {
          setTextImageId(dText.id);
          if (dText.image) setTextImgSrc(`${BACKEND_URL}${dText.image.startsWith('/') ? '' : '/'}${dText.image}`);
          setTextImageName(getFileNameFromPath(dText.image));
        }
        if (mCenter) {
          setMobileImageId(mCenter.id);
          if (mCenter.image) setMobileImgSrc(`${BACKEND_URL}${mCenter.image.startsWith('/') ? '' : '/'}${mCenter.image}`);
          setMobileImageName(getFileNameFromPath(mCenter.image));
        }
      }
  }, [initialData]);

  const handleDesktopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if(!validateWebp(file)){
      e.target.value = "";
      return;
    }
    setDesktopImageFile(file);
    setDesktopImageName(file.name);
    setDesktopImgSrc(URL.createObjectURL(file));
  };
  const handleTextImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    if(!validateWebp(file)){
      e.target.value = "";
    return;
    }
    setTextImageFile(file);
    setTextImageName(file.name);
    setTextImgSrc(URL.createObjectURL(file));

  };
  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

   if(!file)  return;

   if(!validateWebp(file)){
     e.target.value = "";
     return;
   }

    setMobileImageFile(file);
    setMobileImageName(file.name);
    setMobileImgSrc(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const allFiles = [desktopImageFile, textImageFile, mobileImageFile];

    for(const file of allFiles){
      if(file && !validateWebp(file)){
        return;
      }
    }

    if (pageTarget !== "product-detail" && !initialData && (!desktopImageFile || !textImageFile || !mobileImageFile)) {
      showToast.warning("Debes subir las 3 imágenes (Desktop, Texto y Móvil) para crear el popup.");
      return;
    }

    const imagesArray: PopupImage[] = [
      { id: desktopImageId, device: 'desktop', slot: 'left', file: desktopImageFile || undefined, alt: imageAlt, title: imageTitle },
      { id: textImageId, device: 'desktop', slot: 'right', file: textImageFile || undefined, alt: 'Texto banner', title: 'Texto promocional' },
      { id: mobileImageId, device: 'mobile', slot: 'center', file: mobileImageFile || undefined, alt: imageAlt, title: imageTitle },
    ];

    const getSourceId = (pageTarget: string) => {
      switch(pageTarget){
        case "inicio":
          return sourceData.INICIO;
        case "product-detail":
          return sourceData.PRODUCTO_DETALLE;
        default:
         return sourceData.INICIO;
      }
    }

    const popupData: Popup = {
      id: initialData?.id,
      title,
      lead_source_id: getSourceId(pageTarget),
      button_text: buttonText,
      button_color: buttonColor,
      button_text_color: buttonTextColor,
      page_target: pageTarget,
      delay_seconds: parseInt(delaySeconds) || 0,
      priority: 1,
      active,
      images:  pageTarget === "product-detail" ? [] : imagesArray
    };

    try {
      await onSubmit(popupData);
      showToast.success?.('Popup guardado correctamente');
    }catch(err){
     console.error('SUBMIT FAIL:', err);
     showToast.error('ERROR guardando popup')
    }
  };

  const handlePreviewChange = (field: string, value: string) => {
    setPreviewFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const calculateScale = () => {
      const bounds = canvas.getBoundingClientRect();
      const availableWidth = Math.max(bounds.width - 60, 0);
      const availableHeight = Math.max(bounds.height - 60, 0);

      if (!availableWidth || !availableHeight) {
        setPreviewScale(1);
        return;
      }

      const nextScale = Math.min(
        availableWidth / popupBaseSize.width,
        availableHeight / popupBaseSize.height,
        0.8
      );

      setPreviewScale(nextScale);
    };

    calculateScale();

    const observer = new ResizeObserver(calculateScale);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [popupBaseSize.height, popupBaseSize.width, previewMode]);

  const delayOptions = [
    { value: "3", label: "3s - Muy inmediato" },
    { value: "5", label: "5s - Rápido" },
    { value: "8", label: "8s - Normal" },
    { value: "12", label: "12s - Usuario explorando" },
    { value: "20", label: "20s - Lectura en progreso" },
    { value: "30", label: "30s - Alta intención" },
    { value: "60", label: "60s - Usuario muy activo" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* COLUMNA IZQUIERDA: EL FORMULARIO (REDISEÑADO) */}
      <div className="lg:col-span-7 bg-white dark:bg-[#1C2347] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden max-h-[75vh] overflow-y-auto">
        
        {/* Divide-y para separar las secciones como en configuración */}
        <div className="divide-y divide-gray-100 dark:divide-white/5">
          
          {/* SECCIÓN: ESTADO */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<Power className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Estado del Anuncio"
              subtitle="Activa para que los clientes vean este anuncio en la web"
            />
            <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 px-3 sm:px-4 py-3.5 gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0D1030] dark:text-white truncate">Anuncio activo</p>
                <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5 truncate">
                  Visible en la página de {pageTarget === 'inicio' ? 'Inicio' : 'Producto'}
                </p>
              </div>
              <Toggle
                checked={active}
                onChange={() => setActive(!active)}
              />
            </div>
          </div>

          {/* SECCIÓN: REGLAS DE VISUALIZACIÓN */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<Timer className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Reglas de Visualización"
              subtitle="Define cuándo aparecerá el anuncio"
            />
            <div className="max-w-sm">
              <Select
                label="Tiempo de aparición"
                value={delaySeconds}
                onChange={setDelaySeconds}
                options={delayOptions}
                disabled={!active}
                hint="Tiempo de espera antes de que salte a la pantalla"
              />
            </div>
          </div>

          {/* SECCIÓN: TEXTOS Y LLAMADOS A LA ACCIÓN */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<Type className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Contenido y Diseño"
              subtitle="Personaliza los mensajes y el estilo del botón"
            />
            
            <div className="space-y-6">
              <Input
                label="Mensaje Principal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: ¡Lleva tu marca al siguiente nivel!"
                disabled={!active}
                hint="Este texto aparecerá resaltado en el pop-up"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Texto del Botón"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Ej: SOLICITAR COTIZACIÓN"
                  disabled={!active}
                />
                <ColorInput
                  label="Color del Botón"
                  value={buttonColor}
                  onChange={setButtonColor}
                  disabled={!active}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorInput
                  label="Color del Texto del Botón"
                  value={buttonTextColor}
                  onChange={setButtonTextColor}
                  disabled={!active}
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN: FOTOS Y FLYERS (Opcional según pageTarget) */}
          {pageTarget !== "product-detail" && (
            <div className="px-4 sm:px-6 py-6">
              <BlockTitle
                icon={<ImageIcon className="w-4 h-4 text-[#203565] dark:text-white/60" />}
                title="Imágenes y Recursos"
                subtitle="Sube los flyers optimizados para web (WEBP)"
              />

              <div className="space-y-6">
                {/* Desktop Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0D1030] dark:text-white">1. Imagen Principal (PC - Izquierda)</label>
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2.5">
                      <button type="button" onClick={() => desktopFileInputRef.current?.click()} disabled={!active} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#0D1030] transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 disabled:cursor-not-allowed">
                        Seleccionar archivo
                      </button>
                      <input ref={desktopFileInputRef} type="file" accept="image/webp" onChange={handleDesktopImageChange} disabled={!active} className="hidden" />
                      <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-gray-500 dark:text-white/50" title={desktopImageFile?.name || desktopImageName || 'Sin archivo seleccionado'}>
                        {desktopImageFile?.name || desktopImageName || 'Sin archivo seleccionado'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400">336x535 px · WEBP</p>
                    <ImagePreview
                      src={desktopImgSrc}
                      alt={imageAlt || "Imagen principal del popup"}
                      title="Vista previa principal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0D1030] dark:text-white">2. Imagen Secundaria (PC - Derecha)</label>
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2.5">
                      <button type="button" onClick={() => textFileInputRef.current?.click()} disabled={!active} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#0D1030] transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 disabled:cursor-not-allowed">
                        Seleccionar archivo
                      </button>
                      <input ref={textFileInputRef} type="file" accept="image/webp" onChange={handleTextImageChange} disabled={!active} className="hidden" />
                      <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-gray-500 dark:text-white/50" title={textImageFile?.name || textImageName || 'Sin archivo seleccionado'}>
                        {textImageFile?.name || textImageName || 'Sin archivo seleccionado'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400">336x535 px · WEBP</p>
                    <ImagePreview
                      src={textImgSrc}
                      alt="Imagen secundaria del popup"
                      title="Vista previa secundaria"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Alt de la imagen (SEO)"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Ej: Foto de letrero luminoso"
                    disabled={!active}
                  />
                  <Input
                    label="Título de la imagen (Hover)"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder="Ej: Clic para ver trabajos"
                    disabled={!active}
                  />
                </div>

                {/* Mobile Image */}
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                  <label className="text-sm font-semibold text-[#0D1030] dark:text-white">3. Imagen Mobile (Vista móvil)</label>
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2.5">
                    <button type="button" onClick={() => mobileFileInputRef.current?.click()} disabled={!active} className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#0D1030] transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 disabled:cursor-not-allowed">
                      Seleccionar archivo
                    </button>
                    <input ref={mobileFileInputRef} type="file" accept="image/webp" onChange={handleMobileImageChange} disabled={!active} className="hidden" />
                    <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-gray-500 dark:text-white/50" title={mobileImageFile?.name || mobileImageName || 'Sin archivo seleccionado'}>
                      {mobileImageFile?.name || mobileImageName || 'Sin archivo seleccionado'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">260x520 px · WEBP</p>
                  <ImagePreview
                    src={mobileImgSrc}
                    alt="Imagen móvil del popup"
                    title="Vista previa móvil"
                  />
                </div>
              </div>
            </div>
          )}

          {/* BOTONES ACCIÓN */}
          <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-white/5 flex flex-col md:flex-row justify-end gap-3">
            <button
              onClick={onCancel}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-[#0D1030] dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-sm font-semibold"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#203565] hover:bg-[#162548] text-white dark:bg-white dark:text-[#203565] dark:hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-semibold transition-colors shadow-sm"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Guardando...' : (initialData ? 'Actualizar Anuncio' : 'Crear Anuncio')}
            </button>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: VISTA PREVIA (REDISEÑADA) */}
      <div className="lg:col-span-5 bg-gray-50 dark:bg-[#0D1030]/30 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col min-h-[600px] relative overflow-hidden">
        
        {/* Header de la Vista Previa */}
        <div className="w-full px-5 py-4 border-b border-gray-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/50 dark:bg-[#1C2347]/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="bg-[#203565]/5 dark:bg-white/5 text-[#203565] dark:text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase border border-[#203565]/10 dark:border-white/10">
              {pageTarget} ({delaySeconds}s)
            </span>
            {active ? (
               <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase border border-emerald-500/20">ACTIVO</span>
            ) : (
               <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase border border-rose-500/20">INACTIVO</span>
            )}
          </div>

          <div className="flex bg-gray-200/50 dark:bg-white/5 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setPreviewMode('desktop')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                previewMode === 'desktop'
                  ? 'bg-white dark:bg-[#1C2347] text-[#203565] dark:text-[#6DE1E3] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-white/60'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              PC
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('mobile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                previewMode === 'mobile'
                  ? 'bg-white dark:bg-[#1C2347] text-[#203565] dark:text-[#6DE1E3] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-white/60'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              Celular
            </button>
          </div>
        </div>

        {/* Contenedor del Canvas de Vista Previa */}
        <div ref={previewCanvasRef} className="w-full flex-1 flex items-center justify-center p-6 overflow-visible relative">
          <div
            style={{
              width: popupBaseSize.width,
              height: popupBaseSize.height,
              transform: `scale(${previewScale})`,
              transformOrigin: 'center center',
            }}
            className="transition-transform duration-300 ease-out"
          >
            {pageTarget !== "product-detail" && (
              <PopupRenderer
                isOpen
                withBackdrop={false}
                wrapperClassName="!p-0 !w-auto !h-auto"
                previewDevice={previewMode}
                muted={!active}
                onClose={() => {}}
                desktopImgSrc={desktopImgSrc}
                textImgSrc={textImgSrc}
                mobileImgSrc={mobileImgSrc}
                imgAlt={imageAlt || "Vista previa popup"}
                title={title || "¡Tu inversión en maquinaria!"}
                formData={previewFormData}
                errors={{}}
                handleChange={handlePreviewChange}
                handleSubmit={handlePreviewSubmit}
                buttonText={buttonText || "CONOCER MÁS"}
                buttonColor={buttonColor}
                isSubmitting={false}
                buttonTextColor={buttonTextColor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
