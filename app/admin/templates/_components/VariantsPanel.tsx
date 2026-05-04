"use client";
import { useState, useMemo } from "react";
import { VariantEditor } from "./VariantEditor";
import { getImageUrl } from "@/utils/getImageUrl";

const CHANNELS = [
  { id: "whatsapp", label: "WhatsApp", dot: "bg-[#25D366]" },
  { id: "email",    label: "Email",    dot: "bg-blue-500"  },
] as const;

type Channel = typeof CHANNELS[number]["id"];

// ─── Preview: WhatsApp ───────────────────────────────────────
function WhatsAppPreview({ variant,productId }: { variant: any; productId?: number | null }) {
  const body = variant?.content ?? "";
  const cta  = variant?.ctaText ?? "Ver más";
  // const image = variant?.assets?.[0]?.path;
  // const image = variant?.context === "PRODUCTO" ? variant?.productAssets?.[0]?.path : variant?.assets?.[0]?.path;
  const image = variant?.context === "PRODUCTO"
    ? variant?.productAssets?.find(a => a.product_id === productId)?.path
    : variant?.assets?.[0]?.path;

  return (
    <div className="w-full h-[520px] lg:h-[600px] flex flex-col max-w-[360px] mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-[#ECE5DD]">

      {/* HEADER */}
      <div className="bg-[#075E54] px-3 py-2.5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[11px] font-medium">JC</div>
        <div>
          <p className="text-white text-[12px] font-medium leading-none">Yuntas Publicidad</p>
          <p className="text-white/60 text-[10px] mt-0.5">en línea</p>
        </div>
      </div>

      {/*BODY*/}
      <div className="px-2.5 py-3 flex-1 overflow-y-auto">
        <div className="bg-white rounded-[3px_10px_10px_10px] p-2.5 max-w-[80%]">

          {
            image ? (
              <img src={getImageUrl(image)} alt="preview" className="w-full h-[140px] sm:h-[160px] object-cover rounded-cover rounded-md mb-2"/>
            ) : (

          <div className="w-full h-[140px] sm:h-[160px] bg-gray-100 rounded-md mb-2 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="14" rx="2" stroke="#ccc" strokeWidth="1.3"/>
              <circle cx="8.5" cy="9.5" r="1.5" stroke="#ccc" strokeWidth="1.1"/>
              <path d="M3 16l4.5-4 3.5 3 3-2.5 4 3.5" stroke="#ccc" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
            )
          }

          {/*TEXTO*/}
          <p className="text-[13px] text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
            {body || <span className="text-gray-400 italic">Sin contenido…</span>}
          </p>
         {/* CTA */}
          <div className="mt-2">
        <button className="w-[calc(100%-16px)] mx-2 mb-2.5 bg-[#25D366] text-white text-[11px] font-medium py-2 rounded-lg">
        {cta}
        </button>
          </div>

          <p className="text-[9px] text-gray-400 text-right mt-1.5">10:34 AM ✓✓</p>
        </div>
      </div>
      <div className="bg-[#F0F0F0] px-2.5 py-2 flex gap-2 items-center flex-shrink-0">
        <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[10px] text-gray-400">Escribe…</div>
      </div>
    </div>
  );
}

// ─── Preview: Email ──────────────────────────────────────────
function EmailPreview({ variant, productId }: { variant: any; productId?: number | null }) {
  const subject = variant?.subject ?? "(sin asunto)";
  const cta     = variant?.ctaText ?? "Ver más";
  // const image = variant?.assets?.[0]?.path;
  // const image = variant?.context === "PRODUCTO" ? variant?.productAssets?.[0]?.path : variant?.assets?.[0]?.path;
  const image = variant?.context === "PRODUCTO"
    ? variant?.productAssets?.find(a => a.product_id === productId)?.path
    : variant?.assets?.[0]?.path;

  return (
    <div className="w-full flex flex-col h-[520px] lg:h-[600px] max-w-[420px] mx-auto rounded-lg overflow-hidden border border-gray-200 bg-white" style={{fontFamily:"Arial,sans-serif"}}>
      {/* Header */}
      <div className=" flex-shrink-0 bg-[#F2F2F2] px-3 py-2 flex gap-1.5 items-center border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/>
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"/>
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/>
      </div>
      <div className="px-3.5 py-2.5 border-b border-gray-100">
        {/*<p className="text-[9px] text-gray-400">De: no-reply@miempresa.com</p>*/}

        <p className="text-[9px] text-gray-400">De: no-reply@yuntaspublicidad.com</p>
        <p className="text-[12px] font-semibold text-gray-900 mt-0.5 leading-snug">{subject}</p>
      </div>

      {/*BODY*/}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 text-sm">
        {
          image ? (
            <img src={getImageUrl(image)} alt="preview" className="w-full h-[140px] sm:h-[160px] object-cover rounded-md mb-2"/>
          ) : (

      <div className="w-full h-[120px] sm:h-[160px] bg-gray-100 flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="#ccc" strokeWidth="1.3"/>
          <circle cx="8.5" cy="9.5" r="1.5" stroke="#ccc" strokeWidth="1.1"/>
          <path d="M3 16l4.5-4 3.5 3 3-2.5 4 3.5" stroke="#ccc" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
          )
        }
      <div className="px-3.5 py-3  text-gray-700 leading-relaxed whitespace-pre-wrap break-words min-h-[60px]">
        {/*{body || <span className="text-gray-300 italic">Sin contenido…</span>}*/}
        {
          variant?.content ? (
            <div className="prose prose-headings:font-semibold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base  max-w-none" dangerouslySetInnerHTML={{__html: variant.content}}></div>
          ) : (
            <span className="text-gray-300 italic">
              Sin contenido...
            </span>
          )
        }
      </div>
      <div className="px-3.5 pb-3">
        <div className="bg-gray-900 text-white text-[11px] font-semibold text-center py-2 rounded-md">{cta}</div>
      </div>
      </div>

      {/* FOOTER */}
      {/*<div className="px-3.5 pb-3 text-[9px] text-gray-300 text-center border-t border-gray-50 pt-2">
        © 2025 Mi Empresa · Darse de baja
      </div>*/}
      <div className=" flex-shrink-0 px-3.5 pb-3 text-[9px] text-gray-300 text-center border-t border-gray-50 pt-2">
        © 2025 YuntasPublicidad · Copyright
      </div>

    </div>
  );
}

