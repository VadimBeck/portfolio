export default {
  namespaced: true,
  state: {
    works: [],
    currentWork: {},
    addMode: false,
    editMode: false
  },
  mutations: {
    SET_WORKS: (state, data) => (state.works = data),
    SET_CURRENT: (state, work) => (state.currentWork = work),
    ADD_WORK: (state, work) => state.works.push(work),
    EDIT_WORK: (state, editedWork) => {
      state.works.map(work => {
        if (work.id === editedWork.id) {
          Object.keys(work).forEach(key => {
            work[key] = editedWork[key];
          });
        }
      });
    },
    REMOVE_WORK: (state, deletedWork) => {
      state.works = state.works.filter(work => work.id != deletedWork.id);
    },
    CHANGE_ADDMODE: (state, value) => {
      state.addMode = value;
    },
    CHANGE_EDITMODE: (state, value) => {
      state.editMode = value;
    }
  },
  actions: {
    async fetchWorks({ commit }) {
      try {
        const { data } = await this.$axios.get("/works/253");
        commit("SET_WORKS", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async addWork({ commit }, newWork) {
      const formData = new FormData();
      try {
        Object.keys(newWork).forEach(key => {
          const value = newWork[key];
          formData.append(key, value);
        });
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async editWork({ commit }, editedWork) {
      const formData = new FormData();
      try {
        Object.keys(editedWork).forEach(key => {
          const value = editedWork[key];
          formData.append(key, value);
        });
        const { data } = await this.$axios.post(
          `/works/${editedWork.id}`,
          formData
        );
        commit("EDIT_WORK", data.work);
      } catch (error) {
        errorHandler(error);
      }
    },
    async removeWork({ commit }, deletedWork) {
      try {
        await this.$axios.delete(`/works/${deletedWork.id}`);
        commit("REMOVE_WORK", deletedWork);
      } catch (error) {
        errorHandler(error);
      }
    },
    changeCurrentWork({ commit }, work) {
      commit("SET_CURRENT", work);
    },
    changeAddMode({ commit }, value) {
      commit("CHANGE_ADDMODE", value);
    },
    changeEditMode({ commit }, value) {
      commit("CHANGE_EDITMODE", value);
    }
  }
};
