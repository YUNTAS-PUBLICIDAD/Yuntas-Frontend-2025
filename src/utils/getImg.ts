const API_BASE = process.env.NEXT_PUBLIC_URL || "https://apiyuntas.yuntaspublicidad.com";
//funcion ara conseguir las imagenes dinamicas del backend del storage 
export const getImg = (url?: string) => {
  if (!url) return "";

  if (url.startsWith("http")) return url;

  return `${API_BASE}${url}`;
};
