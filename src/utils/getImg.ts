const API_BASE = process.env.NEXT_PUBLIC_URL

export const getImg = (url?: string) => {
  if (!url) return "";
  return `${API_BASE}${url}`;
};
