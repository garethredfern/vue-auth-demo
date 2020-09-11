<template>
  <section>
    <h1 class="text-center mb-4 font-bold text-lg">Dashboard</h1>
    <article>
      <p class="bg-blue-100 p-5 border border-blue-200 rounded text-blue-500">
        This is the dashboard area which is secured via the router. A user must
        have an account and be logged in to view this page.
      </p>
      <div
        class="bg-red-100 p-5 border border-red-200 rounded text-red-500 mt-5"
        v-if="!user.emailVerified"
      >
        <p>
          You need to verify your email address, please check
          {{ user.email }} for an email. To resend the email click the button
          below.
        </p>
        <p class="mt-4">
          <button
            type="button"
            @click="sendVerifyEmail"
            class="px-2 py-1 border rounded bg-red-100 border-red-500 hover:bg-red-200 transform transition duration-300 ease-in-out"
          >
            <transition name="fade" mode="out-in">
              <span v-if="!emailSending">Resend</span>
              <span v-else>Sending...</span>
            </transition>
          </button>
        </p>
      </div>
    </article>
  </section>
</template>

<script>
import firebase from "firebase";
// You would obiusly use this component to show secure dashboard information.
// As it stands it is just a simple Vue page with nothing intersting to show.

export default {
  data() {
    return {
      error: null,
      emailSending: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    sendVerifyEmail() {
      this.emailSending = true;
      const user = firebase.auth().currentUser;
      const actionCodeSettings = {
        url: `${process.env.VUE_APP_HOST_NAME}/sign-in/?email=${user.email}`,
      };
      user
        .sendEmailVerification(actionCodeSettings)
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
