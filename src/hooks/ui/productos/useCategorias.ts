
import {useState,useMemo,useEffect} from 'react'
import { Producto } from '@/types/producto';
import { productosData } from '@/data/productosData';
interface CategoriaItem {
  nombre: string;
  count: number;
}

const total='Todos los Productos';

export  const useCategorias=(lista:Producto[])=>{
    const [categoriaActiva,setCategoriActiva]=useState<string>(total);

    const listaCategorias: CategoriaItem[] = useMemo(() => {
        const categoriasUnicas = Array.from(
            new Set(productosData.flatMap((p) => p.categorias))
        );
        
        const categorias = categoriasUnicas.map((nombre) => ({
            nombre,
            count: productosData.filter((p) => p.categorias.includes(nombre)).length,
        }));

        return [
        { nombre: total, count: productosData.length },...categorias,];

    }, [productosData]);

    const handleSelectCategoria=(categoria:string)=>setCategoriActiva(categoria)
    return {
        listaCategorias,
        handleSelectCategoria,
        categoriaActiva
    }
}