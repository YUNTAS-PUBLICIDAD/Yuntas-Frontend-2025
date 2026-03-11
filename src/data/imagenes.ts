import inicioUser from "@/assets/inicio/user-1.png";

// import opinion1 from "@/assets/inicio/opinion1.png";
// import opinion2 from "@/assets/inicio/opinion2.png";
// import opinion3 from "@/assets/inicio/opinion3.png";
import opinion1 from "@/assets/inicio/opinion01.webp";
import opinion2 from "@/assets/inicio/opinion02.webp";
import opinion3 from "@/assets/inicio/opinion03.webp";

// import inicioHero from "@/assets/inicio/heroBackground.jpg";
import inicioHero from "@/assets/inicio/heroBackground0.webp";

import inicioPopup from "@/assets/inicio/Popup/yuleLove.webp";

// import inicioDetalle1 from "@/assets/inicio/innovation01.jpg";
import inicioDetalle1 from "@/assets/inicio/innovation001.webp";

// import inicioDetalle2 from "@/assets/inicio/innovation02.jpg";
import inicioDetalle2 from "@/assets/inicio/innovation002.webp";
import inicioDetalle3 from "@/assets/inicio/burguerP.webp";

// import inicioTestimonio from "@/assets/inicio/fondodepantalla.png";
import inicioTestimonio from "@/assets/inicio/fondodepantalla01.webp";

// import proyectoAntes1 from "@/assets/inicio/nuestroproyectosantes1.png";
import proyectoAntes1 from "@/assets/inicio/nuestroproyectosantes01.png";

// import proyectoDespues1 from "@/assets/inicio/nuestroproyectosdespues1.png";
import proyectoDespues1 from "@/assets/inicio/nuestroproyectosdespues01.webp";

// import proyectoAntes2 from "@/assets/inicio/nuestroproyectosantes2.png";
import proyectoAntes2 from "@/assets/inicio/nuestroproyectosantes02.png";
import proyectoDespues2 from "@/assets/inicio/nuestroproyectosdespues2.png";


// import nosotrosHero from "@/assets/nosotros/nosotrosBackground.webp";
import nosotrosHero from "@/assets/nosotros/nosotrosBackground0.webp";
// import nosotrosDetalle from "@/assets/nosotros/negocioImagen.webp";
import nosotrosDetalle from "@/assets/nosotros/negocioImagen0.webp";


import productosPopup from "@/assets/productos/popup/Productos.webp";
// import productosHero from "@/assets/productos/heroBackground.png";
import productosHero from "@/assets/productos/heroBackground.webp";



// import blogsHero from "@/assets/blog/heroBackground.png";
import blogsHero from "@/assets/blog/heroBackground0.webp";


import contactoHero from "@/assets/contacto/contactoBackground.webp";
import reclamacionesHero from "@/assets/Reclamaciones/herobackground.png";


export const imagenes = {
    inicio: {
        user: {
            src: inicioUser.src,
            alt: "Icono de usuario",
            title: "Icono de usuario"
        },
        hero: {
            src: inicioHero.src,
            alt: "Fondo de inicio",
            title: "Fondo de inicio"
        },
        popup: {
            src: inicioPopup.src,
            alt: "Luces moradas estilo neon",
            title: "Luces moradas estilo neon"
        },
        detalle1: {
            src: inicioDetalle1.src,
            alt: "Espacio arquitectónico innovador",
            title: "Espacio arquitectónico innovador"
        },
        detalle2: {
            src: inicioDetalle2.src,
            alt: "Pantalla LED de gran formato",
            title: "Pantalla LED de gran formato"
        },
        detalle3: {
            src: inicioDetalle3.src,
            alt: "Letrero luminoso de burguer",
            title: "Letrero luminoso de burguer"
        },
        testimonio: {
            src: inicioTestimonio.src,
            alt: "Sala espaciosa con diseño moderno",
            title: "Sala espaciosa con diseño moderno"
        },
        proyecto1Antes: {
            src: proyectoAntes1.src,
            alt: "Proyecto 1 - Antes",
            title: "Proyecto 1 - Antes"
        },
        proyecto1Despues: {
            src: proyectoDespues1.src,
            alt: "Proyecto 1 - Después",
            title: "Proyecto 1 - Después"
        },
        proyecto2Antes: {
            src: proyectoAntes2.src,
            alt: "Proyecto 2 - Antes",
            title: "Proyecto 2 - Antes"
        },
        proyecto2Despues: {
            src: proyectoDespues2.src,
            alt: "Proyecto 2 - Después",
            title: "Proyecto 2 - Después"
        },
        opiniones: {
            persona1: {
                src: opinion1.src,
                alt: "Opinión de Carlos Mendoza",
                title: "Opinión de Carlos Mendoza"
            },
            persona2: {
                src: opinion2.src,
                alt: "Opinión de Andrea Ramos",
                title: "Opinión de Andrea Ramos"
            },
            persona3: {
                src: opinion3.src,
                alt: "Opinión de Luis Palacios",
                title: "Opinión de Luis Palacios"
            }
        }
    },
    nosotros: {
        hero: {
            src: nosotrosHero.src,
            alt: "Personas de un equipo colaborando en un proyecto",
            title: "Personas de un equipo colaborando en un proyecto"
        },
        detalle: {
            src: nosotrosDetalle.src,
            alt: "Equipo de trabajo en Yuntas Publicidad",
            title: "Equipo de trabajo en Yuntas Publicidad"
        },
    },
    productos: {
        hero: {
            src: productosHero.src,
            alt: "Catálogo de productos publicitarios Yuntas",
            title: "Catálogo de productos publicitarios Yuntas"
        },
        popup: {
            src: productosPopup.src,
            alt: "Luces bar estilo neon",
            title: "Luces bar estilo neon"
        },
    },
    blogs: {
        hero: {
            src: blogsHero.src,
            alt: "Personas en una reunión de trabajo",
            title: "Personas en una reunión de trabajo"
        },
    },
    contacto: {
        hero: {
            src: contactoHero.src,
            alt: "Fondo de contacto",
            title: "Fondo de contacto"
        }
    },
    login: {
        hero: {
            src: inicioHero.src,
            alt: "Fondo de inicio",
            title: "Fondo de inicio"
        }
    },
    reclamaciones: {
        hero: {
            src: reclamacionesHero.src,
            alt: "Persona trabajando en una oficina con una laptop",
            title: "Persona trabajando en una oficina con una laptop"
        }
    }
} as const;