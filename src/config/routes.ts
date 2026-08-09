export const ROUTES = {

  CONTACTO: "/contacto",

  PRODUCTOS: {
    INDEX: "/productos",
    BARRA_PIXEL_LED: "/productos/iluminacion-barras-pixel-led-discotecas",
    LETRERO_NEON_LED: "/productos/letreros-neon-led-personalizados-para-locales-comerciales",

    DETAIL: (slug: string) => `/productos/${slug}`,
  },

  WHATSAPP: {
    YUNTAS: "https://wa.me/51912849782",
  },

  GOOGLE_MAPS: {
  PROFILE: "https://www.google.com/maps/place/Yuntas+Producciones/@-12.0256654,-76.9420072,17z/data=!4m18!1m9!3m8!1s0x9105c97c8934a213:0x7f6ccb249e86b5e6!2sYuntas+Producciones!8m2!3d-12.0256654!4d-76.9420072!9m1!1b1!16s%2Fg%2F11gzs412yn!3m7!1s0x9105c97c8934a213:0x7f6ccb249e86b5e6!8m2!3d-12.0256654!4d-76.9420072!9m1!1b1!16s%2Fg%2F11gzs412yn?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
  REVIEWS: {
     GABO:"https://maps.app.goo.gl/GrNEvVoMdYw2Mv4V8", 
     ABIGAYL: "https://maps.app.goo.gl/hiCx36aBAqAAnhGM7",
     LUIS:"https://maps.app.goo.gl/oscBifu3hxTfA1xT8",
  }

}

} as const;