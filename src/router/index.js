import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/Login'),
      meta: {
        guest: true,
        layout: 'Auth'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login'),
      meta: {
        guest: true,
        layout: 'Auth'
      }
    },
    {
      path: '/list-employee',
      name: 'ListEmployee',
      component: () => import('@/components/employees/ListEmployee'),
      meta: {
        guest: true,
        layout: 'Default'
      }
    },
    {
      path: '/list-registered-businesses',
      name: 'list-registered-companies',
      component: () => import('@/components/businesses/ListRegisteredBusinesses'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/positions',
      name: 'positions',
      component: () => import('@/components/positions/ListItem'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/jobtitles',
      name: 'jobtitles',
      component: () => import('@/components/jobtitles/ListItem'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/schools',
      name: 'schools',
      component: () => import('@/components/schools/ListItem'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/environments',
      name: 'environments',
      component: () => import('@/components/environments/ListItem'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/typebusiness',
      name: 'typebusiness',
      component: () => import('@/components/typebusiness/ListItem'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/majors',
      name: 'majors',
      component: () => import('@/components/majors/ListItem'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/industries',
      name: 'industries',
      component: () => import('@/components/industries/ListItem'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },

    
    {
      path: '/list-cvid',
      name: 'employees',
      component: () => import('@/components/employees/ListCvid'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },

    {
      path: '/businesses',
      name: 'businesses',
      component: () => import('@/components/businesses/listbusinesses'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/businesses/position',
      name: 'businesses',
      component: () => import('@/components/businesses/listposition'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/administrator/listgroupuser',
      name: 'listgroupuser',
      component: () => import('@/components/administrator/ListAdmin'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
  
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.type == 1) {
          next()
        } else {
          next({ name: 'ViewInvoic' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
