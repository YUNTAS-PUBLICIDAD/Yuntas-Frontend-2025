'use client';

import { ROUTES } from '@/config/routes';
import { ArrowRight, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  image: string | null;
  slug: string;
}

export default function RecentProductsCard({
  title,
  description,
  image,
  slug,
}: Props) {
  return (
    <article
      className="
      group
      bg-white
      rounded-3xl
      border border-slate-200
      overflow-hidden
      shadow-sm
      transition-all
      duration-300
      hover:shadow-xl
      hover:-translate-y-1
    "
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            loading="lazy"
          />
        ) : (
          <div
            className="
                absolute inset-0

                flex flex-col
                items-center
                justify-center

                gap-3

                bg-gradient-to-br
                from-slate-50
                to-slate-100
              "
          >
            <ImageIcon
              className="
                  h-10
                  w-10
                  text-slate-400
                "
            />

            <span
              className="
                  text-sm
                  font-medium
                  text-slate-500
                "
            >
              Imagen no disponible
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 text-slate-600 line-clamp-2">
          {description}
        </p>

        <Link
          href={ROUTES.PRODUCTOS.DETAIL(slug)}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            text-[#23C1DE]
            font-semibold
          "
        >
          Ver producto

          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
