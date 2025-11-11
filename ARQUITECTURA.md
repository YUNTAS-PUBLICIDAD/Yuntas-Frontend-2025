# 🧱 Arquitectura y Patrón de Diseño – Frontend del Sistema Empresarial

## 🧭 1. Contexto general del sistema

El sistema empresarial está diseñado para **empresas que venden productos**, sin incluir pasarelas de pago ni carrito de compras.  
El objetivo principal es ofrecer un **sitio web informativo y funcional**, que permita:

- Mostrar un **catálogo de productos** actualizado dinámicamente.
- Gestionar y visualizar **blogs corporativos** o artículos informativos.
- Permitir el **envío de mensajes** desde la sección de contacto.
- Mantener un diseño **rápido, moderno y fácil de escalar**.

El **frontend** será desarrollado con **Next.js 14 (React)** en modo **exportado estático (next export)** para desplegarse en un hosting compartido (como Hostinger), consumiendo datos dinámicos desde el backend **Laravel 11** mediante una **API REST**.

---

## ⚙️ 2. Objetivo técnico del frontend

El objetivo técnico de esta arquitectura es garantizar:

| Objetivo         | Descripción                                                                 |
|------------------|-----------------------------------------------------------------------------|
| ⚡ **Rendimiento**    | Carga rápida gracias al rendering reactivo y cache del lado del cliente.     |
| 🧩 **Modularidad**    | Código dividido en componentes, hooks y servicios, evitando dependencias circulares. |
| 🧠 **Escalabilidad**  | Capacidad para agregar nuevos módulos o vistas sin romper el código existente. |
| 🧰 **Mantenibilidad** | Estructura clara y predecible para localizar errores o extender funcionalidades. |
| 🔒 **Compatibilidad** | Funcionamiento garantizado en entornos sin Node.js activo (exportación estática). |

---

## 🧩 3. Arquitectura elegida

> **Arquitectura:** Arquitectura de Componentes Reactiva  
> **Patrones principales:** Hook–Service Pattern + Atomic Design  
> **Complementos:** Tipado fuerte (Types), módulos por dominio, y Layout global.

---

### 🎨 3.4. TailwindCSS para estilos

Se utiliza **TailwindCSS** como framework principal de estilos para lograr un diseño moderno, responsivo y fácil de mantener.

**Ventajas de TailwindCSS:**
- Utiliza clases utilitarias que permiten construir interfaces rápidamente.
- Facilita la personalización y escalabilidad del diseño.
- Permite mantener los estilos cerca de los componentes, evitando archivos CSS innecesarios.
- Compatible con exportación estática y hosting compartido.

**Integración:**
- Tailwind se configura en el proyecto y se utiliza en todos los componentes visuales.
- Los estilos globales y personalizados se definen en `/styles/` y en el archivo de configuración de Tailwind.

**Ejemplo de uso:**
```tsx
<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar</button>
```

---

## 🧱 4. Cómo funciona la arquitectura en tiempo de ejecución

El flujo reactivo del frontend sigue este orden:

1. Usuario interactúa (click, input, submit)
2. Hook maneja el evento y actualiza estado
3. Service consulta o envía datos al backend Laravel
4. Backend responde con JSON (API REST)
5. Service procesa respuesta y actualiza Hook
6. React re-renderiza automáticamente los componentes afectados
7. UI actualizada sin recargar la página

✅ Esto garantiza un flujo de datos claro, predecible y sin renderizados innecesarios.

---

## 📂 5. Estructura general de carpetas

```
src/
┣ components/
┃ ┣ atoms/
┃ ┣ molecules/
┃ ┣ organisms/
┣ hooks/
┣ services/
┣ pages/
┣ layout/
┣ types/
┣ utils/
┗ styles/
```

---

## 🧩 6. Explicación detallada por carpeta

### 🟩 **/components/**
Contiene todos los **componentes visuales** organizados por niveles (según Atomic Design):

| Subcarpeta   | Contenido           | Ejemplo                | Función                                 |
|--------------|--------------------|------------------------|-----------------------------------------|
| `atoms/`     | Elementos básicos de UI | `Button.tsx`, `Input.tsx`, `Image.tsx` | Se reutilizan en toda la aplicación.    |
| `molecules/` | Combinaciones de átomos | `ProductCard.tsx`, `ContactForm.tsx`   | Unidades visuales medianas.             |
| `organisms/` | Secciones completas     | `ProductList.tsx`, `Header.tsx`        | Contienen lógica visual más compleja.   |

**Rol:**  
Define toda la presentación de la interfaz, sin incluir lógica de negocio ni conexión con APIs.

---

### 🟦 **/hooks/**
Contiene **lógica reactiva reutilizable** que conecta la UI con los servicios de datos.

| Tipo de Hook      | Ejemplo                | Función                                 |
|-------------------|------------------------|-----------------------------------------|
| `useProducts()`   | Consulta y maneja lista de productos. | Maneja estado de carga, error y datos.  |
| `useProductDetail(id)` | Obtiene un producto específico. | Controla renderizado del detalle.       |
| `useForm()`       | Controla formularios genéricos. | Manejador de inputs y validaciones.     |

**Rol:**  
Controlar el estado local, validaciones y efectos secundarios.  
Ningún hook debe contener lógica de renderizado o estilos.

---

### 🟨 **/services/**
Capa de **acceso a la API REST**.  
Aquí se definen todas las llamadas HTTP al backend Laravel.

