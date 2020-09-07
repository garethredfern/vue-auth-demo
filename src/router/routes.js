import firebase from "firebase";
import Home from "../components/Home.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import Error404 from "../components/Error404.vue";
import Dashboard from "../components/Dashboard.vue";

// This is where you add all your site routes
// Each route is set as an object in the array
// For a the most basic route just set
// the path & component to load

export const routes = [
  {
    path: "",
    name: "home",
    component: Home,
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: SignIn,
    beforeEnter(to, from, next) {
      const user = firebase.auth().currentUser;
      if (user) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/sign-up",
    name: "signUp",
    component: SignUp,
    beforeEnter(to, from, next) {
      const user = firebase.auth().currentUser;
      if (user) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: Error404,
  },
  {
    path: "*",
    redirect: "/404",
  },
];
