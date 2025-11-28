type DataAdminItem = {
    id: number;
    nombre: string;
    gmail: string;
    telefono: string;
    seccion: string;
    fecha: string;
};

const data: DataAdminItem[] = [
    {
        id: 1,
        nombre: "Kiara",
        gmail: "namelose@gmail.com",
        telefono: "941825478",
        seccion: "WAOS",
        fecha: "25/01/2025"
    },
    {
        id: 2,
        nombre: "Maria",
        gmail: "maria@gmail.com",
        telefono: "999777666",
        seccion: "WAOS",
        fecha: "27/11/2025"
    },
    {
        id: 3,
        nombre: "Carlos López",
        gmail: "carlos@gmail.com",
        telefono: "999666555",
        seccion: "WAOS",
        fecha: "26/11/2025"
    },
];

export default data;