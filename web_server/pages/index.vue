<template>
  <div class="container">
    <h1>Homepage</h1>
    <button class="logout-button" @click="logoutButtonClicked()">Logout</button>
  </div>
</template>

<script>
export default {
  fetch() {
    if (!this.$auth.loggedIn) {
      this.$nuxt.$router.replace({ path: "/login" });
    }
  },
  middleware: "homepageMiddleware",
  methods: {
    logoutButtonClicked() {
      this.$auth.logout();
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.logout-button {
  height: 2rem;
  width: 5rem;
}
</style>
