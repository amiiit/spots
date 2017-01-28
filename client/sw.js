const OFFLINE_CACHE = 'OFFLINE_CACHE'


self.addEventListener("install", event => {
  console.log("Installed");
  event.waitUntil(
    caches.open(OFFLINE_CACHE)
      .then(cache => {
          fetch("manifest.json")
            .then(response => response.json())
            .then(assets =>
              cache.addAll([
                "/",
                assets['main.js'],
                assets['static_data.json']
              ])
            ).then(a => {
          })

        }
      ).then(() => self.skipWaiting())
  );
});


self.onfetch = function (event) {

  // const url = event.request.url;

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        // console.log('Found response in cache:', response);

        return response;
      }
      // console.log('No response found in cache. About to fetch from network...');

      return fetch(event.request).then(function(response) {
        // console.log('Response from network is:', response);
        // caches.open(OFFLINE_CACHE).then(cache => cache.put(event.request, response))
        return response;
      }).catch(function(error) {
        console.error('Fetching failed:', error);

        throw error;
      });
    })
  )
};
