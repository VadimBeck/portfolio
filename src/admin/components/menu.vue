<template lang="pug">
  nav.menu
    .container
      ul.menu__list
        li.menu__item(v-for="tab in tabs")
          router-link(
            :to="tab.href"
            exact-active-class="active"
          ).menu__link {{tab.title}}
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "Обо мне", href: "/" },
        { title: "Работы", href: "/works" },
        { title: "Отзывы", href: "/reviews" }
      ]
    };
  }
};
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.menu__list {
  display: flex;
  @include phones {
    justify-content: center;
  }
}

.menu__item {
  transition: 0.2s;
  margin-right: 20px;
}

.menu__link {
  display: inline-block;
  padding: 25px 15px;
  color: currentColor;
  text-decoration: none;
  border-bottom: 3px solid transparent;

  &.active,
  &:hover {
    color: $blue;
    border-bottom: 3px solid $blue;
  }
}
</style>
