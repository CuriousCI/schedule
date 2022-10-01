const i = [
  "/schedule/_app/immutable/start-9087cd77.js",
  "/schedule/_app/immutable/components/layout.svelte-804c9493.js",
  "/schedule/_app/immutable/components/error.svelte-11281eac.js",
  "/schedule/_app/immutable/components/pages/_page.svelte-d4c018c3.js",
  "/schedule/_app/immutable/assets/_page-597ffe3b.css",
  "/schedule/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/schedule/_app/immutable/chunks/singletons-3047edf4.js",
  "/schedule/_app/immutable/chunks/index-be866362.js",
  "/schedule/_app/immutable/chunks/_layout-8d2a742b.js",
  "/schedule/_app/immutable/chunks/0-4cc38363.js",
  "/schedule/_app/immutable/chunks/1-d17b5f5b.js",
  "/schedule/_app/immutable/chunks/2-de93ea7d.js"
], d = [
  "/schedule/.nojekyll",
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
], l = "1664608083833", t = self, o = `cache${l}`, h = i.concat(d), p = new Set(h);
t.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(o).then((s) => s.addAll(h)).then(() => {
      t.skipWaiting();
    })
  );
});
t.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const c of s)
        c !== o && await caches.delete(c);
      t.clients.claim();
    })
  );
});
async function r(e) {
  const s = await caches.open(`offline${l}`);
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
