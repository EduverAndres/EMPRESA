/**
 * Evento que abre el asistente desde cualquier punto del sitio.
 *
 * `ChatWidget` guarda su estado de apertura en su propio `useState`, así que
 * ningún otro componente puede abrirlo directamente. Un evento en `window`
 * resuelve el caso sin subir ese estado a un contexto global ni convertir en
 * cliente a los componentes que solo necesitan disparar la acción.
 */
export const ABRIR_CHAT_EVENT = "nexus:abrir-chat";
