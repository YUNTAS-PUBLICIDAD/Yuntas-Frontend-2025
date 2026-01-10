import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { Producto } from '@/types/admin/producto';

export const useProductExporter = () => {

    // --- 1. EXPORTAR A EXCEL ---
    const exportToExcel = (data: Producto[], fileName: string = 'productos.xlsx') => {
        if (!data || data.length === 0) return alert("No hay datos para exportar");

        const dataToExport = data.map(item => ({
            ID: item.id,
            Nombre: item.name,
            Sección: item.category_name,
            Precio: item.price
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
        XLSX.writeFile(workbook, fileName);
    };

    // --- 2. EXPORTAR A CSV ---
    const exportToCSV = (data: Producto[], fileName: string = 'productos.csv') => {
        if (!data || data.length === 0) return alert("No hay datos para exportar");

        const dataToExport = data.map(item => ({
            ID: item.id,
            Nombre: item.name,
            Sección: item.category_name,
            Precio: item.price
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
        
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- 3. EXPORTAR A PDF ---
    const exportToPDF = (data: Producto[], fileName: string = 'productos.pdf') => {
        if (!data || data.length === 0) return alert("No hay datos para exportar");

        const doc = new jsPDF();

        doc.text("Reporte de Productos - Yuntas", 14, 15);

        
        const tableColumn = ["ID", "Nombre", "Sección", "Precio"];
        const tableRows: any[] = [];

        data.forEach(item => {
            const rowData = [
                item.id,
                item.name,
                item.category_name,
                item.price 
            ];
            tableRows.push(rowData);
        });

        // @ts-ignore (autotable a veces da error de tipos, esto lo ignora)
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save(fileName);
    };

    const printTable = () => {
        window.print();
    };

    return { exportToExcel, exportToCSV, exportToPDF, printTable };
};