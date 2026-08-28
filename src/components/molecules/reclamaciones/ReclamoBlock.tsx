'use client'

import React, { useEffect } from 'react'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import { ReclamoInput } from '@/types/admin/reclamo'
import { useProductos } from '@/hooks/useProductos'

type ReclamoBlockProps = {
    formData: ReclamoInput;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ReclamoBlock = ({ formData, handleChange }: ReclamoBlockProps) => {
    const { getProductos, productos } = useProductos();

    useEffect(() => {
        getProductos(100);
    }, [])

    return (
        <div className='flex flex-col gap-6 w-full'>

            <Input
                textLabel="Fecha de Compra"
                placeholder="06/03/2025"
                size="xxl"
                type="date"
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                inputClassName="border-0 border-b-2 border-brand-blue rounded-none "

            />
            <Select
                textLabel="Productos"
                options={productos || []}
                name="product_id"
                value={formData.product_id || ""}
                onChange={handleChange}
                selectClassName="bg-white border-2 border-brand-blue focus:ring-0"
            />
            <div className="flex flex-col">
                <label>Detalle de la reclamacion</label>
                <textarea
                    required
                    placeholder="Detalle su reclamo aquí"
                    name="detail"
                    value={formData.detail}
                    onChange={handleChange}
                    className="border-2 border-brand-blue rounded-[15px] p-3 resize-none align-top max-w-[1091px] h-[181px] w-full bg-white"
                />
            </div>
            <Input
                textLabel="Monto Reclamado"
                placeholder="ej: 200.5"
                size="sl"
                type="number"
                name="claimed_amount"
                value={formData.claimed_amount === 0 ? "" : formData.claimed_amount}
                onChange={handleChange}
                inputClassName="border-0 border-b-2 border-brand-blue rounded-none "
            />

        </div>
    )
}

export default ReclamoBlock