<template lang="pug">
  section.section.about
    .container      
      .section-title
        h2.about__title Блок «Обо мне»
        .about__title-link
          a.add-btn__link(@click="enableCategoryForm")
            .add-btn.add-btn--small
            span.add-btn__text Добавить группу
      .about__content
        ul.about__list
          li.about__item(v-if="addCategoryMode")
            category-form(
              :addCategoryMode="addCategoryMode"
              @cancelAddCategory="cancelAddCategory"   
            )     
          li.about__item(v-for="category in categories" :key="category.id")
            category-item(
              :category="category"
            )
    tooltip
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {
    categoryForm: () => import("../categoryForm"),
    categoryItem: () => import("../categoryItem"),
    tooltip: () => import("../tooltip")
  },
  props: [],
  data() {
    return {
      addCategoryMode: false
    };
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.categories
    })
  },
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    enableCategoryForm() {
      this.addCategoryMode = true;
    },
    cancelAddCategory() {
      this.addCategoryMode = false;
    },    
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";

.about__title-link {
  margin-left: 50px;

  @include phones {
    margin-left: 0;
    margin-top: 20px;
  }
}

.add-btn__link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: $blue;
  font-weight: 600;
  text-decoration: none;
}
.add-btn__text {
  font-size: 16px;
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

.about__list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -30px;
}

.about__item {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  background-color: #fff;
  margin-left: 30px;
  margin-bottom: 30px;
  width: calc(100% / 2-30px);
  box-shadow: 4px 2px 20px 0px rgba(#000, 0.1);

  @include phones {
    width: calc(100%-30px);
  }
}
</style>
