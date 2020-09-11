<template>
  <section>
    <h1 class="text-center mb-4 font-bold text-lg">Forgot Password</h1>
    <article class="md:w-1/3 p-5 border rounded bg-gray-100 mx-auto">
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
          <button
            type="submit"
            @click="sendEmail"
            class="bg-green-500 px-4 py-2 rounded text-white border border-green-600 transition duration-500 ease-in-out hover:bg-green-600"
          >
            <transition name="fade" mode="out-in">
              <span v-if="!emailSending">Send</span>
              <span v-else>Sending...</span>
            </transition>
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
      error: null,
      emailSending: false,
    };
  },
  methods: {
    sendEmail() {
      if (!this.email) {
        this.error = "Please type in a valid email address.";
        return;
      }
      this.error = null;
      this.emailSending = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.emailSending = false;
        })
        .catch(error => {
          this.emailSending = false;
          this.error = error.message;
        });
    },
  },
};
</script>
