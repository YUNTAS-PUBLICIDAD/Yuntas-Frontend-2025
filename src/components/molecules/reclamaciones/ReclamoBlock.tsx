'use client'

import React, { useEffect } from 'react'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import TextTarea from '@/components/atoms/TextTarea'
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
                className={"w-full placeholder-italic"}
            />
            <Select
                textLabel="Productos"
                options={productos || []}
                name="product_id"
                onChange={handleChange}
            />
            <TextTarea
                textLabel="Detalle de la reclamacion"
                placeHolder="Detalle su reclamo aquí"
                size="xxxl"
                required
                name="detail"
                value={formData.detail}
                onChange={handleChange}
            />
            <Input
                textLabel="Monto Reclamado"
                placeholder="ej: 200.5"
                size="sl"
                type="number"
                name="claimed_amount"
                value={formData.claimed_amount === 0 ? "" : formData.claimed_amount}
                onChange={handleChange}
            />

        </div>
    )
}

export default ReclamoBlock