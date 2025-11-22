import {StaticImageData} from 'next/image'

export type Blog= {
  img: StaticImageData;
  nombre: string;
  descripcion: string;
  //...
}