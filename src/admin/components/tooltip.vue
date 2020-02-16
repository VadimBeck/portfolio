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
        .tooltip__close
      .tooltip__error(
        :key="tooltip.errorMessage"
        v-if="tooltip.errorMessage"      
      ) {{tooltip.errorMessage}}
        .tooltip__close
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
  z-index: 5;
  bottom: 0;
  left: 50%;
  color: #fff;
  font-size: 18px;
}

.tooltip__success,
.tooltip__error {
  min-width: 180px;
  position: relative;
  transform: translate(-50%, 100%);
  padding: 20px 30px;
  padding-right: 80px;

  &.active {
    animation: show;
    animation-duration: 2.5s;
  }
  &::after {
    content: '✖';
    position: absolute;
    cursor: pointer;
    font-size: 20px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.tooltip__success {
  background-color: $green;
}

.tooltip__error {
  background-color: $red;
}

@keyframes show {
  from {
    transform: translate(-50%, 100%);
  }
  10% {
    transform: translate(-50%, 0);
  }
  90% {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, 100%);
  }
}
</style>
