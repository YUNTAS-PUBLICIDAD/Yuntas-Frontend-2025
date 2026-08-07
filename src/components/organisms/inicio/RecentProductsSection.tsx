'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { useProductos } from '@/hooks/useProductos';

import RecentProductsCard from './RecentProductsCard';
import RecentProductsSkeleton from './RecentProductSkeleton';
import {ROUTES} from '@/config/routes';

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
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-200
              px-6
              py-3
              font-semibold
              text-slate-800
              transition-all
              hover:border-cyan-400
            "
          >
            Ver catálogo completo

            <ArrowRight size={18} />
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
