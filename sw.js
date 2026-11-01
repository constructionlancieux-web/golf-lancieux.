const C='golf-lancieux-v6';
const F=["./", "./index.html", "./manifest.webmanifest", "./ball.png", "./icon-192.png", "./icon-512.png", "./greens/g1.jpg", "./greens/g2.jpg", "./greens/g3.jpg", "./greens/g4.jpg", "./greens/g5.jpg", "./greens/g6.jpg", "./greens/g7.jpg", "./greens/g8.jpg", "./greens/g9.jpg", "./meteo-pluie.gif", "./meteo-nuageux.gif", "./meteo-soleil.gif"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;   // météo : jamais mise en cache
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});
