export default {
  mode: "universal",

  target: "server",

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: [],

  plugins: ["~/plugins/apiLogic.js"],

  components: true,

  buildModules: [],

  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  auth: {
    redirect: {
      login: "/login", // User will be redirected to this path if login is required.
      home: "/", // User will be redirect to this path after login. (rewriteRedirects will rewrite this path)
      logout: "/login", // User will be redirected to this path if after logout, current route is protected.
      user: "/user",
      callback: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/logout", method: "post" },
          user: { url: "/user", method: "get", propertyName: "user" }
        },
        tokenRequired: false,
        tokenType: false
      }
    }
  },
  axios: {
    baseURL: "http://localhost:5000/",
    credentials: true,
    init(axios) {
      axios.defaults.withCredentials = true;
    }
  },

  build: {}
};
