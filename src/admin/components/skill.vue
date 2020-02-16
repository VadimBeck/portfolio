<template lang="pug">
  .skill.active(v-if="editMode")
    .skill__name
      input(v-model="editedSkill.title").skill__name-input.input
    .skill__value
      input(v-model="editedSkill.percent").skill__value-input.input
      span.skill__value-percent %
    .skill__buttons
      button.edit-btn.edit-btn--accept(@click="editExistedSkill")
      button.edit-btn.edit-btn--decline(@click="editMode = false")

  .skill(v-else)
    .skill__name
      input(:placeholder="skill.title" disabled).skill__name-input.input
    .skill__value
      input(:placeholder="skill.percent" disabled).skill__value-input.input
      span.skill__value-percent %
    .skill__buttons
      button.edit-btn.edit-btn--redact(@click="editMode = true")
      button.edit-btn.edit-btn--remove(@click="removeExistedSkill")
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      editMode: false,
      editedSkill: { ...this.skill }
    };
  },
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    ...mapActions("tooltip", ["showTooltip"]),
    async removeExistedSkill() {
      try {
        if (confirm("удалить запись?")) {
          await this.removeSkill(this.skill);
          this.showTooltip({ success: "Навык удален" });
        }
      } catch (error) {
        this.showTooltip({ error: error.message });
      }
    },
    async editExistedSkill() {
      try {
        await this.editSkill(this.editedSkill);
        this.showTooltip({ success: "Изменения внесены" });
        this.editMode = false;
      } catch (error) {
        this.showTooltip({ error: error.message });
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.skill {
  display: flex;
  align-items: center;
  padding-bottom: 12px;

  &.is-active {
    .skill__name,
    .skill__value {
      border-bottom: 1px solid currentColor;
    }
  }
}

.skill__name {
  flex: 1;
  margin-right: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid transparent;
}

.skill__value {
  display: flex;
  justify-content: space-between;
  width: 70px;
  margin-right: 40px;
  padding: 0 5px 8px;
  border-bottom: 1px solid transparent;
}

.skill__buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  margin-bottom: 10px;
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
    margin-left: auto;
    background: svg-load("cross.svg", fill= "$red", width=100%, height=100%)
      center center / 14px 14px no-repeat;
  }
  &--redact {
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
</style>
