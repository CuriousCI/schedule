const i = [
  "/schedule/_app/immutable/entry/app.d57370c2.mjs",
  "/schedule/_app/immutable/chunks/0.6947344b.mjs",
  "/schedule/_app/immutable/chunks/1.7f43dab1.mjs",
  "/schedule/_app/immutable/chunks/2.f10ddcab.mjs",
  "/schedule/_app/immutable/chunks/_layout.68ca539e.mjs",
  "/schedule/_app/immutable/chunks/index.be0875a3.mjs",
  "/schedule/_app/immutable/chunks/singletons.0841f869.mjs",
  "/schedule/_app/immutable/entry/start.94c467a6.mjs",
  "/schedule/_app/immutable/entry/error.svelte.ad25982b.mjs",
  "/schedule/_app/immutable/entry/layout.svelte.32170c78.mjs",
  "/schedule/_app/immutable/entry/_layout.ts.9f8e3aa7.mjs",
  "/schedule/_app/immutable/assets/_page.99edb2df.css",
  "/schedule/_app/immutable/entry/_page.svelte.c6bc729d.mjs"
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
], l = "1676984824545", c = self, o = `cache${l}`, h = i.concat(d), p = new Set(h);
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
