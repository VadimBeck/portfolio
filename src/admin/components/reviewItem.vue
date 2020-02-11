<template lang="pug">
  .review
    .content-list__person.person
      .person__avatar
        .avatar
          img(src="../../images/content/review2.jpg").avatar__pic
      .person__info
        .person__name {{review.author}}
        .person__post {{review.occ}}
    .content-list__info                  
      .content-list__desc {{review.text}}
      .content-list__btns
        a.edit-link.edit-link--correct(@click="editCurrentReview") Править
        a.edit-link.edit-link--remove(@click="removeExistedReview") Удалить
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    review: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      currentReview: { ...this.review }
    };
  },
  methods: {
    ...mapActions("reviews", ["changeCurrentReview", "removeReview"]),    
    ...mapActions("tooltip", ["showTooltip"]),
    editCurrentReview() {
      this.changeCurrentReview(this.review);
      this.$emit("enableEditMode");
    },
    async removeExistedReview() {
      try {
        if (confirm("удалить отзыв?")) {
          await this.removeReview(this.currentReview);
          this.showTooltip({ success: "Отзыв удален" });
        }
      } catch (error) {
        this.showTooltip({ error: error.message });
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.content-list__info {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 15px 25px 25px;
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
  margin-top: auto;
  padding-top: 15px;
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
</style>
