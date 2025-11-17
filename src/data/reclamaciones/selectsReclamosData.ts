import { productosData } from "../productosData"
const productosNombre = productosData.map(e => e.nombre);
export const selectsReclamos=[
    {
        textLabel:"Tipo de Documento",
        options:["DNI","Pasaporte"],
    },
    {
        textLabel:"Producto",
        options:productosNombre,
    }
]