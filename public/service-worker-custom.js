console.log('Custom service worker')

const nomeDoCachePrincipal = 'financeiro-v012'
self.addEventListener('install', event => {
	console.log('Install')
	event.waitUntil(
		caches.open(nomeDoCachePrincipal)
		.then(cache => {
			return cache.addAll([
				'/',
				'static/js/bundle.js',
				'static/js/main.chunk.js',
				'static/js/0.chunk.js',
				'static/js/1.chunk.js',
				'manifest.json',
				'favicon.ico',
				'service-worker-custom.js',
				//'https://glacial-harbor-83832.herokuapp.com/usuario/todos',
				//'https://glacial-harbor-83832.herokuapp.com/usuario/usuarioTipo',
				//'https://glacial-harbor-83832.herokuapp.com/usuario/usuarioSituacao',
				//'https://glacial-harbor-83832.herokuapp.com/situacao/todos',
				//'https://glacial-harbor-83832.herokuapp.com/categoria/todos',
				//'https://glacial-harbor-83832.herokuapp.com/empresa/todos',
				//'https://glacial-harbor-83832.herokuapp.com/empresa/empresaTipo',
				//'https://glacial-harbor-83832.herokuapp.com/empresa/contaFixa',
				//'https://glacial-harbor-83832.herokuapp.com/empresa/lancamento',
				//'https://glacial-harbor-83832.herokuapp.com/empresa/lancamentoSituacao'
			])
		})
		.catch(error => console.log(error)),
		console.log('skipWaiting'),
		self.skipWaiting()
	)
})

self.addEventListener('activate', event => {
	console.log('activate')
	event.waitUntil(
		caches.keys()
		.then(nomeTodasCaches => {
			console.log('removendo outros caches')
			return Promise.all(
				nomeTodasCaches
				.filter(nomeDocache => nomeDocache.startsWith('financeiro-') && nomeDocache != nomeDoCachePrincipal)
				.map(nomeDoCache => caches.delete(nomeDoCache))
			)
		}),
		self.clients.matchAll({ type: 'window' }).then(windowClients => {
			for (let windowClient of windowClients) {
				// Force open pages to refresh, so that they have a chance to load the
				// fresh navigation response from the local dev server.
				windowClient.navigate(windowClient.url);
			}
		})
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			console.log('request ', event.request.url)
			if(response) {
				console.log('caches.match')
				return response
			}
			console.log('buscando fetch')
			return fetch(event.request)
		})
	)
})
