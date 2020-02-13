<template lang="pug">
  .login
    .login__inner
      form.login__form(@submit.prevent = "login")
        h2.login__title Авторизация
        label.login__field(data-title='Логин' :class="{error: validation.hasError('user.name')}")
          .login__block
            input.login__input(type="text" v-model="user.name" @input="checkField('user.name')")
          .validate {{validation.firstError('user.name')}}
        label.login__field(data-title='Пароль' :class="{error: validation.hasError('user.password')}")
          .login__block
            input.login__input(type="password" v-model="user.password" @input="checkField('user.password')")
          .validate {{validation.firstError('user.password')}}
        .login__btn
          button.send-button(type="submit" :disabled="isSubmitBlocked") Отправить
    tooltip
</template>

<script>
import $axios from "../../requests";
import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "user.name"(value) {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password"(value) {
      return Validator.value(value).required("Введите пароль")
    }
  },
  components: { 
    tooltip: () => import("../tooltip")
  },
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      loading: false
    };
  },
  computed: {
    isSubmitBlocked() {
      return this.validation.hasError() || this.loading;
    }
  },
  methods: {
    ...mapActions("tooltip", ["showTooltip"]),
    async login() {
      try {
        let valid = await this.$validate();
        if (!valid) return;
        this.loading = true;
        const response = await $axios.post("/login", this.user);
        const token = response.data.token;

        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({ error: 'Неверное имя или пароль' });
      } finally {
        this.loading = false;
      }
    },
    async checkField(field) {
      await this.$validate(field);
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  padding: 50px;
  background-color: #fff;
  width: 80%;
  max-width: 400px;

  @include phones {
    width: 100%;
    max-width: none;
    height: 100%;
  }
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

    & .validate {
      display: block;
    }

    & .login__block::before {
    content: svg-load('avatar.svg', fill='$red', width=100%, height=100%);
    }
  }
  
}

.login__block {
  position: relative;
  font-size: 18px;

  &:before {
    content: svg-load('avatar.svg', fill='#a0a5b1', width=100%, height=100%);
    position: absolute;
    width: 25px;
    height: 25px;
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

  &:disabled {
    filter: grayscale(90%);
    opacity: 0.8;
    pointer-events: none;
  }
}

.validate {
  position: absolute;
  color: #fff;
  background-color: $red;
  left: 40px;
  font-size: 14px;
  padding: 8px 12px;
  bottom: 0;
  transform: translateY(100%);
  display: none;

  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: $red;
    top: -5px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
  }
}

</style>
