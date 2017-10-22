import Vue from 'vue';
import App from './App.vue';
import Firebase from 'firebase';
import VueRouter from 'vue-router';
import { store } from './store/store';
import { routes } from './router/routes';

// Firebase config - this is provided when you create your app
const config = {
  apiKey: "AIzaSyARIllJX5NwVZf9T5brOqhx3dDvLgGZfl8",
  authDomain: "playing-218ba.firebaseapp.com",
  databaseURL: "https://playing-218ba.firebaseio.com",
  projectId: "playing-218ba",
  storageBucket: "playing-218ba.appspot.com",
  messagingSenderId: "1092711989826"
};

// Initialize Firebase
Firebase.initializeApp(config);

// Set-up and use the Vue Router
// Pass in your routes and then
// Set the mode to use history
// removes # from the URL
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {

  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }

});

// Wrap the vue instance in a Firebase onAuthStateChanged method
// This stops the the execution of the navigation guard
// 'beforeEach' until the Firebase initialization ends
Firebase.auth().onAuthStateChanged(function (user) {

  new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App)
  });

});