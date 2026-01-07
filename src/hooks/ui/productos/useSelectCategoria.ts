import { useEffect } from 'react'
import { Producto } from '@/types/admin/producto'

export const useSelectCategorias = (
  categoria: string,
  setLista: React.Dispatch<React.SetStateAction<Producto[]>>,
  productos: Producto[] = []
) => {

  useEffect(() => {

    if (categoria === "Todos los Productos") {
      setLista(productos);
      return;
    }

    const resultado = productos.filter(p =>
      p.category_name?.includes(categoria)
    );

    setLista(resultado);

  }, [categoria, setLista, productos]);

};
