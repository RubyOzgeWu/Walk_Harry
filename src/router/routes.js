
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/loginView.vue'),
        meta: {
          title: 'Login',
          login: false,
          admin: false
        }
      },
      {
        path: 'Home',
        name: 'Home',
        component: () => import('../pages/IndexPage.vue'),
        meta: {
          title: 'Home',
          login: true,
          admin: false
        }
      },
      {
        path: 'Record',
        name: 'Record',
        component: () => import('../pages/recordView.vue'),
        meta: {
          title: 'Record',
          login: false,
          admin: false
        }
      }

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
