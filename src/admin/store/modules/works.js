export default {
  namespaced: true,
  state: {
    works: [],
    currentWork: {}
  },
  mutations: {
    SET_WORKS: (state, data) => (state.works = data),
    SET_CURRENT: (state, work) => (state.currentWork = work),
    ADD_WORK: (state, work) => state.works.push(work),
    EDIT_WORK: (state, editedWork) =>
      state.works.map(work => {
        if (work.id === editedWork.id) work = editedWork;
      }),
    REMOVE_WORK: (state, deletedWork) =>
      state.works.filter(work => {
        work.id !== deletedWork.id;
      })
  },
  actions: {
    async fetchWorks({ commit }) {
      try {
        const { data } = await this.$axios.get("/works/253");
        commit("SET_WORKS", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async addWork({ commit }, newWork) {
      try {
        const { data } = await this.$axios.post("/works", newWork);
        commit("ADD_WORK", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async editWork({ commit }, editedWork) {
      try {
        const { data } = await this.$axios.post(
          `/works/${editedWork.id}`,
          editedWork.data
        );
        commit("EDIT_WORK", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async removeWork({ commit }, deletedWork) {
      try {
        await this.$axios.delete(`/works/${deletedWork.id}`);
        commit("REMOVE_WORK", deletedWork);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    changeCurrentWork({ commit }, work) {
      commit("SET_CURRENT", work);
    }
  }
};
