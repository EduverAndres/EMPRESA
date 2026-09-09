# Ritmo visual de la home

Plan de maquetación, pendiente de aprobación. **No se ha implementado nada de este documento.**

## Diagnóstico

Las seis secciones bajo el hero comparten exactamente la misma plantilla: `SectionKicker` centrado → `h2` centrado → párrafo centrado (`max-w-2xl`) → rejilla de tarjetas dentro de `max-w-6xl`. `SectionHeading.tsx` fuerza ese patrón: `mx-auto max-w-2xl text-center` está escrito dentro del componente, no es una opción.

Consecuencias medibles hoy:

- **Un solo eje.** Seis secciones seguidas centradas. Al recorrer la página no hay ningún cambio de dirección: el ojo baja por una columna sin interrupciones y nada reclama atención.
- **Escala tipográfica plana.** Todos los `h2` son `1.75rem → 2.25rem`; todo el cuerpo es `0.875rem → 1rem`. Entre el nivel más alto de sección y el texto corriente hay un factor de 2,25×, insuficiente para que la jerarquía se lea antes que el contenido.
- **La separación la hacen las cajas, no el espacio.** Casi todo bloque de contenido vive dentro de una `.surface` con borde. El borde sustituye al espacio en blanco, y el resultado es una retícula de rectángulos uniformes.
- **`py` idéntico en todas.** `py-20 sm:py-28` repetido seis veces: el pulso vertical es constante y por tanto invisible.

## Reglas que sigue este plan

1. Máximo dos secciones consecutivas con el mismo tratamiento.
2. Al menos dos secciones rompen el centrado y se anclan a la izquierda.
3. La escala tipográfica se amplía por los dos extremos.
4. La separación se consigue con espacio asimétrico, no con bordes ni cajas.
5. `MissionVision` sale de la home.

## Escala tipográfica propuesta

Hoy los seis niveles caben entre 12 px y 40 px. La propuesta los reparte entre 11 px y 88 px, y abre el hueco donde falta: entre cuerpo y título de sección.

| Nivel | Hoy | Propuesta | Uso |
|---|---|---|---|
| Kicker | `0.75rem` / `0.22em` | `0.6875rem` / `0.26em` | Etiqueta de sección |
| Cuerpo menor | `0.875rem` | `0.875rem` | Pie, metadatos, features |
| Cuerpo | `1rem` | `1rem` | Párrafos de tarjeta |
| **Entrada** | *(no existe)* | **`1.25rem`** | Párrafo introductorio de sección |
| Título de tarjeta | `1.125 → 1.5rem` | `1.375rem` | `h3` |
| Título secundario | `1.75 → 2.25rem` | `1.75rem` | `h2` de secciones de apoyo |
| **Título de sección** | `1.75 → 2.25rem` | **`clamp(2.25rem, 4vw, 3.25rem)`** | `h2` de secciones protagonistas |
| Display | `2.5 → 4.5rem` | `clamp(3rem, 7.5vw, 5.5rem)` | `h1` del hero |

El salto que hoy no existe es **Entrada (20 px)**: un tamaño intermedio entre cuerpo y título que permite que el párrafo introductorio de cada sección pese más que el texto de las tarjetas sin competir con el `h2`.

Se implementaría como tokens `--text-*` en el bloque `@theme` de `globals.css`, no como valores sueltos repartidos por los componentes.

## Ritmo sección por sección

| # | Sección | Tratamiento | Eje | Rompe con la anterior en |
|---|---|---|---|---|
| 1 | Hero | Full-bleed, `100svh` | Centrado | Ancla de la página |
| 2 | Pillars | Contenida asimétrica 5/7 | **Izquierda** | Abandona el centro por primera vez |
| 3 | Process | Full-bleed, rail horizontal | **Izquierda** | Sale de la caja de 72 rem; recorrido horizontal |
| 4 | Services | Contenida, rejilla desigual | Título izquierda | Vuelve a caja y sube la densidad |
| 5 | TechStack | Full-bleed, banda silenciosa | Centrado | Recupera el centro con tipografía pequeña |
| 6 | CTA | Contenida, dos columnas 5/7 | **Izquierda** | Dos columnas de contenido simultáneo |

Secuencia de tratamientos: `full-centrado → contenida-asimétrica → full-bleed → contenida-rejilla → full-bleed → contenida-dos-columnas`. Ninguna se repite tres veces seguidas, y ni siquiera dos veces seguidas salvo en la alternancia contenida/full-bleed, que es justo la que da el pulso.

### 1. Hero — se queda centrado

Es el único sitio donde el centrado se gana su lugar: una sola idea, sin nada que comparar. Cambia solo la escala del `h1` (`clamp(3rem, 7.5vw, 5.5rem)`) y el `padding` inferior, que pasa a ser mayor que el superior para que el hero "suelte" hacia la sección siguiente en vez de quedar equilibrado.

### 2. Pillars — asimétrica, anclada a la izquierda

Rejilla de 12 columnas. El encabezado ocupa las columnas 1–5 y queda pegado arriba (`position: sticky` en escritorio); las dos disciplinas ocupan de la 7 a la 12, apiladas en vertical y **desplazadas entre sí**: la segunda tarjeta arranca unos 6 rem por debajo de donde termina la primera, no a su altura.

Ese desfase es lo que sustituye al borde: dos bloques que no se alinean se leen como dos cosas distintas sin necesidad de dibujar la separación.

