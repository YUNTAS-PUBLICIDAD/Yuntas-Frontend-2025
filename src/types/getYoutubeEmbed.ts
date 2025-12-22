export const getYoutubeEmbed = (url?: string  | null) => {
  if (!url) return "";
  if (url.includes("youtu.be/")) {
    return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
  }
  if (url.includes("watch?v=")) {
    return `https://www.youtube.com/embed/${url.split("watch?v=")[1]}`;
  }
  if (url.includes("/shorts/")) {
    return `https://www.youtube.com/embed/${url.split("/shorts/")[1]}`;
  }

  // ya es embed xd
  if (url.includes("/embed/")) return url;

  return "";
};