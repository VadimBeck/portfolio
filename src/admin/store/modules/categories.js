import errorHandler from "../../helpers/errorHandler";

export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES: (state, data) => (state.categories = data),
    ADD_CATEGORY: (state, category) => state.categories.unshift(category),
    EDIT_CATEGORY: (state, editedCategory) =>
      state.categories.map(category => {
        if (category.id === editedCategory.id) {
          category.category = editedCategory.category;
        }
      }),
    ADD_SKILL: (state, newSkill) => {
      state.categories = state.categories.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      });
    },
    REMOVE_SKILL: (state, deletedSkill) => {
      const removeSkillinCategory = category => {
        category.skills = category.skills.filter(
          skill => skill.id !== deletedSkill.id
        );
      };
      const findCategory = category => {
        if (category.id === deletedSkill.category) {
          removeSkillinCategory(category);
        }
        return category;
      };
      state.categories = state.categories.map(findCategory);
    },
    EDIT_SKILL: (state, editedSkill) => {
      const editSkillinCategory = category => {
        category.skills = category.skills.map(skill => {
          return skill.id === editedSkill.id ? editedSkill : skill;
        });
      };
      const findCategory = category => {
        if (category.id === editedSkill.category) {
          editSkillinCategory(category);
        }
        return category;
      };
      state.categories = state.categories.map(findCategory);
    }
  },
  actions: {
    async addCategory({ commit }, title) {
      try {
        const response = await this.$axios.post("/categories", { title });        
        commit("ADD_CATEGORY", response.data);
        //await this.$axios.delete("/categories/3718");
      } catch (error) {        
        errorHandler(error);
      }
    },
    async editCategory({ commit }, category) {
      try {
        const { data } = await this.$axios.post(`/categories/${category.id}`, {
          title: category.category
        });
        commit("EDIT_CATEGORY", data.category);
      } catch (error) {
        errorHandler(error);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const { data } = await this.$axios.get("/categories/253");
        commit("SET_CATEGORIES", data);
      } catch (error) {
        errorHandler(error);
      }
    }
  }
};
