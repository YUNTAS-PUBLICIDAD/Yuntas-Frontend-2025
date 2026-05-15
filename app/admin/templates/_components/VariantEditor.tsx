"use client";

import "react-quill/dist/quill.snow.css";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { getImageUrl } from "@/utils/getImageUrl";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false }
);

// =====================================================
// QUILL
// =====================================================

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

// =====================================================
// UI
// =====================================================

function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="
      text-[11px]
      font-medium
      tracking-widest
      uppercase
      text-gray-400
      dark:text-gray-500
      mb-1.5
    ">
      {children}
    </p>
  );
}

function UploadZone({
  label,
  hint,
  onChange,
}: any) {

  return (
    <label className="
      flex flex-col items-center
      gap-2

      py-5 px-4

      border border-dashed
      border-gray-200
      dark:border-white/10

      rounded-lg

      bg-gray-50
      dark:bg-white/5

      cursor-pointer
      text-center

      hover:bg-gray-100
      dark:hover:bg-white/10

      transition-colors
    ">

      <div className="
        w-8 h-8 rounded-lg

        bg-white
        dark:bg-white/10

        border border-gray-200
        dark:border-white/10

        flex items-center justify-center
      ">

        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 2v8M5 5l3-3 3 3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M2 12h12"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <span className="
        text-sm font-medium
        text-gray-700 dark:text-white
      ">
        {label}
      </span>

      {hint && (
        <span className="
          text-xs text-gray-400
          dark:text-gray-500
        ">
          {hint}
        </span>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

function ImagePreview({
  src,
  onReplace,
  onRemove,
}: any) {

  return (
    <div className="
      relative group rounded-lg
      overflow-hidden

      border border-gray-200
      dark:border-white/10
    ">

      <img
        src={src}
        alt="preview"
        className="
          w-full h-[180px]
          object-cover
        "
      />

      <div className="
        absolute inset-0

        bg-black/50

        opacity-0
        group-hover:opacity-100

        flex items-center justify-center
        gap-2

        transition-opacity
      ">

        <label className="
          px-3 py-1.5

          text-xs font-medium

          rounded-md

          bg-white
          text-gray-900

          cursor-pointer
        ">

          Reemplazar

          <input
            type="file"
            accept="image/*"
            onChange={onReplace}
            className="hidden"
          />
        </label>

        <button
          onClick={onRemove}
          className="
            px-3 py-1.5

            text-xs font-medium

            rounded-md

            bg-red-600
            text-white
          "
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

// =====================================================
// MAIN
// =====================================================

export function VariantEditor({

  variant,

  templateContext,
  selectedProductId,

  variables,

  preview,

  loading,

  onChange,

  onDelete,

  onUploadProductOverride,
  onRemoveProductOverrideAsset,

  onUpload,

  onRemoveAsset,

}: any) {


  // =====================================================
  // STATE
  // =====================================================


  const isProductContext =
    templateContext === "PRODUCTO";


  // =====================================================
  // OVERRIDE
  // =====================================================

  const override = useMemo(() => {

    if (!selectedProductId) {
      return null;
    }

    return (
      variant.productOverrides?.find(
        (o: any) =>
          o.productId === selectedProductId
      ) || null
    );

  }, [
    selectedProductId,
    variant.productOverrides,
  ]);

  // =====================================================
  // IMAGE
  // =====================================================

  const image =
    variant.assets?.find(
      (a: any) =>
        a.key === "image"
    );

  const overrideImage =
    override?.assets?.find(
      (a: any) =>
        a.key === "image"
    );

  // =====================================================
  // HELPERS
  // =====================================================

  const insertVariable = (
    variable: string
  ) => {

    const tag =
      `{{${variable}}}`;

    const current = isProductContext ? (override?.content ?? "") : (variant.content ?? "")
      // override?.content ||
      // variant.content ||
      // "";

    if (
      isProductContext &&
      selectedProductId
    ) {

      updateOverride({
        content:
          current + tag,
      });

      return;
    }

    onChange({
      content:
        current + tag,
    });
  };

  // =====================================================
  // OVERRIDE UPDATE
  // =====================================================

  const updateOverride = (
    patch: any
  ) => {

    if (!selectedProductId) {
      return;
    }

    const currentOverrides =
      variant.productOverrides || [];

    const exists =
      currentOverrides.find(
        (o: any) =>
          o.productId === selectedProductId
      );

    let next = [];

    if (exists) {

      next =
        currentOverrides.map(
          (o: any) => {

            if (
              o.productId !== selectedProductId
            ) {
              return o;
            }

            return {
              ...o,
              ...patch,
            };
          }
        );

    } else {

      next = [
        ...currentOverrides,

        {
          productId: selectedProductId,
          ...patch,
        },
      ];
    }

    onChange({
      productOverrides: next,
    });
  };

  // =====================================================
  // FILES
  // =====================================================

  const handleBaseFile =
    async (e: any) => {

      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      await onUpload(file);
    };

  const handleOverrideFile =
    async (e: any) => {

      const file =
        e.target.files?.[0];

      if (!file || !selectedProductId) {
        return;
      }

      // const path =
      //   await onUpload(file);

      // const currentAssets =
      //   override?.assets || [];

      // const filtered =
      //   currentAssets.filter(
      //     (a: any) =>
      //       a.key !== "image"
      //   );

      // updateOverride({
      //   assets: [
      //     ...filtered,
      //     {
      //       key: "image",
      //       path,
      //     },
      //   ],
      // });

      await onUploadProductOverride(
        selectedProductId,
        file
      );
    };

  // =====================================================
  // VARIABLES
  // =====================================================

  // const suggested =
  //   isProductContext
  //     ? [
  //         "producto_nombre",
  //         "descripcion",
  //       ]
  //     : [
  //         "nombre",
  //         "email",
  //       ];

  // const restVariables =
  //   variables.filter(
  //     (v: string) =>
  //       !suggested.includes(v)
  //   );

  // =====================================================
  // VALUES
  // =====================================================

  // const subject =
  //   override?.subject ??
  //   variant.subject ??
  //   "";
  const subject = isProductContext ? (override?.subject ?? "") : (variant.subject ?? "")

  // const content =
  //   override?.content ??
  //   variant.content ??
  //   "";
  const content = isProductContext ? (override?.content ?? "") : (variant.content ?? "")

  // const ctaText =
  //   override?.ctaText ??
  //   variant.ctaText ??
  //   "";
  const ctaText = isProductContext ? (override?.ctaText ?? ""):(variant.ctaText ?? "");

  // const ctaUrl =
  //   override?.ctaUrl ??
  //   variant.ctaUrl ??
  //   "";
  const ctaUrl = isProductContext ? (override?.ctaUrl ?? "") : (variant.ctaUrl ?? "");

  // =====================================================
  // CHARACTER COUNT
  // =====================================================

  const charCount =
    content
      .replace(/<[^>]*>/g, "")
      .length;

  const maxChars =
    variant.channel === "email"
      ? 5000
      : 1024;

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="
      flex flex-col gap-5
    ">

      {/* =====================================================
          SUBJECT
      ===================================================== */}

      {variant.channel === "email" && (

        <div>

          <FieldLabel>
            Asunto
          </FieldLabel>

          <input
            value={subject}
            onChange={(e) => {

              const value =
                e.target.value;

              if (
                isProductContext &&
                selectedProductId
              ) {

                updateOverride({
                  subject: value,
                });

                return;
              }

              onChange({
                subject: value,
              });
            }}
            placeholder="
              Asunto del correo...
            "
            className="
              w-full h-10 px-3

              text-sm rounded-lg

              border border-gray-200
              dark:border-white/10

              bg-white
              dark:bg-transparent
            "
          />
        </div>
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div>

        <div className="
          flex items-center justify-between
          mb-1.5
        ">

          <FieldLabel>
            Contenido
          </FieldLabel>

          <span className="
            text-[11px]
            text-gray-400
          ">
            {charCount} / {maxChars}
          </span>
        </div>

        {variant.channel === "email" ? (

          <ReactQuill
            value={content}
            onChange={(value) => {

              if (
                isProductContext &&
                selectedProductId
              ) {

                updateOverride({
                  content: value,
                });

                return;
              }

              onChange({
                content: value,
              });
            }}
            modules={QUILL_MODULES}
          />

        ) : (

          <textarea
            value={content}
            onChange={(e) => {

              const value =
                e.target.value;

              if (
                isProductContext &&
                selectedProductId
              ) {

                updateOverride({
                  content: value,
                });

                return;
              }

              onChange({
                content: value,
              });
            }}
            placeholder="
              Hola {{nombre}}
            "
            className="
              w-full min-h-[220px]

              px-3 py-3

              text-sm rounded-lg

              border border-gray-200
              dark:border-white/10

              bg-white
              dark:bg-transparent

              resize-none
            "
          />
        )}
      </div>

      {/* =====================================================
          VARIABLES
      ===================================================== */}

      {/* =====================================================
          PERSONALIZACIÓN
      ===================================================== */}

      <div className="space-y-2">

        <FieldLabel>
          Personalización
        </FieldLabel>

        <div className="flex items-center gap-2 flex-wrap">

          <div className="
            px-2.5 py-1
            rounded-full

            bg-blue-50
            dark:bg-blue-500/10

            border border-blue-100
            dark:border-blue-500/20
          ">

            <span className="
              text-[11px]
              font-medium

              text-blue-700
              dark:text-blue-300
            ">
              {"{{nombre}}"}
            </span>

          </div>

          <p className="
            text-xs
            text-gray-500
            dark:text-gray-400
          ">
            Se reemplazará automáticamente por el nombre del cliente
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            insertVariable("nombre")
          }
          className="
            text-xs font-medium

            text-blue-600
            dark:text-blue-400

            hover:underline
          "
        >
          Insertar nombre
        </button>

      </div>

      {/* =====================================================
          CTA
      ===================================================== */}

      {variant.channel === "email" && (

        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          gap-3
        ">

          <div>

            <FieldLabel>
              Botón CTA
            </FieldLabel>

            <input
              value={ctaText}
              onChange={(e) => {

                const value =
                  e.target.value;

                if (
                  isProductContext &&
                  selectedProductId
                ) {

                  updateOverride({
                    ctaText: value,
                  });

                  return;
                }

                onChange({
                  ctaText: value,
                });
              }}
              placeholder="
                Ver producto
              "
              className="
                w-full h-10 px-3

                text-sm rounded-lg

                border border-gray-200
                dark:border-white/10
              "
            />
          </div>

          <div>

            <FieldLabel>
              URL
            </FieldLabel>

            <input
              value={ctaUrl}
              onChange={(e) => {

                const value =
                  e.target.value;

                if (
                  isProductContext &&
                  selectedProductId
                ) {

                  updateOverride({
                    ctaUrl: value,
                  });

                  return;
                }

                onChange({
                  ctaUrl: value,
                });
              }}
              placeholder="
                https://...
              "
              className="
                w-full h-10 px-3

                text-sm rounded-lg

                border border-gray-200
                dark:border-white/10
              "
            />
          </div>
        </div>
      )}

      {/* =====================================================
          BASE IMAGE
      ===================================================== */}

      {!isProductContext && (

        <div>

          <FieldLabel>
            Imagen general
          </FieldLabel>

          {!image ? (

            <UploadZone
              label="Subir imagen"
              hint="
                PNG, JPG o WEBP
              "
              onChange={handleBaseFile}
            />

          ) : (

            <ImagePreview
              src={getImageUrl(image.path)}
              onReplace={handleBaseFile}
              onRemove={() =>
                onRemoveAsset("image")
              }
            />
          )}
        </div>
      )}

      {/* =====================================================
          PRODUCT OVERRIDES
      ===================================================== */}

      {isProductContext && (

        <div className="
          pt-5

          border-t border-gray-100
          dark:border-white/10

          flex flex-col gap-4
        ">

          {selectedProductId && (

            <div>

              <FieldLabel>
                Imagen override
              </FieldLabel>

              {!overrideImage ? (

                <UploadZone
                  label="
                    Subir imagen override
                  "
                  hint="
                    Sobreescribe imagen base
                  "
                  onChange={
                    handleOverrideFile
                  }
                />

              ) : (

                <ImagePreview
                  src={getImageUrl(
                    overrideImage.path
                  )}
                  onReplace={
                    handleOverrideFile
                  }
                  onRemove={() => {

                    // const filtered =
                    //   (
                    //     override?.assets ||
                    //     []
                    //   ).filter(
                    //     (a: any) =>
                    //       a.key !== "image"
                    //   );

                    // updateOverride({
                    //   assets: filtered,
                    // });

                    if(!selectedProductId){
                      return;
                    }
                    onRemoveProductOverrideAsset(
                      selectedProductId,
                      "image"
                    );
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="
        flex items-center justify-between

        pt-3

        border-t border-gray-100
        dark:border-white/10
      ">

        <button
          onClick={onDelete}
          className="
            inline-flex items-center
            gap-1.5

            px-3 h-8

            text-xs font-medium

            rounded-lg

            border border-gray-200
            dark:border-white/10

            text-gray-500
            dark:text-gray-400
          "
        >
          Eliminar variante
        </button>

        <span className="
          text-[11px]
          text-gray-400
        ">
          Canal: {variant.channel}
        </span>
      </div>
    </div>
  );
}
