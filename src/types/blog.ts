import {StaticImageData} from 'next/image'

export type Blog= {
  id:string,
  img: StaticImageData;
  nombre: string;
  descripcion: string;
  fondoPrincipal: StaticImageData,  
  detalles:string,
  beneficio_principal:string,
  fecha:Date
  beneficios:string[],
    testimonio: {
      titulo:string
      comentario: string
      autor: string,
      calificacion: number
    },

    videoUrl: string, 
    galeria: StaticImageData[]
  //...
}
export type BlogExport = {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  nro_de_imagenes: number;
};
