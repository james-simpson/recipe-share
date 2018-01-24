<template>
  <v-content>
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
import RecipeCard from './RecipeCard';
import axios from 'axios';

export default {
  name: 'MyRecipes',
  components: { RecipeCard },
  data () {
    return {
      difficultyLevels: ['Easy', 'Easy/medium', 'Medium', 'Medium/Advanced', 'Advanced'],
      hover: true,
      page: 1,
      addRecipeRoute: '/recipes/add',
      showAddButton: true,
      loading: false,
      showFabs: false
    }
  },
  computed: {
    recipes () {
      return this.$store.state.recipes;
    }
  },
  methods: {
    updateRecipes(recipes) {
      this.recipes = recipes;
    },
    viewRecipeRoute (id) {
      return '/recipes/' + id;
    }
  },
  created () {
    this.$store.commit('clearRecipes')
    this.$emit('set-loading', true)

    var self = this;
    axios.get('http://localhost:8000/api/recipes')
      .then(function (response) {
        self.$store.commit('updateRecipes', response.data)
        self.$emit('set-loading', false)
      })
      .catch(function (error) {
          console.log(error.message);
      });
  },
  mounted () {
    this.showFabs = true;
  }
}
</script>
