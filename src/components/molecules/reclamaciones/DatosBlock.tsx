import React from 'react'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import { inputDatosData } from '@/data/reclamaciones/inputDatosData'
import { selectsReclamos } from '@/data/reclamaciones/selectsReclamosData'

const DatosBlock = () => {

  const inputsTop = inputDatosData.slice(0, 2);   // Nombre, Apellido
  const inputGrid = inputDatosData.slice(2, 3);   // Número documento
  const inputsBottom = inputDatosData.slice(3);   // Correo, Teléfono
  const selectsGrid = selectsReclamos.slice(0, 1);  // Solo el select de Tipo documento
  return (
      <div className='flex flex-col gap-6 w-full'>
      {inputsTop.map((inp, i) => (
          <Input
          key={i}
          textLabel={inp.textLabel}
          placeholder={inp.placeholder}
          size={inp.size}
          type={inp.type}
          />
        ))}
      <div className='grid grid-row-1 md:grid-cols-2 gap-6 '>
        {selectsGrid.map((sel, i) => (
          <Select
            key={i}
            textLabel={sel.textLabel}
            options={sel.options}
          />
        ))}
        {inputGrid.map((inp, i) => (
          <Input
            key={i}
            textLabel={inp.textLabel}
            placeholder={inp.placeholder}
            size={inp.size}
            type={inp.type}
          />
        ))}
      </div>

      {inputsBottom.map((inp, i) => (
        <Input
          key={i}
          textLabel={inp.textLabel}
          placeholder={inp.placeholder}
          size={inp.size}
          type={inp.type}
        />
      ))}

    </div>
  )
}

export default DatosBlock;
