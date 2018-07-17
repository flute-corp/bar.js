import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/bar.css'
import GSignInButton from 'vue-google-signin-button'
import FBSignInButton from 'vue-facebook-signin-button'

Vue.use(GSignInButton);
Vue.use(FBSignInButton);

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.fbAsyncInit = function () {
  FB.init({
    appId: '204351253600598',
    cookie: true,  // enable cookies to allow the server to access the session
    xfbml: true,  // parse social plugins on this page
    version: 'v3.0' // use graph api version 3.0
  });
  //check user session and refresh it
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      //user is authorized
    } else {
      //user is not authorized
    }
  });
};
(function (d, s, id) {
  let js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/fr_FR/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
