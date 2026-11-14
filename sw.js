// Service worker mínimo: guarda la pantalla de inicio para que la app se pueda instalar y abra rápido.
const CACHE = "actuaciones-v1";
const ARCHIVOS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;           // la app (Streamlit) siempre va directo a internet
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
