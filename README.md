<div align="center">

<img src="public/logo.png" alt="Artecnología" width="220"/>

# Artecnología — Sitio Web Oficial

### Diseño web profesional y estrategias SEO en México

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)

</div>

> Este README cubre tres necesidades distintas.
> ¿Solo quieres levantarlo? → [Puesta en marcha](#-puesta-en-marcha).
> ¿Vas a publicarlo o mantenerlo? → [Despliegue](#-despliegue) y [SEO](#-seo-y-metadatos).
> ¿Vas a editar contenido o código? → [Tareas frecuentes](#-tareas-frecuentes-de-contenido).

---

## 📑 Contenido

- [¿Qué es esto?](#-qué-es-esto)
- [Secciones del sitio](#-secciones-del-sitio)
- [Puesta en marcha](#-puesta-en-marcha)
- [Formulario de contacto](#-formulario-de-contacto)
- [Despliegue](#-despliegue)
- [SEO y metadatos](#-seo-y-metadatos)
- [Tareas frecuentes de contenido](#-tareas-frecuentes-de-contenido)
- [Para desarrolladores](#-para-desarrolladores)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Accesibilidad](#-accesibilidad)
- [Pendientes e inconsistencias detectadas](#-pendientes-e-inconsistencias-detectadas)
- [Solución de problemas](#-solución-de-problemas)
- [Licencia y créditos](#-licencia-y-créditos)

---

## 🎯 ¿Qué es esto?

Es el **sitio web oficial de Artecnología**, una agencia digital con sede en Zapopan,
Jalisco, dedicada al diseño web, el comercio electrónico, el rediseño responsivo y el
posicionamiento en buscadores.

Técnicamente es una **aplicación de una sola página en React** compilada con Vite. No hay
CMS ni base de datos: el contenido vive en el propio código, lo que hace que el sitio se
publique como archivos estáticos. La única pieza de servidor es un script PHP que envía
por correo los mensajes del formulario de contacto.

El sitio está pensado para captar clientes, así que tres cosas pesan más que el resto:
**velocidad de carga**, **SEO** y **conversión** (que el visitante acabe en el formulario
de contacto con el paquete ya elegido).

## 🧭 Secciones del sitio

La navegación es de dos niveles: una página principal con anclas y una galería completa de
portafolio que se muestra en lugar de la página principal.

| Sección | Ancla | Qué contiene |
|---|---|---|
| Hero | `#inicio` | Titular con animación de entrada letra a letra y llamada a la acción |
| Servicios | `#servicios` | Cuatro servicios (Diseño web, Rediseño responsivo, Comercio electrónico, Google Analytics/SEO) presentados en una baraja 3D interactiva con sus beneficios |
| Visibilidad | — | Rejilla tipo *bento* sobre presencia en Google, Bing, Yahoo, Google Maps y Google Ads |
| «Construimos tu negocio en la web» | — | Bloque de propuesta de valor, con gráficas y ejemplos de trabajo |
| Portafolio | `#portafolio` | Carrusel 3D arrastrable con los proyectos destacados, con ficha ampliada al hacer clic |
| Galería completa | — | Vista independiente con buscador por cliente, categoría o tecnología, y filtros por categoría generados automáticamente |
| Paquetes | `#paquetes` | Los tres planes comerciales, la opción a medida y un recomendador interactivo |
| Contacto | `#contacto` | Formulario con validación y confirmación en un diálogo modal |

### El recomendador de paquetes

En la sección de paquetes hay una calculadora que sugiere un plan a partir de tres
entradas: número de cuentas de correo necesarias, enfoque del proyecto (básico,
crecimiento o avanzado) y los módulos requeridos (registro de usuarios, newsletters,
módulos a medida, pedidos en línea, carrito, pagos en línea, Moodle).

Al elegir un plan, la página se desplaza al formulario de contacto y **rellena
automáticamente el asunto y el mensaje** con el resumen del plan seleccionado, para que el
visitante solo tenga que añadir sus datos.

---

## 🚀 Puesta en marcha

**Requisitos:** Node.js (Vite 8 requiere una versión reciente de Node; usa la LTS actual).

```bash
git clone https://github.com/Leoglez10/artecnologia.git
cd artecnologia
npm install
npm run dev
```

Vite mostrará la URL local en la terminal (por defecto `http://localhost:5173`; el
proyecto no fija un puerto en [`vite.config.js`](vite.config.js)).

> 💡 El repositorio contiene **dos lockfiles**: [`package-lock.json`](package-lock.json) y
> [`bun.lock`](bun.lock). Si usas `bun`, los comandos equivalentes son `bun install` y
> `bun run dev`. Conviene decidir un único gestor y eliminar el lockfile del otro para
> evitar instalaciones divergentes.

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compilación de producción en `dist/` |
| `npm run preview` | Sirve localmente el contenido de `dist/` |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |

> ⚠️ En desarrollo, el **formulario de contacto no funciona**: envía a `/send_mail.php`,
> que solo existe en un servidor con PHP. Ver [Formulario de contacto](#-formulario-de-contacto).

---

## ✉️ Formulario de contacto

### Cómo funciona

```text
ContactForm.jsx
   ↓ valida en el navegador (nombre, correo con formato válido y mensaje son obligatorios)
   ↓ fetch POST /send_mail.php  (JSON: nombre, correo, telefono, asunto, mensaje)
   ↓
public/send_mail.php  (en el servidor)
   ↓ verifica método POST y origen (CORS)
   ↓ sanitiza los campos y valida el correo
   ↓ mail() → contacto@artecnologia.net, con Reply-To del remitente
   ↓
respuesta JSON { success: true|false, message: "..." }
   ↓
éxito → diálogo modal de confirmación y formulario vaciado
error → alerta del navegador
```

### Qué hay que revisar antes de publicar

El script [`public/send_mail.php`](public/send_mail.php) **no contiene credenciales ni
secretos**: usa la función `mail()` del propio servidor, y la única dirección que aparece
(`contacto@artecnologia.net`) es la de contacto pública, ya presente en los metadatos del
sitio.

Aun así, hay tres puntos de configuración y uno de seguridad:

| Punto | Detalle |
|---|---|
| Origen permitido | La cabecera CORS está fijada a `https://www.artecnologia.net`. Si el sitio se publica en otro dominio o subdominio, hay que actualizarla o el navegador bloqueará el envío. |
| Destinatario y remitente | Ambos son `contacto@artecnologia.net`, definidos en el bloque *Configuración* del archivo. |
| Entrega del correo | `mail()` depende de la configuración del hosting. En cPanel suele funcionar; en otros entornos puede requerir SMTP autenticado. |
| Sin protección antispam | ⚠️ El endpoint **no tiene captcha, campo trampa ni límite de peticiones**. Cualquiera puede enviar solicitudes en bucle. Si el buzón empieza a recibir spam, esa es la causa. |

---

## 📦 Despliegue

El sitio se compila a archivos estáticos, con un único archivo PHP como excepción.

```bash
npm run build
```

Esto genera `dist/`, que ya incluye el contenido de `public/` copiado en la raíz
(`send_mail.php`, `robots.txt`, `sitemap.xml`, imágenes y logotipos).

**Publicación en un hosting tipo cPanel:**

1. Sube el contenido de `dist/` a la raíz pública del sitio (normalmente `public_html`).
2. Verifica que `send_mail.php` quedó junto a `index.html`.
3. Comprueba que el dominio de la cabecera CORS de `send_mail.php` coincide con el dominio
   real.
4. Envía un mensaje de prueba desde el formulario.

> ⚠️ Si publicas en un hosting **sin PHP** (por ejemplo Netlify, Vercel o GitHub Pages),
> `send_mail.php` no se ejecutará y el formulario devolverá error. En ese caso hay que
> sustituirlo por una función serverless o un servicio de formularios.

> 💡 El proyecto **no incluye configuración de integración continua ni de despliegue
> automático**. La publicación es manual.

---

## 🔍 SEO y metadatos

El SEO no es accesorio en este proyecto; es parte del producto que vende la agencia. Lo
que ya está implementado en [`index.html`](index.html) y en `public/`:

| Elemento | Estado |
|---|---|
| `<title>` y `<meta name="description">` | Definidos y orientados a la búsqueda objetivo |
| `<link rel="canonical">` | Apunta a `https://artecnologia.net/` |
| `<meta name="robots">` | `index, follow, max-image-preview:large` |
| Open Graph | Tipo, locale `es_MX`, sitio, título, descripción, URL e imagen 1200×630 |
| Twitter Card | `summary_large_image` con título, descripción, imagen y cuenta |
| JSON-LD `Organization` | Nombre, logo, descripción, correo, teléfono, dirección postal y perfiles sociales |
| JSON-LD `LocalBusiness` | Dirección, teléfono, zona de servicio, rango de precios y tipos de servicio |
| JSON-LD `WebSite` | Con `SearchAction` |
| [`public/robots.txt`](public/robots.txt) | Permite todo e indica la ubicación del sitemap |
| [`public/sitemap.xml`](public/sitemap.xml) | Una sola URL, la raíz |
| Rendimiento | Imágenes del bento en WebP, `preconnect` a Google Fonts y a `lh3.googleusercontent.com` |
| Semántica | `<section>` con `aria-labelledby`, jerarquía de encabezados y enlace de salto al contenido |

> ⚠️ **Los dominios no son coherentes entre archivos.** Ver
> [Pendientes e inconsistencias detectadas](#-pendientes-e-inconsistencias-detectadas).

> 💡 Como el sitio se renderiza en el cliente, el HTML inicial solo contiene un `<div id="root">`
> vacío. Los buscadores que ejecutan JavaScript indexan bien el contenido, pero si el
> posicionamiento del texto interno se vuelve crítico, habría que evaluar prerenderizado o
> renderizado en servidor.

---

## ✏️ Tareas frecuentes de contenido

### Añadir un proyecto al portafolio

Edita [`src/data/projects.js`](src/data/projects.js) y añade un objeto al array:

```js
{
  id: 29,
  title: 'Nombre del Cliente',
  category: 'Salud & Servicios',
  image: '/img/nombre-del-archivo.png',
  techs: ['React', 'TailwindCSS', 'SEO local'],
  description: 'Qué se hizo y qué resultado tuvo.',
  featured: false   // true lo sube también al carrusel de la página principal
}
```

Después coloca la imagen en `public/img/`.

Tres cosas que ocurren solas:

- Las **categorías de la galería** se generan a partir de los valores de `category` que
  existan en el array, así que una categoría nueva aparece como filtro sin tocar nada más.
- El **buscador** indexa título, categoría y tecnologías.
- El **carrusel de la portada** muestra únicamente los proyectos con `featured: true`
  (actualmente 4 de 28).

### Cambiar precios o el contenido de los paquetes

Los tres planes (`MY WEB`, `INTERPRENEUR`, `UNLIMITED`) y el plan a medida están definidos
al inicio de [`src/components/PricingCalculator.jsx`](src/components/PricingCalculator.jsx),
en las constantes `packages` y `customPackage`. Ahí se editan precio inicial, renovación,
cuentas de correo, funciones, especiales y clientes de ejemplo.

Si cambias las reglas de recomendación, están en la función `getRecommendedPackage` del
mismo archivo.

### Cambiar los servicios

En el array `servicesList` de [`src/components/Services.jsx`](src/components/Services.jsx):
título, icono de Material Symbols, descripción, beneficios y paleta de color.

### Cambiar textos de la portada o del pie

Están escritos directamente en [`src/components/Hero.jsx`](src/components/Hero.jsx),
[`src/components/Features.jsx`](src/components/Features.jsx) y
[`src/components/Footer.jsx`](src/components/Footer.jsx).

---

## 👨‍💻 Para desarrolladores

### Stack

| Capa | Tecnología |
|---|---|
| Interfaz | React 19 (JavaScript, sin TypeScript) |
| Empaquetado | Vite 8 con `@vitejs/plugin-react` |
| Estilos | Tailwind CSS 3 con PostCSS y Autoprefixer |
| Animación | GSAP 3 con ScrollTrigger y el hook `@gsap/react` |
| Iconos | Material Symbols Outlined (Google Fonts) |
| Tipografía | Manrope (Google Fonts) |
| Calidad | ESLint 10 con `react-hooks` y `react-refresh` |
| Backend | Un único script PHP para el formulario de contacto |

### Sistema de diseño

[`tailwind.config.js`](tailwind.config.js) define un tema completo en lugar de usar la
paleta por defecto: tokens de color al estilo Material (`primary`, `on-surface`,
`surface-container-*`, `outline`…), escalas tipográficas con nombre
(`display-lg`, `headline-lg`, `body-md`, `label-md`) y espaciados semánticos
(`margin-desktop`, `gutter`, `container-max`).

> 💡 Al maquetar, usa esos tokens (`text-headline-lg`, `bg-surface-container-low`,
> `px-margin-desktop`) en vez de valores sueltos: es lo que mantiene la coherencia visual
> entre secciones.

### Animación

- `ScrollTrigger` se registra una sola vez en [`src/main.jsx`](src/main.jsx). No lo
  registres de nuevo en los componentes.
- Cada sección animada usa `useGSAP` con `{ scope: containerRef }`, lo que limpia las
  animaciones automáticamente al desmontar el componente.
- Las animaciones de entrada se aplican por clase (`.hero-animate-item`,
  `.services-reveal-item`, `.portfolio-header-item`…), no por referencia individual.

### Modo oscuro

Tailwind está en `darkMode: "class"`. El interruptor vive en
[`src/components/Navbar.jsx`](src/components/Navbar.jsx) y añade o quita la clase `dark`
en `<html>`.

> ⚠️ La preferencia **no se guarda**: no se lee `prefers-color-scheme` ni se persiste en
> `localStorage`, así que el sitio siempre arranca en modo claro.

### Navegación entre vistas

[`src/App.jsx`](src/App.jsx) mantiene un estado `currentView` con dos valores: `'home'` y
`'portfolio'`. No hay router ni URLs distintas, así que **la galería completa no tiene un
enlace propio** ni se puede compartir directamente.

---

## 🗺 Estructura del proyecto

```text
.
├── index.html                     ← ⭐ Metadatos SEO, Open Graph y JSON-LD
├── src/
│   ├── main.jsx                   ← Entrada de React; registra ScrollTrigger
│   ├── App.jsx                    ← ⭐ Composición de secciones y cambio home/galería
│   ├── index.css                  ← Directivas de Tailwind y estilos base
│   ├── data/
│   │   └── projects.js            ← ⭐ Base de datos del portafolio (28 proyectos)
│   └── components/
│       ├── Navbar.jsx             ← Navegación, sección activa, modo oscuro, menú móvil
│       ├── Hero.jsx               ← Portada
│       ├── FallingText.jsx        ← Animación de texto letra a letra del titular
│       ├── Services.jsx           ← Los cuatro servicios
│       ├── CardSwap.jsx           ← Baraja 3D reutilizable usada por Services
│       ├── BentoGrid.jsx          ← Rejilla de visibilidad en buscadores
│       ├── Features.jsx           ← Propuesta de valor
│       ├── Portfolio.jsx          ← Carrusel de proyectos destacados
│       ├── PortfolioGallery.jsx   ← Galería completa con buscador y filtros
│       ├── PricingCalculator.jsx  ← ⭐ Paquetes y recomendador
│       ├── ContactForm.jsx        ← ⭐ Formulario y envío
│       └── Footer.jsx             ← Pie y redes sociales
├── public/                        ← Se copia tal cual a la raíz de dist/
│   ├── send_mail.php              ← ⭐ Endpoint del formulario
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── logo.png                   ← Logotipo usado por Navbar y Footer
│   └── img/                       ← Imágenes del portafolio y logotipos de buscadores
├── .agents/skills/                ← Guías de referencia vendorizadas para asistentes de IA
├── skills-lock.json               ← Manifiesto de origen de esas guías
├── tailwind.config.js             ← ⭐ Sistema de diseño
├── eslint.config.js
└── vite.config.js
```

> 💡 **Regla rápida**
> - ¿Contenido del portafolio? → `src/data/projects.js`
> - ¿Precios y paquetes? → `src/components/PricingCalculator.jsx`
> - ¿Colores, tipografías y espaciados? → `tailwind.config.js`
> - ¿SEO, Open Graph o datos estructurados? → `index.html`
> - ¿Imágenes nuevas? → `public/img/`

---

## ♿ Accesibilidad

Lo que el código ya incorpora:

- Enlace **«Saltar al contenido principal»** al inicio del documento.
- Secciones con `aria-labelledby` apuntando a su encabezado.
- Contorno de foco visible y de alto contraste mediante `:focus-visible`.
- Retroalimentación de error en los campos con `:user-invalid`.
- Cierre con `Escape` en el menú móvil y en los diálogos de paquete y de proyecto.
- `scroll-behavior: smooth` con `scroll-padding-top` para que las anclas no queden bajo la
  barra fija.
- Iconos decorativos marcados con `aria-hidden`.

Todavía no se ha realizado una auditoría formal de accesibilidad _(pendiente)_.

---

## 📌 Pendientes e inconsistencias detectadas

Estos puntos están verificados contra el código actual y conviene resolverlos:

1. **Tres formas distintas del dominio conviven en el repositorio:**
   - `index.html` (canonical, Open Graph y JSON-LD) → `https://artecnologia.net/`
   - `public/robots.txt` y `public/sitemap.xml` → `https://www.artecnologia.com.mx/`
   - `public/send_mail.php` (CORS) → `https://www.artecnologia.net`

   Para el SEO esto es un problema real: el sitemap declarado en `robots.txt` apunta a un
   dominio distinto del canonical. Hay que elegir un dominio canónico —con o sin `www`— y
   unificar los cuatro archivos.

2. **El directorio `img/` de la raíz duplica `public/img/`.** Vite solo publica el
   contenido de `public/`, así que la copia de la raíz no llega al sitio compilado y solo
   añade peso al repositorio.

3. **Archivos no referenciados:** `public/favicon.svg`, `public/logo-2.png`,
   `public/logo-tab.png`, `public/icons.svg` y todo `src/assets/`. El favicon real
   configurado en `index.html` es `/img/logo_3.png`.

4. **`three` y `@react-three/fiber` están declarados como dependencias pero no se importan
   en ningún archivo de `src/`.** Si no hay una escena 3D planificada, eliminarlos reduce
   de forma notable el tiempo de instalación.

5. **Dos lockfiles** (`package-lock.json` y `bun.lock`) para el mismo proyecto.

6. **El sitemap tiene una sola URL** y una `lastmod` fija que hay que actualizar a mano.

7. **Enlaces del pie sin destino:** *Bolsa de trabajo*, *Aviso de Privacidad* y *Términos
   de Servicio* apuntan a `#inicio`. El aviso de privacidad, además, es exigible por la
   legislación mexicana de protección de datos si el formulario recoge datos personales.

8. **El formulario de contacto no tiene protección antispam.** Ver
   [Formulario de contacto](#-formulario-de-contacto).

9. **No hay pruebas automatizadas ni integración continua.**

---

## 🔧 Solución de problemas

| Problema | Causa probable | Solución |
|---|---|---|
| El formulario da «No se pudo conectar con el servidor» | Estás en desarrollo o el hosting no ejecuta PHP | El formulario solo funciona en un servidor con PHP; ver [Despliegue](#-despliegue) |
| El formulario falla solo en producción | El dominio no coincide con la cabecera CORS de `send_mail.php` | Ajusta `Access-Control-Allow-Origin` al dominio real |
| El correo se envía pero no llega | `mail()` sin configurar o el mensaje va a spam | Revisa la configuración de correo del hosting y los registros SPF/DKIM del dominio |
| Los iconos aparecen como palabras (`web`, `rocket_launch`) | La fuente Material Symbols no cargó | Comprueba la conexión y los bloqueadores de contenido |
| Las imágenes del portafolio no se ven | La imagen no está en `public/img/` o la ruta del objeto no coincide | Verifica el campo `image` en `src/data/projects.js` |
| Las animaciones no se disparan al hacer scroll | ScrollTrigger no se registró o el contenedor no existe al montar | Confirma el `gsap.registerPlugin` de `src/main.jsx` y el `scope` del `useGSAP` |
| El modo oscuro se reinicia al recargar | Comportamiento actual: no se guarda la preferencia | Ver [Modo oscuro](#modo-oscuro) |
| Las anclas quedan tapadas por la barra superior | `scroll-padding-top` desajustado | Se define en `src/index.css` (96 px) |

---

## 📄 Licencia y créditos

Este repositorio **no incluye un archivo de licencia**. Se trata del sitio corporativo de
Artecnología: el código, la marca, los textos y las imágenes de clientes son propiedad de
sus respectivos titulares y no están disponibles para reutilización.

<div align="center">

### Desarrollado por **Leonardo González**

[![GitHub](https://img.shields.io/badge/GitHub-Leoglez10-181717?logo=github&logoColor=white)](https://github.com/Leoglez10)

</div>
