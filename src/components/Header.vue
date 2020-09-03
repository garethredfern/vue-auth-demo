<template>
  <header class="px-5 py-2 bg-gray-200 border-b">
    <div class="container mx-auto flex justify-between items-center">
      <nav class="flex items-center">
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
      <h2 v-if="user">{{ user.email }}</h2>
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
    signOut() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace("sign-in");
        });
    },
  },
};
</script>
