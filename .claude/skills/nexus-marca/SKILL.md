---
name: nexus-marca
description: Fuente de verdad de la marca NEXUS — cliente ideal, diferenciadores, política de precios, tono de voz, prueba social disponible y palabras prohibidas. Úsala antes de escribir o revisar cualquier texto del sitio, del asistente de chat o de los correos.
---

# Marca NEXUS

Estudio de software de Eduver Gutiérrez. Este archivo es la única fuente de verdad para el copy. **No escribas texto de cara al público sin haberlo leído**, y si un dato no está aquí, pregúntalo en vez de suponerlo.

## Cliente ideal

**El cliente final: negocios y personas que necesitan software propio.** Es a quien le habla el sitio, y por tanto quien manda en el H1, en la prueba social y en cada texto de la home.

El tuteo directo que ya usa el sitio («tu negocio», «cuéntanos tu idea») es el registro correcto y se mantiene.

Las **agencias y estudios que subcontratan desarrollo** son un **canal secundario**: aportan trabajo, pero no son el interlocutor de la web. No se escribe copy pensando en ellas ni se ajusta el tono a su vocabulario. Si algún día necesitan espacio propio, será una página aparte — nunca la home.

### Los tres perfiles, sin priorizar

El sitio atiende por igual a los tres y no debe excluir a ninguno:

- **Negocio en marcha con procesos a mano.** Lleva inventario, pedidos o clientes en Excel y WhatsApp; se le escapan cosas y pierde horas.
- **Emprendedor validando una idea.** Quiere una primera versión en el mercado y no sabe por dónde empezar ni cuánto cuesta.
- **Empresa mediana con sistemas ya montados.** Necesita integraciones, datos o IA encima de lo que tiene, porque sus sistemas no se hablan entre sí.

Consecuencia directa para el copy: **el H1 apela al beneficio común, no a un dolor concreto.** Lo que comparten los tres es que tienen algo en la cabeza —o funcionando a medias— y necesitan que alguien lo construya bien.

El dolor específico de cada perfil sí se puede usar más abajo, en los textos de servicios o en la prueba social. En el titular no, porque cualquiera de los tres dolores deja fuera a dos tercios de la audiencia.

## Diferenciadores

Los tres que Eduver reivindica frente a la competencia local:

1. **Datos e IA de verdad, no solo páginas web.** La competencia local hace sitios y catálogos; aquí además se modelan datos, se construyen dashboards y se integran modelos de lenguaje.
2. **Stack elegido por problema, no por costumbre.** No se fuerza la misma tecnología en todos los proyectos. Ya aparece en los textos de servicios, pero todavía no como argumento principal.
3. **Acompañamiento después de entregar.** Soporte, ajustes y monitoreo con el producto ya en producción, en vez de desaparecer tras la entrega.

## Precios

**No se publican cifras.** Ni rangos ni precios «desde». Todo va por cotización.

El asistente de chat ya tiene esta instrucción en `src/lib/chat-context.ts` y debe conservarla: ante una pregunta de precio, deriva a WhatsApp o al formulario, nunca improvisa una cifra.

## Tono de voz

**Cercano y conversacional.** Tuteo, frases como se hablan, cero pomposidad. Se le escribe a una persona concreta, no a un comité.

Cercano no significa impreciso: los datos técnicos van exactos. La calidez está en el trato, no en rebajar el rigor.

## Prueba social disponible

Se pueden describir proyectos entregados **sin nombrar al cliente**. El material utilizable es *qué se construyó* y *qué resultado dio* — por ejemplo «plataforma de inventario para una distribuidora» — nunca el logo ni el nombre.

Queda prohibido fabricar testimonios, logos de clientes o cifras de negocio.

> **PENDIENTE — bloquea la redacción del copy.**
> Falta la lista real de proyectos entregados, aunque sean pocos. Por cada uno hace falta: qué se construyó, para qué tipo de negocio (sin nombrarlo), con qué tecnología y qué resultado o mejora concreta dejó. Sin esto no se puede diseñar la sección de prueba social ni escribir la versión del H1 basada en diferenciador.

## Palabras prohibidas

Nunca deben aparecer en ningún texto público:

- «revoluciona»
- «potencia»
- «solución integral»
- «al siguiente nivel»
- «software que despega» *(era el H1 anterior)*

Son marcadores de texto genérico de agencia, justo lo que la marca quiere evitar.

## Reglas de redacción

- **El copy habla del cliente, no del estudio.** Un titular que describe a NEXUS está mal por definición; tiene que partir del beneficio, del dolor o de un diferenciador comprobable.
- **Hechos verificables en vez de valores abstractos.** Nada de «Calidad · Transparencia · Innovación · Compromiso». En su lugar: años operando, proyectos entregados, tiempo de respuesta.
- **Nada inventado.** Tecnologías, cifras, plazos y clientes salen de datos reales. Las tecnologías que se publican son solo las verificables en el repositorio.
