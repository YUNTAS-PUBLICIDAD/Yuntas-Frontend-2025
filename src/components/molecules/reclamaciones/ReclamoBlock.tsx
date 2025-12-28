import React from 'react'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import TextTarea from '@/components/atoms/TextTarea'
import { selectsReclamos } from '@/data/reclamaciones/selectsReclamosData'
import { ReclamoInput } from '@/types/admin/reclamo'

type ReclamoBlockProps = {
    formData: ReclamoInput;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ReclamoBlock = ({ formData, handleChange }: ReclamoBlockProps) => {

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
                options={selectsReclamos[1].options}
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
                value={formData.claimed_amount}
                onChange={handleChange}
            />

        </div>
    )
}

export default ReclamoBlock