<template lang="pug">
  section.section.works
    .container
      h2.section-title.works__title Блок «Работы»
      work-add-form(
        v-if="addWorkMode"        
        @cancellAddMode = "cancellAddMode"
        )
      work-edit-form(
        v-if="editWorkMode"
        :currentWork="currentWork"
        @cancellEditMode="cancellEditMode"      
        )
      .works-content
        ul.content-list
          li.content-list__item(v-if="!addWorkMode")
            .append
              button.append__button(@click="addWorkMode = true")
              .append__text Добавить работу          
          li.content-list__item(v-for="work in works")
            work-item(              
              :work="work"
              @enableEditMode="enableEditMode"
            )
</template>

<script> 
import {mapActions, mapState} from "vuex";

export default {
  components: { 
    workAddForm: () => import('../workAddForm'),
    workEditForm: () => import('../workEditForm'), 
    workItem: () => import('../workItem')
  },
  data() {
    return {
      addWorkMode: false,
      editWorkMode: false
    }
  },
  computed: {
    ...mapState("works", {
      works: state => state.works,
      currentWork: state => state.currentWork
    })
  },
  methods: {
    ...mapActions("works", ["fetchWorks"]),
    cancellAddMode() {      
      this.addWorkMode = false;
    },
    cancellEditMode() {
      this.editWorkMode = false;
    },
    enableEditMode() {
      this.editWorkMode = true;
    }    
  },
  created() {
    this.fetchWorks();
  }
}
</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";

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
</style>