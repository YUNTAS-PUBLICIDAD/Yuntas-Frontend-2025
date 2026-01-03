import React from 'react'

type InputSearchProps = {
    placeholder: string,
    value?: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    // 1. Agregamos el tipo para el evento de teclado
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void 
}

const InputSearch = ({
    placeholder,
    value,
    className,
    onChange,
    onKeyDown // 2. Recibimos la prop
}: InputSearchProps) => {
  return (
    <input 
        type='search'
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown} // 3. Se la pasamos al input nativo
        placeholder={placeholder}
        className={`w-full px-4 py-3 outline-none ${className}`}
        // Recomendación: Desactiva el autocompletado nativo del navegador
        // para que no tape tu lista personalizada
        autoComplete="off" 
    />
  )
}

export default InputSearch