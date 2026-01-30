import React from 'react'
import SearchBar from '@/components/molecules/SearchBar'
import Text from '@/components/atoms/Text'
import { Producto } from '@/types/admin/producto';
type HeroSearchSectionProps = {
  setListaProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
  allProductos: Producto[];
};
const HeroSearchSection = ({ setListaProductos, allProductos }:HeroSearchSectionProps) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-10 gap-6 md:gap-4 place-items-center md:place-items-start'>
        <Text variant='h2' color='black' className='leading-tight uppercase font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide md:tracking-wider'>
          Descubre la selección <br />que tenemos para ti
        </Text>
        <SearchBar
          items={allProductos}
          onSearch={setListaProductos}
          placeholder='Buscar Producto...'
          searchKeys={['name']}
          getDisplayValue={(item) => item.name}
        />
    </section>
  )
}

export default HeroSearchSection