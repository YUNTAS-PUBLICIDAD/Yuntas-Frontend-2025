import React from 'react'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import TextTarea from '@/components/atoms/TextTarea'
import {inputReclamos} from '@/data/reclamaciones/inputReclamosData'
import {selectsReclamos} from '@/data/reclamaciones/selectsReclamosData'
const ReclamoBlock = () => {
    return (
        <div className='flex flex-col gap-6 w-full'>
            
            <Input
                textLabel={inputReclamos[0].textLabel}
                placeholder={inputReclamos[0].placeholder}
                size={inputReclamos[0].size}
            />
            <Select 
                textLabel={selectsReclamos[1].textLabel}
                options={selectsReclamos[1].options} />
            <TextTarea 
                textLabel={inputReclamos[1].textLabel}
                placeHolder={inputReclamos[1].placeholder}
                size={inputReclamos[1].size}/>
            <Input 
                textLabel={inputReclamos[2].textLabel}
                placeholder={inputReclamos[2].placeholder}
                size={inputReclamos[2].size}/>

        </div>
  )
}

export default ReclamoBlock