const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'PaginaInicial', component: () => import('pages/IndexPage.vue') },
      { path: 'NovoChamado', name: 'NovoChamado', component: () => import('pages/NovoChamado.vue') },
      { path: 'Map', name: 'Mapa', component: () => import('pages/LMapPage.vue') },
      { path: 'Inicio', name: 'inicio', component: () => import('pages/PaginaInicial.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
