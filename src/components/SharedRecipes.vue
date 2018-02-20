<template>
  <v-content>
    <v-container v-if="showFailureMessage">
      <h2 class="login-prompt-text title text-xs-center">
        Unable to load recipes. <a @click="loadRecipes">Retry</a>
      </h2>
    </v-container>
    <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12 md6 v-for="recipe in recipes">
          <recipe-card
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
            class="white--text"
          ></recipe-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <div class="text-xs-center pt-3 pb-5">
      <v-pagination :length="6" v-model="page" circle></v-pagination>
    </div> -->
  </v-content>
</template>

<script>
import RecipeCard from './RecipeCard'

export default {
  name: 'SharedRecipes',
  components: { RecipeCard },
  data () {
    return {
      difficultyLevels: ['Easy', 'Easy/medium', 'Medium', 'Medium/Advanced', 'Advanced'],
      hover: true,
      page: 1,
      addRecipeRoute: '/recipes/add',
      showAddButton: true,
      loading: false,
      showFailureMessage: false
    }
  },
  computed: {
    recipes () {
      return this.$store.state.recipes
    },
    shouldRefresh () {
      return this.$store.state.refreshRecipes
    }
  },
  methods: {
    loadRecipes () {
      this.$store.commit('clearRecipes')
      this.$emit('set-loading', true)
      this.$store.dispatch('loadAllRecipes').then(() => {
        this.$emit('set-loading', false)
      }, () => {
        this.$emit('set-loading', false)
        this.showFailureMessage = true
      })
    },
    viewRecipeRoute (id) {
      return '/recipes/' + id
    }
  },
  created () {
    if (this.shouldRefresh) this.loadRecipes()
  }
}
</script>
