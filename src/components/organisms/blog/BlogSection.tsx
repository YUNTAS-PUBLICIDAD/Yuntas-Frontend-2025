'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Banner from '@/components/atoms/Banner'
import Text from '@/components/atoms/Text'
import SearchBar from '@/components/molecules/blog/SearchBar'
import BlogCard from '@/components/molecules/blog/BlogCard'
import Pagination from '@/components/molecules/Pagination'
import { Blog } from '@/types/admin/blog'

const BlogSection = ({ blogs }: { blogs: Blog[] }) => {
	const [query, setQuery] = useState('')
	const [blogPaginado, setBlogPaginado] = useState<Blog[]>(blogs)

	const blogsFiltrados = useMemo(() => {
		if (!query.trim()) return blogs

		const q = query.toLowerCase()

		return blogs.filter(blog => blog.title?.toLowerCase().includes(q))
	}, [query, blogs])

	return (
		<section className='pt-0 pb-6 md:pb-10 relative'>
			<Banner size='small' color="bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" className='!h-auto flex flex-col gap-4 md:gap-6 px-6 md:px-12 lg:px-20 py-3 md:py-4 md:grid md:grid-cols-2 md:items-center relative z-20'>
				<Text variant='h2'
	            	className='text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase text-center md:justify-self-end md:pr-4 lg:pr-6 md:max-w-xl'>
					Descubre más sobre 
					<br />
					nuestros Productos
				</Text>

				<div className="relative w-full md:max-w-md md:w-[340px] lg:w-[380px] md:justify-self-center md:-translate-x-8 lg:-translate-x-10 z-50">
					<SearchBar
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					{query.trim() && blogsFiltrados.length === 0 && (
						<div className="absolute top-full left-0 w-full px-4 py-2 mt-1 text-sm text-red-500 font-medium animate-fade-in bg-white/10 rounded-lg">
							No se encuentra ese blog
						</div>
					)}
				</div>
			</Banner>

			{/* GRID DE BLOGS */}
			<div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12 z-10 relative'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12'>
					{blogPaginado.map(blog => (
						<Link
							key={blog.slug}
							// href={`/blog/detalle?slug=${blog.slug}`}
							href={`/blog/${blog.slug}`}
							className='block group'
						>
							<BlogCard
								productName={blog.product?.name || 'Inspiración'}
								imgUrl={blog.main_image?.url || ''}
								imgAlt={blog.main_image?.alt || blog.title}
								imgTitle={blog.main_image?.title || blog.title}
								blogTitle={blog.title}
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
