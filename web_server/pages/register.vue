<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="register-heading">Register</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        v-model="username"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
      />
      <button class="register-button" @click="registerButtonClicked()">
        Register
      </button>
      <nuxt-link class="login-page-link" to="/login"
        >Go to login page</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    registerButtonClicked() {
      this.$store.dispatch("registerUserWithEmail", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style>
.register-heading {
  font-size: 3rem;
  font-weight: 300;
  margin-left: 2.5rem;
  margin-top: 1.5rem;
}
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.register-card {
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 25rem;
  box-shadow: 2px 2px 6px 1px rgb(0, 0, 0, 0.3);
}
.register-card input {
  height: 2rem;
  border: 1px solid rgb(199, 199, 199);
  box-shadow: 0px 0px 1px 1.5px rgb(0, 0, 0, 0.05);
  border-radius: 0.2rem;
  width: 20rem;
  margin-left: 2.5rem;
  margin-top: 2rem;
  padding-left: 0.3rem;
  outline: none;
  transition: all 0.25s ease-in-out;
}

.register-card input:focus {
  box-shadow: 0px 0px 6px 4px rgba(99, 58, 58, 0.15);
  border: 1px solid rgb(199, 199, 199);
}

.register-card input::placeholder {
  font-size: 1.2rem;
}

.register-button {
  cursor: pointer;
  outline: none;
  border: 1px solid rgb(199, 199, 199);
  color: white;
  background-color: rgb(74, 144, 255);
  font-size: 1rem;
  height: 2rem;
  width: 5rem;
  align-self: flex-end;
  margin-right: 2.5rem;
  margin-top: 2rem;
  border-radius: 0.2rem;
}

.login-page-link {
  margin-left: 2.5rem;
}
</style>
