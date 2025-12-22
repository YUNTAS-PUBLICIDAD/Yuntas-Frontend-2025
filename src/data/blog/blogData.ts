<<<<<<< HEAD
import axios from "axios";

const BlogData = async () => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blog`
  );
};

export default BlogData;
=======
// Datos de prueba para la tabla de blogs en modo desarrollo
// NOTA: Estos datos son locales y se usan solo para testing
// En producción, los datos se obtienen desde el API backend
export const blogTestData = [
    {
        id: 1,
        titulo: "Guía Completa de Iluminación LED",
        subtitulo: "Cómo elegir la iluminación perfecta para tu hogar",
        imagen_principal_url: "https://via.placeholder.com/300x200?text=LED+Lighting",
        fecha: "2025-01-15",
    },
    {
        id: 2,
        titulo: "Tendencias en Decoración 2025",
        subtitulo: "Los estilos que dominarán este año",
        imagen_principal_url: "https://via.placeholder.com/300x200?text=Decoracion",
        fecha: "2025-01-10",
    },
    {
        id: 3,
        titulo: "Cómo Instalar Paneles Solares",
        subtitulo: "Guía paso a paso para energía renovable",
        imagen_principal_url: "https://via.placeholder.com/300x200?text=Solar",
        fecha: "2025-01-05",
    },
    
];
>>>>>>> origin/pre-masterf
