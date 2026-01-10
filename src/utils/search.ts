import { useEffect, useState } from "react";

type useSearchProps<T> = {
  items: T[];
  busqueda:string
};

export function Search<T extends { name?: string; nombre?: string }>({items,busqueda}: useSearchProps<T>) {  
  const handleSubmit=(submit:React.FormEvent<HTMLFormElement>)=>{
    console.log(busqueda)
    submit.preventDefault()
    const q = busqueda.toLowerCase()
    const Coincidencias = items.filter((e) => {
      const text = ((e as any).name || (e as any).nombre || '').toLowerCase()
      return text.includes(q)
    })
    return Coincidencias
  }
  
  return { handleSubmit};
}
