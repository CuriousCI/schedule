const i = [
  "/schedule/_app/immutable/start-bd5c6875.js",
  "/schedule/_app/immutable/components/layout.svelte-dbae53da.js",
  "/schedule/_app/immutable/components/error.svelte-8306724a.js",
  "/schedule/_app/immutable/components/pages/_page.svelte-7f9f7968.js",
  "/schedule/_app/immutable/assets/_page-6423b1e8.css",
  "/schedule/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/schedule/_app/immutable/chunks/singletons-5cc24d0a.js",
  "/schedule/_app/immutable/chunks/index-792a2b83.js",
  "/schedule/_app/immutable/chunks/_layout-8d2a742b.js",
  "/schedule/_app/immutable/chunks/0-095cb41b.js",
  "/schedule/_app/immutable/chunks/1-adc9b780.js",
  "/schedule/_app/immutable/chunks/2-9c1d63fd.js"
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
  "/schedule/teachers.json"
], l = "1664182882604", c = self, o = `cache${l}`, h = i.concat(d), p = new Set(h);
c.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(o).then((s) => s.addAll(h)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const t of s)
        t !== o && await caches.delete(t);
      c.clients.claim();
    })
  );
});
async function r(e) {
  const s = await caches.open(`offline${l}`);
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
