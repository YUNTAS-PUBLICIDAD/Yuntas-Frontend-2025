import React, { useState } from 'react'
import InputSearch from '@/components/atoms/InputSearch'
import Button from '@/components/atoms/Button'
import { FaSearch } from "react-icons/fa";
import Icon from '@/components/atoms/Icon';
import { Blog } from '@/types/blog';
import { BlogData } from '@/data/blog/blogData';
import { Search } from '@/utils/search';
import AutoCompletado from '../AutoCompletado';

type SearchBarProps = {
  setBlog: React.Dispatch<React.SetStateAction<Blog[]>>;
};

const SearchBar = ({ setBlog }: SearchBarProps) => {
  const [busqueda, setBusqueda] = useState("")

  const { handleSubmit } = Search({ items: BlogData, busqueda })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const resultado = handleSubmit(e)
    setBlog(resultado)
  }
  const handleSelectItem = (item: Blog) => {
    setBusqueda(item.nombre)
    setBlog([item])
  }
  return (
    <form 
      className='flex relative z-40 bg-white rounded-full md:w-1/3'
      onSubmit={onSubmit}
    >
      <InputSearch 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className='rounded-full'
        placeholder='Buscar Articulos...'
      />

      <Button  className='bg-blue-950' size='sm'>
        <Icon className='bg-inherit'>
          <FaSearch className='text-white' />
        </Icon>
      </Button>

      {busqueda.length > 0 && (
        <AutoCompletado
          items={BlogData}    
          palabras={busqueda} 
          onSelect={handleSelectItem}
        />
      )}
    </form>
  )
}

export default SearchBar
