"use client";

import * as XLSX from "xlsx";
import { Blog } from "@/types/blog";
import { Producto } from "@/types/producto";
import { BlogExport } from "@/types/blog";
import { ProductoExport } from "@/types/producto";

export const exportCSV = (
  data: Blog[] | Producto[],
  fileName: string = "reporte"
) => {
  if (!data || data.length === 0) {
    console.warn("No hay datos para exportar");
    return;
  }

  let exportData: BlogExport[] | ProductoExport[] = [];

  const isBlog = (item: any): item is Blog => {
    return Array.isArray(item?.galeria);
  };

  // 🔹 Normalización de datos según tipo
  if (isBlog(data[0])) {
    exportData = (data as Blog[]).map((blog): BlogExport => ({
      id: blog.id,
      nombre: blog.nombre,
      descripcion: blog.descripcion,
      fecha: blog.fecha.toString(),
      nro_de_imagenes: blog.galeria?.length || 0,
    }));
  } else {
    exportData = (data as Producto[]).map(
      (producto): ProductoExport => ({
        nombre: producto.nombre,
        categorias: producto.categorias?.length || 0,
      })
    );
  }

  // 🔹 Crear CSV desde los datos normalizados
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // 🔹 Nombre dinámico + fecha
  const date = new Date().toISOString().split("T")[0];
  const finalFileName = `${fileName}_${date}.csv`;

  XLSX.writeFile(workbook, finalFileName, {
    bookType: "csv",
  });
};
