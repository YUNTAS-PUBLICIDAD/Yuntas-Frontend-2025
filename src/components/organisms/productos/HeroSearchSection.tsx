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
    <section className='w-full'>
      <div className='relative w-full overflow-hidden'>
        <div className='absolute inset-0 bg-[#0a1a3a]' />
        <div className='absolute inset-0 bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]' />
        <div className='absolute inset-0 bg-gradient-to-r from-[#6DE1E3]/10 via-transparent to-[#22c55e]/10' />

        <div className='relative flex items-center justify-center px-6 md:px-12 lg:px-20 py-3 md:py-4 border-b border-white/10 text-center'>
          <Text
            variant='h2'
            className='text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase'
          >
            Descubre la selección que 
            <br/>
            tenemos para ti
          </Text>
        </div>
      </div>

      <div className='w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-8 flex justify-center'>
        <div className='w-full max-w-3xl'>
          <SearchBar
            items={allProductos}
            onSearch={setListaProductos}
            placeholder='Buscar Producto...'
            searchKeys={['name']}
            getDisplayValue={(item) => item.name}
            noResultsMessage='No se encuentra ese producto'
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSearchSection