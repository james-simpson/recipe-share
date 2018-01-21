import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// the root, initial state object
const state = {
  recipes: []
}

// define the possible mutations that can be applied to our state
const mutations = {
	clearRecipes (state) {
		state.recipes = [];
	},
	updateRecipes (state, recipes) {
		state.recipes = recipes;
	}
}

const getters = {
  getRecipeById: (state) => (id) => {
    return state.recipes.find(x => x.id == id)
  }
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state,
  mutations,
  getters,
  // use strict mode unless in the production environment,
  // where we want to avoid the performance cost
  strict: process.env.NODE_ENV !== 'production'
})