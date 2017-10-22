<template>
  <main id="app" class="section">
    <div class="container">
      <nav-main></nav-main>
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Firebase from "firebase";
import Header from "./components/Header.vue";

export default {
  components: {
    navMain: Header
  },
  methods: {
    setUser: function() {
      this.$store.dispatch("setUser");
    }
  },
  created() {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    this.setUser();
  }
};
</script>

<style lang="scss">
// Basic styles are pulled in from the Bulma framework https://bulma.io/
body {
  font-family: "Roboto", sans-serif;
}
</style>
