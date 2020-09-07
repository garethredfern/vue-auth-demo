<template>
  <section>
    <h1 class="text-center mb-4 font-bold text-lg">Dashboard</h1>
    <article>
      <p class="bg-blue-100 p-5 border border-blue-200 rounded text-blue-500">
        This is the dashboard area which is secured via the router. A user must
        have an account and be logged in to view this page.
      </p>
      <p
        class="bg-red-100 p-5 border border-red-200 rounded text-red-500 mt-5"
        v-if="!user.emailVerified"
      >
        You need to verify your email address, please check {{ user.email }} for
        an email.
      </p>
    </article>
  </section>
</template>

<script>
// You would obiusly use this component to show secure dashboard information.
// As it stands it is just a simple Vue page with nothing intersting to show.

export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
};
</script>
