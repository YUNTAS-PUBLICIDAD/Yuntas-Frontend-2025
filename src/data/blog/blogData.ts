import blog1 from '@/assets/blog/listaBlog/blog1.jpg'
import blog2 from '@/assets/blog/listaBlog/blog2.png'
import blog3 from '@/assets/blog/listaBlog/blog3.png'
import blog4 from '@/assets/blog/listaBlog/blog4.png'
import blog5 from '@/assets/blog/listaBlog/blog5.png'
import blog6 from '@/assets/blog/listaBlog/blog6.png'
import hero6 from '@/assets/blog/listaBlog/hero6.png'

import galeria6 from '@/assets/blog/listaBlog/galeria6.png'
import galeria62 from '@/assets/blog/listaBlog/galeria6.2.png'

export const BlogData = [
  {
    id:"1",
    nombre: "LETREROS LUMINOSOS",
    descripcion: "Letreros Luminosos: Brilla con tu marca ",
    img: blog1,
  },
  {
    id:"2",
    nombre: "HOLOGRAMAS 3D",
    descripcion: "Hologramas 3D: Proyecta el futuro de tu marca",
    img: blog2,
  },
  {
    id:"3",
    nombre: "LETRAS PINTADAS EN MDF",
    descripcion: "Letras pintadas en MDF: Perfectos para resaltar tu marca",
    img: blog3,
  },
  // {
  //   id:"4",
  //   nombre: "MONITORES DE PUBLICIDAD DIGITAL",
  //   descripcion: "Impacto en el movimiento",
  //   img: blog4,
  // },
  {
    id:"5",
    nombre: "HOLOGRAMAS 3D",
    descripcion: "Una forma de mostrar presencia y elegancia",
    img: blog5,
  },

  {
    id:"6",
    nombre: "LETREROS ACRÍLICOS",
    descripcion: "Elegancia y profesionalismo en tu marca",
    img: blog6,
    
    fondoPrincipal: hero6,  

    detalles: `
      Los letreros acrílicos son la opción preferida para marcas que buscan
      una presentación elegante y duradera. 
      Su acabado brillante y versátil
      permite comunicar con impacto tanto en interiores como en exteriores,
      reforzando la identidad visual de cualquier negocio.
    `,
    beneficio_principal:"Ideales para logos, señalización y decoración,proyectan un estilo moderno y profesional que atrae miradas",
    beneficios: [
      "Diseño elegante y personalizable en formas y colores.",
      "Alta resistencia y durabilidad en diferentes ambientes.",
      "Refuerzan la identidad visual con un acabado profesional.",
    ],

    testimonio: {
      titulo:"  Los letreros acrílicos nos dieron la calidad que buscábamos.",
      comentario: `
       Logramos una imagen elegante y llamativa. 
       Ahora los clientes identifican la tienda al instante y la presentación recibe comentarios muy positivos. 
       Es una inversión clave para destacar.
      `,
      autor: "Valeria Ríos",
      calificacion: 5
    },

    videoUrl: "https://www.youtube.com/embed/Wl9Ik7dF690", 

    galeria: [galeria6,galeria62]
  }
]
