"use client";

<<<<<<< HEAD
import { Blog } from "@/types/blog";
import { Producto } from "@/types/producto";
import { UserData } from "@/types/admin";

type ExportRow = Record<string, string | number>;
=======
import * as XLSX from "xlsx";
// Asegúrate de que las rutas a tus types sean correctas
import { Blog, BlogExport } from "@/types/admin/blog";
import { Producto, ProductoExport } from "@/types/admin/producto";
>>>>>>> 994364b691fb84e9e08db8c68bb6ea4fc06c3ad5

export const exportCSV = (
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
<<<<<<< HEAD
=======
  } else {
    // Lógica para Productos
    exportData = (data as Producto[]).map(
      (producto): ProductoExport => ({
        nombre: producto.name,
        categorias: producto.category_name ? 1 : 0,
        // Agrega el resto de campos necesarios
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
    console.error("Tipo de datos no soportado para exportación CSV");
    return;
  }

  // 🔹 Construcción manual del CSV (Excel-friendly)
  const headers = Object.keys(exportData[0]).join(";");
  const rows = exportData.map(row =>
    Object.values(row)
      .map(value =>
        `"${String(value).replace(/"/g, '""')}"`
      )
      .join(";")
  );

  const csvContent = "\uFEFF" + [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
};
