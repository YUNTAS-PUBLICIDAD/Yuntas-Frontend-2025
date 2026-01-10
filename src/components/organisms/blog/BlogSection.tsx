'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Banner from '@/components/atoms/Banner'
import Text from '@/components/atoms/Text'
import SearchBar from '@/components/molecules/blog/SearchBar'
import BlogCard from '@/components/molecules/blog/BlogCard'
import Pagination from '@/components/molecules/Pagination'
import { getImg } from '@/utils/getImg'
import { Blog } from '@/types/admin/blog'
type Props = {
  data: Blog[]
}

const BlogSection = ({ data }: Props) => {
  const [query, setQuery] = useState('')
  const [blogPaginado, setBlogPaginado] = useState<Blog[]>(data)

  /** 🔍 FILTRO LOCAL PURO (sin hooks raros) */
  const blogsFiltrados = useMemo(() => {
    if (!query.trim()) return data

    const q = query.toLowerCase()

    return data.filter(blog =>
      blog.title?.toLowerCase().includes(q) ||
      blog.meta_title?.toLowerCase().includes(q) ||
      blog.categories?.some(cat =>
        cat.name.toLowerCase().includes(q)
      )
    )
  }, [query, data])

  return (
    <section className='py-6 md:py-10 relative'>
      <Banner className='flex flex-col gap-5 md:gap-10 lg:gap-20 px-4 sm:px-8 md:px-10 lg:px-20 md:flex-row md:items-center relative z-20'>
        <Text variant='h2' color='white' className='font-bold max-w-xl'>
          Descubre más sobre nuestros Productos
        </Text>

        <div className="relative w-full md:w-auto z-50">
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </Banner>

      {/* GRID DE BLOGS */}
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12 z-10 relative'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {blogPaginado.map(blog => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className='transform transition-transform hover:scale-[1.02] rounded-3xl'
            >
              <BlogCard
                nombre={blog.product?.name || 'General'}
                img={getImg(blog.main_image?.url)}
                descripcion={blog.meta_title || blog.title}
                href={`/blog/detalle?slug=${blog.slug}`}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-8 mb-6">
        <Pagination
          pageSize={6}
          items={blogsFiltrados}
          setProductosPaginados={setBlogPaginado}
        />
      </div>
    </section>
  )
}

export default BlogSection
