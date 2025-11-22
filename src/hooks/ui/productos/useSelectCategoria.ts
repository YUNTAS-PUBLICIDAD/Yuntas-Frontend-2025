import { useEffect } from 'react'
import { Producto } from '@/types/producto'
import { productosData } from '@/data/productosData'

export const useSelectCategorias = (
  categoria: string,
  setLista: React.Dispatch<React.SetStateAction<Producto[]>>
) => {

  useEffect(() => {

    if (categoria === "Todos los Productos") {
      setLista(productosData);
      return;
    }
    
    const resultado = productosData.filter(p =>
      p.categorias.includes(categoria)
    );

    setLista(resultado);

  }, [categoria, setLista]);

};