| Archivo             | Ejemplo                                 | Descripción                |
|---------------------|-----------------------------------------|----------------------------|
| `productService.ts` | `getAll()`, `getById(id)`, `create(data)` | Maneja productos.          |
| `blogService.ts`    | `getAllPosts()`, `getPostBySlug()`      | Maneja blogs.              |
| `contactService.ts` | `sendMessage(data)`                     | Envía mensajes de contacto.|

**Rol:**  
Centralizar la comunicación con el backend.  
Si la URL base del API cambia, solo se modifica aquí.

---

### 🟧 **/pages/**
Define las **rutas y vistas principales** del sitio.

| Archivo                | Ruta                | Descripción                |
|------------------------|---------------------|----------------------------|
| `index.tsx`            | `/`                 | Página de inicio.          |
| `nosotros.tsx`         | `/nosotros`         | Información corporativa.   |
| `productos/index.tsx`  | `/productos`        | Catálogo general.          |
| `productos/[id].tsx`   | `/productos/:id`    | Detalle de producto.       |
| `blog/index.tsx`       | `/blog`             | Lista de blogs.            |
| `blog/[slug].tsx`      | `/blog/:slug`       | Detalle del blog.          |
| `contacto.tsx`         | `/contacto`         | Formulario de contacto.    |

**Rol:**  
Componer las páginas finales, ensamblando componentes, hooks y layouts.

---

### 🟦 **/layout/**
Contiene los **layouts globales y específicos** de la aplicación.

| Archivo           | Ejemplo                | Función                  |
|-------------------|------------------------|--------------------------|
| `MainLayout.tsx`  | Layout principal       | Estructura global del sitio |
| `Footer.tsx`      | Pie de página          | Componente de pie global   |

**Rol:**  
Define la estructura general y persistente de la aplicación, como cabeceras, menús y pies de página.

---

### 🟪 **/types/**
Contiene **interfaces TypeScript** que definen la estructura de datos del sistema.

| Archivo         | Ejemplo                                 | Contenido                |
|-----------------|-----------------------------------------|--------------------------|
| `Producto.ts`   | `interface Producto { id, nombre, precio }` | Modelo de producto.      |
| `Blog.ts`       | `interface Blog { id, titulo, contenido }`  | Modelo de blog.          |
| `Mensaje.ts`    | `interface Mensaje { nombre, email, mensaje }` | Modelo de contacto.      |

**Rol:**  
Garantizar que los datos que viajan entre frontend y backend sean consistentes y seguros.  
Previene errores por campos faltantes o tipos incorrectos.

---

### 🟫 **/utils/**
Funciones utilitarias y helpers generales.

| Archivo           | Ejemplo                        | Función                  |
|-------------------|-------------------------------|--------------------------|
| `formatPrice.ts`  | `formatPrice(25.5)`            | Formatea precios.        |
| `slugify.ts`      | `slugify("Nombre del producto")` | Crea slugs amigables para URLs. |

**Rol:**  
Evitar duplicación de lógica común y centralizar funciones compartidas.

---

### ⚫ **/styles/**
Hojas de estilo globales o módulos CSS.  
Usa TailwindCSS o CSS Modules según el diseño establecido.

---

## 🧠 7. Beneficios técnicos de esta arquitectura

| Aspecto                    | Beneficio                                         |
|----------------------------|---------------------------------------------------|
| **Reactividad**            | Los componentes se actualizan automáticamente cuando cambian los datos. |
| **Separación de responsabilidades** | Cada carpeta cumple una función específica.      |
| **Reutilización**          | Los componentes y hooks pueden usarse en distintos módulos. |
| **Rendimiento**            | Se minimiza el re-render gracias al DOM virtual de React. |
| **Escalabilidad**          | Es fácil agregar nuevas secciones sin alterar la estructura base. |
| **Mantenibilidad**         | Código legible y localizado; cada error se rastrea por capa. |

---

## 🚀 8. Propósito de la arquitectura y patrón

**¿Por qué se usa esta arquitectura y patrón?**

| Objetivo                | Explicación                                         |
|-------------------------|-----------------------------------------------------|
| **Optimizar rendimiento** | React solo actualiza los componentes necesarios.   |
| **Organizar el código**   | Separar lógica (hooks), comunicación (services) y presentación (components). |
| **Asegurar consistencia** | Tipado con TypeScript evita errores en datos.      |
| **Facilitar mantenimiento** | Estructura modular y predecible.                |
| **Compatibilidad con hosting** | Next.js exportado genera archivos estáticos 100 % compatibles con Hostinger. |
| **Preparar el futuro del sistema** | La arquitectura permite integrar nuevas secciones (usuarios, analítica, IA) sin romper la base. |

---

## 🧾 9. Conclusión

El frontend implementa una **arquitectura de componentes reactiva** combinada con el **patrón Hook–Service**,  
fortalecida por **Atomic Design** en la interfaz visual y el uso de **TailwindCSS**.

Este enfoque logra:
- **Máximo rendimiento**, gracias al renderizado reactivo y cache del lado cliente.  
- **Código limpio y escalable**, separado por responsabilidad.  
- **Interacción fluida** con el backend Laravel mediante API REST.  
- **Compatibilidad total** con hosting compartido (sin necesidad de servidor Node).  

> En resumen:  
> El frontend está diseñado para ser **rápido, modular, mantenible y preparado para crecer**,  
> respondiendo en tiempo real a los datos del backend sin sacrificar rendimiento ni estructura.
