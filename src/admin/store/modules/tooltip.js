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
    SET_SUCCESS: (state, message) => (state.tooltip.successMessage = message),
    SET_ERROR: (state, message) => (state.tooltip.errorMessage = message),
    CLEAR_TOOLTIP: (state) => {
      state.tooltip.successMessage = null;
      state.tooltip.errorMessage = null;
    }
  },
  actions: {    
    showTooltip({commit}, data) {
      if(data.success) {
        commit("SET_SUCCESS", data.success);
      } else {
        commit("SET_ERROR", data.error);
      }
    },
    clearToltip({commit}) {
      commit("CLEAR_TOOLTIP");
    }
  }
};