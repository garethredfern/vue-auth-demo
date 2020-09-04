<template>
  <section>
    <h1 class="text-center mb-4 font-bold text-lg">Sign-up</h1>
    <article class="md:w-1/3 p-5 border rounded bg-gray-100 mx-auto">
      <header>
        <h2 class="text-center">Create an Account</h2>
      </header>
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
          <label class="label">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            class="bg-white px-4 py-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          @click="signUp"
          class="bg-green-500 px-4 py-2 rounded text-white border border-green-600 transition duration-500 ease-in-out hover:bg-green-600"
        >
          Sign-up
        </button>
      </form>
    </article>
  </section>
</template>

<script>
import firebase from "firebase";

export default {
  data: function() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("dashboard");
        })
        .catch(error => {
          console.log(error.message);
        });
    },
  },
};
</script>
