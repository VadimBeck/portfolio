<template lang="pug">
  .base__wrapper
    .base-container
      template
        header.header-container
          app-header
        .menu-container
          app-menu
        main.content-container
          router-view          
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    appHeader: () => import("./components/header"),
    appMenu: () => import("./components/menu")
  }
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";

html {
  @include tablets {
    font-size: 14px;
  }
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: "Open Sans", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.42;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

input {
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: inherit;
  height: 25px;
}

button {
  padding: 0;
}

h1,
h2,
h3,
h4 {
  margin: 0;
  font-size: inherit;
}

img {
  max-width: 100%;
  max-height: 100%;
}

.wrapper {
  background: url(../images/main-admin.jpg) center center / cover no-repeat;
  min-height: 100%;
}

.base-container {
  padding-bottom: 30px;
}

.container {
  margin: 0 auto;
  max-width: 1480px;
  width: 95%;

  @include desktop {
    max-width: 1090px;
  }

  @include phones {
    width: 100%;
  }
}
</style>
