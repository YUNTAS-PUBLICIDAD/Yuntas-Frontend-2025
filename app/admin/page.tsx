'use client';
import { redirect } from "next/navigation";

export default function AdminPage() {
    
    redirect("/admin/seguimiento");
}

/* 
================================================================
   CÓDIGO ANTIGUO (INICIO)
================================================================

import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import data from "@/data/admin/inicioData";

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "NOMBRE" },
  { key: "gmail", label: "GMAIL" },
  { key: "telefono", label: "TELÉFONO" },
  { key: "seccion", label: "SECCIÓN" },
  { key: "fecha", label: "FECHA" },
];

export default function InicioPage() {

    const onAdd = () => { }

    return (
        <div className="flex flex-col gap-6 ">
            <AdminTable
                columns={columns}
                data={data}
            />

            <ActionButtonGroup
                buttons={[
                    { label: "Añadir datos", onClick: onAdd, variant: "primary" }
                ]}
                className="self-start"
            />
        </div>
    );
}
<<<<<<< HEAD
=======
*/
>>>>>>> 4ba8b087224885f66b95cac937aa3e831744a27a
