"use client";

import { useEffect, useMemo, useState } from "react";

import { VariantEditor } from "./VariantEditor";

import { getImageUrl } from "@/utils/getImageUrl";
import { useTemplateVariables } from "@/hooks/useTemplateVariables";
import { CheckCircle, Mail, MessageCircle } from "lucide-react";

// =====================================================
// CHANNELS
// =====================================================

const CHANNELS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-500/10"
  },

  {
    id: "email",
    label: "Email",
    icon: Mail,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-500/10"
  },
] as const;

type Channel =
  typeof CHANNELS[number]["id"];

// =====================================================
// HELPERS
// =====================================================

const renderPreview = (
  content: string,
  preview: Record<string, string>
) => {

  if (!content) {
    return content;
  }

  return content.replace(
    /{{(.*?)}}/g,
    (_, key) => {

      return (
        preview[key.trim()] ??
        `{{${key}}}`
      );
    }
  );
};

// =====================================================
// WHATSAPP PREVIEW
// =====================================================

function WhatsAppPreview({
  variant,
  templateContext,
  preview,
  selectedProductId
}: any) {

  const override =
    // variant?.productOverrides?.[0];
    variant?.productOverrides?.find(
      (o: any) => o.productId == selectedProductId
    );

  const raw =
    // templateContext === "PRODUCTO"
    //   ? (
    //       override?.content ||
    //       variant?.content
    //     )
    //   : variant?.content;
    templateContext === "PRODUCTO" ?
    (override?.content || "")
    : (
      variant?.content || ""
    );

  const body =
    renderPreview(
      raw || "",
      preview
    );

  // const cta =
  //   templateContext === "PRODUCTO"
  //     ? (
  //         override?.ctaText ||
  //         variant?.ctaText ||
  //         "Ver más"
  //       )
  //     : (
  //         variant?.ctaText ||
  //         "Ver más"
  //       );

  const image =
    templateContext === "PRODUCTO"
      ? (
          override?.assets?.[0]?.path ||
          variant?.assets?.[0]?.path
        )
      : (
          variant?.assets?.[0]?.path
        );

  return (

    <div className="
      w-full max-w-[360px]
      h-[620px]
      mx-auto

      flex flex-col

      rounded-2xl overflow-hidden

      border border-gray-200
      dark:border-white/10

      bg-[#ECE5DD]
    ">

      {/* HEADER */}

      <div className="
        bg-[#075E54]
        px-3 py-2.5

        flex items-center gap-2
      ">

        <div className="
          w-7 h-7 rounded-full
          bg-[#25D366]

          flex items-center justify-center

          text-white text-[11px]
          font-medium
        ">
          YP
        </div>

        <div>

          <p className="
            text-white text-[12px]
            font-medium leading-none
          ">
            Yuntas Publicidad
          </p>

          <p className="
            text-white/60 text-[10px]
            mt-0.5
          ">
            en línea
          </p>
        </div>
      </div>

      {/* BODY */}

      <div className="
        flex-1 overflow-y-auto
        px-2.5 py-3
      ">

        <div className="
          bg-white
          rounded-[3px_10px_10px_10px]
          p-2.5
          max-w-[82%]
        ">

          {/* IMAGE */}

          {image ? (

            <img
              src={getImageUrl(image)}
              alt="preview"
              className="
                w-full h-[170px]
                object-cover
                rounded-md mb-2
              "
            />

          ) : (

            <div className="
              w-full h-[170px]
              rounded-md mb-2

              bg-gray-100

              flex items-center justify-center
            ">

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="#ccc"
                  strokeWidth="1.3"
                />

                <circle
                  cx="8.5"
                  cy="9.5"
                  r="1.5"
                  stroke="#ccc"
                  strokeWidth="1.1"
                />

                <path
                  d="M3 16l4.5-4 3.5 3 3-2.5 4 3.5"
                  stroke="#ccc"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* TEXT */}

          <p className="
            text-[13px]
            text-gray-800
            leading-relaxed

            whitespace-pre-wrap
            break-words
          ">
            {body || (
              <span className="
                text-gray-400 italic
              ">
                Sin contenido...
              </span>
            )}
          </p>

          {/* CTA */}

          {/*{cta && (

            <div className="mt-3">

              <button className="
                w-full h-9 rounded-lg

                bg-[#25D366]
                text-white

                text-[12px]
                font-medium
              ">
                {cta}
              </button>
            </div>
          )}*/}

          <p className="
            text-[9px]
            text-gray-400
            text-right
            mt-1.5
          ">
            10:34 AM ✓✓
          </p>
        </div>
      </div>

      {/* FOOTER */}

      <div className="
        bg-[#F0F0F0]
        px-2.5 py-2

        flex items-center gap-2
      ">

        <div className="
          flex-1

          bg-white
          rounded-full

          px-3 py-1.5

          text-[10px]
          text-gray-400
        ">
          Escribe...
        </div>
      </div>
    </div>
  );
}

// =====================================================
// EMAIL PREVIEW
// =====================================================

function EmailPreview({
  variant,
  templateContext,
  selectedProductId,
  preview,
}: any) {

  const override =
    // variant?.productOverrides?.[0];
    variant?.productOverrides?.find(
      (o: any) => o.productId == selectedProductId
    )

  const subject =
    templateContext === "PRODUCTO"
      ? (
          override?.subject ||
          variant?.subject ||
          "(sin asunto)"
        )
      : (
          variant?.subject ||
          "(sin asunto)"
        );

  const raw =
    templateContext === "PRODUCTO"
      ? (
          override?.content ||
          variant?.content
        )
      : variant?.content;

  const body =
    renderPreview(
      raw || "",
      preview
    );

  const cta =
    templateContext === "PRODUCTO"
      ? (
          override?.ctaText ||
          variant?.ctaText
        )
      : variant?.ctaText;

  const image =
    templateContext === "PRODUCTO"
      ? (
          override?.assets?.[0]?.path ||
          variant?.assets?.[0]?.path
        )
      : (
          variant?.assets?.[0]?.path
        );

  return (

    <div className="
      w-full max-w-[420px]
      h-[620px]

      mx-auto

      flex flex-col

      rounded-xl overflow-hidden

      border border-gray-200
      bg-white
    ">

      {/* HEADER */}

      <div className="
        bg-[#F2F2F2]

        px-3 py-2

        border-b border-gray-200

        flex items-center gap-1.5
      ">

        <div className="
          w-2.5 h-2.5 rounded-full
          bg-[#FF5F57]
        " />

        <div className="
          w-2.5 h-2.5 rounded-full
          bg-[#FFBD2E]
        " />

        <div className="
          w-2.5 h-2.5 rounded-full
          bg-[#28C840]
        " />
      </div>

      {/* SUBJECT */}

      <div className="
        px-3.5 py-2.5

        border-b border-gray-100
      ">

        <p className="
          text-[9px]
          text-gray-400
        ">
          De: no-reply@yuntaspublicidad.com
        </p>

        <p className="
          mt-0.5

          text-[12px]
          font-semibold
          text-gray-900
        ">
          {subject}
        </p>
      </div>

      {/* BODY */}

      <div className="
        flex-1 overflow-y-auto
        px-3.5 py-3
      ">

        {/* IMAGE */}

        {image ? (

          <img
            src={getImageUrl(image)}
            alt="preview"
            className="
              w-full h-[180px]
              object-cover
              rounded-md mb-3
            "
          />

        ) : (

          <div className="
            w-full h-[180px]

            bg-gray-100
            rounded-md mb-3

            flex items-center justify-center
          ">

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="14"
                rx="2"
                stroke="#ccc"
                strokeWidth="1.3"
              />

              <circle
                cx="8.5"
                cy="9.5"
                r="1.5"
                stroke="#ccc"
                strokeWidth="1.1"
              />

              <path
                d="M3 16l4.5-4 3.5 3 3-2.5 4 3.5"
                stroke="#ccc"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* CONTENT */}

        <div className="
          text-[13px]
          text-gray-700
          leading-relaxed
          break-words
        ">

          {body ? (

            <div
              className="
                prose prose-sm max-w-none
              "
              dangerouslySetInnerHTML={{
                __html: body,
              }}
            />

          ) : (

            <span className="
              text-gray-300 italic
            ">
              Sin contenido...
            </span>
          )}
        </div>

        {/* CTA */}

        {cta && (

          <div className="mt-4">

            <button className="
              w-full h-10 rounded-lg

              bg-gray-900
              text-white

              text-[12px]
              font-semibold
            ">
              {cta}
            </button>
          </div>
        )}
      </div>

      {/* FOOTER */}

      <div className="
        border-t border-gray-100

        px-3 py-2

        text-center

        text-[9px]
        text-gray-300
      ">
        © 2026 YuntasPublicidad
      </div>
    </div>
  );
}

// =====================================================
// MAIN PANEL
// =====================================================

export function VariantsPanel({

  step,

  templateContext,

  selectedProductId,

  variants,

  onChange,

  onUploadProductOverride,
  onRemoveProductOverrideAsset,

  onRemove,

  onUpload,

  onRemoveAsset,

}: any) {

  const [active, setActive] =
    useState<Channel>("whatsapp");

  const [previewTab, setPreviewTab] =
    useState<Channel>("whatsapp");

  const {
    variables,
    preview,
    getVariables,
    loading,
  } = useTemplateVariables();

  // =====================================================
  // LOAD VARIABLES
  // =====================================================

  useEffect(() => {

    getVariables();

  }, []);

  // =====================================================
  // CURRENT
  // =====================================================

  const current = useMemo(
    () => {

      return variants.find(
        (v: any) => v.channel === active
      );

    },
    [variants, active]
  );

  const previewVariant = useMemo(
    () => {

      return variants.find(
        (v: any) =>
          v.channel === previewTab
      );

    },
    [variants, previewTab]
  );

  // =====================================================
   // ACTIVE CHANNEL DATA
   // =====================================================

   const activeChannel =  CHANNELS.find((c) => c.id === active);

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="
      grid grid-cols-1
    ">

      {/* =====================================================
          EDITOR
      ===================================================== */}

      <div className="

      ">

        {/* HEADER */}
        <div className="px-0 py-4 border-b border-gray-100 dark:border-white/10">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          Canales de envío
        </p>

        <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          Configura el contenido que se enviará automáticamente por cada canal
        </p>
        </div>
        {/* CHANNEL TABS */}
        <div className="
          flex flex-col sm:flex-row px-1
          border-b border-gray-100
          dark:border-white/10
        ">
          {CHANNELS.map(({
            id,
            label,
            icon: Icon,
            color,
            bg
          }) => {

            const isActive =
              active === id;

            // const hasVariant =
            //   variants.some(
            //     (v: any) =>
            //       v.channel === id
            //   );

            const enabled = variants.some((v:any) => v.channel === id);

            return (

              <button
                             key={id}
                             onClick={() => {
                               setActive(id);
                               setPreviewTab(id);
                             }}
                             className={`
                               relative

                               flex items-center gap-2

                               h-12 px-4

                               text-sm

                               border-b-2 -mb-px

                               transition-colors

                               ${
                                 isActive
                                   ? "border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold"
                                   : "border-transparent text-gray-500 dark:text-gray-400"
                               }
                             `}
                           >

                             <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg}`}>
                              <Icon size={15} className={color}/>
                             </div>

                             <span>
                             {label}
                             </span>

                             {enabled && (

                               <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/10 text-[10px] font-medium text-green-700 dark:text-green-400">
                                <CheckCircle size={12}/>
                                Activo
                               </div>
                             )}

                           </button>
            );
          })}
        </div>

        {/* CONTENT */}

        <div className="
          px-0 sm:px-5 py-5
        ">

          {!current ? (

            <div className="
              py-14 px-4

              flex flex-col items-center
              gap-4 text-center

              rounded-xl

              border border-dashed
              border-gray-200
              dark:border-white/10
              bg-gray-50/50 dark:bg-white/[0.02]
            ">

              <div className="
                             w-14 h-14 rounded-2xl

                             bg-gray-100
                             dark:bg-white/5

                             flex items-center justify-center
                           ">

                             <span className="
                               text-xl
                             ">
                               ✉️
                             </span>

                           </div>

                           <div>

                             <p className="
                               text-sm font-medium
                               text-gray-900 dark:text-white
                             ">
                               Aún no configuraste este canal
                             </p>

                             <p className="
                               mt-1 text-xs leading-relaxed
                               text-gray-500 dark:text-gray-400
                             ">
                               Crea el mensaje que se enviará
                               automáticamente por{" "}
                               {activeChannel?.label}
                             </p>

                           </div>

              <button
                onClick={() =>
                  onChange(
                    step,
                    active,
                    {
                      content: "",
                      subject: "",
                      ctaText: "",
                      ctaUrl: ""
                    }
                  )
                }
                className="
                  h-10 px-5 rounded-lg

                  bg-gray-900
                  text-white

                  dark:bg-white
                  dark:text-gray-900

                  text-sm font-medium
                  hover:opacity-90
                  transition-opacity
                "
              >
                Configurar mensaje
              </button>
            </div>

          ) : (

            <VariantEditor
            key={`${step}-${active}-${selectedProductId || "default"}`}

              templateContext={
                templateContext
              }

              onUploadProductOverride={
                (productId: number, file:File) => onUploadProductOverride(step, active, productId, file)
              }

              onRemoveProductOverrideAsset={
                (productId: number, key: string) => onRemoveProductOverrideAsset(step, active, productId, key)
              }

              selectedProductId={
                selectedProductId
              }

              variant={current}

              variables={variables}

              preview={preview}

              loading={loading}

              onChange={(patch: any) =>
                onChange(
                  step,
                  active,
                  patch
                )
              }

              onDelete={() =>
                onRemove(
                  step,
                  active
                )
              }

              onUpload={(file: File) =>
                onUpload(
                  step,
                  active,
                  file
                )
              }

              onRemoveAsset={(key: string) =>
                onRemoveAsset(
                  step,
                  active,
                  key
                )
              }
            />
          )}
        </div>
      </div>

      {/* =====================================================
          PREVIEW
      ===================================================== */}

      <div className="
        flex flex-col
      ">

        {/* PREVIEW HEADER */}
        <div className="
                  px-5 py-4

                  border-b border-gray-100
                  dark:border-white/10
                ">

                  <p className="
                    text-sm font-semibold
                    text-gray-900 dark:text-white
                  ">
                    Vista previa
                  </p>

                  <p className="
                    mt-1 text-xs
                    text-gray-500 dark:text-gray-400
                  ">
                    Así verá el mensaje el cliente
                  </p>
                </div>

        {/* PREVIEW TABS */}

        <div className="
          flex

          border-b border-gray-100
          dark:border-white/10
        ">

          {CHANNELS.map(({
            id,
            label,
            icon: Icon,
            color,
            bg,
          }) => (

            <button
              key={id}
              onClick={() =>
                setPreviewTab(id)
              }
              className={`
                flex-1 h-14

                flex items-center justify-center
                gap-2

                transition-all

                border-b-2 -mb-px

                ${
                  previewTab === id
                    ? `
                      border-gray-900
                      dark:border-white

                      bg-white
                      dark:bg-white/[0.03]

                      text-gray-900
                      dark:text-white
                    `
                    : `
                      border-transparent

                      text-gray-400
                      hover:text-gray-600

                      dark:text-gray-500
                      dark:hover:text-gray-300
                    `
                }
              `}
            >

              <div className={`
                w-8 h-8 rounded-xl

                flex items-center justify-center

                transition-all

                ${
                  previewTab === id
                    ? bg
                    : "bg-gray-100 dark:bg-white/[0.04]"
                }
              `}>

                <Icon
                  size={16}
                  className={
                    previewTab === id
                      ? color
                      : "text-gray-400"
                  }
                />

              </div>

              <div className="flex flex-col items-start">

                <span className="
                  text-sm font-medium
                ">
                  {label}
                </span>

                <span className="
                  text-[11px]
                  text-gray-400
                ">
                  Vista previa
                </span>

              </div>

            </button>
          ))}
        </div>

        {/* PREVIEW */}

        <div className="
          flex-1

          p-4

          bg-gray-50
          dark:bg-white/[0.02]

          flex items-start justify-center
        ">

          {!previewVariant ? (

            <div className="
              py-12 text-center
              text-xs text-gray-400
            ">
              Configura un mensaje para visualizar cómo se verá
            </div>

          ) : previewTab === "whatsapp" ? (

            <WhatsAppPreview
              variant={previewVariant}
              templateContext={templateContext}
              selectedProductId={selectedProductId}
              preview={preview}
            />

          ) : (

            <EmailPreview
              variant={previewVariant}
              templateContext={templateContext}
              selectedProductId={selectedProductId}
              preview={preview}
            />
          )}
        </div>

        {/* FOOTER */}

        <div className="
          border-t border-gray-100
          dark:border-white/10

          px-4 py-2.5

          bg-gray-50
          dark:bg-white/[0.02]
        ">

          <p className="
            text-center
            text-[10px]
            text-gray-400
          ">
            Vista previa aproximada
          </p>
        </div>
      </div>
    </div>
  );
}
