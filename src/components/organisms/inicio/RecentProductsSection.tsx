'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { useProductos } from '@/hooks/useProductos';

import RecentProductsCard from './RecentProductsCard';
import RecentProductsSkeleton from './RecentProductSkeleton';
import { ROUTES } from '@/config/routes';

export default function RecentProductsSection() {
  const {
    productos,
    isLoading,
    getProductos,
  } = useProductos();

  useEffect(() => {
    getProductos(4);
  }, [getProductos]);

  if (isLoading) {
    return <RecentProductsSkeleton />;
  }

  if (!productos.length) {
    return null;
  }

  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-20">
      <div className="container mx-auto px-6">

        <div
          className="
            mb-14
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <span
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#23C1DE]
              "
            >
              Productos recientes
            </span>

            <h2
              className="
                mt-4
                max-w-3xl
                text-4xl
                font-black
                text-slate-900
                md:text-5xl
              "
            >
              Productos para destacar tu marca
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-lg
                text-slate-600
              "
            >
              Explora nuestros proyectos y productos más recientes.
            </p>
          </div>

          <Link
            href={ROUTES.PRODUCTOS.INDEX}
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              border
              border-cyan-200/80
              px-7
              py-3.5
              font-semibold
              text-slate-800
              shadow-sm
              transition-all
              duration-300
              ease-out
              hover:-translate-y-0.5
              hover:bg-cyan-50/60
              hover:border-[#23C1DE]
              hover:text-[#203565]
              hover:shadow-[0_10px_25px_-5px_rgba(35,193,222,0.35)]
            "
          >
            <span>Ver catálogo completo</span>

            <ArrowRight
              size={18}
              className="text-[#23C1DE] transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>


        </div>

        <div
          className="
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {productos.map((producto) => (
            <RecentProductsCard
              key={producto.id}
              title={producto.name}
              description={
                producto.description ||
                'Producto publicitario personalizado.'
              }
              image={producto.main_image.url}
              slug={producto.slug}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
