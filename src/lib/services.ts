export type ServiceIcon =
  | "web"
  | "mobile"
  | "custom"
  | "ai"
  | "data"
  | "database"
  | "consulting";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string[];
  features: string[];
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    slug: "desarrollo-web",
    title: "Desarrollo web",
    short:
      "Sitios y plataformas rápidas, modernas y preparadas para crecer con tu negocio.",
    description: [
      "Construimos sitios y plataformas web a medida eligiendo siempre el framework y el lenguaje más adecuados para cada proyecto, en lugar de forzar una misma tecnología para todo.",
      "Desde landing pages hasta aplicaciones web complejas con paneles de administración, autenticación y lógica de negocio propia.",
    ],
    features: [
      "Frontend con frameworks modernos, según lo que el proyecto necesite",
      "Paneles de administración y dashboards",
      "Integración con APIs y servicios externos",
      "Rendimiento, SEO y buenas prácticas desde el inicio",
    ],
    icon: "web",
  },
  {
    slug: "aplicaciones-moviles",
    title: "Aplicaciones móviles",
    short:
      "Apps para iOS y Android pensadas en la experiencia real de tus usuarios.",
    description: [
      "Diseñamos y desarrollamos aplicaciones móviles multiplataforma o nativas, evaluando en cada proyecto qué enfoque ofrece mejor rendimiento y experiencia de usuario.",
      "Acompañamos el ciclo completo: diseño de interfaz, desarrollo, pruebas y publicación en tiendas.",
    ],
    features: [
      "Apps multiplataforma o desarrollo nativo, según el proyecto",
      "Integración con backend y notificaciones push",
      "Publicación en App Store y Google Play",
      "Mantenimiento y actualizaciones continuas",
    ],
    icon: "mobile",
  },
  {
    slug: "software-a-medida",
    title: "Software a medida",
    short:
      "Sistemas y herramientas internas diseñadas alrededor de tus procesos, no al revés.",
    description: [
      "Desarrollamos sistemas internos y herramientas a medida usando el lenguaje y la arquitectura que mejor se ajusten a tu infraestructura actual, no un molde genérico.",
      "Cada solución se diseña alrededor de cómo trabaja realmente tu equipo.",
    ],
    features: [
      "Backend en el lenguaje más adecuado para tu infraestructura",
      "Automatización de procesos internos",
      "Integraciones entre sistemas existentes",
      "Arquitecturas modulares y escalables",
    ],
    icon: "custom",
  },
  {
    slug: "inteligencia-artificial",
    title: "Inteligencia artificial & APIs de IA",
    short:
      "Integramos IA generativa en tu producto: asistentes, automatización y APIs a medida.",
    description: [
      "Integramos modelos de lenguaje e inteligencia artificial de distintos proveedores, eligiendo en cada caso el más adecuado para el problema que se quiere resolver.",
      "También construimos APIs propias que exponen esas capacidades de forma segura y escalable para el resto de tu stack.",
    ],
    features: [
      "Integración de modelos de lenguaje de última generación",
      "Chatbots y asistentes virtuales",
      "Automatización de tareas con IA",
      "APIs propias para exponer capacidades de IA",
    ],
    icon: "ai",
  },
  {
    slug: "ciencia-de-datos",
    title: "Ciencia de datos & analítica",
    short:
      "Convertimos datos dispersos en modelos, predicciones y dashboards que sí se usan para decidir.",
    description: [
      "Aplicamos estadística, modelado y análisis exploratorio para entender qué están diciendo tus datos, y construimos modelos predictivos cuando el problema lo requiere — no solo reportes bonitos.",
      "Trabajamos desde la limpieza y el modelado de datos hasta dashboards y visualizaciones que tu equipo realmente usa para decidir.",
    ],
    features: [
      "Análisis exploratorio y modelado estadístico",
      "Modelos predictivos y de clasificación",
      "Limpieza, transformación y pipelines de datos",
      "Dashboards e indicadores en tiempo real",
    ],
    icon: "data",
  },
  {
    slug: "bases-de-datos",
    title: "Bases de datos",
    short: "Diseño, migración y optimización de bases de datos sólidas y seguras.",
    description: [
      "Diseñamos esquemas de bases de datos relacionales y no relacionales, eligiendo el motor correcto según el volumen y tipo de datos de tu proyecto.",
      "También apoyamos procesos de migración entre motores y optimización de bases de datos existentes.",
    ],
    features: [
      "Diseño de esquemas relacionales y no relacionales",
      "Migraciones entre motores de base de datos",
      "Optimización de consultas y rendimiento",
      "Copias de seguridad y buenas prácticas de seguridad",
    ],
    icon: "database",
  },
  {
    slug: "consultoria-tecnica",
    title: "Consultoría técnica",
    short: "Acompañamiento para elegir la arquitectura y el stack correcto desde el inicio.",
    description: [
      "Ayudamos a definir la arquitectura, el stack tecnológico y las decisiones técnicas clave antes de escribir la primera línea de código, sin sesgo hacia una tecnología en particular.",
      "Ideal para equipos que están validando una idea o necesitan una segunda opinión técnica antes de invertir en desarrollo.",
    ],
    features: [
      "Definición de arquitectura y stack según el proyecto",
      "Revisión técnica de proyectos existentes",
      "Planeación de escalabilidad",
      "Acompañamiento en decisiones técnicas",
    ],
    icon: "consulting",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
