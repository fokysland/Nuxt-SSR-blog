module.exports = {
  mode: "universal",
  head: {
    title: process.env.appName || "",
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
  loading: { color: "#409EFF" },
  css: ["element-ui/lib/theme-chalk/index.css", "@/theme/index.sass"],
  plugins: ["@/plugins/globals", "@/plugins/axios"],
  devModules: [],
  modules: ["@nuxtjs/axios"],
  axios: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },
  env: {
    appName: "SSR Blog"
  },
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {}
  }
};
