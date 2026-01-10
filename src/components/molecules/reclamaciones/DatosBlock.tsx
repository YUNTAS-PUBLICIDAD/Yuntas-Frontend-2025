import React from 'react'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import { selectsReclamos } from '@/data/reclamaciones/selectsReclamosData'
import { ReclamoInput } from "@/types/admin/reclamo";

type DatosBlockProps = {
    formData: ReclamoInput;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const DatosBlock = ({ formData, handleChange }: DatosBlockProps) => {
  const selectsGrid = selectsReclamos.slice(0, 1);  // Solo el select de Tipo documento

  return (
    <div className='flex flex-col gap-6 w-full'>
      <Input
        textLabel="Nombre"
        placeholder="ej: Jose Miguel"
        size="xxl"
        type="text"
        required
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <Input
        textLabel="Apellido"
        placeholder="ej: Rojas Vasquez"
        size="xxl"
        type="text"
        required
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <div className='grid grid-row-1 md:grid-cols-2 gap-6'>
        {selectsGrid.map((sel, i) => (
          <Select
            key={i}
            textLabel={sel.textLabel}
            options={sel.options}
            required
            name="document_type_id"
            onChange={handleChange}
          />
        ))}
        <Input
          textLabel="Número de documento"
          placeholder="ej: 76798589"
          size="xl"
          type="number"
          required
          name="document_number"
          value={formData.document_number}
          onChange={handleChange}
        />
      </div>

      <Input
        textLabel="Correo Electrónico"
        placeholder="ej: JoseM20@gmail.com"
        size="xxl"
        type="email"
        required
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        textLabel="Telefono"
        placeholder="ej: 987654321"
        size="xxl"
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

    </div>
  )
}

export default DatosBlock;
