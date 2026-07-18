'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Banner from '@/components/atoms/Banner'
import Text from '@/components/atoms/Text'
import SearchBar from '@/components/molecules/blog/SearchBar'
import BlogCard from '@/components/molecules/blog/BlogCard'
import Pagination from '@/components/molecules/Pagination'
import { Blog } from '@/types/admin/blog'
import { useAutocompletado } from '@/hooks/ui/useAutocompletado'
import { FaSearch } from "react-icons/fa";

const BlogSection = ({ blogs }: { blogs: Blog[] }) => {
	const PAGE_SIZE = 6
	const [query, setQuery] = useState('')
	const [blogPaginado, setBlogPaginado] = useState<Blog[]>(() => blogs.slice(0, PAGE_SIZE))
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [loading, setLoading] = useState(true);

	const { lista, handleKeyDown, activeIndex, setActiveIndex } = useAutocompletado({
		palabras: query,
		items: blogs,
		onSelect: (blog) => {
			setQuery(blog.title)  // llena el input
			// el useMemo ya filtra automáticamente con el nuevo query
		},
	})



	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 500);
		return () => clearTimeout(timer);
	}, [blogs]);



	const blogsFiltrados = useMemo(() => {
		if (!query.trim()) return blogs

		const q = query.toLowerCase()

		return blogs.filter(blog => blog.title?.toLowerCase().includes(q))
	}, [query, blogs])

	const BlogCardSkeleton = () => (
		<div className='animate-pulse'>
			<div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl mb-3" />
			<div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
		</div>
	)

	return (
		<section className='pt-0 pb-6 md:pb-10 relative'>
			<Banner size='small' color="bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" className='!h-auto flex flex-col gap-4 md:gap-6 px-6 md:px-12 lg:px-20 py-3 md:py-4 md:grid md:grid-cols-2 md:items-center relative z-20'>
				<Text variant='h2'
					className='text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase text-center md:justify-self-end md:pr-4 lg:pr-6 md:max-w-xl'>
					Descubre más sobre
					<br />
					nuestros Productos
				</Text>

				<div ref={wrapperRef} className="relative w-full md:max-w-md md:w-[340px] lg:w-[380px] md:justify-self-center md:-translate-x-8 lg:-translate-x-10 z-50">
					<SearchBar
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
					/>

				{lista.length > 0 && (
					<ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto">
						{lista.map((blog, i) => (
							<li
								key={blog.id}
								onMouseDown={() => {
									setQuery(blog.title)
									setActiveIndex(-1)
								}}
								onMouseEnter={() => setActiveIndex(i)}
								className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm text-gray-800 transition-colors border-b border-gray-100 last:border-0 ${
									i === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
								}`}
							>
								{blog.main_image?.url ? (
									<img
										src={blog.main_image.url}
										alt={blog.main_image?.alt || blog.title}
										title={blog.main_image?.title || blog.title}
										className="w-9 h-9 rounded-md object-cover flex-shrink-0"
									/>
								) : (
									<div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
										<FaSearch className="text-gray-400 text-xs" />
									</div>
								)}
								<span className="line-clamp-2 leading-snug">{blog.title}</span>
							</li>
						))}
					</ul>
				)}
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
					{loading ? (
						Array.from({ length: PAGE_SIZE }).map((_, i) => (
							<BlogCardSkeleton key={i} />
						))
					) : (
						blogPaginado.map(blog => (
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
						)))
					}
				</div>
			</div>

			{/* PAGINACIÓN */}
			<div className="flex justify-center mt-8 mb-6">
				<Pagination
					pageSize={PAGE_SIZE}
					items={blogsFiltrados}
					setProductosPaginados={setBlogPaginado}
				/>
			</div>
		</section>
	)
}

export default BlogSection
