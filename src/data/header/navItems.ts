import { getRole } from "@/utils/role";

export const NAV_ITEMS = [
  { label: "INICIO", href: "/" },
  { label: "NOSOTROS", href: "/nosotros" },
  { label: "PRODUCTOS", href: "/productos" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACTO", href: "/contacto" },
];

export const getAdminItems = () => {
  const role = getRole();

  return [
    { label: "GENERAL", href: "/admin" },

    ...(role === "admin"
      ? [{ label: "SEGUIMIENTO", href: "/admin/seguimiento" }]
      : []),

    { label: "BLOGS", href: "/admin/blogs" },
    { label: "PRODUCTOS", href: "/admin/productos" },

    ...(role === "admin"
      ? [{ label: "USUARIOS", href: "/admin/usuarios" }]
      : []),

    { label: "RECLAMACIONES", href: "/admin/reclamaciones" },
    { label: "CONTACTO", href: "/admin/contacto" },
    { label: "POP-UPS", href: "/admin/popups" },
    { label: "PLANTILLAS", href: "/admin/templates" },
    { label: "CONFIGURACION", href: "/admin/configuracion" },
  ];
};