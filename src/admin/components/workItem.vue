<template lang="pug">
  .work
    .content-list__img
      img(src="../../images/content/work1.jpg").content-list__img-pic
    .content-list__info
      .content-list__subtitle {{work.title}}
      .content-list__desc {{work.description}}
      a.content-list__link(href='#') {{work.link}}
      .content-list__btns
        a.edit-link.edit-link--correct(@click="editCurrentWork") Править
        a.edit-link.edit-link--remove(@click="removeExistedWork") Удалить
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    work: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      currentWork: { ...this.work }
    };
  },
  methods: {
    ...mapActions("works", ["changeCurrentWork", "removeWork"]),
    ...mapActions("tooltip", ["showTooltip"]),
    editCurrentWork() {
      this.changeCurrentWork(this.work);
      this.$emit("enableEditMode");
    },
    async removeExistedWork() {
      try {
        if (confirm("удалить работу?")) {
          await this.removeWork(this.currentWork);
          this.showTooltip({ success: "Работа удалена" });
        }
      } catch (error) {
        this.showTooltip({ error: error.message });
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.work {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-list__info {
  padding: 30px 25px 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
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

.content-list__btns {
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
}

.content-list__link {
  font-weight: 600;
  color: $blue;
  margin-top: auto;
  text-decoration: none;
}

.edit-link {
  cursor: pointer;
  font-weight: 600;
  color: rgba(#414c63, 0.5);
  padding-right: 24px;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    right: 0;
  }
  &--remove {
    &::before {
      width: 14px;
      height: 14px;
      top: 3px;
      background: svg-load("cross.svg", fill= "$red", width=100%, height=100%);
    }
  }
  &--correct {
    padding-right: 26px;
    &::before {
      width: 17px;
      height: 17px;
      background: svg-load(
        "pencil.svg",
        fill= "$blue",
        width=100%,
        height=100%
      );
    }
  }
}
</style>
