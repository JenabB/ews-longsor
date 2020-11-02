const CACHE_NAME = "ewslongsor-v2.3";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",

  "/css/materialize.min.css",
  "/css/styles.css",

  "/js/materialize.min.js",
  "/js/script.js",

  "images/header-home.png",
  "images/icons1.png",
  "images/icons2.png",
  "images/icons3.png",

  "https://thingspeak.com/channels/1212006/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=10&title=Kelembaban+Tanah&type=line&xaxis=Waktu&yaxis=Kelembaban",
  "https://thingspeak.com/channels/1212006/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=10&title=Getaran+Tanah&type=column&xaxis=Getaran&yaxis=Waktu",
  "/favicon.ico",

  "/images/apple-touch-icons/57x57.png",
  "/images/apple-touch-icons/60x60.png",
  "/images/apple-touch-icons/72x72.png",
  "/images/apple-touch-icons/76x76.png",
  "/images/apple-touch-icons/114x114.png",
  "/images/apple-touch-icons/120x120.png",
  "/images/apple-touch-icons/144x144.png",
  "/images/apple-touch-icons/152x152.png",
  "/images/apple-touch-icons/180x180.png",
  "/images/apple-touch-icons/196x196.png",
  "/images/apple-touch-icons/512x512.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});
