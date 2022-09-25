const o = "schedule", i = "version_01", c = o + i, r = [
  "/schedule/",
  "/schedule/index.html"
];
self.addEventListener("fetch", function(e) {
  console.log("fetch request : " + e.request.url), e.respondWith(
    caches.match(e.request).then(function(n) {
      return n ? (console.log("responding with cache : " + e.request.url), n) : (console.log("file is not cached, fetching : " + e.request.url), fetch(e.request));
    })
  );
});
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(c).then(function(n) {
      return console.log("installing cache : " + c), n.addAll(r);
    })
  );
});
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(n) {
      const l = n.filter(function(t) {
        return t.indexOf(o);
      });
      return l.push(c), Promise.all(
        n.map(function(t, s) {
          if (l.indexOf(t) === -1)
            return console.log("deleting cache : " + n[s]), caches.delete(n[s]);
        })
      );
    })
  );
});
