<template lang="pug">
  .category
    .category__header
      .category__group-name(:class="{error: validation.hasError('title')}")
        input.category__entry.input(placeholder="Название новой группы" v-model="title" @input="checkField('title')")
        div.validate {{validation.firstError('title')}}
      .category__header-btns
        button.edit-btn.edit-btn--accept(@click="addNewCategory")
        button.edit-btn.edit-btn--decline(@click="cancelAddCategory")
    .category__content
      ul.category__list
        li.category__item
    .category__block.blocked
      .category__skill-name
        input(type="text" placeholder="Новый навык" disabled).category__entry.input
      .category__skill-percent
        input(type="text" placeholder="100" disabled).category__entry.input
        span.category__percent-text %
      button.add-btn
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    title(value) {
      return Validator.value(value).required("Заполните название");
    }
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions("categories", ["addCategory"]),
    ...mapActions("tooltip", ["showTooltip"]),
    async addNewCategory() {
      try {
        let valid = await this.$validate();
        if (!valid) return;
        await this.addCategory(this.title);
        this.title = "";
        this.showTooltip({ success: "Группа создана" });
        this.cancelAddCategory();
      } catch (error) {
        this.showTooltip({ error: error.message });
      }
    },
    cancelAddCategory() {
      this.$emit("cancelAddCategory");
    },
    async checkField(field) {
      await this.$validate(field);
    }
  }
};
</script>

<style lang="postcss" scoped>
.validate {
  position: absolute;
  color: #fff;
  background-color: $red;
  font-size: 14px;
  padding: 8px 12px;
  left: 20px;
  bottom: 0;
  transform: translateY(100%);
  line-height: 1.2;
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

.category {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.category__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 15px;
  border-bottom: 1px solid $grey;
  font-size: 18px;
  margin-bottom: 25px;
}

.category__group-name {
  position: relative;
  padding-bottom: 8px;
  border-bottom: 1px solid $dark-blue;
  flex: 1;
  max-width: 275px;

  &:hover {
    border-color: $blue-violet;
  }

  &.error {
    border-color: $red;
    & .validate {
      display: block;
    }
  }
}

.input {
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: inherit;
  text-overflow: ellipsis;
}

.category__header-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 55px;
  padding-left: 10px;
}

.edit-btn {
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  &--accept {
    background: svg-load(
        "tick.svg",
        fill= "$light-green",
        width=100%,
        height=100%
      )
      center center / 16px 16px no-repeat;
  }
  &--decline {
    background: svg-load("cross.svg", fill= "$red", width=100%, height=100%)
      center center / 14px 14px no-repeat;
  }
  &--redact {
    margin-left: auto;
    background: svg-load(
      "pencil.svg",
      fill= "#a0a5b1",
      width=100%,
      height=100%
    );
  }
  &--remove {
    margin-left: auto;
    background: svg-load("trash.svg", fill= "#a0a5b1", width=100%, height=100%);
  }
}

.category__list {
  margin-bottom: 60px;
}

.category__block {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;

  &.blocked {
    filter: grayscale(80%);
    opacity: 0.8;
    pointer-events: none;
    user-select: none;
  }
}

.category__skill-name {
  flex: 1;
  max-width: 220px;
  padding-bottom: 10px;
  padding-left: 20px;
  margin-right: 10px;
  border-bottom: 1px solid $dark-blue;
}

.category__skill-percent {
  display: flex;
  justify-content: space-between;
  text-align: center;
  max-width: 70px;
  padding: 0 10px 10px;
  margin-right: 20px;
  border-bottom: 1px solid $dark-blue;
}

.add-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  flex-shrink: 0;
  background: linear-gradient(to right, $light-blue, $blue);
  position: relative;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3px;
    height: 15px;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  &--small {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    &::before,
    &::after {
      width: 2px;
      height: 8px;
    }
  }
}
</style>
