<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-heading">Login</h1>
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
      <button class="login-button" @click="loginButtonClicked()">Login</button>
      <p style="align-self:center">or</p>
      <a class="google-login-button" :href="googleAuthURL">
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
        <h1>Continue with Google</h1>
      </a>
      <nuxt-link class="register-page-link" to="/register"
        >Go to register</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    googleAuthURL() {
      return this.$nuxt.$apiLogic.apiURL + "/auth/google";
    }
  },
  data() {
    return {
      showLoginForm: false,
      username: "",
      password: ""
    };
  },
  methods: {
    loginButtonClicked() {
      this.$auth
        .loginWith("local", {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(() => {
          console.log("Login successful`");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.login-heading {
  font-size: 3rem;
  font-weight: 300;
  margin-left: 2.5rem;
  margin-top: 1.5rem;
}
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-card {
  display: flex;
  flex-direction: column;
  height: 25rem;
  width: 25rem;
  box-shadow: 2px 2px 6px 1px rgb(0, 0, 0, 0.3);
}
.login-card input {
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

.login-card input:focus {
  box-shadow: 0px 0px 6px 4px rgba(99, 58, 58, 0.15);
  border: 1px solid rgb(199, 199, 199);
}

.login-card input::placeholder {
  font-size: 1.2rem;
}

.login-button {
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

.google-login-button {
  text-decoration: none !important;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.75rem;
  margin-top: 0.75rem;
  background: rgb(245, 245, 245);
  border: 0rem;
  width: 80%;
  height: 2.5rem;
  border-radius: 0.1rem;
  box-shadow: 1px 2px 3px 1px rgb(0, 0, 0, 0.2);
  align-self: center;
}

.google-login-button img {
  height: 1.5rem;
  margin-left: 2rem;
  margin-right: 1rem;
}

.google-login-button h1 {
  text-decoration: none !important;
  font-weight: 300;
  color: rgb(26, 26, 26);
  font-size: 1.1rem;
}

.register-page-link {
  align-self: center;
}
</style>
