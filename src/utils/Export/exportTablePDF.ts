export const exportTablePDF = (
  data: any[],
  title: string,
  columns: { key: string; label: string }[]
) => {
  if (!data || data.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert("Permite ventanas emergentes para generar el PDF");
    return;
  }

  const headers = columns.map(col => `<th>${col.label}</th>`).join("");

  const rows = data
    .map(row => `
      <tr>
        ${columns
          .map(col => `<td>${row[col.key] ?? ""}</td>`)
          .join("")}
      </tr>
    `)
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      <style>
        body { font-family: Arial; font-size: 11px; padding: 20px; }
        h1 { text-align: center; color: #0ea5e9; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 6px; }
        th { background: #0ea5e9; color: #fff; }
        tr:nth-child(even) { background: #f5f5f5; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <table>
        <thead><tr>${headers}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.onload = () => printWindow.print();
};
