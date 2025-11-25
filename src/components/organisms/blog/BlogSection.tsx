'use client'
import React from 'react'
import Banner from '@/components/atoms/Banner'
import Text from '@/components/atoms/Text'
import SearchBar from '@/components/molecules/blog/SearchBar'
import BlogCard from '@/components/molecules/blog/BlogCard'
import { BlogData } from '@/data/blog/blogData'
import { useState } from 'react'
import Pagination from '@/components/molecules/Pagination'
import { Blog } from '@/types/blog'
import Link from 'next/link'
const BlogSection = () => {
  const [listaBlog, setListaBlog] = useState<Blog[]>(BlogData);
  const [blogPaginado,setBlogPaginad]=useState<Blog[]>(BlogData)
  console.log(listaBlog)
  return (
    <section className='py-10'>
        <Banner className='flex flex-col gap-20 px-20 md:flex-row'>
            <Text variant='banner' color='white' className='font-bold'>Descubre mas sobre nuestros Productos</Text>
            <SearchBar setBlog={setListaBlog}/>
        </Banner>
        <div className='flex flex-wrap justify-evenly  gap-y-10 py-10'>
            {
                blogPaginado.map((e,index)=>(
                    <Link href={`/blog/${e.id}`}>
                        <BlogCard nombre={e.nombre} img={e.img} descripcion={e.descripcion}/>
                    </Link>
                ))
            }
        </div>
         <div className="col-span-full  flex justify-center order-3 my-6">

            <Pagination pageSize={6} items={listaBlog} setProductosPaginados={setBlogPaginad}/>
         </div>
    </section>
  )
}

export default BlogSection