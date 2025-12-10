import { Blog } from "@/types/blog";
export const exportToPDF = (data: Blog[]) => {
  try {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("Permite ventanas emergentes para generar el PDF");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Reporte de Blogs</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            padding: 20px;
          }
          h1 {
            text-align: center;
            color: #0ea5e9;
            border-bottom: 2px solid #0ea5e9;
            padding-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 5px;
            font-size: 10px;
          }
          th {
            background: #0ea5e9;
            color: #fff;
          }
          tr:nth-child(even) {
            background: #f5f5f5;
          }
          .truncate {
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        </style>
      </head>
      <body>
        <h1>📊 Reporte de Blogs</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Subtítulo</th>
              <th>Meta Título</th>
              <th>Fecha</th>
              <th>Párrafos</th>
              <th>Imágenes</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (blog) => `
              <tr>
                <td>${blog.id}</td>
                <td class="truncate">${blog.nombre || ""}</td>
                <td class="truncate">${blog.descripcion || ""}</td>
                <td class="truncate">${blog.testimonio || ""}</td>
                <td>${new Date(blog.fecha).toLocaleDateString("es-ES")}</td>
              </tr>
            `
              )
              .join("")}
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
      }, 400);
    };
  } catch (e) {
    console.error("Error PDF", e);
    alert("Error al generar PDF");
  }
};
