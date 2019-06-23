self.addEventListener('fetch', function(event) {
	
  event.respondWith(
  console.log(event.request);
    fetch(event.request);
	
  );
});