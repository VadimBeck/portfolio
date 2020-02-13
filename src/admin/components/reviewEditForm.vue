<template lang="pug">
  .edit-block.reviews__edit
    h3.edit-block__subtitle Редактировать отзыв
    form.redact-form(@submit.prevent="editCurrentReview")
      .review-edit
        .review-edit__image
          .avatar-load
            .avatar-load__image
            label.avatar-load__field
              .avatar-load__desc Добавить фото
              input.avatar-load__file(type="file")
        .review-edit__form            
          label.redact-form__row
            .redact-form__block(
              data-title="Имя автора"
              :class="{error: validation.hasError('review.author')}"
            )
              input.redact-form__entry.input(
                type="text" 
                v-model="review.author"
                @input="checkField('review.author')"
              )
              div.validate {{validation.firstError('review.author')}}
            .redact-form__block(
              data-title="Титул автора"
              :class="{error: validation.hasError('review.occ')}"
            )
              input.redact-form__entry.input(
                type="text" 
                v-model="review.occ"
                @input="checkField('review.occ')"
              )
              div.validate {{validation.firstError('review.occ')}}
          label.redact-form__row
            .redact-form__block.redact-form__block--no-border(
              data-title="Отзыв"
              :class="{error: validation.hasError('review.text')}"
            )
              textarea.redact-form__entry.textarea(
                name="textarea" 
                type="text" v-model="review.text"
                @input="checkField('review.text')"
              )
              div.validate {{validation.firstError('review.text')}}
          .redact-form__buttons
            button.cancel-btn(@click.prevent="cancellEditMode") Отмена
            button.action-btn(type="submit") Сохранить
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "review.author"(value) {
      return Validator.value(value).required("Заполните имя");
    },
    "review.occ"(value) {
      return Validator.value(value).required("Заполните титул");
    },
    "review.text"(value) {
      return Validator.value(value).required("Заполните отзыв");
    }
  },
  props: {
    currentReview: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      formData: null,
      review: { ...this.currentReview },
      changePhoto: false
    };
  },
  methods: {
    ...mapActions("reviews", ["editReview", "changeEditMode"]),
    ...mapActions("tooltip", ["showTooltip"]),
    loadFile(event) {
      this.changePhoto = true;
      this.formData.append("photo", event.target.files[0]);
    },
    async editCurrentReview() {
      try {
        let valid = await this.$validate();
        if (!valid) return;
        if (this.changePhoto) {
          this.createReview();
          await this.editReview({ data: this.formData, id: this.review.id });
        } else {
          await this.editReview({ data: this.review, id: this.review.id });
        }
        this.showTooltip({ success: "Изменения внесены" });
        this.changeEditMode(false);
      } catch (error) {
        this.showTooltip({ error: error.message });
      }
    },
    createReview() {
      this.formData.append("author", this.newReview.author);
      this.formData.append("occ", this.newReview.occ);
      this.formData.append("text", this.newReview.text);
    },
    cancellEditMode() {
      this.changeEditMode(false);
    },
    async checkField(field) {
      await this.$validate(field);
    }
  },
  created() {
    this.formData = new FormData();
  }
};
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

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

.redact-form {
  position: relative;

  @include tablets {
    padding-bottom: 60px;
  }
}

.redact-form__row {
  display: flex;
  margin-left: -30px;

  @include phones {
    flex-direction: column;
  }
}

.redact-form__block {
  position: relative;
  margin-left: 30px;
  margin-bottom: 20px;
  flex: 1;
  padding-bottom: 10px;
  color: #414c63;
  border-bottom: 1px solid #414c63;

  &:before {
    content: attr(data-title);
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    opacity: 0.5;
  }

  &--no-border {
    border: none;
    padding-bottom: 0;
  }

  &.error {
    border-color: $red;

    & .textarea {
      border-color: $red;
    }

    & .validate {
      display: block;
    }
  }
}

.redact-form__entry {
  font-weight: 600;
  width: 100%;
  font-size: inherit;
  color: inherit;
  outline: none;
}

.redact-form__buttons {
  display: flex;
  justify-content: flex-end;

  @include tablets {
    position: absolute;
    padding-right: 20px;
    right: 0;
    bottom: 0;
  }
}

.textarea {
  font-family: inherit;
  padding: 15px;
  line-height: 1.6;
  resize: none;
  min-height: 150px;
  font-size: 16px;
  background: none;
  border: 1px solid #d9dbe0;

  @include phones {
    min-height: 200px;
  }
}

.edit-block {
  background: #fff;
  padding: 30px 20px;
  margin-bottom: 30px;
  box-shadow: 4px 2px 20px 0px rgba(#000, 0.1);

  @include phones {
    padding: 20px 0;
  }
}

.edit-block__subtitle {
  padding: 0 20px 25px;
  border-bottom: 1px solid $grey;
  margin-bottom: 45px;
  font-size: 18px;
}

.review-edit {
  display: flex;
  padding: 0 10px;
  margin-bottom: 30px;

  @include phones {
    flex-direction: column;
    align-items: center;
  }
  @include phones {
    padding: 0 20px;
  }
}

.review-edit__image {
  margin-right: 30px;

  @include phones {
    margin-right: 0;
    margin-bottom: 35px;
  }
}

.avatar-load {
  position: relative;
  border: 1px solid transparent;

  &.error {
    border: 1px solid $red;
    & .block-validate {
      display: block;
    }
  }
}

.avatar-load__file {
  display: none;
}

.avatar-load__image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #dee4ed;
  margin-bottom: 20px;
  background: svg-load("user.svg", fill= "#fff") center center / 50% 50%
      no-repeat,
    #dee4ed;
}

.avatar-load__link {
  display: block;
  text-decoration: none;
}

.avatar-load__desc {
  text-align: center;
  font-weight: 600;
  color: #383bcf;
  cursor: pointer;
  padding: 10px;
}

.review-edit__form {
  flex: 1;
  max-width: 630px;

  @include phones {
    width: 100%;
    max-width: none;
  }
}

.action-btn {
  cursor: pointer;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  background: linear-gradient(to right, $light-blue, $blue);
  padding: 15px 30px;
  border-radius: 30px;
}

.cancel-btn {
  cursor: pointer;
  border: none;
  outline: none;
  color: $blue;
  font-weight: 700;
  font-size: 16px;
  background: transparent;
  padding: 15px;
  margin-right: 30px;
}
</style>