En móvil vuelve a una columna, con el desfase reducido a espacio vertical.

### 3. Process — full-bleed, rail horizontal

La sección sale de `max-w-6xl` y ocupa el ancho completo. El encabezado se queda a la izquierda dentro de la caja de contenido, y los cuatro pasos se convierten en un rail horizontal que **empieza en la columna 4 y sangra hasta el borde derecho de la pantalla**, cortado.

El corte es intencionado: comunica que el proceso continúa y obliga al ojo a moverse en horizontal después de tres secciones bajando en vertical. En móvil es un carrusel con scroll horizontal y `scroll-snap`.

Aquí desaparecen las cajas `surface-solid` de los iconos: los cuatro pasos se separan por espacio y por el número, que sube a tamaño *Display* en versión contorneada.

### 4. Services — contenida, rejilla desigual

Vuelve dentro de la caja. El encabezado se mantiene a la izquierda (segunda sección consecutiva con eje izquierdo — el máximo que permite la regla 1), pero el tratamiento cambia: de rail aireado a rejilla densa.

La rejilla deja de ser 3×3 uniforme: la primera tarjeta ocupa **dos columnas y dos filas**, con el icono a mayor tamaño, y las seis restantes quedan a una columna. Con siete servicios, una rejilla de tres columnas deja hoy un hueco en la última fila; la tarjeta destacada lo absorbe y de paso jerarquiza.

*(Cuál de los siete va destacado es una decisión de negocio, no de maquetación. La dejo abierta.)*

### 5. TechStack — banda silenciosa, centrada

Única sección que recupera el centro, y lo hace en el nivel tipográfico más bajo de toda la página: el `h2` baja a *Título secundario* (1,75 rem) y se elimina el párrafo introductorio.

Es deliberadamente el momento de menos peso de la home: después de la densidad de Services hace falta una zona de respiro antes del cierre. El centrado aquí no compite con nada porque el tamaño no se lo permite.

### 6. CTA — dos columnas reales

Mantiene la estructura de dos columnas que ya tiene, con dos ajustes: la proporción pasa de `0.85fr / 1fr` a `5/7` (más asimétrica) y el contenedor exterior pierde el borde `.surface` y el `rounded-3xl`. El formulario conserva su caja — es la única de la página que la necesita, porque delimita una zona donde se escribe.

Al quitar la caja exterior, el `padding` asimétrico hace el trabajo: mucho aire a la izquierda del texto, el formulario pegado al límite derecho de la caja de contenido.

## Espacio vertical

Se elimina el `py-20 sm:py-28` repetido. Cada sección recibe un par `(superior, inferior)` distinto, y ninguna es simétrica salvo las dos que deben leerse como pausa:

| Sección | Superior | Inferior |
|---|---|---|
| Pillars | 10 rem | 6 rem |
| Process | 6 rem | 14 rem |
| Services | 8 rem | 8 rem |
| TechStack | 5 rem | 5 rem |
| CTA | 12 rem | 10 rem |

El par corto de TechStack refuerza que es una banda de paso; el inferior largo de Process abre el silencio antes de la sección más densa.

## MissionVision fuera de la home

Recomiendo **`/nosotros`**, no el pie. En el pie, dos párrafos de 300 caracteres compiten con los enlaces y no los lee nadie; como página propia el texto sigue indexable y el menú gana un destino real.

Implica:

- Nueva ruta `app/nosotros/page.tsx` que reutiliza `MissionVision`.
- `siteConfig.nav`: `"Misión y visión" → /#mision-vision` pasa a `"Nosotros" → /nosotros`.
- `Navbar.tsx`: `SECTION_IDS` pierde `mision-vision`, y el indicador de sección activa deja de aplicar en rutas que no son la home.
- `sitemap.ts`: añadir `/nosotros`.
- `MissionVision.tsx`: pierde el `id="mision-vision"` y el `SectionHeading` centrado, que en una página propia pasa a ser el `h1`.

## Lo que este plan no incluye

**Nada de copy.** Los textos actuales (`h1`, los cuatro valores del hero, los títulos de sección) quedan intactos hasta que esté resuelto `.claude/skills/nexus-marca/SKILL.md`. Este documento define dónde va cada cosa y con qué peso, no qué dice.

## Archivos que se tocarían al implementar

| Archivo | Cambio |
|---|---|
| `app/globals.css` | Tokens `--text-*` de la escala nueva |
| `components/SectionHeading.tsx` | Props `align` y `size`; hoy el centrado está fijo |
| `components/Pillars.tsx` | Rejilla 5/7, sticky, desfase vertical |
| `components/Process.tsx` | Rail horizontal full-bleed con sangrado |
| `components/Services.tsx` | Rejilla desigual con tarjeta destacada |
| `components/TechStack.tsx` | Encabezado a nivel secundario, sin párrafo |
| `components/CTA.tsx` | 5/7, sin caja exterior |
| `components/Hero.tsx` | Escala del `h1`, padding asimétrico |
| `app/page.tsx` | Sale `MissionVision` |
| `app/nosotros/page.tsx` | Nueva |
| `lib/site-config.ts`, `app/sitemap.ts`, `components/Navbar.tsx` | Navegación |

`SectionHeading.tsx` es el cambio del que dependen los demás: mientras el centrado siga fijo dentro del componente, ninguna sección puede romperlo.

## Pendiente

Tu aprobación, y una decisión: **qué servicio va destacado** en la rejilla de Services.
