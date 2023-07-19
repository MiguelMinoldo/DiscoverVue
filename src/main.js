import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Products from './components/Products.vue';
import RecommendedProducts from './components/RecommendedProducts.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { setup } from '@sitecore-discover/data'
import { init } from '@sitecore-discover/core'

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [{
    path: '*',
    components: {
      products: Products,
      recommendedProducts: RecommendedProducts
    }
  }]
});

new Vue({
  created() {
    this.initializeSitecoreDiscover();
  },
  methods: {
    initializeSitecoreDiscover() {
      const setupOptions = {
        env: process.env.VUE_APP_ENV,
        publicSuffix: false,
        apiKey: process.env.VUE_APP_API_KEY,
        customerKey: process.env.VUE_APP_CUSTOMER_KEY,
        useToken: true
      }
      setup(setupOptions);
      init();
    },
  },
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')
