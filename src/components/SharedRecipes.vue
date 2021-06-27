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
    </v-container>
    <div class="text-xs-center pt-3 pb-5">
      <v-pagination
        v-if="totalPages > 1"
        v-model="pageNo"
        :length="totalPages"
        total-visible=6
        @input="pageChanged"
        circle>
      </v-pagination>
    </div>
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
      page: 1,
      pageSize: 10,
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
    shoppingListIds () {
      return this.$store.state.shoppingListIds
    },
    pageNo: {
      get () {
        // get the page number from the route/URL
        if (this.$route.query.page) {
          return parseInt(this.$route.query.page)
        }
        return 1
      },
      set () {
        // do nothing - we have already updated the pageNo in the URL (see
        // pageChanged method)
      }
    },
    totalPages () {
      return Math.ceil(this.$store.state.resultCount / this.pageSize)
    },
    shouldRefresh () {
      return this.$store.state.refreshRecipes
    },
    searchTerm () {
      return this.$route.query.search
    }
  },
  methods: {
    loadRecipes () {
      this.$store.commit('clearRecipes')
      this.$emit('set-loading', true)

      let action
      let params = {
        startPage: this.pageNo,
        pageSize: this.pageSize
      }

      if (this.searchTerm !== undefined && this.searchTerm !== '') {
        action = 'searchAllRecipes'
        params['searchTerm'] = this.searchTerm
      } else {
        action = 'loadAllRecipes'
      }

      this.$store.dispatch(action, params)
      .then(() => {
        this.$emit('set-loading', false)
      }, () => {
        this.$emit('set-loading', false)
        this.showFailureMessage = true
      })
    },
    // Handle pagination. Page number starts at 1.
    pageChanged (pageNo) {
      let route = { path: this.$route.path, query: { page: pageNo } }
      if (this.$route.query.search) {
        route.query = {
          search: this.$route.query.search,
          page: pageNo
        }
      } else {
        route.query = { page: pageNo }
      }

      this.$store.commit('recipesShouldReload')
      this.$router.push(route)
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
    if (this.shouldRefresh) this.loadRecipes()
  }
}
</script>
