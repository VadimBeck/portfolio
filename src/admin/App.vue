<template lang="pug">
  .content
    .content__inner(:class='{blocked: !isAutorized}')
      header.header
        .container.header__container
          .header__img
            .header__avatar        
              .avatar
                img(src='../images/content/user.jpg' class='avatar__img')
          .header__text
            .header__user-name Вадим Бекитко
            .header__desc Панель админиcтрирования
            a(href='#').login Выйти
      nav.nav
        .container
          ul.nav__list
            -var pages = ["Обо мне", "Работы", "Отзывы"];
            each page,index in pages
              if index == 0
                li.nav__item.is-active
                  a(href='#').nav__link #{page}
              else 
                li.nav__item
                  a(href='#').nav__link #{page}
      section.section.about
        .container      
          .section-title
            h2.about__title Блок &laquo;Обо мне&raquo;
            .about__title-link
              a.add-btn__link(href="#")
                .add-btn.add-btn--small
                span.add-btn__text Добавить группу
          .about__content
            ul.about__list
              li.about__item.knowledge
                .knowledge__header
                  .knowledge__group-name
                    input(type="text" placeholder="Название новой группы").knowledge__entry.input
                  .knowledge__header-btns
                    button.edit-btn.edit-btn--accept
                    button.edit-btn.edit-btn--decline
                .knowledge__content
                  ul.knowledge__list
                .knowledge__block
                  .knowledge__skill-name
                    input(type="text" placeholder="Новый навык" disabled).knowledge__entry.input
                  .knowledge__skill-percent
                    input(type="text" placeholder="100" disabled).knowledge__entry.input
                    span.knowledge__percent-text %
                  button.add-btn
              li.about__item.knowledge
                .knowledge__header
                  .knowledge__group-name
                    input(type="text" placeholder="Workflow" disabled).knowledge__entry.input
                  .knowledge__header-btns
                    button.edit-btn
                    button.edit-btn.edit-btn--redact
                .knowledge__content
                  ul.knowledge__list
                    -
                      var workflow = [
                        {name:'Git', val:100},
                        {name:'Terminal', val:90},
                        {name:'Gulp', val:80},
                        {name:'Webpack', val:85}]
                    each item in workflow
                      li.knowledge__item.skill
                        .skill__name
                          input(placeholder=`${item.name}` disabled).skill__name-input.input
                        .skill__value
                          input(placeholder=`${item.val}` disabled).skill__value-input.input
                          span.skill__value-percent %
                        .skill__buttons
                          button.edit-btn.edit-btn--redact
                          button.edit-btn.edit-btn--remove
                .knowledge__block
                  .knowledge__skill-name
                    input(type="text" placeholder="Новый навык" disabled).knowledge__entry.input
                  .knowledge__skill-percent
                    input(type="text" placeholder="100" disabled).knowledge__entry.input
                    span.knowledge__percent-text %
                  button.add-btn
              li.about__item.knowledge
                .knowledge__header
                  .knowledge__group-name
                    input(type="text" placeholder="Frontend" disabled).knowledge__entry.input
                  .knowledge__header-btns
                    button.edit-btn
                    button.edit-btn.edit-btn--redact
                .knowledge__content
                  ul.knowledge__list
                    -
                      var frontend = [
                        {name:'Html5', val:100},
                        {name:'CSS3', val:90},
                        {name:'JavaScript', val:80},
                        {name:'Jquery и Vue.js', val:85}]
                    each item in frontend
                      li.knowledge__item.skill
                        .skill__name
                          input(placeholder=`${item.name}` disabled).skill__name-input.input
                        .skill__value
                          input(placeholder=`${item.val}` disabled).skill__value-input.input
                          span.skill__value-percent %
                        .skill__buttons
                          button.edit-btn.edit-btn--redact
                          button.edit-btn.edit-btn--remove
                .knowledge__block
                  .knowledge__skill-name
                    input(type="text" placeholder="Новый навык" disabled).knowledge__entry.input
                  .knowledge__skill-percent
                    input(type="text" placeholder="100" disabled).knowledge__entry.input
                    span.knowledge__percent-text %
                  button.add-btn
      section.section.works
        .container
          h2.section-title.works__title Блок &laquo;Работы&raquo;
          .edit-block.works__edit
            h3.edit-block__subtitle Редактирование работы
            .work-edit
              .work-edit__image
                .image-load(:class='{error: workError}')
                  .image-load__text Перетащите или загрузите для загрузки изображения
                  button.action-btn Загрузить
                  .block-validate.block-validate--center.work__validate Ошибка           
              .work-edit__form
                form.redact-form
                  label.redact-form__row                  
                    .redact-form__block(:class='{error: workError}')
                      span.redact-form__desc Название
                      input.redact-form__entry.input(type="text" placeholder="Дизайн сайта для авто салона Porsche")
                      .block-validate.work__validate Заполните название
                  label.redact-form__row
                    .redact-form__block(:class='{error: workError}')
                      span.redact-form__desc Ссылка
                      input.redact-form__entry.input(type="text" placeholder="https://www.porsche-pulkovo.ru")
                      .block-validate.work__validate Заполните ссылку
                  label.redact-form__row
                    .redact-form__block.redact-form__block--no-border(:class='{error: workError}')
                      span.redact-form__desc Описание
                      textarea.redact-form__entry.textarea(name="textarea" type="text" placeholder="Порше Центр Пулково - является официальным дилером марки Порше в Санкт-Петербурге и предоставляет полный цикл услуг по продаже и сервисному обслуживанию автомобилей")
                      .block-validate.work__validate Заполните Описание
                  label.redact-form__row
                    .redact-form__block(:class='{error: workError}')
                      span.redact-form__desc Добавление тэга
                      input.redact-form__entry.input(type="text" placeholder="Jquery, Vue.js, HTML5" disabled)
                      .block-validate.work__validate Заполните технологии
                  .redact-form__tags
                    ul.tags
                      -var tags = ["HTML","CSS","Javascript"];
                      each tag in tags
                        li.tags__item
                          span.tags__item-text #{tag}
                          button.close-btn
                  .redact-form__buttons
                    button.cancel-btn(@click.prevent) Отмена
                    button.action-btn(@click.prevent="handleWorkError") Сохранить
          .works-content
            ul.content-list
              li.content-list__item
                .append
                  button.append__button
                  .append__text Добавить работу
              -var images = ["work1", "work2", "work3", "work4"];
              each image in images
                li.content-list__item
                  .content-list__img
                    img(src=`../images/content/${image}.jpg`).content-list__img-pic
                  .content-list__info
                    .content-list__subtitle Сайт школы образования
                    .content-list__desc Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!
                    .content-list__link http://loftschool.ru
                    .content-list__btns
                      a.edit-link.edit-link--correct Править
                      a.edit-link.edit-link--remove Удалить
      section.section.reviews
        .container
          h2.section-title.works__title Блок &laquo;Отзывы&raquo;
          .edit-block.reviews__edit
            h3.edit-block__subtitle Новый отзыв
            .review-edit
              .review-edit__image
                .avatar-load(:class='{error: reviewError}')
                  .avatar-load__image
                  a.avatar-load__link(href="#")
                    .avatar-load__desc Добавить фото
                  .block-validate.block-validate--center.review__validate Ошибка
              .review-edit__form
                form.redact-form
                  label.redact-form__row
                    .redact-form__block(:class='{error: reviewError}')
                      span.redact-form__desc Имя автора
                      input.redact-form__entry.input(type="text" placeholder="Ковальчук Дмитрий")
                      .block-validate.review__validate Заполните имя
                    .redact-form__block(:class='{error: reviewError}')
                      span.redact-form__desc Титул автора
                      input.redact-form__entry.input(type="text" placeholder="Основатель LoftSchool")
                      .block-validate.review__validate Заполните титул
                  label.redact-form__row
                    .redact-form__block.redact-form__block--no-border(:class='{error: reviewError}')
                      span.redact-form__desc Отзыв
                      textarea.redact-form__entry.textarea(name="textarea" type="text" placeholder="Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!")
                      .block-validate.review__validate Заполните отзыв
                  .redact-form__buttons
                    button.cancel-btn(@click.prevent) Отмена
                    button.action-btn(@click.prevent="handleReviewError") Сохранить
          .reviews-content
            ul.content-list
              li.content-list__item
                .append
                  button.append__button
                  .append__text Добавить отзыв
              -var images = ["review1", "review2", "review1", "review2"];
              each image in images
                li.content-list__item
                  .content-list__person.person
                    .person__avatar
                      .avatar
                        img(src=`../images/content/${image}.jpg`).avatar__pic
                    .person__info
                      .person__name Владимир Сабанцев
                      .person__post Преподаватель
                  .content-list__info                  
                    .content-list__desc Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!                  
                    .content-list__btns
                      a.edit-link.edit-link--correct Править
                      a.edit-link.edit-link--remove Удалить
    .modal(:class='{closed: isAutorized}')
      .modal__inner
        h2.modal__title Авторизация
        label.modal__field(data-title='Логин' :class='{error: autorizationTry && login.length == 0}')
          .modal__block
            input.modal__input(type="text" name="login" v-model="login" @input="modalInputChange")
          .block-validate.modal__validate Введите имя пользователя
        label.modal__field(data-title='Пароль' :class='{error: autorizationTry && password.length == 0}')
          .modal__block
            input.modal__input(type="password" name="password" v-model="password" @input="modalInputChange")
          .block-validate.modal__validate Введите пароль
        .modal__btn
          button.send-button(@click.prevent="autorization") Отправить
      .modal__warning(:class='{active: autorizationError}')
        .modal__warning-text  Неверное имя или пароль
        .modal__warning-close
