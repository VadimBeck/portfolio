export default {
  namespaced: true,
  state: {
    reviews: [],
    currentReview: {},
    addMode: false,
    editMode: false
  },
  mutations: {
    SET_REVIEWS: (state, data) => (state.reviews = data),
    SET_CURRENT: (state, review) => (state.currentReview = review),
    ADD_REVIEW: (state, review) => state.reviews.push(review),
    EDIT_REVIEW: (state, editedReview) => {
      state.reviews.map(review => {
        if (review.id === editedReview.id) {
          Object.keys(review).forEach(key => {
            review[key] = editedReview[key];
          });
        }
      });
    },
    REMOVE_REVIEW: (state, deletedReview) => {
      state.reviews = state.reviews.filter(
        review => review.id !== deletedReview.id
      );
    },
    CHANGE_ADDMODE: (state, value) => {
      state.addMode = value;
    },
    CHANGE_EDITMODE: (state, value) => {
      state.editMode = value;
    }
  },
  actions: {
    async fetchReviews({ commit }) {
      try {
        const { data } = await this.$axios.get("/reviews/253");
        commit("SET_REVIEWS", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async addReview({ commit }, newReview) {
      const formData = new FormData();
      try {
        Object.keys(newReview).forEach(key => {
          const value = newReview[key];
          formData.append(key, value);
        });
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REVIEW", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async editReview({ commit }, editedReview) {
      const formData = new FormData();
      try {
        Object.keys(editedReview).forEach(key => {
          const value = editedReview[key];
          formData.append(key, value);
        });
        const { data } = await this.$axios.post(
          `/reviews/${editedReview.id}`,
          formData
        );
        commit("EDIT_REVIEW", data.review);
      } catch (error) {
        errorHandler(error);
      }
    },
    async removeReview({ commit }, deletedReview) {
      try {
        await this.$axios.delete(`/reviews/${deletedReview.id}`);
        commit("REMOVE_REVIEW", deletedReview);
      } catch (error) {
        errorHandler(error);
      }
    },
    changeCurrentReview({ commit }, review) {
      commit("SET_CURRENT", review);
    },
    changeAddMode({ commit }, value) {
      commit("CHANGE_ADDMODE", value);
    },
    changeEditMode({ commit }, value) {
      commit("CHANGE_EDITMODE", value);
    }
  }
};
