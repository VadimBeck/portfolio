<template lang="pug">
  .tooltip
    transition-group(
      tag="div"
      :css="false"
      @before-enter="beforeEnterCb"
    ) 
      .tooltip__success(
        :key="tooltip.successMessage"
        v-if="tooltip.successMessage"      
      ) {{tooltip.successMessage}}   
      .tooltip__error(
        :key="tooltip.errorMessage"
        v-if="tooltip.errorMessage"      
      ) {{tooltip.errorMessage}}
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("tooltip", {
      tooltip: state => state.tooltip
    })
  },
  methods: {
    ...mapActions("tooltip", ["clearToltip"]),
    beforeEnterCb(el, done) {
      el.classList.add("active");
      el.addEventListener("animationend", () => {
        el.classList.remove("active");
        this.clearToltip();
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.tooltip {
  position: fixed;
  bottom: 0;
  left: 50%;
  color: #fff;
}

.tooltip__success,
.tooltip__error {
  transform: translate(-50%, 100%);
  padding: 10px 15px;

  &.active {
    animation: show;
    animation-duration: 2.5s;
  }
}

.tooltip__success {
  background-color: green;
}

.tooltip__error {
  background-color: $red;
}

@keyframes show {
  from {
    transform: translate(-50%, 100%);
  }
  15% {
    transform: translate(-50%, 0);
  }
  85% {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, 100%);
  }
}
</style>
