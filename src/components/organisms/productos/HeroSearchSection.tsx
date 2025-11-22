import React from 'react'
import SearchBar from '@/components/molecules/producto/SearchBar'
import Text from '@/components/atoms/Text'
import { Producto } from '@/types/producto';
type HeroSearchSectionProps = {
  listaProductos: Producto[];
  setListaProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};
const HeroSearchSection = ({ listaProductos, setListaProductos }:HeroSearchSectionProps) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 items-center px-16 py-10 gap-4 place-items-center md:place-items-start'>
        <Text variant='h2' color='black' className='leading-10 uppercase font-semibold  tracking-wider'>Descubre la seleccion <br />que tenemos para ti</Text>
        <SearchBar listaProductos={listaProductos} setListaProductos={setListaProductos} />
    </section>
  )
}

export default HeroSearchSection