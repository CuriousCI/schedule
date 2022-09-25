const i = [
  "/schedule/_app/immutable/start-49c22b24.js",
  "/schedule/_app/immutable/components/layout.svelte-b6cb2be0.js",
  "/schedule/_app/immutable/components/error.svelte-bcf9c146.js",
  "/schedule/_app/immutable/components/pages/_page.svelte-10b31448.js",
  "/schedule/_app/immutable/assets/_page-c2187cb9.css",
  "/schedule/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/schedule/_app/immutable/chunks/singletons-4612ce51.js",
  "/schedule/_app/immutable/chunks/index-f2a05ad1.js",
  "/schedule/_app/immutable/chunks/_layout-8d2a742b.js",
  "/schedule/_app/immutable/chunks/0-ec9a0ab6.js",
  "/schedule/_app/immutable/chunks/1-ae0d675e.js",
  "/schedule/_app/immutable/chunks/2-00b73c2a.js"
], p = [
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
], l = "1664127922776", t = self, o = `cache${l}`, h = i.concat(p), d = new Set(h);
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
  const s = new URL(e.request.url), c = s.protocol.startsWith("http"), a = s.hostname === self.location.hostname && s.port !== self.location.port, n = s.host === self.location.host && d.has(s.pathname), u = e.request.cache === "only-if-cached" && !n;
  c && !a && !u && e.respondWith(
    (async () => n && await caches.match(e.request) || r(e.request))()
  );
});
