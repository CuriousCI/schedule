const i = [
  "/schedule/_app/immutable/chunks/0-77cf475a.js",
  "/schedule/_app/immutable/chunks/1-3f07e408.js",
  "/schedule/_app/immutable/chunks/2-7476059e.js",
  "/schedule/_app/immutable/chunks/_layout-da46b06b.js",
  "/schedule/_app/immutable/chunks/index-aa5b68ec.js",
  "/schedule/_app/immutable/chunks/singletons-1020e9f7.js",
  "/schedule/_app/immutable/start-1a2d7b66.js",
  "/schedule/_app/immutable/components/error.svelte-4b93d492.js",
  "/schedule/_app/immutable/components/layout.svelte-c7404c16.js",
  "/schedule/_app/immutable/modules/pages/_layout.js-9cbb603b.js",
  "/schedule/_app/immutable/assets/_page-921a38c6.css",
  "/schedule/_app/immutable/components/pages/_page.svelte-dee52992.js"
], d = [
  "/schedule/.nojekyll",
  "/schedule/books.json",
  "/schedule/buildings.json",
  "/schedule/channel1.json",
  "/schedule/channel12.json",
  "/schedule/channel2.json",
  "/schedule/logo_192.png",
  "/schedule/logo_512.png",
  "/schedule/logo_72.png",
  "/schedule/manifest.json",
  "/schedule/subjects.json",
  "/schedule/teachers.json",
  "/schedule/wooclap.svg"
], o = "1676929644663", t = self, l = `cache${o}`, h = i.concat(d), p = new Set(h);
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
  const s = new URL(e.request.url), c = s.protocol.startsWith("http"), a = s.hostname === self.location.hostname && s.port !== self.location.port, n = s.host === self.location.host && p.has(s.pathname), u = e.request.cache === "only-if-cached" && !n;
  c && !a && !u && e.respondWith(
    (async () => n && await caches.match(e.request) || r(e.request))()
  );
});
