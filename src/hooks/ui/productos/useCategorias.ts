
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
            new Set(lista.flatMap((p) => p.categories[0].name))
        );
        
        const categorias = categoriasUnicas.map((nombre) => ({
            nombre,
            count: lista.filter((p) => p.categories[0].name === nombre).length,
        }));

        return [
        { nombre: total, count: lista.length },...categorias,];

    }, [lista]);

    const handleSelectCategoria=(categoria:string)=>setCategoriActiva(categoria)
    return {
        listaCategorias,
        handleSelectCategoria,
        categoriaActiva
    }
}