</template>

<script>

export default {  
  components: {},
  data () {
    return {
      isAutorized : false,
      autorizationData: {},
      login: '',
      password: '',
      autorizationTry: false,
      autorizationError: false,
      workError: false,
      reviewError: false
    }
  },
  methods: {

    autorization() {
      this.autorizationTry = true;
      if (this.login == this.autorizationData.login && this.password == this.autorizationData.password) {
        this.isAutorized = true
      } else if (this.login.length > 0 && this.password.length > 0) {
        this.autorizationError = true;
      }      
    },
    modalInputChange() {
      this.autorizationError = false;
    },
    handleWorkError() {
      this.workError = true;
    },
    handleReviewError() {
      this.reviewError = true;
    }
  },
  created() {
    this.autorizationData = require("../data/autorization.json");
  }
}
</script>

<style lang="postcss">

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";

  html {
    @include tablets {
      font-size: 14px;
    }
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: 'Open Sans', Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.42;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $text-color;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  button {
    padding: 0;
  }

  h1,h2,h3,h4 {
    margin: 0;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .wrapper {
    background: url(../images/main-admin.jpg);
      
  }

  .content__inner {
    transition: .2s;
    &.blocked{
      visibility: hidden;
      height: 100vh;
      overflow: hidden;
    }    
  }

  .container {
    margin: 0 auto;
    max-width: 1480px;
    width: 95%;

    @include desktop {
      max-width: 1090px;
    }

    @include phones {
      width: 100%;
    }
  }

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
    opacity: .5;
    font-size: 14px;
    margin-left: 28px;

    @include phones {
      display: none;
    }
  }

  .login {
    margin-left: auto;
    opacity: .7;
    @include phones {
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

  .login {
    color: currentColor;
  }

  .nav__list {
    display: flex;
    @include phones {
      justify-content: center;
    }
  }

  .nav__item {
    border-bottom: 3px solid transparent;
    transition: .2s;
    
    &.is-active, &:hover {
      color: $blue;
      border-bottom: 3px solid $blue;
    }
  }

  .nav__link {
    display: inline-block;
    padding: 25px;
    color: currentColor;
    text-decoration: none;
  }

  .about__title {
    font-size: 21px;
    font-weight: 700;   
  }

  .section-title {
    display: flex;
    align-items: center;
    padding: 50px 0;

    @include phones {
      flex-direction: column;
      align-items: flex-start;
      padding: 50px 0 50px 20px;
    }
  }

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
    color: $blue;
    font-weight: 600;
    text-decoration: none;
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

    &::before, &::after {
      content: '';
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
      &::before, &::after {
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
    width: calc(100%/2-30px);
    box-shadow: 4px 2px 20px 0px rgba(#000, 0.1);

    @include phones {
      width: calc(100%-30px);
    }
  }

  .knowledge__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 15px;
    border-bottom: 1px solid $grey;
    font-size: 18px;
    margin-bottom: 25px;
  }

  .knowledge__group-name {
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

  .knowledge__header-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50px;
  }
  
  .edit-btn {
    width: 16px;
    height: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;

    &--accept {
      background: svg-load('tick.svg', fill='$green', width=100%, height=100%) center center / 16px 16px no-repeat;
    }
    &--decline {
      background: svg-load('cross.svg', fill='$red', width=100%, height=100%) center center / 14px 14px no-repeat;
    }
    &--redact {
      background: svg-load('pencil.svg', fill='#a0a5b1', width=100%, height=100%);
    }
    &--remove {
      background: svg-load('trash.svg', fill='#a0a5b1', width=100%, height=100%);
    }
  }

  .knowledge__list {
    margin-bottom: 60px;
  }

  .knowledge__item {
    display: flex;
    align-items: center;
    padding-bottom: 12px;

    &.is-active {
      .skill__name, .skill__value {
        border-bottom: 1px solid currentColor;
      }
    }
  }

  .skill__name {
    flex: 1;
    margin-right: 20px;
    padding-bottom: 8px;    
  }

  .skill__value {
    display: flex;
    justify-content: space-between;
    width: 70px;
    margin-right: 40px;
    padding: 0 5px 8px;
  }

  .skill__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50px;
    margin-bottom: 10px;
  }

  .knowledge__block {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: auto;
  }

  .knowledge__skill-name {
    flex: 1;
    max-width: 220px;
    padding-bottom: 10px;
    padding-left: 20px;
    margin-right: 10px;
    border-bottom: 1px solid $dark-blue;
  }

  .knowledge__skill-percent {
    display: flex;
    justify-content: space-between;
    text-align: center;
    max-width: 70px;
    padding: 0 10px 10px;
    margin-right: 20px;
    border-bottom: 1px solid $dark-blue;
  }

  .works__title {
    font-size: 21px;
    font-weight: 700;
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

  .image-load {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 280px;
    background: linear-gradient(to right, #949494 50%, transparent 0%) top / 20px 1px repeat-x,
      linear-gradient(#949494 50%, transparent 0%) right / 1px 20px repeat-y,
      linear-gradient(to left, #949494 50%, transparent 0%) bottom / 20px 1px repeat-x,
      linear-gradient(to top, #949494 50%, transparent 0%) left / 1px 20px repeat-y, $grey;
    
    &.error {
      border: 1px solid $red;      
      & .work__validate {
        display: block;
      }
    }
  }

  .image-load__text {
    max-width: 230px;
    opacity: 0.5;
    line-height: 1.7;
    margin-bottom: 30px;
    text-align: center;
    font-weight: 600;
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

  .work-edit__form {
    width: 50%;
    @include tablets {
      width: 100%;
      max-width: 500px;
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

  .redact-form__desc {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    opacity: 0.5;
  }

  .work__validate {
    display: none;
  }

  .redact-form__block {
    position: relative;
    margin-left: 30px;
    margin-bottom: 20px;
    flex: 1;
    padding-bottom: 10px;    
    color: #414c63;
    border-bottom: 1px solid #414c63;

    &--no-border {
      border: none;
      padding-bottom: 0;
    }

    &.error {
      border-color: $red;

      & .textarea {
        border-color: $red;
      }

      & .work__validate {
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
    border-radius: 30px
  }

  .tags__item-text {
    margin-right: 5px;
  }

  .close-btn {
    width: 20px;
    height: 20px;
    position: relative;
    background: none;
    outline: none;
    cursor: pointer;
    border: none;
    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      height: 2px;
      width: 14px;
      left: 50%;
      right: 50%;
      background-color: #414c63;
    }
    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  .redact-form__buttons {
    display: flex;
    justify-content: flex-end;

    @include tablets {
      position: absolute;
      right: 0;
      bottom: 0;
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

  .content-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;
  }

  .content-list__item {
    width: calc(100%/3-30px);
    margin-left: 30px;
    margin-bottom: 30px;
    background: #fff;
    box-shadow: 4px 2px 20px 0px rgba(#000, 0.1);

    @include tablets {
      width: calc(100%/2-30px);
    }
    @include phones {
      width: calc(100%-30px);
    }
  }

  .append {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    height: 100%;
    background: linear-gradient(to right, $light-blue, $blue);
    padding: 30px 0;
    color: #fff;

    @include phones {
      flex-direction: row;
      justify-content: flex-start;
    }
  }

  .append__text {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    max-width: 120px;

    @include phones {
      max-width: none;
    }
  }

  .append__button {
    cursor: pointer;
    outline: none;
    background: transparent;
    position: relative;
    border: 2px solid #fff;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 25px;

    @include phones {
      width: 50px;
      height: 50px;
      margin: 0 20px;
      margin-bottom: 0;
    }

    &::before, &::after {
      content: '';
      position: absolute;
      background-color: #fff;
      width: 33px;
      height: 3px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      @include phones {
      width: 13px;
      height: 2px;
      }
    }

    &::before {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  .content-list__info {
    padding: 30px 25px 25px;
  }

  .content-list__subtitle {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .content-list__desc {
    font-weight: 600;
    line-height: 1.7;
    opacity: 0.7;
    margin-bottom: 15px;
  }  

  .content-list__link {
    font-weight: 600;
    color: $blue;
  }

  .content-list__btns {
    display: flex;
    justify-content: space-between;
    margin-top: 45px;
  }

  .edit-link {
    cursor: pointer;
    font-weight: 600;
    color: rgba(#414c63, .5);
    padding-right: 24px;
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;      
      right: 0;           
    }
    &--remove {
      &::before {
        width: 14px;
        height: 14px;
        top: 3px;
        background: svg-load('cross.svg', fill='$red', width=100%, height=100%);
      }      
    }
    &--correct {
      padding-right: 26px;
      &::before {
        width: 17px;
        height: 17px;
        background: svg-load('pencil.svg', fill='$blue', width=100%, height=100%);
      }
    }
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

  .review__validate {
    display: none;
  }

  .avatar-load {
    position: relative;
    border: 1px solid transparent; 

    &.error {
      border: 1px solid $red;      
      & .review__validate {
        display: block;
      }
    }
  }

  .avatar-load__image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #dee4ed;
    margin-bottom: 20px;
    background: svg-load('user.svg', fill='#fff') center center / 50% 50% no-repeat, #dee4ed;
  }

  .avatar-load__link {
    display: block;
    text-decoration: none;
  }

  .avatar-load__desc {
    text-align: center;
    font-weight: 600;
    color: #383bcf;
  }

  .review-edit__form {
    flex: 1;
    max-width: 630px;    
    
    @include phones {
      width: 100%;
      max-width: none;
    }
  }

  .content-list__person {
    display: flex;
    align-items: center;
    padding: 30px 0 30px 15px;
    margin: 0 15px;
    border-bottom: 1px solid $grey;
  }

  .person__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
    flex-shrink: 0;
  }

  .person__name {
    font-weight: 700;
    margin-bottom: 5px;
  }

  .person__post {
    font-weight: 600;
    opacity: 0.5;
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba($text-color, 0.5);

    &.closed {
      display: none;
    }
  }

  .modal__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    background-color: #fff;    
    width: 80%;
    max-width: 400px;
  }

  .modal__title {
    margin-bottom: 20px;
  }

  .modal__field {
    position: relative;
    width: 100%;
    margin-bottom: 25px;
    padding-left: 40px;
    border-bottom: 1px solid rgba($text-color, .7);

    &:hover {
      border-color: $blue-violet;
    }

    &:before {
      content: attr(data-title);
      margin-bottom: 15px;
      display: block;
      font-weight: 600;
      color: rgba($text-color, .3);     
    }

    &.error {
      border-color: $red;
      & .modal__validate {
        display: block;
      }
    }
  }

  .modal__validate {
    display: none;
  }

  .block-validate {
    position: absolute;
    color: #fff;
    background-color: $red;
    padding: 5px;
    left: 10px;
    font-size: 14px;
    padding: 5px 10px;
    bottom: -30px;    

    &--center {
      left: 50%;
      transform: translate(-50%);
    }
  
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

  .modal__block {
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

  .modal__input {
    border: none;
    outline: none;
    color: inherit;
    font-size: inherit;
    font-weight: 600;
    width: 100%;
  }

  .modal__btn {
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

  .modal__warning {
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
    transition: transform .5s;

    &.active {
      transform: translateY(0%);
    }
  }

  .modal__warning-close {
    width: 15px;
    height: 15px;
    margin-left: 20px;
    background: svg-load('cross.svg', fill='#fff', width=100%, height=100%);
  }

  @keyframes popup {
    from {
      transform: translateY(100%);
    }
    20% {
      transform: translateY(0);
    }
    80% {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

</style>