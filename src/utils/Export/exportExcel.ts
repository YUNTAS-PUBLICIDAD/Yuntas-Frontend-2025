"use client";

import * as XLSX from "xlsx";
// Asegúrate de importar las interfaces correctamente desde tu ruta
import { Blog, BlogExport } from "@/types/admin/blog";
import { Producto, ProductoExport } from "@/types/admin/producto";

export const exportExcel = (
  data: Blog[] | Producto[],
  fileName: string = "reporte"
) => {
  if (!data || data.length === 0) {
    console.warn("No hay datos para exportar");
    return;
  }

  // 1. Type Guard: Verificamos si es Blog comprobando si tiene la propiedad 'title'
  // (La interfaz Blog tiene 'title', Producto usualmente tiene 'nombre')
  const isBlog = (item: any): item is Blog => {
    return (item as Blog).title !== undefined;
  };

  let exportData: BlogExport[] | ProductoExport[] = [];

  // 2. Normalización de datos
  if (isBlog(data[0])) {
    exportData = (data as Blog[]).map(
      (blog): BlogExport => ({
        // Las keys aquí deben coincidir con la interfaz BlogExport
        ID: blog.id,
        Título: blog.title, // Corregido: antes estaba vacío
        Subtítulo: blog.cover_subtitle || "Sin subtítulo",
        "Meta Título": blog.meta_title || "N/A",
        Fecha: new Date(blog.created_at).toLocaleDateString(), // Corregido: 'fecha' no existía
        "Cant. Párrafos": blog.paragraphs?.length || 0,
        "Cant. Imágenes": blog.gallery?.length || 0, // Corregido: es 'gallery', no 'galeria'
      })
    );
  } else {
    // Lógica para Productos (Asumiendo que ProductoExport tiene esta estructura)
    exportData = (data as Producto[]).map(
      (producto): ProductoExport => ({
        nombre: producto.name,
        categorias: producto.category_name ? 1 : 0,
        // Agrega aquí más campos según tu interfaz ProductoExport
      })
    );
  }

  // 3. Crear Excel
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  
  // Ajuste opcional: Auto-ancho de columnas basado en el contenido
  const wscols = Object.keys(exportData[0] || {}).map(() => ({ wch: 20 }));
  worksheet['!cols'] = wscols;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // 4. Nombre dinámico + fecha
  const date = new Date().toISOString().split("T")[0];
  const finalFileName = `${fileName}_${date}.xlsx`;

  XLSX.writeFile(workbook, finalFileName);
};