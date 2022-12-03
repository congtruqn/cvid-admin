
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './assets/css/style.min.css'
import './assets/css/form.css'
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/css/auth.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import VueConfirmDialog from 'vue-confirm-dialog'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import Multiselect from 'vue-multiselect'
import excel from 'vue-excel-export'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Make BootstrapVue available throughout your project

// Optionally install the BootstrapVue icon components plugin


var Paginate = require('vuejs-paginate')
Vue.component('paginate', Paginate)
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.component('multiselect', Multiselect)
Vue.use(Autocomplete)
Vue.use(excel)
Vue.config.productionTip = false
Vue.prototype.$http = Axios




// Install the store instance as a plugin

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
