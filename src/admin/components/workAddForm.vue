<template lang="pug">
  .edit-block.works__edit
    h3.edit-block__subtitle Добавление работы
    form.redact-form(@submit.prevent="addNewWork")
      .work-edit      
        .work-edit__image
          .image-load(
            :class="[{error: validation.hasError('renderedPhoto')}, {filled: renderedPhoto.length}, {loaded:drag}]"
            :style="{backgroundImage: `url(${renderedPhoto})`}"
          )
            label.image-load__field(:class="{loaded:drag}")
              input.image-load__file(
                  type="file" 
                  @change="loadFile"
                  @drop="loadFile"
                  @dragover="drag=true"
                  @dragleave="drag=false"
                )
              .image-load__text Перетащите или загрузите для загрузки изображения
              .action-btn Загрузить              
            div.validate {{validation.firstError('renderedPhoto')}}
        .work-edit__form        
          label.redact-form__row                  
            .redact-form__block(
              data-title="Название" 
              :class="{error: validation.hasError('newWork.title')}"
            )
              input.redact-form__entry.input(
                type="text" v-model="newWork.title"
                @input="checkField('newWork.title')"
              )
              div.validate {{validation.firstError('newWork.title')}}
          label.redact-form__row
            .redact-form__block(
              data-title="Ссылка" 
              :class="{error: validation.hasError('newWork.link')}"
              )
              input.redact-form__entry.input(
                type="text" 
                v-model="newWork.link" 
                @input="checkField('newWork.link')"
              )
              div.validate {{validation.firstError('newWork.link')}}
          label.redact-form__row
            .redact-form__block.redact-form__block--no-border(
              data-title="Описание" 
              :class="{error: validation.hasError('newWork.description')}"
            )
              textarea.redact-form__entry.textarea(
                type="text" 
                name="textarea" 
                v-model="newWork.description" 
                @input="checkField('newWork.description')"
              )
              div.validate {{validation.firstError('newWork.description')}}
          label.redact-form__row
            .redact-form__block(
              data-title="Добавление тэга" 
              :class="{error: validation.hasError('newWork.techs')}"
            )
              input.redact-form__entry.input(
                type="text" 
                v-model="newWork.techs" 
                @input="checkField('newWork.techs')"
              )
              div.validate {{validation.firstError('newWork.techs')}}
          .redact-form__tags
            ul.tags              
              li.tags__item(v-for="(tag,index) in tagsList")
                span.tags__item-text {{tag}}
                a.close-btn(@click.prevent="removeTag(index)")
          .redact-form__buttons
            button.cancel-btn(@click.prevent="cancellAddMode") Отмена
            button.action-btn(type="submit" :disabled="loading") Сохранить
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    renderedPhoto(value) {
      return Validator.value(value).required("Ошибка");
    },
    "newWork.title"(value) {
      return Validator.value(value).required("Заполните название");
    },
    "newWork.link"(value) {
      return Validator.value(value).required("Заполните ссылку");
    },
    "newWork.description"(value) {
      return Validator.value(value).required("Заполните описание");
    },
    "newWork.techs"(value) {
      return Validator.value(value).required("Заполните технологии");
    }
  },
  data() {
    return {
      newWork: {
        photo: {},
        title: "",
        techs: "",
        link: "",
        description: ""
      },
      renderedPhoto: "",
      loading: false,
      drag: false
    };
  },
  computed: {
    tagsList() {
      if (this.newWork.techs.length) {
        return this.newWork.techs.split(", ");
      }
    }
  },
  methods: {
    ...mapActions("works", ["addWork", "changeAddMode"]),
    ...mapActions("tooltip", ["showTooltip"]),
    loadFile(event) {
      this.drag = false;
      if (event.target.files[0]) {
        const file = event.target.files[0];
        this.newWork.photo = file;
        this.renderImage(file);
      }
    },
    renderImage(file) {
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.renderedPhoto = reader.result;
          this.checkField("renderedPhoto");
        };
      } catch (error) {
        this.showTooltip({ error: "Ошибка чтения файла" });
      }
    },
    async addNewWork() {
      try {
        let valid = await this.$validate();
        if (!valid) return;
        this.loading = true;
        await this.addWork(this.newWork);
        this.showTooltip({ success: "Работа добавлена" });
        this.clearWork();
      } catch (error) {
        this.showTooltip({ error: error.message });
      } finally {
        this.loading = false;
      }
    },
    clearWork() {
      this.renderedPhoto = "";
      Object.keys(this.newWork).forEach(key => {
        if (this.newWork[key] === "photo") this.newWork[key] = {};
        this.newWork[key] = "";
      });
    },
    cancellAddMode() {
      this.changeAddMode(false);
    },
    async checkField(field) {
      await this.$validate(field);
    },
    removeTag(index) {
      let tagArray = [...this.tagsList];
      tagArray.splice(index, 1);
      this.newWork.techs = tagArray.join(", ");
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

.edit-block {
  background: #fff;
  padding: 30px 20px;
  margin-bottom: 30px;
  box-shadow: 4px 2px 20px 0px rgba(#000, 0.1);

  @include phones {
    padding: 20px 0;
  }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;

  &.error {
    border: 1px dashed $red;
    & .validate {
      display: block;
      left: 50%;
      transform: translate(-50%, 100%);
    }
    & .image-load__field {
      background: $grey;
      border-color: transparent;
    }
  }
  &.filled {
    .image-load__text,
    .action-btn {
      display: none;
    }
    .image-load__field {
      background: none;
    }
  }

  &.filled.loaded {
    opacity: 0.7;
  }
}

.image-load__field {
  background: linear-gradient(to right, #949494 50%, transparent 0%) top / 20px
      1px repeat-x,
    linear-gradient(#949494 50%, transparent 0%) right / 1px 20px repeat-y,
    linear-gradient(to left, #949494 50%, transparent 0%) bottom / 20px 1px
      repeat-x,
    linear-gradient(to top, #949494 50%, transparent 0%) left / 1px 20px
      repeat-y,
    $grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transoarent;
  cursor: pointer;
  width: 100%;
  min-height: 280px;

  &.loaded {
    opacity: 0.8;
    border: 1px dashed $blue;
    background: $grey;
  }
}

.image-load__file {
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
}

.image-load__text {
  position: relative;
  max-width: 230px;
  opacity: 0.5;
  line-height: 1.7;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
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

.work-edit__form {
  width: 50%;
  @include tablets {
    width: 100%;
    max-width: 500px;
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
