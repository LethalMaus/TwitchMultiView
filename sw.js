self.addEventListener('fetch', function(event) {
	console.log(event.request)
  event.respondWith(
    fetch(event.request)
  );
});