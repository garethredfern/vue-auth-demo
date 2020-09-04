import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
import VueRouter from "vue-router";
import { store } from "./store/store";
import { routes } from "./router/routes";
import "@/assets/css/main.css";

// Firebase config - this is provided when you create your app
// Swap out these settings for your project settings
var firebaseConfig = {
  apiKey: "AIzaSyCxfKEMCvc-rtExZTsJQKPr4mbXkmQYkJY",
  authDomain: "vue-auth-demo-637b2.firebaseapp.com",
  databaseURL: "https://vue-auth-demo-637b2.firebaseio.com",
  projectId: "vue-auth-demo-637b2",
  storageBucket: "vue-auth-demo-637b2.appspot.com",
  messagingSenderId: "624803255895",
  appId: "1:624803255895:web:c4f09775fe732e8f3b7512",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set-up and use the Vue Router
// Pass in your routes and then
// Set the mode to use history
// removes # from the URL
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: "history",
});

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/sign-in");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

// Wrap the vue instance in a Firebase onAuthStateChanged method
// This stops the execution of the navigation guard 'beforeEach'
// method until the Firebase initialization ends
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    el: "#app",
    store: store,
    router: router,
    render: h => h(App),
  });
});
