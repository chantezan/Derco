import Vue from 'vue';
import App from './App.vue'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { 
    App
  }
})