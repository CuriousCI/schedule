const i = [
  "/schedule/_app/immutable/start-ecf604db.js",
  "/schedule/_app/immutable/components/layout.svelte-e6095b23.js",
  "/schedule/_app/immutable/components/error.svelte-fe9e378b.js",
  "/schedule/_app/immutable/components/pages/_page.svelte-25c27a6d.js",
  "/schedule/_app/immutable/assets/_page-aa8b9161.css",
  "/schedule/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/schedule/_app/immutable/chunks/singletons-98585963.js",
  "/schedule/_app/immutable/chunks/index-e339a38f.js",
  "/schedule/_app/immutable/chunks/_layout-8d2a742b.js",
  "/schedule/_app/immutable/chunks/0-1a6760b6.js",
  "/schedule/_app/immutable/chunks/1-fa1c706b.js",
  "/schedule/_app/immutable/chunks/2-d6e25a93.js"
], d = [
  "/schedule/.nojekyll",
  "/schedule/books.json",
  "/schedule/buildings.json",
  "/schedule/channel1.json",
  "/schedule/channel2.json",
  "/schedule/logo_192.png",
  "/schedule/logo_512.png",
  "/schedule/logo_72.png",
  "/schedule/manifest.json",
  "/schedule/subjects.json",
  "/schedule/teachers.json",
  "/schedule/wooclap.svg"
], o = "1668974963502", c = self, l = `cache${o}`, h = i.concat(d), p = new Set(h);
c.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(l).then((s) => s.addAll(h)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const t of s)
        t !== l && await caches.delete(t);
      c.clients.claim();
    })
  );
});
async function r(e) {
  const s = await caches.open(`offline${o}`);
  try {
    const t = await fetch(e);
    return s.put(e, t.clone()), t;
  } catch (t) {
    const a = await s.match(e);
    if (a)
      return a;
    throw t;
  }
}
c.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), t = s.protocol.startsWith("http"), a = s.hostname === self.location.hostname && s.port !== self.location.port, n = s.host === self.location.host && p.has(s.pathname), u = e.request.cache === "only-if-cached" && !n;
  t && !a && !u && e.respondWith(
    (async () => n && await caches.match(e.request) || r(e.request))()
  );
});
