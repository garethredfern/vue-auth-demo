<template>
  <header class="px-5 py-2 bg-gray-200 border-b">
    <div class="container mx-auto">
      <nav class="flex">
        <router-link to="/" class="mr-4">
          <i class="material-icons">
            home
          </i>
        </router-link>
        <router-link to="dashboard" class="mr-4" v-if="user"
          >Dashboard</router-link
        >
        <router-link to="sign-in" class="mr-4" v-if="!user"
          >Sign-in</router-link
        >
        <router-link to="sign-up" class="mr-4" v-if="!user"
          >Sign-up</router-link
        >
        <button @click="signOut" class="mr-4" v-if="user">Sign-out</button>
      </nav>
    </div>
  </header>
</template>

<script>
import Firebase from "firebase";

export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    signOut: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace("sign-in");
        });
    },
  },
};
</script>
