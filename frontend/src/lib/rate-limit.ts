/**
 * Límite de peticiones por IP, en memoria.
 *
 * Suficiente para lo que protege aquí: evitar que un script agote la cuota
 * gratuita de Gemini o llene el buzón de contacto desde una sola máquina.
 *
 * Al ser en memoria, el contador vive por instancia de función: si Vercel
 * levanta varias en paralelo, el límite efectivo se multiplica por el número
 * de instancias. Para un sitio corporativo es un compromiso razonable; si algún
 * día hace falta un límite estricto, habría que moverlo a Redis (Upstash).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_ENTRIES = 5000;

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "desconocida";
}

export function rateLimit(
  request: Request,
  { key, max, windowMs }: { key: string; max: number; windowMs: number }
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const id = `${key}:${clientIp(request)}`;

  // Purga perezosa: solo cuando el mapa crece, y así no hace falta un timer.
  if (buckets.size > MAX_ENTRIES) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
  }

  const bucket = buckets.get(id);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(id, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= max) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}
