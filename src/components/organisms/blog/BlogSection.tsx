'use client'
import React, { useState, useCallback } from 'react' // <--- 1. IMPORTAR useCallback
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Banner from '@/components/atoms/Banner'
import Text from '@/components/atoms/Text'
import SearchBar from '@/components/molecules/blog/SearchBar'
import BlogCard from '@/components/molecules/blog/BlogCard'
import Pagination from '@/components/molecules/Pagination'
import { Blog } from '@/types/admin/blog'
import { getImg } from '@/utils/getImg'
import { useAutocompletado } from '@/hooks/ui/useAutocompletado'

type Props = {
  data: Blog[]
}

const BlogSection = ({ data }: Props) => {
  
  const router = useRouter();
  const [query, setQuery] = useState(""); 
  const [listaBlog, setListaBlog] = useState<Blog[]>(data);
  const [blogPaginado, setBlogPaginado] = useState<Blog[]>(data);

  const filtrarLocalmente = useCallback(async (textoBusqueda: string) => {    
    if (!textoBusqueda.trim()) {
        return { success: true, data: data };
    }
    const lowerQuery = textoBusqueda.toLowerCase();
    const resultados = data.filter((blog) => {
      const enTitulo = blog.title?.toLowerCase().includes(lowerQuery);
      const enMetaTitulo = blog.meta_title?.toLowerCase().includes(lowerQuery);
      const enCategoria = blog.categories?.[0]?.name.toLowerCase().includes(lowerQuery);
      return enTitulo || enMetaTitulo || enCategoria;
    });
    return { success: true, data: resultados };
  }, [data]); 

  const {lista,activeIndex,containerRef,handleKeyDown,setActiveIndex} = useAutocompletado<Blog>({
    palabras: query,
    fetcher: filtrarLocalmente, 
    debounceMs: 100, 
    onSelect: (blog) => {
      setQuery(blog.meta_title || blog.title);
      router.push(`/blog/${blog.slug}`);
    },
  });

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
            onKeyDown={handleKeyDown} 
            setBlog={setListaBlog} 
          />
          
          {/* lista de blog para buscar*/}
          {lista.length > 0 && (
            <ul 
              ref={containerRef}
              className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl max-h-60 overflow-y-auto border border-gray-100 z-50"
            >
              {lista.map((blog, index) => (
                <li
                  key={blog.id || index}
                  className={`px-4 py-3 cursor-pointer text-sm border-b border-gray-50 last:border-none ${
                    index === activeIndex ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                     setQuery(blog.meta_title || blog.title);
                     router.push(`/blog/${blog.slug}`);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}>
                  <div className="flex flex-col">
                    <span className="font-semibold block truncate">
                        {blog.meta_title || blog.title}
                    </span>
                    <div className="flex gap-2 items-center mt-1">
                        {blog.categories?.[0] && (
                            <span className="text-[10px] uppercase tracking-wider text-white bg-blue-900 px-1.5 py-0.5 rounded">
                                {blog.categories[0].name}
                            </span>
                        )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Banner>

      {/* Grid de Blogs */}
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 md:px-1 py-8 md:py-12 z-10 relative'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 '>
          {blogPaginado.map((blog) => (
            <Link 
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className='transform transition-transform hover:scale-[1.02] rounded-3xl'>
              <BlogCard 
                nombre={blog.product?.name || "General"} 
                img={getImg(blog.main_image?.url)} 
                descripcion={blog.meta_title || blog.title}
              />
            </Link>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8 mb-6">
         <Pagination pageSize={6} items={listaBlog} setProductosPaginados={setBlogPaginado}/>
      </div>
    </section>
  )
}

export default BlogSection