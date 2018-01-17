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
            :attributes="recipe.attributes"
            class="white--text"
          ></recipe-card>
        </v-flex>
      </v-layout>
      <v-fab-transition>
        <v-btn
          :to="addRecipeRoute"
          v-show="showAddButton"
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
    <div class="text-xs-center pt-3 pb-5">
      <v-pagination :length="6" v-model="page" circle></v-pagination>
    </div>
  </v-content>
</template>

<script>
import RecipeCard from './RecipeCard';

export default {
  name: 'MyRecipes',
  components: { RecipeCard },
  data () {
    return {
      recipes: [
        {
          id: 1,
          title: 'Spaghetti carbonara',
          author: 'Jamie Oliver',
          image: '/static/carbonara.jpeg',
          attributes: {
            time: '15m',
            difficulty: 'Easy',
            vegetarian: false
          },
        },
        {
          id: 2,
          title: 'Butternut squash lasagne',
          author: 'Nigella Lawson',
          image: '/static/butternut-squash-lasagne.jpg',
          attributes: {
            time: '2h 30m',
            difficulty: 'Medium',
            vegetarian: true
          },
        },
        {
          id: 3,
          title: 'Chocolate brownies',
          author: 'Mary Berry',
          image: '/static/brownies.jpg',
          attributes: {
            time: '1h 30m',
            difficulty: 'Easy',
            vegetarian: true,
            sweet: true
          },
        },
        {
          id: 4,
          title: 'Classic Melton Mowbray pork pie',
          author: 'Hairy bikers',
          image: '/static/melton-mowbray.jpg',
          attributes: {
            time: '3h',
            difficulty: 'Advanced',
            vegetarian: false
          },
        },
      ],
      hover: true,
      page: 1,
      addRecipeRoute: '/recipes/add',
      showAddButton: true
    }
  }
}
</script>
