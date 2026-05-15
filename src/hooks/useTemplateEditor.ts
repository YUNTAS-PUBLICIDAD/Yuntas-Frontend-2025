import { useCallback, useEffect, useState } from "react";

import {
  createTemplateService,
  getTemplateService,
  updateTemplateService,
  uploadProductOverrideImageService,
  uploadTemplateImageService,
} from "@/services/templateService";

import {
  Channel,
  Template,
  TemplateAsset,
  TemplateStep,
  TemplateVariant,
} from "@/types/admin/template";

const EMPTY_TEMPLATE: Template = {
  id: 0,
  name: "",
  context: "INICIO",
  active: true,

  steps: [
    {
      step: 1,
      delayValue: 0,
      delayUnit: "minutes",
      active: true,
      variants: [],
    },
  ],
};

export const useTemplateEditor = (
  templateId?: number
) => {

  const isCreate = !templateId;

  const [template, setTemplate] =
    useState<Template>(EMPTY_TEMPLATE);

  const [loading, setLoading] =
    useState(!isCreate);

  const [saving, setSaving] =
    useState(false);

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {

    if (!templateId) {
      setTemplate(EMPTY_TEMPLATE);
      return;
    }

    const run = async () => {

      setLoading(true);

      try {

        const data =
          await getTemplateService(templateId);

        setTemplate({

          ...data,

          steps: (data.steps || []).map(
            (step: any) => ({

              ...step,

              delayValue: step.delay_value,

              delayUnit: step.delay_unit,

              variants: (step.variants || []).map(
                (v: any) => ({

                  ...v,

                  ctaText: v.cta_text,

                  ctaUrl: v.cta_url,

                  productOverrides:
                    (v.product_overrides || []).map(
                      (o:any) => ({
                        ...o,
                        productId: o.product_id,
                        ctaText: o.cta_text,
                        ctaUrl: o.cta_url
                      })
                    ),
                })
              ),
            })
          ),
        });

      } finally {
        setLoading(false);
      }
    };

    run();

  }, [templateId]);

  const createInitialStep = (): TemplateStep => ({
    step: 1,
    delayValue: 0,
    delayUnit: "minutes",
    active: true,
    variants: []
  });

  // =====================================================
  // TEMPLATE
  // =====================================================

  const updateTemplate = useCallback(
    (patch: Partial<Template>) => {

      setTemplate(prev => {
        // ...prev,
        // ...patch,

        const nextContext = patch.context;

        const contextChanged = nextContext && nextContext !== prev.context;

        // =================================================
        // CONTEXT SWITCH
        // =================================================

        if(contextChanged){
          return {
            ...prev,
            ...patch,
            // RESET FLOW
            steps: [
              createInitialStep()
            ],
          };
        }

        // =================================================
        // NORMAL UPDATE
        // =================================================

        return {
          ...prev,
          ...patch
        };

      });
    },
    []
  );

  // =====================================================
  // STEPS
  // =====================================================

  const addStep = useCallback(() => {

    setTemplate(prev => {

      const nextStep =
        prev.steps.length + 1;

      return {

        ...prev,

        steps: [

          ...prev.steps,

          {
            step: nextStep,

            delayValue: 0,

            delayUnit: "minutes",

            active: true,

            variants: [],
          },
        ],
      };
    });

  }, []);

  const removeStep = useCallback(
    (stepNumber: number) => {

      setTemplate(prev => {

        // ...prev,

        // steps: prev.steps.filter(
        //   s => s.step !== stepNumber
        // ),

        const filtered = prev.steps.filter(
          s => s.step !== stepNumber
        );

        const reordered = filtered.map((step, index) => ({
          ...step,
          step: index + 1
        }));

        return {
          ...prev,
          steps: reordered
        };
      });

    },
    []
  );

  const updateStep = useCallback(
    (
      stepNumber: number,
      patch: Partial<TemplateStep>
    ) => {

      setTemplate(prev => ({

        ...prev,

        steps: prev.steps.map(step =>

          step.step === stepNumber
            ? { ...step, ...patch }
            : step
        ),
      }));

    },
    []
  );

  // =====================================================
  // VARIANTS
  // =====================================================

  const upsertVariant = useCallback(

    (
      stepNumber: number,
      channel: Channel,
      patch: Partial<TemplateVariant>
    ) => {

      setTemplate(prev => ({

        ...prev,

        steps: prev.steps.map(step => {

          if (step.step !== stepNumber) {
            return step;
          }

          const exists =
            step.variants.find(
              v => v.channel === channel
            );

          // =========================
          // UPDATE
          // =========================

          if (exists) {

            return {

              ...step,

              variants: step.variants.map(v =>

                v.channel === channel
                  ? { ...v, ...patch }
                  : v
              ),
            };
          }

          // =========================
          // CREATE
          // =========================

          return {

            ...step,

            variants: [

              ...step.variants,

              {
                channel,

                subject:
                  channel === "email"
                    ? ""
                    : undefined,

                content: "",

                variables: [],

                assets: [],

                productOverrides: [],

                active: true,

                ...patch,
              },
            ],
          };
        }),
      }));

    },
    []
  );

  const removeVariant = useCallback(

    (
      stepNumber: number,
      channel: Channel
    ) => {

      setTemplate(prev => ({

        ...prev,

        steps: prev.steps.map(step => {

          if (step.step !== stepNumber) {
            return step;
          }

          return {

            ...step,

            variants: step.variants.filter(
              v => v.channel !== channel
            ),
          };
        }),
      }));

    },
    []
  );

  // =====================================================
  // ASSETS
  // =====================================================

  const uploadAsset = useCallback(

    async (
      stepNumber: number,
      channel: Channel,
      file: File
    ) => {

      try {

        const res =
          await uploadTemplateImageService(file);

        setTemplate(prev => ({

          ...prev,

          steps: prev.steps.map(step => {

            if (step.step !== stepNumber) {
              return step;
            }

            return {

              ...step,

              variants: step.variants.map(v => {

                if (v.channel !== channel) {
                  return v;
                }

                return {

                  ...v,

                  assets: [

                    ...(v.assets || []),

                    {
                      key: "image",
                      path: res.path,
                      meta: {
                        url: res.url,
                      },
                    },
                  ],
                };
              }),
            };
          }),
        }));

        return res;

      } catch (e) {

        console.error(
          "Error subiendo imagen",
          e
        );

        throw e;
      }
    },
    []
  );

  const removeAsset = useCallback(

    (
      stepNumber: number,
      channel: Channel,
      key: string
    ) => {

      setTemplate(prev => ({

        ...prev,

        steps: prev.steps.map(step => {

          if (step.step !== stepNumber) {
            return step;
          }

          return {

            ...step,

            variants: step.variants.map(v => {

              if (v.channel !== channel) {
                return v;
              }

              return {

                ...v,

                assets: (v.assets || []).filter(
                  a => a.key !== key
                ),
              };
            }),
          };
        }),
      }));

    },
    []
  );

  // =====================================================
  // SAVE
  // =====================================================

  const save = useCallback(async () => {

    setSaving(true);

    try {

      const payload = {

        ...template,

        steps: template.steps.map(step => ({

          ...step,

          delay_value: step.delayValue,

          delay_unit: step.delayUnit,

          // variants: step.variants.map(v => ({

          //   ...v,

          //   cta_text: v.ctaText || null,

          //   cta_url: v.ctaUrl || null,

          //   product_overrides:
          //     v.productOverrides || [],
          // })),

          variants: step.variants.map(v => ({
            channel: v.channel,
            subject: v.subject ?? null,
            content: v.content ?? null,
            variables: v.variables ?? [],
            active: v.active ?? true,
            cta_text: v.ctaText ?? null,
            cta_url: v.ctaUrl ?? null,
            assets: (v.assets || []).map((a: any) => ({
              key: a.key,
              path: a.path,
              meta: a.meta ?? null
            })),
            product_overrides: (v.productOverrides || []).map((o: any) => ({
             product_id: o.productId,
             subject: o.subject ?? null,
             content: o.content ?? null,
             cta_text: o.ctaText ?? null,
             cta_url: o.ctaUrl ?? null,
             variables: o.variables ?? [],
             active: o.active ?? true,
             assets: (
               o.assets || []
               ).map((a: any) => ({
                 key: a.key,
                 path: a.path,
                 meta: a.meta ?? null
               }))
            })
            ),
          }))
        })),
      };

      // console.log(
      //   "📦 TEMPLATE PAYLOAD:",
      //   payload
      // );

      console.log(
        "📦 TEMPLATE PAYLOAD JSON:\n",
        JSON.stringify(payload, null, 2)
      );

      const res = isCreate
        ? await createTemplateService(payload)
        : await updateTemplateService(
            template.id,
            payload
          );

      setTemplate({

        ...res,

        steps: (res.steps || []).map(
          (step: any) => ({

            ...step,

            delayValue: step.delay_value,

            delayUnit: step.delay_unit,

            variants: (step.variants || []).map(
              (v: any) => ({

                ...v,

                ctaText: v.cta_text,

                ctaUrl: v.cta_url,

                productOverrides:
                  (v.product_overrides || []).map(
                    (o:any) => ({
                      ...o,
                      productId: o.product_id,
                      ctaText: o.cta_text,
                      ctaUrl: o.cta_url
                    })
                  ),
              })
            ),
          })
        ),
      });

      return res;

    } finally {

      setSaving(false);
    }

  }, [template, isCreate]);


  const uploadProductOverrideAsset = useCallback(

    async (
      stepNumber: number,
      channel: Channel,
      productId: number,
      file: File
    ) => {

      try {

        const res =
          await uploadProductOverrideImageService(file);

        console.log("UPLOAD OVERRIDE RESPONSE", res);

        setTemplate(prev => ({

          ...prev,

          steps: prev.steps.map(step => {

            if (step.step !== stepNumber) {
              return step;
            }

            return {

              ...step,

              variants: step.variants.map(v => {

                if (v.channel !== channel) {
                  return v;
                }

                // return {

                //   ...v,

                //   productOverrides: (
                //     v.productOverrides || []
                //   ).map((override: any) => {

                //     if (
                //       override.product_id !== productId
                //     ) {
                //       return override;
                //     }

                //     return {

                //       ...override,

                //       assets: [

                //         ...(override.assets || []),

                //         {
                //           key: "image",

                //           path: res.path,

                //           meta: {
                //             url:
                //               res.meta?.url
                //               ?? null,
                //           },
                //         },
                //       ],
                //     };
                //   }),
                // };

                const overrides =
                  v.productOverrides || [];

                const exists =
                  overrides.find(
                    (o: any) =>
                      o.productId === productId
                  );

                let nextOverrides = [];

                if (exists) {

                  nextOverrides =
                    overrides.map((override: any) => {

                      if (
                        override.productId !== productId
                      ) {
                        return override;
                      }

                      return {

                        ...override,

                        assets: [

                          ...(override.assets || []).filter(
                            (a: any) =>
                              a.key !== "image"
                          ),

                          {
                            key: "image",

                            path: res.path,

                            meta: {
                              url:
                                res.meta?.url ?? null,
                            },
                          },
                        ],
                      };
                    });

                } else {

                  nextOverrides = [

                    ...overrides,

                    {
                      productId: productId,

                      assets: [
                        {
                          key: "image",

                          path: res.path,

                          meta: {
                            url:
                              res.meta?.url ?? null,
                          },
                        },
                      ],
                    },
                  ];
                }

                return {

                  ...v,

                  productOverrides:
                    nextOverrides,
                };
              }),
            };
          }),
        }));

        return res;

      } catch (e) {

        console.error(
          "Error subiendo override image",
          e
        );

        throw e;
      }
    },
    []
  );

  const removeProductOverrideAsset = useCallback(

    (
      stepNumber: number,
      channel: Channel,
      productId: number,
      key: string
    ) => {

      setTemplate(prev => ({

        ...prev,

        steps: prev.steps.map(step => {

          if (step.step !== stepNumber) {
            return step;
          }

          return {

            ...step,

            variants: step.variants.map(v => {

              if (v.channel !== channel) {
                return v;
              }

              return {

                ...v,

                productOverrides: (
                  v.productOverrides || []
                ).map((override: any) => {

                  if (
                    override.productId !== productId
                  ) {
                    return override;
                  }

                  return {

                    ...override,

                    assets: (
                      override.assets || []
                    ).filter(
                      (a: any) =>
                        a.key !== key
                    ),
                  };
                }),
              };
            }),
          };
        }),
      }));
    },
    []
  );

  // =====================================================
  // RETURN
  // =====================================================

  return {

    template,

    loading,

    saving,

    isCreate,

    updateTemplate,

    addStep,

    removeStep,

    updateStep,

    upsertVariant,
    uploadProductOverrideAsset,
    removeProductOverrideAsset,

    removeVariant,

    uploadAsset,

    removeAsset,

    save,
  };
};
