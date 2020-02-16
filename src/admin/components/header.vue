<template lang="pug">
  header.header
    .container.header__container
      .header__img
        .header__avatar        
          .avatar
            img(src='../../images/content/user.jpg' class='avatar__img')
      .header__text
        .header__user-name Вадим Бекитко
        .header__desc Панель админиcтрирования
        a.logout-btn(@click="logoutUser") Выйти
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["logout"]),
    logoutUser() {
      this.logout();
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.header {
  padding: 15px 0;
  background: linear-gradient(to right, #3e3e59, #454573);
  color: #fff;
}

.header__container {
  display: flex;
  align-items: center;

  @include phones {
    padding: 0 20px;
  }
}

.header__img {
  margin-right: 20px;
}

.header__text {
  display: flex;
  align-items: center;
  flex: 1;

  @include phones {
    flex-direction: column;
    align-items: flex-start;
  }
}

.header__avatar {
  width: 45px;
  height: 45px;
}

.header__user-name {
  font-weight: 600;
  font-size: 18px;
}

.header__desc {
  opacity: 0.5;
  font-size: 14px;
  margin-left: 28px;

  @include phones {
    display: none;
  }
}

.logout-btn {
  cursor: pointer;
  margin-left: auto;
  opacity: 0.7;
  color: currentColor;
  border-bottom: 1px solid currentColor;
  transition: 0.2s;
  line-height: 1.2;

  &:hover {
    border-color: transparent;
  }

  @include phones {
    margin-top: 5px;
    margin-left: 0;
  }
}

.avatar {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
