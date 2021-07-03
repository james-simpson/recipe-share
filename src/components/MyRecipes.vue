<template>
  <v-content>
    <v-container v-if="!authenticated">
      <h2 class="login-prompt-text title text-xs-center">
        <a @click="auth.login">Log in</a> or
        <a @click="auth.login">sign up</a> to see recipes you've added
      </h2>
    </v-container>
    <v-container v-if="authenticated && !showFailureMessage && recipes.length === 0">
      <h2 class="login-prompt-text title text-xs-center">
        No recipes to show. <router-link :to="addRecipeRoute">Add a recipe</router-link>
      </h2>
    </v-container>
    <v-container v-if="authenticated && showFailureMessage">
      <h2 class="login-prompt-text title text-xs-center">
        Unable to load recipes. <a @click="loadRecipes">Retry</a>
      </h2>
    </v-container>
    <v-container
      v-if="authenticated"
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12 md6 v-for="recipe in recipes">
          <recipe-card
            :id="recipe.id"
            :title="recipe.title"
            :author="recipe.author"
            :image="recipe.image"
            :time="recipe.time"
            :difficulty="recipe.difficulty"
            :difficultyLevels="difficultyLevels"
            :vegetarian="recipe.vegetarian"
            :vegan="recipe.vegan"
            :sweet="recipe.sweet"
            :to="viewRecipeRoute(recipe.id)"
            :shoppingListIds="shoppingListIds"
            :toggleShoppingListRecipeIds="toggleShoppingListRecipeIds"
            class="white--text"
          ></recipe-card>
        </v-flex>
      </v-layout>
      <v-fab-transition>
        <v-btn
          :to="addRecipeRoute"
          v-show="showFabs"
          fixed
          dark
          fab
          bottom
          right
          color="pink"
          class="mr-2 mb-4"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
    <!-- <div class="text-xs-center pt-3 pb-5">
      <v-pagination :length="6" v-model="page" circle></v-pagination>
    </div> -->
  </v-content>
</template>

<script>
import RecipeCard from './RecipeCard'

export default {
  name: 'MyRecipes',
  components: { RecipeCard },
  props: ['auth', 'authenticated'],

  data () {
    return {
      difficultyLevels: ['Easy', 'Easy/medium', 'Medium', 'Medium/Advanced', 'Advanced'],
      hover: true,
      page: 1,
      addRecipeRoute: '/recipes/add',
      showAddButton: true,
      loading: false,
      showFailureMessage: false,
      showFabs: false
    }
  },

  computed: {
    recipes () {
      return this.$store.state.recipes
    },
    shouldRefresh () {
      return this.$store.state.refreshRecipes
    },
    shoppingListIds () {
      return this.$store.state.shoppingListIds
    },
  },

  methods: {
    loadRecipes () {
      this.$store.commit('clearRecipes')
      this.$emit('set-loading', true)
      this.$store.dispatch('loadMyRecipes').then(() => {
        this.showFailureMessage = false
        this.$emit('set-loading', false)
      }, () => {
        this.$emit('set-loading', false)
        this.showFailureMessage = true
      })
    },
    updateRecipes (recipes) {
      this.recipes = recipes
    },
    viewRecipeRoute (id) {
      return '/recipes/' + id
    },
    toggleShoppingListRecipeIds (e, id) {
      this.$store.dispatch('toggleShoppingListRecipeIds', id)
      e.preventDefault()
    }
  },

  created () {
    if (this.authenticated && this.shouldRefresh) {
      this.loadRecipes()
    }
  },

  mounted () {
    this.showFabs = true
  }
}
</script>
