const i = [
  "/schedule/_app/immutable/start-82d59263.js",
  "/schedule/_app/immutable/components/layout.svelte-e6095b23.js",
  "/schedule/_app/immutable/components/error.svelte-776c4e8b.js",
  "/schedule/_app/immutable/components/pages/_page.svelte-9c81958d.js",
  "/schedule/_app/immutable/assets/_page-469ce2e3.css",
  "/schedule/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/schedule/_app/immutable/chunks/singletons-89274faa.js",
  "/schedule/_app/immutable/chunks/index-e339a38f.js",
  "/schedule/_app/immutable/chunks/_layout-8d2a742b.js",
  "/schedule/_app/immutable/chunks/0-1a6760b6.js",
  "/schedule/_app/immutable/chunks/1-f48c64bc.js",
  "/schedule/_app/immutable/chunks/2-cba5433f.js"
], p = [
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
], o = "1667320021408", t = self, l = `cache${o}`, h = i.concat(p), d = new Set(h);
t.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(l).then((s) => s.addAll(h)).then(() => {
      t.skipWaiting();
    })
  );
});
t.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const c of s)
        c !== l && await caches.delete(c);
      t.clients.claim();
    })
  );
});
async function r(e) {
  const s = await caches.open(`offline${o}`);
  try {
    const c = await fetch(e);
    return s.put(e, c.clone()), c;
  } catch (c) {
    const a = await s.match(e);
    if (a)
      return a;
    throw c;
  }
}
t.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), c = s.protocol.startsWith("http"), a = s.hostname === self.location.hostname && s.port !== self.location.port, n = s.host === self.location.host && d.has(s.pathname), u = e.request.cache === "only-if-cached" && !n;
  c && !a && !u && e.respondWith(
    (async () => n && await caches.match(e.request) || r(e.request))()
  );
});
