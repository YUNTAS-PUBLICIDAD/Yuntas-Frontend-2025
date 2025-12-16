import {StaticImageData} from 'next/image'

export type Producto= {
  id: number;
  nombre: string;
  precio: number;
  imagen_url: string;
  slug: string;
  descripcion_corta: string;
  //...
}
export type ProductoExport = {
  nombre: string;
  categorias: number;
};