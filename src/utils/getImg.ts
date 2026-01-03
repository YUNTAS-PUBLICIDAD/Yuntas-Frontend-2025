const API_BASE = process.env.NEXT_PUBLIC_URL
//funcion ara conseguir las imagenes dinamicas del backend del storage 
export const getImg = (url?: string) => {
  if (!url) return "";
  return `${API_BASE}${url}`;
};
