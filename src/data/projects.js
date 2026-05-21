// Centralized Portfolio Database for Artecnologia
// Adding a new project is as simple as adding a new object to this array.

export const projects = [
  // --- Original Premium Featured Projects ---
  {
    id: 1,
    title: 'Clínica Dental Especializada',
    category: 'Salud & Servicios',
    image: '/img/clinica-nizuc-spa.png',
    techs: ['HTML5', 'TailwindCSS', 'React', 'Google Maps API'],
    description: 'Diseño de sitio corporativo responsivo con integración de agenda de citas en línea, sistema de testimoniales y chat de soporte integrado. Optimización SEO que aumentó el posicionamiento orgánico en un 40%.',
    featured: true
  },
  {
    id: 2,
    title: 'Consorcio Jurídico & Asociados',
    category: 'Corporativo & Legal',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    techs: ['Vite', 'React', 'Vanilla CSS', 'EmailJS'],
    description: 'Sitio corporativo premium con diseño sobrio y elegante (glassmorphism). Incluye pasarela para consulta virtual de casos legalizados, formulario de contacto seguro y optimización para búsquedas locales en Google.',
    featured: true
  },
  {
    id: 3,
    title: 'Restaurante Sabor Tapatío',
    category: 'Alimentos & Bebidas',
    image: '/img/perez-cerveceria.png',
    techs: ['TailwindCSS', 'JavaScript', 'Google Maps', 'SEO local'],
    description: 'Portal gastronómico interactivo con menú digital dinámico QR, pasarela de reserva de mesas automatizada e integración de feed de Instagram para mostrar platillos en tiempo real.',
    featured: true
  },
  {
    id: 4,
    title: 'Boutique Moda y Estilo',
    category: 'Comercio Electrónico',
    image: '/img/yakenda-muebles.png',
    techs: ['React', 'TailwindCSS', 'Stripe', 'NodeJS'],
    description: 'Tienda virtual moderna con catálogo autoadministrable, carrito de compras avanzado, pasarela de pago segura de Stripe/PayPal y panel de administración para control de inventario y pedidos.',
    featured: true
  },

  // --- New Client Projects ---
  {
    id: 5,
    title: 'MG MAQUINARIA',
    category: 'Industrial & Maquinaria',
    image: '/img/bicentenario-calentadores.png',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'WhatsApp API'],
    description: 'Catálogo web industrial interactivo de maquinaria pesada. Cuenta con fichas técnicas descargables en PDF, galería de maquinaria nueva/usada y cotizaciones instantáneas directas a ventas.',
    featured: false
  },
  {
    id: 6,
    title: 'INFO MEX',
    category: 'Tecnología & Noticias',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    techs: ['React', 'CSS Modules', 'WordPress REST API', 'SEO'],
    description: 'Portal de noticias y boletines tecnológicos a nivel nacional. Implementa carga ultra-rápida de noticias, categorías dinámicas, optimización SEO avanzada y newsletter para captar suscriptores.',
    featured: false
  },
  {
    id: 7,
    title: 'TODO PARA EL PODOLOGO',
    category: 'Salud & Servicios',
    image: '/img/higiene-maxima.png',
    techs: ['Vite', 'React', 'TailwindCSS', 'Stripe Payments'],
    description: 'Tienda virtual especializada en insumos y equipamiento para podólogos. Incluye catálogo dividido por marcas, carrito de compras integrado y procesamiento seguro de pagos con Stripe y PayPal.',
    featured: false
  },
  {
    id: 8,
    title: 'DUCTOS HERCOR',
    category: 'Construcción & Metalúrgica',
    image: '/img/cocina-closets-maresa.png',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'Google Maps'],
    description: 'Página web corporativa para fabricante de ductos industriales. Presenta de manera impecable portafolio de proyectos de ventilación, estándares de calidad y formulario para cotización de planos.',
    featured: false
  },
  {
    id: 9,
    title: 'IMCO MÉXICO',
    category: 'Ingeniería & Corporativo',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    techs: ['Vite', 'React', 'Vanilla CSS', 'EmailJS'],
    description: 'Sitio corporativo y de reclutamiento para empresa líder en ingeniería y estructuras metálicas. Incluye galería interactiva de obras emblemáticas e integración de buzón de capital humano.',
    featured: false
  },
  {
    id: 10,
    title: 'CHAGGET COSMETICS',
    category: 'Comercio Electrónico',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    techs: ['React', 'TailwindCSS', 'PayPal SDK', 'Node.js'],
    description: 'Plataforma e-commerce premium para marca independiente de cosméticos. Cuenta con carrito de compras reactivo, filtros de tonalidades por producto, pasarela de pago y catálogo autoadministrable.',
    featured: false
  },
  {
    id: 11,
    title: 'SERVI-PC',
    category: 'Tecnología & Noticias',
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690eca?auto=format&fit=crop&w=800&q=80',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'FormSubmit'],
    description: 'Sitio de servicios técnicos para servidores y equipos de cómputo corporativo. Ofrece tickets de soporte integrados, tarifas transparentes y mapa de cobertura local.',
    featured: false
  },
  {
    id: 12,
    title: 'MAQUINARIA Y PARTES',
    category: 'Industrial & Maquinaria',
    image: '/img/revancha-francesa.png',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'WhatsApp API'],
    description: 'Refaccionaria y catálogo de piezas industriales. Permite buscar autopartes o componentes industriales mediante un potente buscador indexado con cotización exprés.',
    featured: false
  },
  {
    id: 13,
    title: 'COPASA',
    category: 'Corporativo & Legal',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    techs: ['Vite', 'React', 'CSS Modules', 'SEO local'],
    description: 'Sitio de consultoría de procesos corporativos. Explica de manera estructurada sus metodologías, aseroría de cumplimiento y un área reservada para descarga de reportes por clientes autorizados.',
    featured: false
  },
  {
    id: 14,
    title: 'BIROTES ESMERALDA',
    category: 'Alimentos & Bebidas',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript'],
    description: 'Sitio web tradicional con enfoque moderno para panificadora regional de birotes. Presenta su historia artesanal, catálogo de productos mayoristas y formulario de contacto para distribución.',
    featured: false
  },
  {
    id: 15,
    title: 'CARROCERIAS AGUAYO',
    category: 'Industrial & Maquinaria',
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'Google Maps'],
    description: 'Página de presentación para taller de fabricación y ensamble de carrocerías para camiones de carga. Galería interactiva con filtros de tipos de cajas secas y refrigeradas.',
    featured: false
  },
  {
    id: 16,
    title: 'ESE PADRON',
    category: 'Corporativo & Legal',
    image: 'https://images.unsplash.com/photo-1521791136368-1a8682707636?auto=format&fit=crop&w=800&q=80',
    techs: ['Vite', 'React', 'Vanilla CSS'],
    description: 'Landing page ejecutiva para firma de consultores contables y fiscales. Ofrece un diseño limpio, agenda de videoconsultas integradas y enlaces rápidos a portales de facturación.',
    featured: false
  },
  {
    id: 17,
    title: 'EL GUERO ALTEÑO',
    category: 'Alimentos & Bebidas',
    image: '/img/el-gran-areno-tacos.png',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript'],
    description: 'Página web gastronómica y menú QR interactivo para restaurante regional mexicano. Muestra ubicaciones, horarios, menú por categorías con fotos en alta definición y reservaciones vía WhatsApp.',
    featured: false
  },
  {
    id: 18,
    title: 'HERSO METALES',
    category: 'Construcción & Metalúrgica',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript'],
    description: 'Sitio institucional para distribuidora de perfiles metálicos y acero estructural. Cuenta con tablas de equivalencia de materiales interactiva y cotizador en línea.',
    featured: false
  },
  {
    id: 19,
    title: 'TAMALES TABACHINES',
    category: 'Alimentos & Bebidas',
    image: '/img/el-gran-areno-paquete.png',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'Google Maps'],
    description: 'Catálogo de pedidos y menú interactivo de comida mexicana. Mapeo de sucursales con Geolocalización y sistema simple de pedidos mayoristas para eventos corporativos y familiares.',
    featured: false
  },
  {
    id: 20,
    title: 'MUEBLES Y CREACIONES-CGH',
    category: 'Hogar & Bienes Raíces',
    image: '/img/aus-muebles.png',
    techs: ['React', 'TailwindCSS', 'WhatsApp API'],
    description: 'Catálogo virtual interactivo de muebles rústicos y creaciones de madera. Galería de alta definición con filtros por espacio (Sala, Comedor, Recámara) y cotización rápida.',
    featured: false
  },
  {
    id: 21,
    title: 'VILLA SEIS POTROS',
    category: 'Eventos & Entretenimiento',
    image: '/img/payasos-happy-kids.png',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'FormSubmit'],
    description: 'Página web oficial de terraza de eventos y rancho ecuestre. Muestra cotizaciones de banquetes, galería de eventos montados, mapa interactivo y calendario de disponibilidad básica.',
    featured: false
  },
  {
    id: 22,
    title: 'IBFASE INTERNACIONAL',
    category: 'Logística & Transporte',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    techs: ['Vite', 'React', 'Vanilla CSS', 'SEO Multilingüe'],
    description: 'Portal web multilingüe para operadora de logística y comercio internacional. Integra tracking básico de mercancías e información de puertos e incoterms.',
    featured: false
  },
  {
    id: 23,
    title: 'TRANSPORTES CAMACHO',
    category: 'Logística & Transporte',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'Google Maps API'],
    description: 'Página web corporativa para transportistas de carga pesada. Muestra flota vehicular, cobertura con mapas e información de seguros y monitoreo GPS.',
    featured: false
  },
  {
    id: 24,
    title: 'ARTE CAMPOS BARRERA',
    category: 'Hogar & Bienes Raíces',
    image: '/img/viric-chapala-barra.png',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript'],
    description: 'Portafolio digital para artesano y escultor de canteras y acabados en piedra. Galería de alta resolución con zoom interactivo para apreciar detalles de relieves y esculturas.',
    featured: false
  },
  {
    id: 25,
    title: 'TERMI COOL',
    category: 'Salud & Servicios',
    image: '/img/termi-cool.png',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript', 'EmailJS'],
    description: 'Sitio técnico para empresa proveedora de aire acondicionado y sistemas de refrigeración comercial. Incluye listado de pólizas de mantenimiento y tickets de emergencia.',
    featured: false
  },
  {
    id: 26,
    title: 'TALLER DE SERVICIOS SANCHEZ',
    category: 'Automotriz & Servicios',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    techs: ['HTML5', 'TailwindCSS', 'JavaScript'],
    description: 'Landing page para taller mecánico multimarca. Presenta servicios de frenos, suspensión, afinación, localización del taller, y cotización exprés de refacciones.',
    featured: false
  },
  {
    id: 27,
    title: 'TATLA',
    category: 'Eventos & Entretenimiento',
    image: '/img/musica-instrumentos.png',
    techs: ['Vite', 'React', 'TailwindCSS', 'Google Maps'],
    description: 'Sitio promocional de ecoturismo y cabañas de descanso. Cuenta con galería fotográfica de paisajes, mapa interactivo y reserva directa vía WhatsApp.',
    featured: false
  },
  {
    id: 28,
    title: 'HMAS INMOBILIARIA',
    category: 'Hogar & Bienes Raíces',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    techs: ['React', 'TailwindCSS', 'Google Maps API'],
    description: 'Plataforma interactiva de búsqueda y catalogación de bienes raíces. Permite filtrar casas o terrenos por precio, zona geográfica, cantidad de baños y recámaras.',
    featured: false
  }
];
