<template>
  <header>
    <nav>
      <router-link to="/" class="button">Home</router-link>
      <router-link to="dashboard" class="button" v-if="user">Dashboard</router-link>
      <router-link to="sign-in" class="button" v-if="!user">Sign-in</router-link>
      <router-link to="sign-up" class="button" v-if="!user">Sign-up</router-link>
      <a class="button" v-on:click="signOut" v-if="user">Sign-out</a>
    </nav>
  </header>
</template>

<script>
import Firebase from "firebase";

export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    signOut: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>

<style lang="scss">
// Basic styles are pulled in from the Bulma framework https://bulma.io/
// These style tags could be omitted as they arre not used.
</style>