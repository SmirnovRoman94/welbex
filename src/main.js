import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import store from './store'

//firebase
import { initializeApp } from "firebase/app";
//icons
import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'
Vue.use(mdiVue, {
  icons: mdijs
}) 


const firebaseConfig = {
  apiKey: "AIzaSyAe8P5EFqS0CKGjup_aNxEk8P6fln8cefk",
  authDomain: "welbex-76ef1.firebaseapp.com",
  projectId: "welbex-76ef1",
  storageBucket: "welbex-76ef1.appspot.com",
  messagingSenderId: "872679211877",
  appId: "1:872679211877:web:e3487b8cbc273cc17a978c"
};

let firebaseApp = initializeApp(firebaseConfig);



Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  created (){
    firebaseApp
  }
}).$mount('#app')
