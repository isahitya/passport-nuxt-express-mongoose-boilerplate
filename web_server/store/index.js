export const actions = {
  async registerUserWithEmail(vuexContext, user) {
    try {
      const success = await this.$apiLogic.registerUser(user);
      if (!success) {
        throw "Some error occured, could not register user";
      }
      const login = await vuexContext.dispatch("login", user);
      $nuxt.$router.replace({ path: "/" });
    } catch (err) {
      console.log(err);
      $nuxt.$router.replace({ path: "/register" });
    }
  },
  async login(vuexContext, user) {
    try {
      await this.$auth.loginWith("local", {
        data: {
          username: user.username,
          password: user.password
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};
