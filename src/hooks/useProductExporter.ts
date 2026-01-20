import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { Producto } from '@/types/admin/producto';
import { showToast } from '@/utils/showToast';
export const useProductExporter = () => {

    const buildPDF = (data: Producto[]) => {
        const doc = new jsPDF();

        doc.text("Reporte de Productos - Yuntas", 14, 15);

        const tableColumn = ["ID", "Nombre", "Sección", "Precio"];
        const tableRows: any[] = [];

        data.forEach(item => {
            tableRows.push([
                item.id,
                item.name,
                item.category_name,
                item.price
            ]);
        });

        // @ts-ignore
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        return doc;
    };

    // --- EXCEL ---
    const exportToExcel = (data: Producto[], fileName = 'productos.xlsx') => {
        if (!data || data.length === 0) {
            showToast.warning("No hay datos para exportar");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
            ID: item.id,
            Nombre: item.name,
            Sección: item.category_name,
            Precio: item.price
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
        XLSX.writeFile(workbook, fileName);
    };

    // --- CSV ---
    const exportToCSV = (data: Producto[], fileName = 'productos.csv') => {
        if (!data || data.length === 0) {
            showToast.warning("No hay datos para exportar");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
            ID: item.id,
            Nombre: item.name,
            Sección: item.category_name,
            Precio: item.price
        })));

        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };

    // --- PDF ---
    const exportToPDF = (data: Producto[], fileName = 'productos.pdf') => {
        if (!data || data.length === 0) {
            showToast.warning("No hay datos para exportar");
            return;
        }

        const doc = buildPDF(data);
        doc.save(fileName);
    };

    // --- IMPRIMIR (MISMO DISEÑO QUE PDF) ---
    const printTable = (data: Producto[]) => {
        if (!data || data.length === 0) {
            showToast.warning("No hay datos para imprimir");
            return;
        }

        const doc = buildPDF(data);
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
    };

    return { exportToExcel, exportToCSV, exportToPDF, printTable };
};
