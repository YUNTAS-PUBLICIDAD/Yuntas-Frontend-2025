import { useCallback, useEffect, useState } from "react";
import {
  createTemplateService,
  deleteProductTemplateImageService,
  getTemplateService,
  updateTemplateService,
  uploadProductTemplateImageService,
  uploadTemplateImageService,
} from "@/services/templateService";

import { Template } from "@/types/admin/template";

export const useTemplateEditor = (templateId?: number) => {
  const isCreate = !templateId;

  const [template, setTemplate] = useState<Template>({
    id: 0,
    name: "",
    active: true,
    variants: [],
  });

  const [loading, setLoading] = useState(!isCreate);
  const [saving, setSaving] = useState(false);

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    if (!templateId) {
      setTemplate({
        id: 0,
        name: "",
        active: true,
        variants: []
      });
      return;
    }

    const run = async () => {
      setLoading(true);
      try {
        const data = await getTemplateService(templateId);
        // setTemplate(data);
        setTemplate({
          ...data,
          variants: data.variants.map((v: any) => ({
            ...v,
            productAssets: v.product_assets || [],
            ctaText: v.cta_text,
            ctaUrl: v.cta_url
          })),
        });
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [templateId]);

  // =========================
  // TEMPLATE UPDATE
  // =========================
  const updateTemplate = useCallback((patch: Partial<Template>) => {
    setTemplate(prev => ({ ...prev, ...patch }));
  }, []);

  // =========================
  // VARIANTS
  // =========================
  const upsertVariant = useCallback((channel: string, patch: any) => {
    setTemplate(prev => {
      const exists = prev.variants.find(v => v.channel === channel);

      if (exists) {
        return {
          ...prev,
          variants: prev.variants.map(v =>
            v.channel === channel ? { ...v, ...patch } : v
          ),
        };
      }

      return {
        ...prev,
        variants: [
          ...prev.variants,
          {
            channel,
            context: "INICIO",
            content: "",
            subject: channel === "email" ? "" : undefined,
            variables: [],
            assets: [],
            active: true,
            ...patch,
          },
        ],
      };
    });
  }, []);

  const removeVariant = useCallback((channel: string) => {
    setTemplate(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.channel !== channel),
    }));
  }, []);

  // =========================
  // SAVE (TODO JUNTO)
  // =========================
  const save = useCallback(async () => {
    setSaving(true);

    try {

      const payload = {
        ...template,
        variants: template.variants.map(v => ({
          ...v,
          product_assets: v.productAssets || [],
          cta_text: v.ctaText || null,
          cta_url: v.ctaUrl || null
        })),
      };
      console.log("🚀 TEMPLATE RAW:", template);
      console.log("📦 PAYLOAD FINAL:", payload);
      console.log("🧪 VARIANTS:", payload.variants);

      if (isCreate) {
        // const res = await createTemplateService(template);
        // setTemplate(res);
        const res = await createTemplateService(payload);

        setTemplate({
          ...res,
          variants: res.variants.map((v: any) => ({
            ...v,
            productAssets: v.product_assets || [],
            ctaText: v.cta_text,
            ctaUrl: v.cta_url
          }))
        })
        return res;
      }

      // const res = await updateTemplateService(template.id, template);
      const res = await updateTemplateService(template.id, payload);
      // setTemplate(res);
      setTemplate({
           ...res,
           variants: res.variants.map((v: any) => ({
             ...v,
             productAssets: v.product_assets || [], // 🔥 FIX
             ctaText: v.cta_text,
             ctaUrl: v.cta_url
           })),
         });
      return res;
    } finally {
      setSaving(false);
    }
  }, [template, isCreate]);

  const uploadAsset = useCallback(async (channel: string, file: File) => {
    try{
      const res = await uploadTemplateImageService(file);

      setTemplate(prev => {
        const variants = prev.variants.map(v => {
         if(v.channel !== channel) return v;

         return {
           ...v,
           assets: [
             ...(v.assets || []),
             {
               key: "image",
               path: res.path,
               meta: {
                 url: res.url
               }
             }
           ]
         }
        });
        return {...prev, variants};
      });

      return res;
    }catch(e){
      console.error("Error subiendo imagen", e);
      throw e;
    }
  }, []);

const removeAsset = useCallback( async (channel: string, key: string) => {
  setTemplate(prev => {
    const variants = prev.variants.map(v => {
    if(v.channel !== channel) return v;

    return {
      ...v,
      assets: (v.assets || []).filter(a => a.key !== key),
    };
    });
    return {...prev, variants};
  });
}, [])

const uploadProductAsset = useCallback(
  async (channel: string, productId: number, file: File) => {
    try {
      console.log("📤 Uploading product asset:", {
        channel,
        productId,
        file
      });
      const res = await uploadProductTemplateImageService(file);

      setTemplate(prev => {
        const variants = prev.variants.map(v => {
          if (v.channel !== channel) return v;

          return {
            ...v,
            productAssets: [
              ...(v.productAssets || []).filter(a => a.product_id !== productId),
              {
                product_id: productId,
                key: "image",
                path: res.path,
              },
            ],
          };
        });

        return { ...prev, variants };
      });

      return res;
    } catch (e) {
      console.error("Error subiendo product asset", e);
      throw e;
    }
  },
  []
);

// const removeProductAsset = useCallback(
//   async (channel: string, productId: number, key: string) => {
//     try {
//       const variant = template.variants.find(v => v.channel === channel);
//       if (!variant) return;

//       await deleteProductTemplateImageService({
//         product_id: productId,
//         variant_id: variant.id, // ⚠️ asegúrate que exista
//         key,
//       });

//       setTemplate(prev => {
//         const variants = prev.variants.map(v => {
//           if (v.channel !== channel) return v;

//           return {
//             ...v,
//             product_assets: (v.product_assets || []).filter(
//               a => !(a.product_id === productId && a.key === key)
//             ),
//           };
//         });

//         return { ...prev, variants };
//       });
//     } catch (e) {
//       console.error("Error eliminando product asset", e);
//     }
//   },
//   [template]
// );

// const removeProductAsset = useCallback(
//   (channel: string, productId: number, key: string) => {
//     setTemplate(prev => {
//       const variants = prev.variants.map(v => {
//         if (v.channel !== channel) return v;

//         return {
//           ...v,
//           productAssets: (v.productAssets || []).filter(
//             a => !(a.product_id === productId && a.key === key)
//           ),
//         };
//       });

//       return { ...prev, variants };
//     });
//   },
//   []
// );


const removeProductAsset = useCallback(
  async (path: string) => {
    try {
      await deleteProductTemplateImageService({
        path
      });

      setTemplate(prev => {
        const variants = prev.variants.map(v => ({
          ...v,
          productAssets: (v.productAssets || []).filter(
            a => a.path !== path
          ),
        }));

        return { ...prev, variants };
      });

    } catch (e) {
      console.error("Error eliminando product asset", e);
    }
  },
  []
);


  return {
    template,
    loading,
    saving,
    isCreate,

    updateTemplate,
    upsertVariant,
    removeVariant,

    uploadAsset,
    removeAsset,
    save,

    removeProductAsset,
    uploadProductAsset
  };
};
