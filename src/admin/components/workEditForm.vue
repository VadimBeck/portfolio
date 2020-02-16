<template lang="pug">
  .edit-block.works__edit
    h3.edit-block__subtitle Редактирование работы
    form.redact-form(@submit.prevent="editCurrentWork")
      .work-edit      
        .work-edit__image
          .image-load
            .image-load__photo(
              :class="{filled: renderedPhoto.length}"
              :style="{backgroundImage: `url(${renderedPhoto})`}"
            )
              img.image-load__pic(:src="photoURL")
            label.image-load__field
              input.image-load__file(
                type="file" 
                @change="loadFile"
              )
              .image-load__link Изменить превью
        .work-edit__form        
          label.redact-form__row                  
            .redact-form__block(data-title="Название"
            :class="{error: validation.hasError('work.title')}"
          )
              input.redact-form__entry.input(
                type="text" 
                v-model="work.title"
                @input="checkField('work.title')"
              )
              div.validate {{validation.firstError('work.title')}}
          label.redact-form__row
            .redact-form__block(data-title="Ссылка"
            :class="{error: validation.hasError('work.link')}"
          )
              input.redact-form__entry.input(
                type="text" 
                v-model="work.link"
                @input="checkField('work.link')"
              )
              div.validate {{validation.firstError('work.link')}}
          label.redact-form__row
            .redact-form__block.redact-form__block--no-border(
              data-title="Описание"
              :class="{error: validation.hasError('work.description')}"
            )
              textarea.redact-form__entry.textarea(
                type="text"
                name="textarea" 
                v-model="work.description"
                @input="checkField('work.description')"
              )
              div.validate {{validation.firstError('work.description')}}
          label.redact-form__row
            .redact-form__block(
              data-title="Добавление тэга"
              :class="{error: validation.hasError('work.techs')}"
            )
              input.redact-form__entry.input(
                type="text" 
                v-model="work.techs"
                @input="checkField('work.techs')"
              )
              div.validate {{validation.firstError('work.techs')}}
          .redact-form__tags
            ul.tags              
              li.tags__item(v-for="(tag,index) in tagsList")
                span.tags__item-text {{tag}}
                a.close-btn(@click.prevent="removeTag(index)")
          .redact-form__buttons
            button.cancel-btn(@click.prevent="cancellEditMode") Отмена
            button.action-btn(type="submit" :disabled="loading") Сохранить
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "work.title"(value) {
      return Validator.value(value).required("Заполните название");
    },
    "work.link"(value) {
      return Validator.value(value).required("Заполните ссылку");
    },
    "work.description"(value) {
      return Validator.value(value).required("Заполните описание");
    },
    "work.techs"(value) {
      return Validator.value(value).required("Заполните технологии");
    }
  },
  props: {
    currentWork: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      work: { ...this.currentWork },
      renderedPhoto: "",
      loading: false
    };
  },
  computed: {
    tagsList() {
      if (this.work.techs.length) {
        return this.work.techs.split(",");
      }
    },
    photoURL() {
      return `https://webdev-api.loftschool.com/${this.currentWork.photo}`;
    }
  },
  methods: {
    ...mapActions("works", ["editWork", "changeEditMode"]),    
    ...mapActions("tooltip", ["showTooltip"]),
    loadFile(event) {
      const file = event.target.files[0];
      this.work.photo = file;
      this.renderImage(file);
    },
    renderImage(file) {
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.renderedPhoto = reader.result; 
        }        
      } catch (error) {
        this.showTooltip({ error: "Ошибка чтения файла" });
      }      
    },
    async editCurrentWork() {
      try {
        let valid = await this.$validate();
        if (!valid) return;
        this.loading = true;
        await this.editWork(this.work);
        this.showTooltip({ success: "Изменения внесены" });
        this.changeEditMode(false);
      } catch (error) {
        this.showTooltip({ error: error.message });
      } finally {
        this.loading = false;
      }
    },
    cancellEditMode() {
      this.changeEditMode(false);
    },
    async checkField(field) {
      await this.$validate(field);
    },
    removeTag(index) {
      let tagArray = [...this.tagsList];
      tagArray.splice(index, 1);
      this.work.techs = tagArray.join(', ');
    }
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

.redact-form__entry {
  font-weight: 600;
  width: 100%;
  font-size: inherit;
  color: inherit;
  outline: none;
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

.redact-form__tags {
  margin-bottom: 35px;
  min-height: 40px;
}

.tags {
  display: flex;
  font-size: 14px;
}

.tags__item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-right: 15px;
  background: #f4f4f4;
  border-radius: 30px;
}

.tags__item-text {
  margin-right: 5px;
}

.close-btn {
  width: 20px;
  height: 20px;
  position: relative;
  cursor: pointer;
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    width: 14px;
    left: 50%;
    top: 50%;
    background-color: #414c63;
  }
  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.image-load {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
}

.image-load__photo {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 340px;
  max-height: 400px;

  @include desktop {
    min-height: 280px;
  }

  &.filled {
    .image-load__pic {
      display: none;
    }
  }
}

.image-load__pic {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-load__field {
  margin-top: 10px;
  padding: 20px 30px;
}

.image-load__file {
  display: none;
}

.image-load__link {
  cursor: pointer;
  display: block;
  text-align: center;
  color: $blue;
  font-weight: 700;
  font-size: 16px;
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

.work-edit {
  display: flex;
  padding: 0 10px;

  @include tablets {
    flex-direction: column;
    align-items: center;
  }
  @include phones {
    padding: 0 20px;
  }
}

.work-edit__image {
  width: 50%;
  padding-right: 30px;

  @include tablets {
    width: 100%;
    max-width: 500px;
    margin-bottom: 50px;
    padding-right: 0;
  }
}

.work-edit__form {
  width: 50%;
  @include tablets {
    width: 100%;
    max-width: 500px;
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

  &:disabled {
    filter: grayscale(90%);
    opacity: 0.8;
    pointer-events: none;
  }
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
