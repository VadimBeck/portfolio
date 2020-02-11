import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import $axios from "./requests";
import SimpleVueValidator from "simple-vue-validator";
import "@babel/polyfill";

SimpleVueValidator.setMode("manual");
Vue.use(SimpleVueValidator);

$axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.data.error == "token_expired") {
      $axios.post("/refreshToken").then(response => {
        const token = response.data.token;
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
      });
      return Promise.reject(error);
    }
  }
);

store.$axios = $axios;

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});
