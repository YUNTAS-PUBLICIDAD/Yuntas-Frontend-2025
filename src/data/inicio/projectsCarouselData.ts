import { imagenes } from "@/data/imagenes";

export interface ProjectSlide {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  mobileBefore: { src: string; alt: string };
  mobileAfter: { src: string; alt: string };
}

export const projectsCarouselSlides: ProjectSlide[] = [
  {
    before: {
      src: imagenes.inicio.proyecto1Antes.src,
      alt: imagenes.inicio.proyecto1Antes.alt,
    },
    after: {
      src: imagenes.inicio.proyecto1Despues.src,
      alt: imagenes.inicio.proyecto1Despues.alt,
    },
    mobileBefore: {
      src: imagenes.inicio.proyecto1AntesMobile.src,
      alt: imagenes.inicio.proyecto1AntesMobile.alt,
    },
    mobileAfter: {
      src: imagenes.inicio.proyecto1DespuesMobile.src,
      alt: imagenes.inicio.proyecto1DespuesMobile.alt,
    },
  },
  {
    before: {
      src: imagenes.inicio.proyecto2Antes.src,
      alt: imagenes.inicio.proyecto2Antes.alt,
    },
    after: {
      src: imagenes.inicio.proyecto2Despues.src,
      alt: imagenes.inicio.proyecto2Despues.alt,
    },
    mobileBefore: {
      src: imagenes.inicio.proyecto2AntesMobile.src,
      alt: imagenes.inicio.proyecto2AntesMobile.alt,
    },
    mobileAfter: {
      src: imagenes.inicio.proyecto2DespuesMobile.src,
      alt: imagenes.inicio.proyecto2DespuesMobile.alt,
    },
  },
];