// ─── Main panel ──────────────────────────────────────────────
export function VariantsPanel({
  variants, onChange, onRemove, onUpload,
  onRemoveAsset, onUploadProduct, onRemoveProductAsset,
}: any) {
  const [active, setActive]   = useState<Channel>("whatsapp");
  const [prevTab, setPrevTab] = useState<"whatsapp" | "email">("whatsapp");
  const [selectedProductId, setSelectedProductId]  = useState<number | null>(null)

  const current = useMemo(
    () => variants.find((v: any) => v.channel === active),
    [variants, active]
  );

  const previewVariant = useMemo(
    () => variants.find((v: any) => v.channel === prevTab),
    [variants, prevTab]
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-0 flex-1">

      {/* EDITOR SIDE */}
      <div className="flex flex-col border-r border-gray-100 dark:border-white/10">
        <div className="flex border-b border-gray-100 dark:border-white/10 px-1">
          {CHANNELS.map(({ id, label, dot }) => {
            const isActive  = active === id;
            const hasVariant = variants.some((v: any) => v.channel === id);
            return (
              <button
                key={id}
                onClick={() => { setActive(id); setPrevTab(id); }}
                className={`
                  flex items-center gap-2 px-2 sm:px-4 h-11 text-sm transition-colors
                  border-b-2 -mb-px
                  ${isActive
                    ? "border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                  }
                `}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dot} ${!hasVariant ? "opacity-30" : ""}`} />
                {label}
                {hasVariant && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400">
                    activo
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-0 py-5 sm:p-5">
          {!current ? (
            <div className="flex flex-col items-center gap-4 py-10 border border-dashed border-gray-200 dark:border-white/10 rounded-lg text-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-white/10">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Sin variante de {active === "whatsapp" ? "WhatsApp" : "Email"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Crea la variante para este canal</p>
              </div>
              <button
                onClick={() => onChange(active, {})}
                className="
                  inline-flex items-center gap-1.5 px-4 h-9 rounded-lg
                  text-sm font-medium
                  bg-gray-900 text-white hover:bg-gray-700
                  dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100
                  transition-colors
                "
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Crear variante
              </button>
            </div>
          ) : (
            <VariantEditor
              variant={current}
              onChange={(patch: any) => onChange(active, patch)}
              onDelete={() => onRemove(active)}
              onUpload={(file: File) => onUpload(active, file)}
              onRemoveAsset={(key: string) => onRemoveAsset(active, key)}
              onUploadProduct={(productId: number, file: File) => onUploadProduct(active, productId, file)}
              onRemoveProductAsset={onRemoveProductAsset}
              onSelectProduct={setSelectedProductId}
            />
          )}
        </div>
      </div>

      {/* PREVIEW SIDE */}
      <div className="flex flex-col">
        <div className="flex border-b border-gray-100 dark:border-white/10">
          {CHANNELS.map(({ id, label, dot }) => (
            <button
              key={id}
              onClick={() => setPrevTab(id)}
              className={`
                flex-1 flex items-center justify-center gap-1.5
                h-11 text-xs font-medium transition-colors
                border-b-2 -mb-px
                ${prevTab === id
                  ? "border-gray-900 dark:border-white text-gray-900 dark:text-white"
                  : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-white"
                }
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 bg-gray-50 dark:bg-white/[0.02] flex items-start justify-center">
          {!previewVariant ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[140px]">
                Crea la variante para ver la vista previa
              </p>
            </div>
          ) : prevTab === "whatsapp" ? (
            <WhatsAppPreview variant={previewVariant} productId={selectedProductId} />
          ) : (
            <EmailPreview variant={previewVariant} productId={selectedProductId} />
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02]">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
            Vista previa aproximada · el render final puede variar
          </p>
        </div>
      </div>

    </div>
  );
}
