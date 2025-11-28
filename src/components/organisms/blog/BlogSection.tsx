'use client'
import React, { useState } from 'react'
import Banner from '@/components/atoms/Banner'
import Text from '@/components/atoms/Text'
import SearchBar from '@/components/molecules/blog/SearchBar'
import BlogCard from '@/components/molecules/blog/BlogCard'
import { BlogData } from '@/data/blog/blogData'
import Pagination from '@/components/molecules/Pagination'
import { Blog } from '@/types/blog'
import Link from 'next/link'

const BlogSection = () => {
  const [listaBlog, setListaBlog] = useState<Blog[]>(BlogData);
  const [blogPaginado, setBlogPaginado] = useState<Blog[]>(BlogData)

  return (
    <section className='py-6 md:py-10'>
      {/* Banner con padding responsivo */}
      <Banner className='flex flex-col gap-5 md:gap-10 lg:gap-20 px-4 sm:px-8 md:px-12 lg:px-20 md:flex-row md:items-center'>
        <Text 
          variant='banner' 
          color='white' 
          className='font-bold max-w-xl'
        >
          Descubre más sobre nuestros Productos
        </Text>
        <SearchBar setBlog={setListaBlog}/>
      </Banner>

      {/* Grid responsivo con max-width */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {blogPaginado.map((blog) => (
            <Link 
              key={blog.id}
              href={`/blog/${blog.id}`}
              className='transform transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-3xl'
            >
              <BlogCard 
                nombre={blog.nombre} 
                img={blog.img} 
                descripcion={blog.descripcion}
              />
            </Link>
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {blogPaginado.length === 0 && (
          <div className='text-center py-12'>
            <Text variant='subtitle' className='text-gray-500'>
              No se encontraron artículos
            </Text>
          </div>
        )}
      </div>

      {/* Paginación centrada */}
      <div className="flex justify-center mt-8 mb-6">
        <Pagination 
          pageSize={6} 
          items={listaBlog} 
          setProductosPaginados={setBlogPaginado}
        />
      </div>
    </section>
  )
}

export default BlogSection