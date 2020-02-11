import { Store } from "vuex";

export default {
  namespaced: true,
  state: {
    tooltip: {
      successMessage: null,
      errorMessage: null
    }
  },
  mutations: {
    CLEAR_TOOLTIP: (state) => {
      state.tooltip.successMessage = null;
      state.tooltip.errorMessage = null;
    }
  },
  actions: {    
    showTooltip({state}, data) {
      if(data.success) {
        state.tooltip.successMessage = data.success;
      } else {
        state.tooltip.errorMessage = data.error;
      }
    },
    clearToltip({commit}) {
      commit("CLEAR_TOOLTIP");
    }
  }
};