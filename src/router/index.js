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
      path: '/listproject',
      name: 'ListInvoiceType',
      component: () => import('@/components/invoicetype/ListInvoiceType'),
      meta: {
        guest: true,
        layout: 'Default'
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
      path: '/toquote',
      name: 'listtoquote',
      component: () => import('@/components/toquote/listtoquotes'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/toquotedetail',
      name: 'toquotedetail',
      component: () => import('@/components/toquote/toquotedetail'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/jobtitles',
      name: 'jobtitles',
      component: () => import('@/components/jobtitles/listjobtitles'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/schools',
      name: 'schools',
      component: () => import('@/components/schools/listschools'),
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
      path: '/employees/notbrowse',
      name: 'employee-not-browse',
      component: () => import('@/components/employees/employeesnotbrowse'),
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
      path: '/suppliertoquotedetail',
      name: 'suppliertoquotedetail',
      component: () => import('@/components/toquote/suppliertoquotedetail'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/toquotefromsupplier',
      name: 'toquotefromsupplier',
      component: () => import('@/components/toquote/toquotefromsupplier'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/choisesupplier',
      name: 'choisesupplier',
      component: () => import('@/components/toquote/choisesupplier'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/viewtoquote',
      name: 'viewtoquote',
      component: () => import('@/components/toquote/viewtoquote'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/administrator/listgroupuser',
      name: 'listgroupuser',
      component: () => import('@/components/administrator/listgroupuser'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/chooseprofit',
      name: 'chooseprofit',
      component: () => import('@/components/toquote/chooseprofit'),
      meta: {
        requiresAuth: true,
        layout: 'Default'
      }
    }
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
