import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthService from './../authentication/AuthService'

const auth = new AuthService()

Vue.use(Vuex)

// the root, initial state object
const state = {
  recipes: []
}

// define the possible mutations that can be applied to our state
const mutations = {
  clearRecipes (state) {
    state.recipes = []
  },
  loadRecipes (state, recipes) {
    state.recipes = recipes
  },
  addRecipe (state, recipe) {
    state.recipes.push(recipe)
  },
  updateRecipe (state, recipe) {
    const existingRecipe = getters.getRecipeById(recipe.id)
    state.recipes[state.recipes.indexOf(existingRecipe)] = recipe
  },
  deleteRecipe (state, recipe) {
    const index = state.recipes.indexOf(recipe)
    if (index !== -1) {
      state.recipes.splice(index, 1)
    }
  }
}

const api = axios.create({
  baseURL: app_config.API_URL
})

const actions = {
  loadAllRecipes (context, recipe) {
    return api.get('recipes/all')
    .then((response) => {
      context.commit('loadRecipes', response.data)
    })
  },

  loadMyRecipes (context, recipe) {
    return api.get('recipes/my-recipes', {
      headers: auth.getAuthHeader()
    })
    .then((response) => {
      context.commit('loadRecipes', response.data)
    })
  },

  searchAllRecipes (context, searchTerm) {
    return api.get('recipes/all/search', {
      params: {
        'searchTerm': searchTerm
      }
    })
    .then((response) => {
      context.commit('loadRecipes', response.data)
    })
  },

  addRecipe (context, recipe) {
    return api.post('recipes/add', recipe, {
      headers: auth.getAuthHeader()
    })
    .then(() => {
      context.commit('addRecipe', recipe)
    })
  },

  updateRecipe (context, recipe) {
    return api.put(`recipes/${recipe.id}`, recipe, {
      headers: auth.getAuthHeader()
    })
    .then(() => {
      context.commit('updateRecipe', recipe)
    })
  },

  deleteRecipe (context, recipe) {
    return api.delete(`recipes/${recipe.id}/delete`, {
      headers: auth.getAuthHeader()
    })
    .then(() => {
      context.commit('deleteRecipe', recipe)
    })
  },

  uploadImage (context, data) {
    let headers = { 'Content-Type': 'multipart/form-data' }
    headers['Content-Type'] = 'multipart/form-data'
    return api.post(`recipes/${data.id}/image`, data.formData, {
      headers: { headers }
    })
  }
}

const getters = {
  getRecipeById: (state) => (id) => {
    return state.recipes.find(x => x.id === parseInt(id))
  }
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,

  // use strict mode unless in the production environment,
  // where we want to avoid the performance cost
  strict: process.env.NODE_ENV !== 'production'
})
