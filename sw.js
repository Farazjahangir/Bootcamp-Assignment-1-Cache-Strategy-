var cacheName = "static-files_v1"
var filesToCache = [
    "/",
    "/index.html",
    "/css/bootstrap.min.css",
    "/css/style.css",
    "/js/app.js"
]


self.addEventListener("install" , (e)=>{
    console.log("Service Worker Installed");
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            cache.addAll(filesToCache)
            console.log("files Cached Successfully");
            
        })
    )
})


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });



  self.addEventListener('fetch',(e)=>{

    console.log(e.request.url)
    if(e.request.url === 'https://api.github.com/users/izaanjahangir/followers'){
        fetch(e.request)
        .then(response => {
            return caches.open("Dynamic")
                .then(cache => {
                    console.log('Caching new data...')
                    cache.put(e.request,response.clone());
                    return response;
                })
        })
    }else{
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request).catch(err => console.log(err));
            })
        )
    }
})
  