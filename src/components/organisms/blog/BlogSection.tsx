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
type Props={
  data:Blog[]
}
const BlogSection = ({data}:Props) => {
  const [listaBlog, setListaBlog] = useState<Blog[]>(data);
  const [blogPaginado, setBlogPaginado] = useState<Blog[]>(data)
 const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <section className='py-6 md:py-10'>
      <Banner className='flex flex-col gap-5 md:gap-10 lg:gap-20 px-4 sm:px-8 md:px-10 lg:px-20 md:flex-row md:items-center'>
        <Text variant='h2'color='white' className='font-bold max-w-xl'>Descubre más sobre nuestros Productos</Text>
        <SearchBar setBlog={setListaBlog}/>
      </Banner>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 md:px-1 py-8 md:py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 '>
          {blogPaginado.map((blog) => (
            <Link 
              key={blog.id}
              href={`/blog/${blog.id}`}
              className='transform transition-transform hover:scale-[1.02]  rounded-3xl'>
              <BlogCard nombre={blog.cover_subtitle} img={`${BASE_URL}${blog.main_image?.url}` } descripcion={blog.meta_title}/>
            </Link>
          ))}
        </div>
      </div>

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