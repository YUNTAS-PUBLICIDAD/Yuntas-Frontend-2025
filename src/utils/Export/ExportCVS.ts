"use client";

import { Blog } from "@/types/blog";
import { Producto } from "@/types/producto";
import * as XLSX from "xlsx";
import { BlogExport } from "@/types/blog";
import { ProductoExport } from "@/types/producto";
export const exportCSV = (data: Blog[] | Producto[]) => {
  if (!data || data.length === 0) {
    console.warn("No hay datos para exportar");
    return;
  }
    let exportData: BlogExport[] | ProductoExport[] = [];
    const isBlog = (item: any): item is Blog => {
        return Array.isArray(item?.galeria);
    };
    if (isBlog(data[0])) {
      exportData = (data as Blog[]).map((blog): BlogExport => ({
        id: blog.id,
        nombre: blog.nombre,
        descripcion: blog.descripcion,
        fecha: blog.fecha.toString(),
        nro_de_imagenes: blog.galeria?.length || 0
      }));
    } 
    else {
      exportData = (data as Producto[]).map((producto): ProductoExport => ({
        nombre: producto.nombre,
        categorias: producto.categorias?.length,
      }));
    }
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Exportar como CSV
  XLSX.writeFile(workbook, "export.csv", { bookType: "csv" });
};
