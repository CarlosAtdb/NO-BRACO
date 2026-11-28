/* No Braço — service worker (versão hospedada/PWA).
   Deixa o app abrir offline no navegador depois da 1ª visita.
   Ao publicar uma versão nova do index.html, suba o número de CACHE (v1 -> v2…). */
const CACHE = 'nobraco-v2';
const SHELL = ['./', './index.html'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  // Cross-origin (CDN do OCR, links do CifraClub/YouTube): não intercepta.
  if (url.origin !== self.location.origin) return;

  // Mesma origem: stale-while-revalidate (serve do cache na hora, atualiza em segundo plano).
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => { if (res && res.status === 200) cache.put(req, res.clone()); return res; })
          .catch(() => cached || (req.mode === 'navigate' ? cache.match('./index.html') : undefined));
        return cached || network;
      })
    )
  );
});
