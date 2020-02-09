export default {
  namespaced: true,
  state: {
    reviews: [],
    currentReview: {}
  },
  mutations: {
    SET_REVIEWS: (state, data) => (state.reviews = data),
    SET_CURRENT: (state, review) => (state.currentReview = review),
    ADD_REVIEW: (state, review) => state.reviews.push(review),
    EDIT_REVIEW: (state, editedReview) =>
      state.reviews.map(review => {
        if (review.id === editedReview.id) review = editedReview;
      }),
    REMOVE_REVIEW: (state, deletedReview) =>
      state.reviews.filter(review => {
        review.id !== deletedReview.id;
      })
  },
  actions: {
    async fetchReviews({ commit }) {
      try {
        const { data } = await this.$axios.get("/reviews/253");
        commit("SET_REVIEWS", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async addReview({ commit }, newReview) {
      try {
        const { data } = await this.$axios.post("/reviews", newReview);
        commit("ADD_REVIEW", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async editReview({ commit }, editedReview) {
      try {
        const { data } = await this.$axios.post(
          `/reviews/${editedReview.id}`,
          editedReview.data
        );
        commit("EDIT_REVIEW", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async removeReview({ commit }, deletedReview) {
      try {
        await this.$axios.delete(`/reviews/${deletedReview.id}`);
        commit("REMOVE_REVIEW", deletedReview);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    changeCurrentReview({ commit }, review) {
      commit("SET_CURRENT", review);
    }
  }
};
