"use client";

import * as XLSX from "xlsx";
// Asegúrate de que las rutas a tus types sean correctas
import { Blog, BlogExport } from "@/types/admin/blog";
import { Producto, ProductoExport } from "@/types/producto";

export const exportCSV = (
  data: Blog[] | Producto[],
  fileName: string = "reporte"
) => {
  if (!data || data.length === 0) {
    console.warn("No hay datos para exportar");
    return;
  }

  // 1. Type Guard: Detectamos si es Blog verificando si tiene la propiedad 'title'
  // Es más seguro que verificar arrays opcionales como 'galeria'
  const isBlog = (item: any): item is Blog => {
    return (item as Blog).title !== undefined;
  };

  let exportData: BlogExport[] | ProductoExport[] = [];

  // 2. Normalización de datos (Mapeo correcto de propiedades)
  if (isBlog(data[0])) {
    exportData = (data as Blog[]).map((blog): BlogExport => ({
      // Ajusta estas claves según tu interfaz BlogExport
       ID: blog.id,
        Título: blog.title, // Corregido: antes estaba vacío
        Subtítulo: blog.cover_subtitle || "Sin subtítulo",
        "Meta Título": blog.meta_title || "N/A",
        Fecha: new Date(blog.created_at).toLocaleDateString(), // Corregido: 'fecha' no existía
        "Cant. Párrafos": blog.paragraphs?.length || 0,
        "Cant. Imágenes": blog.gallery?.length || 0,// Nota: es 'gallery', no 'galeria'
    }));
  } else {
    // Lógica para Productos
    exportData = (data as Producto[]).map(
      (producto): ProductoExport => ({
        nombre: producto.nombre,
        categorias: producto.nombre?.length || 0,
        // Agrega el resto de campos necesarios
      })
    );
  }

  // 3. Crear Workbook y Worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // 4. Generar nombre de archivo
  const date = new Date().toISOString().split("T")[0];
  const finalFileName = `${fileName}_${date}.csv`;

  // 5. Escribir archivo forzando tipo CSV
  XLSX.writeFile(workbook, finalFileName, {
    bookType: "csv", // Importante: define el formato de salida
    type: "string",  // Asegura codificación correcta
  });
};