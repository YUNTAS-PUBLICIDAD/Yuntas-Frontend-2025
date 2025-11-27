import heroBackground from "@/assets/productos/detalle/productoDetalle.jpg";
import especificacionProducto from "@/assets/productos/detalle/especificacionProducto.jpg";
import beneficioProducto from "@/assets/productos/detalle/beneficioProducto.jpg";

export interface ProductoDetalle {
    id: string;
    name: string;
    heroImage: string;
    specImage: string;
    benefImage: string;
    specs: string[];
    benef: string[];
    info: string;
}

export const productosDetalleData: Record<string, ProductoDetalle> = {
    "letreros-neon-led": {
        id: "letreros-neon-led",
        name: "LETREROS NEÓN LED",
        heroImage: heroBackground.src,
        specImage: especificacionProducto.src,
        benefImage: beneficioProducto.src,
        specs: [
            "Iluminación LED de bajo consumo.",
            "Amplia gama de colores personalizados.",
            "Material PVC flexible y resistente."
        ],
        benef: [
            "Aporta estilo y personalidad al negocio.",
            "Ideales para destacar mensajes o productos.",
            "Crea atmósferas visuales únicas.",
            "Bajo consumo eléctrico."
        ],
        info: "Los Letreros Neón LED combinan tecnología moderna con un diseño atractivo y personalizable. Son ideales para dar personalidad a espacios comerciales, destacar frases, logos o crear ambientes visuales únicos. Ofrecen el efecto del neón clásico, pero con menor consumo, mayor seguridad y durabilidad. Fáciles de instalar en interiores, funcionan conectados a corriente eléctrica y se adaptan al estilo de cada marca, transmitiendo una estética creativa, moderna o acogedora según lo que se quiera comunicar."
    },
    "pantallas-led-gigantes": {
        id: "pantallas-led-gigantes",
        name: "PANTALLAS LED GIGANTES",
        heroImage: heroBackground.src,
        specImage: especificacionProducto.src,
        benefImage: beneficioProducto.src,
        specs: [
            "Alta resolución Full HD y 4K.",
            "Brillo ajustable hasta 8000 nits.",
            "Resistencia al agua IP65.",
            "Modular y escalable a cualquier tamaño."
        ],
        benef: [
            "Máxima visibilidad en exteriores.",
            "Reproduce contenido dinámico y atractivo.",
            "Ideal para eventos, publicidad y estadios.",
            "Bajo mantenimiento y larga vida útil."
        ],
        info: "Las Pantallas LED Gigantes son la solución perfecta para captar la atención en espacios exteriores e interiores de gran escala. Con tecnología de última generación, ofrecen imágenes nítidas y colores vibrantes incluso bajo luz solar directa. Su diseño modular permite adaptarlas a cualquier tamaño y forma, haciéndolas ideales para centros comerciales, estadios, conciertos y fachadas de edificios. Fáciles de controlar remotamente y con bajo consumo energético."
    }
};