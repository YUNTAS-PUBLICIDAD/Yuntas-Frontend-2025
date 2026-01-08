"use client";

import * as XLSX from "xlsx";
import { Blog } from "@/types/blog";
import { Producto } from "@/types/producto";
import { UserData } from "@/types/admin";

type ExportRow = Record<string, string | number>;

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

  // 🔹 BLOG
  if (Array.isArray(firstItem?.galeria)) {
    exportData = (data as Blog[]).map(blog => ({
      ID: blog.id,
      NOMBRE: blog.nombre,
      DESCRIPCIÓN: blog.descripcion,
      FECHA: String(blog.fecha),
      IMÁGENES: blog.galeria?.length || 0,
    }));
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
