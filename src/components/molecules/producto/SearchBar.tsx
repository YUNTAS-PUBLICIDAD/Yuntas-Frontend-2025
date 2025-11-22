'use client'
import React, { useState } from 'react'
import InputSearch from '@/components/atoms/InputSearch'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import { FaSearch } from "react-icons/fa";
import { productosData } from '@/data/productosData'
import { Producto } from '@/types/producto'
import { Search } from '@/utils/search'
import AutoCompletado from '../AutoCompletado'

type SearchBarProps = {
  listaProductos: Producto[];
  setListaProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};

const SearchBar = ({ setListaProductos }: SearchBarProps) => {

  const [busqueda, setBusqueda] = useState("")

  const { handleSubmit } = Search({ items: productosData, busqueda })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const resultado = handleSubmit(e)
    setListaProductos(resultado)
  }

  const handleSelectItem = (item: Producto) => {
    setBusqueda(item.nombre)
    setListaProductos([item])
  }

  return (
    <form onSubmit={onSubmit} className='relative z-40 flex border-2 border-[#23C1DE] w-full items-center px-2 rounded-3xl'>
      <Icon className='bg-white '>
        <FaSearch className='text-gray-500 ' />
      </Icon>

      <InputSearch
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar Producto...'
      />

      <Button size='sm' rounded='full' className='font-normal tracking-wider'>
        Buscar
      </Button>

      {busqueda.length > 0 && (
        <AutoCompletado
          items={productosData}  
          palabras={busqueda}   
          onSelect={handleSelectItem}
        />
      )}
    </form>
  )
}

export default SearchBar
