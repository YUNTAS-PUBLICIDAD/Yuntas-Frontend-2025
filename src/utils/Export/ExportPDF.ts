import { Blog } from "@/types/admin/blog";
import { Producto } from "@/types/admin/producto";

export const exportToPDF = (data: Blog[] | Producto[]) => {
  try {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const printWindow = window.open("", "_blank", "width=1100,height=700"); // Un poco más ancho
    if (!printWindow) {
      alert("Permite ventanas emergentes para generar el PDF");
      return;
    }

    // 1. Detectar tipo de dato
    const isBlog = (item: any): item is Blog => {
      return (item as Blog).title !== undefined;
    };

    const isBlogData = isBlog(data[0]);

    // 2. Definir Encabezados
    const headers = isBlogData
      ? `
        <th style="width: 5%;">ID</th>
        <th style="width: 20%;">Título</th>
        <th style="width: 20%;">Subtítulo</th>
        <th style="width: 20%;">Meta Título</th>
        <th style="width: 15%;">Fecha</th>
        <th style="width: 10%;">Párrafos</th>
        <th style="width: 10%;">Imágenes</th>
      `
      : `
        <th>Nombre</th>
        <th>Categorías</th>
      `;

    // 3. Generar Filas (CORREGIDO: div.truncate dentro de td)
    const rows = isBlogData
      ? (data as Blog[])
          .map(
            (blog) => `
            <tr>
              <td style="text-align:center">${blog.id}</td>
              <td><div class="truncate">${blog.title}</div></td>
              <td><div class="truncate">${blog.cover_subtitle || "-"}</div></td>
              <td><div class="truncate">${blog.meta_title || "-"}</div></td>
              <td style="text-align:center">${new Date(blog.created_at).toLocaleDateString("es-ES")}</td>
              <td style="text-align:center">${blog.paragraphs?.length || 0}</td>
              <td style="text-align:center">${blog.gallery?.length || 0}</td>
            </tr>
          `
          )
          .join("")
      : (data as Producto[])
          .map(
            (prod) => `
            <tr>
              <td>${prod.name}</td>
              <td style="text-align:center">${prod.category_name}</td>
            </tr>
          `
          )
          .join("");

    // 4. Construir HTML
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Reporte</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 11px; padding: 20px; }
          h1 { text-align: center; color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 15px; margin-bottom: 20px; }
          
          table { 
            width: 100%; 
            border-collapse: collapse; 
            table-layout: fixed; /* Importante para respetar anchos */
          }
          
          th, td { 
            border: 1px solid #e2e8f0; 
            padding: 8px; 
            vertical-align: middle;
          }
          
          th { 
            background-color: #0ea5e9; 
            color: white; 
            font-weight: 600;
            text-align: center;
          }
          
          tr:nth-child(even) { background-color: #f8fafc; }
          
          /* CLASE TRUNCATE CORREGIDA */
          .truncate {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block; /* Funciona bien dentro del DIV, no del TD */
          }
        </style>
      </head>
      <body>
        <h1>📊 Reporte de ${isBlogData ? "Blogs" : "Productos"}</h1>
        <table>
          <thead>
            <tr>${headers}</tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  } catch (e) {
    console.error("Error PDF", e);
    alert("Error al generar PDF");
  }
};