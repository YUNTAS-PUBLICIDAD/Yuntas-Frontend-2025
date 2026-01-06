import { BlogStatic } from "@/types/admin/blog";

export const blogStaticData: BlogStatic[] = [
  {
    id: 1,
    slug: "guia-iluminacion-led",
    title: "Guía Completa de Iluminación LED",
    cover_subtitle: "Cómo elegir la iluminación perfecta",
    content: "Aprende cómo elegir la iluminación LED perfecta para tu hogar o negocio.",
    categories: ["Iluminación", "LED"],
    benefits: [
      "Ahorro energético",
      "Mayor durabilidad",
      "Mejor iluminación"
    ],
    opinion: "La iluminación LED es la mejor opción actualmente.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    main_image: {
      url: "https://via.placeholder.com/1200x600?text=LED"
    }
  },
  {
    id: 2,
    slug: "tendencias-decoracion-2025",
    title: "Tendencias en Decoración 2025",
    cover_subtitle: "Lo que dominará este año",
    content: "Los estilos que dominarán este año.",
    categories: ["Decoración"],
    benefits: [
      "Espacios modernos",
      "Colores naturales",
      "Iluminación estratégica"
    ],
    opinion: "El diseño minimalista sigue creciendo.",
    main_image: {
      url: "https://via.placeholder.com/1200x600?text=Decoracion"
    }
  }
];
