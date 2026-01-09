import React from 'react'
import InputSearch from '@/components/atoms/InputSearch'
import Button from '@/components/atoms/Button'
import { FaSearch } from "react-icons/fa";
import Icon from '@/components/atoms/Icon';
import type { Blog } from '@/types/admin/blog';

// 1. Definimos las props que vienen de useAutocompletado (BlogSection)
type SearchBarProps = {
  setBlog?: React.Dispatch<React.SetStateAction<Blog[]>>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

const SearchBar = ({ setBlog, value, onChange, onKeyDown }: SearchBarProps) => {
  // YA NO necesitamos estado interno (useState) ni el hook Search viejo.
  // Todo eso ahora lo controla el padre.

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Opcional: Si dan click en la lupa, podrías filtrar la lista principal
    // usando el valor actual 'value'.
    console.log("Búsqueda manual activada para:", value);
  }

  return (
    <form 
      className='flex gap-2 relative z-20 bg-white rounded-full w-full md:w-full'
      onSubmit={onSubmit}
    >
      <InputSearch 
        // 2. Conectamos las props para que el hook funcione
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown} // <--- Vital para navegar con flechas
        className='rounded-full'
        placeholder='Buscar Articulos...'
        // Asegúrate que tu InputSearch soporte autocomplete="off"
      />

      <Button className='bg-blue-950' size='sm' type="submit">
        <Icon className='bg-inherit'>
          <FaSearch className='text-white' />
        </Icon>
      </Button>

      {/* NOTA IMPORTANTE: 
        He quitado el componente <AutoCompletado> de aquí adentro.
        
        ¿Por qué? 
        Porque en el código anterior (BlogSection), configuramos la lista 
        flotante (el <ul>) para que se renderice en el padre. 
        Esto te da más control sobre el posicionamiento (z-index) 
        y evita conflictos de estilos dentro del formulario.
      */}
    </form>
  )
}

export default SearchBar