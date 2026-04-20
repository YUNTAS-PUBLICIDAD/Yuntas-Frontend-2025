'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from "@/components/atoms/Button";
import PopupRenderer from '@/components/molecules/PopupRenderer';
import { Popup, PopupImage } from '@/types/admin/popup';
import { LeadInput } from '@/types/admin/lead';
import { showToast } from '@/utils/showToast';
import { api, API_ENDPOINTS } from '@/config';
import { sourceData } from '@/data/popup/sourceData';
import { PopupView } from '../../producto/PopUp/PopupView';

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL || "http://localhost:8000").replace(/\/$/, "");

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
  // const [pageTarget, setPageTarget] = useState('all');
  const [delaySeconds, setDelaySeconds] = useState('5');

  // Estados para las 3 imágenes Y SUS IDs
  const [desktopImageId, setDesktopImageId] = useState<number | undefined>(undefined);
  const [desktopImgSrc, setDesktopImgSrc] = useState('');
  const [desktopImageFile, setDesktopImageFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  const [textImageId, setTextImageId] = useState<number | undefined>(undefined);
  const [textImgSrc, setTextImgSrc] = useState('');
  const [textImageFile, setTextImageFile] = useState<File | null>(null);

  const [mobileImageId, setMobileImageId] = useState<number | undefined>(undefined);
  const [mobileImgSrc, setMobileImgSrc] = useState('');
  const [mobileImageFile, setMobileImageFile] = useState<File | null>(null);

  const [products, setProducts] = useState<{id: number; name:string}[]>([]);
  // const [productId, setProductId] = useState<number | null>(null);

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewScale, setPreviewScale] = useState(1);
  const [previewFormData, setPreviewFormData] = useState<LeadInput>({
    name: '',
    phone: '',
    email: '',
    source_id: 1,
  });
  const previewCanvasRef = useRef<HTMLDivElement>(null);

  const popupBaseSize = previewMode === 'desktop'
    ? { width: 672, height: 532 }
    : { width: 350, height: 536 };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const res = await api.get(API_ENDPOINTS.PRODUCTS.GET_ALL) ;
       console.log('RAW RESPONSE:', res);
       console.log('DATA:', res.data);
       console.log('DATA.DATA', res.data?.data);
       // setProducts(res.data.data || []);
       const fetched = res.data?.data?.data;
       if(Array.isArray(fetched)){
         setProducts(fetched);
       }else {
         console.warn('Products no es array:', fetched);
         setProducts([]);
       }
      }catch(err){
        console.error('Error cargando productos', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (initialData) {
      setActive(initialData.active !== undefined ? initialData.active : false);
      setTitle(initialData.title || '');
      setButtonText(initialData.button_text || '');
      // setPageTarget(initialData.page_target || 'inicio');
      // pageTarget;
      setDelaySeconds(initialData.delay_seconds?.toString() || '5');
      setButtonColor(initialData.button_color || '#6DE1E3');

      if (initialData.images && initialData.images.length > 0) {
        const dLeft = initialData.images.find(i => i.device === 'desktop' && i.slot === 'left');
        const dText = initialData.images.find(i => i.device === 'desktop' && i.slot === 'right');
        const mCenter = initialData.images.find(i => i.device === 'mobile' && i.slot === 'center');

        if (dLeft) {
          setDesktopImageId(dLeft.id);
          if (dLeft.image) setDesktopImgSrc(`${BACKEND_URL}${dLeft.image.startsWith('/') ? '' : '/'}${dLeft.image}`);
          setImageAlt(dLeft.alt || '');
          setImageTitle(dLeft.title || '');
        }
        if (dText) {
          setTextImageId(dText.id);
          if (dText.image) setTextImgSrc(`${BACKEND_URL}${dText.image.startsWith('/') ? '' : '/'}${dText.image}`);
        }
        if (mCenter) {
          setMobileImageId(mCenter.id);
          if (mCenter.image) setMobileImgSrc(`${BACKEND_URL}${mCenter.image.startsWith('/') ? '' : '/'}${mCenter.image}`);
        }
      }
    } else {
      setActive(false);
      setTitle('');
      setButtonText('');
      // setPageTarget('inicio');
      // pageTarget;
      setDelaySeconds('5');
      setImageAlt('');
      setImageTitle('');

      setDesktopImageId(undefined); setDesktopImgSrc(''); setDesktopImageFile(null);
      setTextImageId(undefined); setTextImgSrc(''); setTextImageFile(null);
      setMobileImageId(undefined); setMobileImgSrc(''); setMobileImageFile(null);
      setButtonColor('#6DE1E3');
    }
  }, [initialData]);

  const handleDesktopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setDesktopImageFile(e.target.files[0]);
      setDesktopImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleTextImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setTextImageFile(e.target.files[0]);
      setTextImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setMobileImageFile(e.target.files[0]);
      setMobileImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    if (!title || !buttonText || !imageAlt || !delaySeconds) {
      showToast.warning("Por favor completa todos los campos obligatorios (*)");
      return;
    }

    if (!initialData && (!desktopImageFile || !textImageFile || !mobileImageFile)) {
      showToast.warning("Debes subir las 3 imágenes (Desktop, Texto y Móvil) para crear el popup.");
      return;
    }

    // if(pageTarget === "product-detail" && !productId){
    //   showToast.warning("Debes seleccionar un producto");
    //   return;
    // }

    // console.log("PRODUCT ID FRONT:", productId);
    console.log("PAGE TARGET:", pageTarget);

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
      // product_id: initialData?.product_id,
      // product_id: pageTarget === "product-detail" ? productId! : null,
      // product_id: pageTarget === "product-detail" ? productId : null,
      // lead_source_id: 1,
      lead_source_id: getSourceId(pageTarget),
      button_text: buttonText,
      button_color: buttonColor,
      page_target: pageTarget,
      delay_seconds: parseInt(delaySeconds) || 0,
      priority: 1,
      active,
      images: imagesArray
    };

    console.log('PAYLOAD FINAL:', popupData);

    try {

   const res = await onSubmit(popupData);
   showToast.success?.('Popup guardado correctamente');
    console.log('SUBMIT OK:', res);
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
      const availableWidth = Math.max(bounds.width - 8, 0);
      const availableHeight = Math.max(bounds.height - 8, 0);

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
  }, [popupBaseSize.height, popupBaseSize.width]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* COLUMNA IZQUIERDA: EL FORMULARIO */}
      <div className="lg:col-span-7 bg-white dark:bg-[#141A3F] p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 max-h-[75vh] overflow-y-auto">
        <div className="flex flex-col gap-6">

          {/* ESTADO */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800 dark:text-white">Estado del Anuncio <span className="text-red-500">*</span></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Activa para que los clientes vean este anuncio en la web.</span>
            </div>
            <button
              type="button"
              onClick={() => setActive(!active)}
              className={`${active ? 'bg-[#6DE1E3]' : 'bg-gray-300 dark:bg-gray-600'} relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span className={`${active ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
            </button>
          </div>

          {
          //   pageTarget === 'product-detail' && (
          // <div className='flex flex-col gap-1'>
          //   <label className='text-xs font-semibold text-gray-700 dark:tex-gray-300'>
          //     Producto asociado <span className='text-red-500'>*</span>
          //   </label>
          //   <select value={productId ?? ''} onChange={(e) => {
          //     const value = e.target.value;
          //     setProductId( value ? Number(e.target.value) : null)}} disabled={!active} className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline' name="" id="">
          //     <option value="">Selecciona un producto</option>
          //     {
          //       products.map((p) => (
          //         <option key={p.id} value={p.id}>
          //           {
          //             p.name
          //           }
          //         </option>
          //       ))
          //     }
          //   </select>
          // </div>
          //   )
          }

          {/* REGLAS DE VISUALIZACIÓN */}
          <div className={`flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-1">¿Dónde y cuándo aparecerá?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*<div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Página destino <span className="text-red-500">*</span></label>
                <span className="text-[10px] text-gray-500">¿En qué sección de la web quieres mostrarlo?</span>
              </div>*/}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Tiempo de aparición <span className="text-red-500">*</span></label>
                <select value={delaySeconds} onChange={(e) => setDelaySeconds(e.target.value)} disabled={!active} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed">
                  <option value="3">3s - Muy rápido</option>
                  <option value="5">5s - Rápido</option>
                  <option value="8">8s - Normal</option>
                  <option value="12">12s - Relajado</option>
                  <option value="20">20s - Usuario leyendo</option>
                  <option value="30">30s - Alto engagement</option>
                  <option value="60">60s - Muy tardío</option>
                </select>
                <span className="text-[10px] text-gray-500">Tiempo de espera antes de que salte a la pantalla.</span>
              </div>
            </div>
          </div>

          {/* TEXTOS */}
          <div className={`flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-1">Textos y Llamados a la acción</h3>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Mensaje Principal del Pop-up <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: ¡Lleva tu marca al siguiente nivel!"
                disabled={!active}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed placeholder-gray-400"
              />
              <span className="text-[10px] text-gray-500">Este texto aparecerá en grande arriba del formulario.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Texto del Botón <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Ej: SOLICITAR COTIZACIÓN"
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed placeholder-gray-400"
                />
                <span className="text-[10px] text-gray-500">Lo que leerá el cliente para hacer clic.</span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Color del Botón</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} disabled={!active} className="h-10 w-14 cursor-pointer rounded border border-gray-300 dark:border-gray-600 p-1 disabled:cursor-not-allowed" />
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{buttonColor}</span>
                </div>
                <span className="text-[10px] text-gray-500">Selecciona un color llamativo.</span>
              </div>
            </div>
          </div>

          {/* LAS 3 IMÁGENES */}
          <div className={`bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600 pb-1">Fotos y Flyers <span className="text-red-500">*</span></h3>

            {/* Imagen Principal (Escritorio) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">1. Foto Principal (Para Computadoras - Lado Izquierdo)</label>
              <input type="file" accept="image/*" onChange={handleDesktopImageChange} disabled={!active} className="text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700" />
              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Sube una foto atractiva (Tamaño ideal: <strong>271x479 px</strong>) para la mitad izquierda.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b dark:border-gray-600 pb-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Texto descriptivo de la foto <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Ej: Foto de letrero luminoso"
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-transparent dark:text-white outline-none focus:border-blue-500 placeholder-gray-400"
                />
                <span className="text-[10px] text-gray-500">Ayuda a Google a saber qué hay en la foto (SEO).</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Texto al pasar el mouse (Opcional)</label>
                <input
                  type="text"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="Ej: Clic para ver trabajos"
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-transparent dark:text-white outline-none focus:border-blue-500 placeholder-gray-400"
                />
                <span className="text-[10px] text-gray-500">Se muestra cuando el cliente pone el cursor sobre la foto.</span>
              </div>
            </div>

            {/* Imagen Texto (Escritorio) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">2. Diseño Promocional (Para Computadoras - Lado Derecho)</label>
              <input type="file" accept="image/*" onChange={handleTextImageChange} disabled={!active} className="text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700" />
              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Flyer u oferta (Tamaño ideal: <strong>335x479 px</strong>). Va encima del formulario.</span>
            </div>

            {/* Imagen Móvil */}
            <div className="flex flex-col gap-1 border-t dark:border-gray-600 pt-4 mt-2">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">3. Flyer Unificado (Para Celulares)</label>
              <input type="file" accept="image/*" onChange={handleMobileImageChange} disabled={!active} className="text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700" />
              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Diseño vertical completo para pantallas pequeñas (Tamaño ideal: <strong>260x520 px</strong>).</span>
            </div>
          </div>

          {/* BOTONES ACCIÓN */}
          <div className="pt-2 flex flex-col md:flex-row gap-3">
            <Button size="md" variant="secondary" className="w-full" onClick={onCancel} disabled={isSaving}>
              Cancelar
            </Button>
            <Button size="md" variant="primary" className="w-full" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Guardando...' : (initialData ? 'Actualizar Anuncio' : 'Crear Anuncio')}
            </Button>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: VISTA PREVIA */}
      <div className="lg:col-span-5 bg-gray-100 dark:bg-[#0D1030] p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center min-h-[500px] relative overflow-hidden">
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
            {pageTarget} ({delaySeconds}s)
          </span>
          {active ? (
             <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">ACTIVO</span>
          ) : (
             <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">INACTIVO</span>
          )}
        </div>

        <div className="flex gap-2 mb-6 relative z-20 mt-8">
            <button type="button" onClick={() => setPreviewMode('desktop')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${previewMode === 'desktop' ? 'bg-[#6DE1E3] text-gray-900 shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}>🖥️ Vista en PC</button>
            <button type="button" onClick={() => setPreviewMode('mobile')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${previewMode === 'mobile' ? 'bg-[#6DE1E3] text-gray-900 shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}>📱 Vista en Celular</button>
        </div>

        <div ref={previewCanvasRef} className="w-full flex-1 min-h-[360px] flex items-center justify-center overflow-visible">
          <div
            style={{
              width: popupBaseSize.width,
              height: popupBaseSize.height,
              transform: `scale(${previewScale})`,
              transformOrigin: 'center center',
            }}
          >
            {/*<PopupRenderer
              isOpen
              withBackdrop={false}
              wrapperClassName="!p-0 !w-auto !h-auto"
              previewDevice={previewMode}
              muted={!active}
              onClose={() => {}}
              desktopImgSrc={desktopImgSrc}
              textImgSrc={textImgSrc}
              mobileImgSrc={mobileImgSrc}
              imgAlt={imageAlt || 'Vista previa popup'}
              title={title || '¡Tu inversión en maquinaria!'}
              formData={previewFormData}
              errors={{}}
              handleChange={handlePreviewChange}
              handleSubmit={handlePreviewSubmit}
              buttonText={buttonText || 'CONOCER MÁS'}
              buttonColor={buttonColor}
              isSubmitting={false}
            />*/}

            {pageTarget === "product-detail" ? (
              <PopupView
                isMobile={previewMode === "mobile"}
                leftImage={
                  desktopImgSrc
                    ? { url: desktopImgSrc, alt: imageAlt, title: imageTitle }
                    : undefined
                }
                rightImage={
                  textImgSrc
                    ? { url: textImgSrc, alt: "Texto banner", title: "Texto promocional" }
                    : undefined
                }
                mobileImage={
                  mobileImgSrc
                    ? { url: mobileImgSrc, alt: imageAlt, title: imageTitle }
                    : undefined
                }
                formData={previewFormData}
                errors={{}}
                handleChange={handlePreviewChange}
                handleSubmit={handlePreviewSubmit}
                buttonText={buttonText || "CONOCER MÁS"}
                buttonColor={buttonColor}
                isSubmitting={false}
              />
            ) : (
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
