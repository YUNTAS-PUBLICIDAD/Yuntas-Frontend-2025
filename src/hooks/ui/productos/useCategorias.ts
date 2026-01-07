
import { useState, useMemo } from 'react'
import { Producto } from '@/types/admin/producto';
interface CategoriaItem {
    nombre: string;
    count: number;
}

const total = 'Todos los Productos';

export const useCategorias = (lista: Producto[]) => {
    const [categoriaActiva, setCategoriActiva] = useState<string>(total);

    const listaCategorias: CategoriaItem[] = useMemo(() => {
        const categoriasUnicas = Array.from(
            new Set(lista.flatMap((p) => {
                return p.category_name ? [p.category_name] : [];
            }
            ))
        );

        const categorias = categoriasUnicas.map((nombre) => ({
            nombre,
            count: lista.filter((p) => p.category_name === nombre).length,
        }));

        return [
            { nombre: total, count: lista.length }, ...categorias,];

    }, [lista]);

    const handleSelectCategoria = (categoria: string) => setCategoriActiva(categoria)
    return {
        listaCategorias,
        handleSelectCategoria,
        categoriaActiva
    }
}