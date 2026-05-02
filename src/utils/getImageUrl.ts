export const getImageUrl = (path?: string) => {
  if (!path) return "";

  // ya viene completa
  if (path.startsWith("http")) return path;

  return `${process.env.NEXT_PUBLIC_URL}${path}`;
};
