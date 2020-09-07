<template>
  <section>
    <h1 class="text-center mb-4 font-bold text-lg">Sign-in</h1>
    <article class="md:w-1/3 p-5 border rounded bg-gray-100 mx-auto">
      <header>
        <h2 class="text-center">
          Sign in to Your Account
        </h2>
      </header>
      <transition name="fade">
        <p
          class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
          v-if="error"
        >
          {{ error }}
        </p>
      </transition>
      <form @submit.prevent>
        <div class="mb-4">
          <label for="email" class="font-bold text-gray-700">Email</label>
          <input
            type="email"
            placeholder="joe@bloggs.com"
            v-model="email"
            id="email"
            class="bg-white px-4 py-2 border rounded w-full"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="font-bold text-gray-700">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            class="bg-white px-4 py-2 border rounded w-full"
          />
        </div>
        <div class="mb-4">
          <button
            type="submit"
            @click="signIn"
            class="bg-green-500 px-4 py-2 rounded text-white border border-green-600 transition duration-500 ease-in-out hover:bg-green-600"
          >
            Sign-in
          </button>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("dashboard");
        })
        .catch(error => {
          this.error = error.message;
        });
    },
  },
};
</script>
