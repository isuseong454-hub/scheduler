// 이 앱은 새 주소로 이사했습니다. 이 서비스워커는 스스로를 해제합니다.
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    try {
      const ks = await caches.keys();
      await Promise.all(ks.map(function (k) { return caches.delete(k); }));
      await self.registration.unregister();
      const cs = await self.clients.matchAll({ type: 'window' });
      cs.forEach(function (c) { c.navigate(c.url); });
    } catch (err) {}
  })());
});
