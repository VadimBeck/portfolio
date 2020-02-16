<template lang="pug"> 
  .category
    .category__header
      .category__group-name
        input(type="text" v-model="category.category" :disabled="!editMode").category__entry.input
      .category__header-btns(v-if="editMode")       
        button.edit-btn.edit-btn--accept(@click="editCurrentCategory")
        button.edit-btn.edit-btn--decline(@click="editMode = false")
      .category__header-btns(v-else)
        button.edit-btn.edit-btn--redact(@click="editMode = true")
    .category__content
      .category__list
        skill(
          v-for="skill in category.skills" 
          :key="skill.id"
          :skill="skill"
          )
    .category__block(:class="{blocked:loading}")
      form.category__form(@submit.prevent="addNewSkill")
        .category__skill-name(:class="{error: validation.hasError('skill.title')}")
          input(type="text" placeholder="Новый навык" v-model="skill.title" @input="checkField('skill.title')").category__entry.input
          div.validate {{validation.firstError('skill.title')}}
        .category__skill-percent(:class="{error: validation.hasError('skill.percent')}")
          input(type="text" placeholder="100" v-model="skill.percent" @input="checkField('skill.percent')").category__entry.input
          span.category__percent-text %
          div.validate {{validation.firstError('skill.percent')}}
        button.add-btn(
          type="submit"
          :disabled="loading"
          )
</template>

<script>
import { Validator } from "simple-vue-validator";
import { mapActions } from "vuex";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "skill.title"(value) {
      return Validator.value(value).required("Заполните название");
    },
    "skill.percent"(value) {
      return Validator.value(value)
        .required("Заполните значение")
        .integer("Введите число")
        .lessThan(100, "Максимальное значение 100");
    }
  },
  components: {
    skill: () => import("./skill")
  },
  props: {
    category: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      skill: {
        title: "",
        percent: null,
        category: this.category.id
      },
      editMode: false,
      loading: false
    };
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    ...mapActions("categories", ["editCategory"]),
    ...mapActions("tooltip", ["showTooltip"]),
    async addNewSkill() {
      try {
        let valid = await this.$validate();
        if (!valid) return;
        this.loading = true;
        await this.addSkill(this.skill);
        this.showTooltip({ success: "Навык добавлен" });
        this.skill.title = "";
        this.skill.percent = null;
      } catch (error) {
        this.showTooltip({ error: error.message });
      } finally {
        this.loading = false;
      }
    },
    async editCurrentCategory() {
      try {
        await this.editCategory(this.category);
        this.editMode = false;
        this.showTooltip({ success: "Изменения внесены" });
      } catch (error) {
        this.showTooltip({ error: error.message });
      }
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
  left: 0px;
  font-size: 14px;
  padding: 8px 12px;
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
  padding-bottom: 8px;
  border-bottom: 1px solid $dark-blue;
  flex: 1;
  max-width: 275px;
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
  margin-top: auto;

  &.blocked {
    filter: grayscale(80%);
    opacity: 0.8;
    pointer-events: none;
    user-select: none;
  }
}

.category__form {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.category__skill-name,
.category__skill-percent {
  position: relative;
  border-bottom: 1px solid $dark-blue;
  &.error {
    & .validate {
      display: block;
    }
  }
}

.category__skill-name {
  flex: 1;
  max-width: 220px;
  padding-bottom: 10px;
  padding-left: 20px;
  margin-right: 10px;
}

.category__skill-percent {
  display: flex;
  justify-content: space-between;
  text-align: center;
  max-width: 70px;
  padding: 0 10px 10px;
  margin-right: 20px;
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

  &:active {
    filter: grayscale(50%);
  }

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
