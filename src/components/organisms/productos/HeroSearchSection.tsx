import React from 'react'
import SearchBar from '@/components/molecules/SearchBar'
import Text from '@/components/atoms/Text'
import { Producto } from '@/types/admin/producto';
type HeroSearchSectionProps = {
  setListaProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
  allProductos: Producto[];
};
const HeroSearchSection = ({ setListaProductos, allProductos }: HeroSearchSectionProps) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-10 gap-6 md:gap-4 place-items-center md:place-items-start'>
      <Text variant='h2' color='black' className='leading-tight uppercase font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide md:tracking-wider text-center md:text-left'>
        Descubre la selección que tenemos para ti
      </Text>
      <SearchBar
        items={allProductos}
        onSearch={setListaProductos}
        placeholder='Buscar Producto...'
        searchKeys={['name']}
        getDisplayValue={(item) => item.name}
        noResultsMessage='No se encuentra ese producto'
      />
    </section>
  )
}

export default HeroSearchSection