<template lang="pug">
  .login
    .login__inner
      form.login__form(@submit.prevent = "login")
        h2.login__title Авторизация
        label.login__field(data-title='Логин')
          .login__block
            input.login__input(type="text" v-model="user.name")
          .block-validate.login__validate Введите имя пользователя
        label.login__field(data-title='Пароль')
          .login__block
            input.login__input(type="password" v-model="user.password")
          .block-validate.login__validate Введите пароль
        .login__btn
          button.send-button(type="submit") Отправить
    .login__warning
      .login__warning-text  Неверное имя или пароль
      .login__warning-close  
</template>

<script>
import $axios from "../../requests";

export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      }
    };
  },
  props: [],
  methods: {
    async login() {
      try {
        const response = await $axios.post("/login", this.user);
        const token = response.data.token;

        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        this.$router.replace("/");
      } catch (error) {}
    }
  }
};
</script>

<style lang="postcss" scoped>
.login {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(../../../images/main-admin.jpg) center center / cover no-repeat;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba($text-color, 0.5);
  }
}

.login__form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login__inner {
  position: relative;
  z-index: 2;
  padding: 50px;
  background-color: #fff;
  width: 80%;
  max-width: 400px;
}

.login__title {
  font-size: 21px;
  margin-bottom: 20px;
}

.login__field {
  position: relative;
  width: 100%;
  margin-bottom: 25px;
  padding-left: 40px;
  border-bottom: 1px solid rgba($text-color, 0.7);

  &:hover {
    border-color: $blue-violet;
  }

  &:before {
    content: attr(data-title);
    margin-bottom: 15px;
    display: block;
    font-weight: 600;
    color: rgba($text-color, 0.3);
  }

  &.error {
    border-color: $red;
    & .login__validate {
      display: block;
    }
  }
}

.login__validate {
  display: none;
}

.login__block {
  position: relative;
  font-size: 18px;

  &:before {
    content: svg-load('avatar.svg', fill='#a0a5b1', width=100%, height=100%);
    position: absolute;
    width: 25px;
    height: 25px;
    fill: red;
    left: -40px;
    top: -5px;
  }
}

.login__input {
  border: none;
  outline: none;
  color: inherit;
  font-size: inherit;
  font-weight: 600;
  width: 100%;
}

.login__btn {
  width: 100%;
  max-width: 200px;
  padding-top: 20px;
}

.send-button {
  cursor: pointer;
  outline: none;
  border: none;
  background: linear-gradient(to right, $violet, $blue-violet);
  width: 100%;
  padding: 20px;
  border-radius: 35px 0 35px 0;
  color: #fff;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;

  &:active {
    filter: grayscale(50%);
  }
}

.login__warning {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  padding: 15px 20px;
  font-size: 15px;
  opacity: 0.9;
  color: #fff;
  background-color: $red;
  transform: translateY(100%);
  transition: transform 0.5s;

  &.active {
    transform: translateY(0%);
  }
}

.login__warning-close {
  width: 15px;
  height: 15px;
  margin-left: 20px;
  //background: svg-load('cross.svg', fill='#fff', width=100%, height=100%);
}
</style>
