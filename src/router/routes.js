
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomeScreen.vue') },
      { path: '/chat/:oid', component: () => import('pages/ChatScreen.vue') },
      { path: '/auth', component: () => import('pages/AuthScreen.vue') },
      { path: '/profile', component: () => import('pages/ProfileScreen.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
