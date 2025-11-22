import {StaticImageData} from 'next/image'

export type Producto= {
  img: StaticImageData;
  nombre: string;
  categorias: string[];
  //...
}