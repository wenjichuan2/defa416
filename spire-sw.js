const CACHE='lexis-spire-v010';
const urls=['cet4_spire_v08.html','spire-manifest.json','spire-icon.png'].map(x=>new URL(x,self.registration.scope).href);
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(urls.map(u=>new Request(u,{cache:'reload'})));await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(['lexis-spire-v08','lexis-spire-v09'].includes(k))await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);const key=u.origin+u.pathname;if(!urls.includes(key))return;e.respondWith((async()=>{const c=await caches.open(CACHE);const r=await c.match(key);if(r)return r;const fresh=await fetch(e.request);if(fresh.ok)await c.put(key,fresh.clone());return fresh})())});
