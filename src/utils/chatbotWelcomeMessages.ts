/**
 * Elige un saludo al azar evitando repetir el último usado (si hay más de una opción).
 */
export function pickRandomWelcomeMessage(
  messages: string[],
  lastIndex?: number | null
): { message: string; index: number } {
  if (messages.length === 0) return { message: "", index: -1 };
  if (messages.length === 1) return { message: messages[0], index: 0 };

  let index = Math.floor(Math.random() * messages.length);
  if (lastIndex !== null && lastIndex !== undefined) {
    while (index === lastIndex) {
      index = Math.floor(Math.random() * messages.length);
    }
  }
  return { message: messages[index], index };
}
