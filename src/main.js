
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import './assets/css/style.min.css';
import './assets/css/form.css';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.min.css';
import './assets/css/auth.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

var Paginate = require('vuejs-paginate')
Vue.component('paginate', Paginate)
import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import Multiselect from 'vue-multiselect'
import excel from 'vue-excel-export'
Vue.component('multiselect', Multiselect)
Vue.use(Autocomplete)
Vue.use(excel)
Vue.config.productionTip = false
Vue.prototype.$http = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
