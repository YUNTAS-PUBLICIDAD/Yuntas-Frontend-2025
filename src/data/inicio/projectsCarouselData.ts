import { imagenes } from "@/data/imagenes";

export interface ProjectSlide {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
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
  },
];