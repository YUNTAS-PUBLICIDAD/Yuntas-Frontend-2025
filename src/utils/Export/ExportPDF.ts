import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Blog } from "@/types/admin/blog";
import { Producto } from "@/types/admin/producto";

export const exportToPDF = (data: Blog[] | Producto[]) => {
  try {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    // 🔍 Detectar tipo de dato
    const isBlog = (item: any): item is Blog => {
      return (item as Blog).title !== undefined;
    };

    const isBlogData = isBlog(data[0]);

    //Crear documento PDF (horizontal para tablas grandes)
    const doc = new jsPDF("l", "mm", "a4");

    doc.setFontSize(14);
    doc.text(
      `Reporte de ${isBlogData ? "Blogs" : "Productos"} - Yuntas`,
      14,
      15
    );

    if (isBlogData) {
      //TABLA BLOGS
      autoTable(doc, {
        startY: 22,
        head: [[
          "ID",
          "Título",
          "Subtítulo",
          "Meta Título",
          "Fecha",
          "Párrafos",
          "Imágenes",
        ]],
        body: (data as Blog[]).map(blog => [
          blog.id,
          blog.title,
          blog.cover_subtitle || "-",
          blog.meta_title || "-",
          new Date(blog.created_at).toLocaleDateString("es-ES"),
          blog.paragraphs?.length || 0,
          blog.gallery?.length || 0,
        ]),
        styles: {
          fontSize: 9,
          valign: "middle",
        },
        headStyles: {
          fillColor: [14, 165, 233], // mismo azul que usabas
          textColor: 255,
          halign: "center",
        },
        bodyStyles: {
          halign: "left",
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
      });
    } else {
      //TABLA PRODUCTOS
      autoTable(doc, {
        startY: 22,
        head: [["Nombre", "Categoría"]],
        body: (data as Producto[]).map(prod => [
          prod.name,
          prod.category_name,
        ]),
        styles: { fontSize: 10 },
        headStyles: {
          fillColor: [14, 165, 233],
          textColor: 255,
        },
      });
    }

    // Descargar PDF
    doc.save(`reporte_${isBlogData ? "blogs" : "productos"}.pdf`);
  } catch (error) {
    console.error("Error al generar PDF:", error);
    alert("Error al generar el PDF");
  }
};
