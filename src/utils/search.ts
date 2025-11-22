import { useEffect, useState } from "react";

type useSearchProps<T> = {
  items: T[];
  busqueda:string
};

export function Search<T extends { nombre: string }>({items,busqueda}: useSearchProps<T>) {  
  const handleSubmit=(submit:React.FormEvent<HTMLFormElement>)=>{
    console.log(busqueda)
    submit.preventDefault()
    const Coincidencias = items.filter((e) => e.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    return Coincidencias
  }
  
  return { handleSubmit};
}
