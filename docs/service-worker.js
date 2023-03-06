const i = [
  "/schedule/_app/immutable/entry/app.9c740f0e.mjs",
  "/schedule/_app/immutable/chunks/0.ce9a4685.mjs",
  "/schedule/_app/immutable/chunks/1.b4849e57.mjs",
  "/schedule/_app/immutable/chunks/2.9cbe28c7.mjs",
  "/schedule/_app/immutable/chunks/_layout.68ca539e.mjs",
  "/schedule/_app/immutable/chunks/index.53017cc7.mjs",
  "/schedule/_app/immutable/chunks/singletons.73efd420.mjs",
  "/schedule/_app/immutable/entry/start.24697e65.mjs",
  "/schedule/_app/immutable/entry/error.svelte.eb1d29da.mjs",
  "/schedule/_app/immutable/entry/layout.svelte.13727a65.mjs",
  "/schedule/_app/immutable/entry/_layout.ts.9f8e3aa7.mjs",
  "/schedule/_app/immutable/assets/_page.c4de25f7.css",
  "/schedule/_app/immutable/entry/_page.svelte.6bfe292a.mjs"
], d = [
  "/schedule/.nojekyll",
  "/schedule/books.json",
  "/schedule/buildings.json",
  "/schedule/channel1.json",
  "/schedule/channel12.json",
  "/schedule/channel2.json",
  "/schedule/github.svg",
  "/schedule/logo_192.png",
  "/schedule/logo_512.png",
  "/schedule/logo_72.png",
  "/schedule/manifest.json",
  "/schedule/subjects.json",
  "/schedule/teachers.json",
  "/schedule/wooclap.svg"
], l = "1678095330760", c = self, h = `cache${l}`, o = i.concat(d), p = new Set(o);
c.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(h).then((s) => s.addAll(o)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const t of s)
        t !== h && await caches.delete(t);
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
