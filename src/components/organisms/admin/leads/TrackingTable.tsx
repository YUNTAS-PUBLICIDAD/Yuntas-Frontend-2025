'use client';

import { useState } from "react";
import Button from "@/components/atoms/Button";
import { ClientData } from "@/hooks/ui/admin/useClientEdit";

interface TrackingTableProps {
    leads: ClientData[];
}

export default function TrackingTable({ leads }: TrackingTableProps) {
    const headers = ['ID', 'NOMBRE', 'WHATSAPP', 'RESPUESTA', 'GMAIL', 'RESPUESTA', 'ACCIÓN'];

    return (
        <div className="w-full">
         
            <div className="grid grid-cols-12 gap-2 mb-2 text-center">
                {headers.map((header, index) => {
                    let colSpan = "col-span-1";
                    if (header === 'NOMBRE') colSpan = "col-span-2";
                    if (header === 'WHATSAPP' || header === 'GMAIL') colSpan = "col-span-2";
                    if (header === 'RESPUESTA') colSpan = "col-span-2";
                    
                    return (
                        <div 
                            key={index} 
                            className={`${colSpan} bg-[#00C2CB] text-white font-bold py-3 px-1 rounded-md text-sm flex items-center justify-center uppercase tracking-wider`}
                        >
                            {header}
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col gap-2">
                {leads.map((lead) => (
                    <div 
                        key={lead.id} 
                        className="grid grid-cols-12 gap-2 bg-[#F8F9FA] border border-gray-100 py-4 px-1 rounded-md items-center text-center text-sm hover:bg-gray-100 transition-colors shadow-sm"
                    >
                        <div className="col-span-1 font-bold text-gray-800">{lead.id}</div>
                        
                        <div className="col-span-2 text-gray-600 truncate px-2">{lead.nombre}</div>
                        
                        <div className="col-span-2 font-bold text-black">ENVIADO</div>
                        
                        <div className="col-span-2 flex justify-center gap-3">
                            <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center font-bold">
                                ✕
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#10B981] hover:bg-[#A7F3D0] flex items-center justify-center font-bold">
                                ✓
                            </button>
                        </div>
                        
                        <div className="col-span-2 font-bold text-black">ENVIADO</div>
                        
                        <div className="col-span-2 flex justify-center gap-3">
                            <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center font-bold">
                                ✕
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#10B981] hover:bg-[#A7F3D0] flex items-center justify-center font-bold">
                                ✓
                            </button>
                        </div>
                        
                        <div className="col-span-1 flex justify-center items-center gap-2">
                            <Button 
                                className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-lg w-8 h-8 flex items-center justify-center"
                                onClick={() => alert("Eliminar")}
                            >
                                🗑️
                            </Button>

                            <Button 
                                className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-lg w-8 h-8 flex items-center justify-center"
                                onClick={() => alert("Editar")}
                            >
                                📝
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}