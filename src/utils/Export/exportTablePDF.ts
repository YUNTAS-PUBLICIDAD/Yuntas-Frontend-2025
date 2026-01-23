import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { showToast } from "@/utils/showToast";
export const exportTablePDF = (
  data: any[],
  title: string,
  columns: { key: string; label: string }[],
  action: "download" | "print" = "download"
) => {
  if (!data || data.length === 0) {
    showToast.warning("No hay datos para exportar");
    return;
  }

  const doc = new jsPDF("l", "mm", "a4");

  doc.setFontSize(14);
  doc.text(title, 14, 15);

  autoTable(doc, {
    startY: 22,
    head: [columns.map(col => col.label)],
    body: data.map(row =>
      columns.map(col => row[col.key] ?? "-")
    ),
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [14, 165, 233],
      textColor: 255,
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  if (action === "download") {
    // 📥 DESCARGAR PDF
    doc.save(`${title}.pdf`);
  } else {
    // 🖨️ IMPRIMIR → abre ventana de impresión clásica
    doc.autoPrint();
    const pdfBlobUrl = doc.output("bloburl");
    window.open(pdfBlobUrl);
  }
};
