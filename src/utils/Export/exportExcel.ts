"use client";

import * as XLSX from "xlsx";
<<<<<<< HEAD
import { Blog } from "@/types/blog";
import { Producto } from "@/types/producto";
import { UserData } from "@/types/admin";

type ExportRow = Record<string, string | number>;
=======
// Asegúrate de importar las interfaces correctamente desde tu ruta
import { Blog, BlogExport } from "@/types/admin/blog";
import { Producto, ProductoExport } from "@/types/admin/producto";
>>>>>>> 994364b691fb84e9e08db8c68bb6ea4fc06c3ad5

export const exportExcel = (
  data: any[],
  fileName: string = "reporte"
) => {
  if (!data || data.length === 0) {
    console.warn("No hay datos para exportar");
    return;
  }

  const firstItem = data[0];
  let exportData: ExportRow[] = [];

<<<<<<< HEAD
  // 🔹 BLOG
  if (Array.isArray(firstItem?.galeria)) {
    exportData = (data as Blog[]).map(blog => ({
      ID: blog.id,
      NOMBRE: blog.nombre,
      DESCRIPCIÓN: blog.descripcion,
      FECHA: String(blog.fecha),
      IMÁGENES: blog.galeria?.length || 0,
    }));
=======
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
>>>>>>> 994364b691fb84e9e08db8c68bb6ea4fc06c3ad5
  }

  // 🔹 PRODUCTO
  else if (Array.isArray(firstItem?.categorias)) {
    exportData = (data as Producto[]).map(producto => ({
      NOMBRE: producto.nombre,
      CATEGORÍAS: producto.categorias?.length || 0,
    }));
  }

  // 🔹 USUARIOS ✅
  else if ("email" in firstItem && "name" in firstItem) {
    exportData = (data as UserData[]).map(user => ({
      ID: user.id,
      NOMBRE: user.name,
      EMAIL: user.email,
    }));
  }

  else {
    console.error("Tipo de datos no soportado para exportación");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  const date = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `${fileName}_${date}.xlsx`);
};
