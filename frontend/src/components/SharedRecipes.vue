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
    </v-container>
    <div class="text-xs-center pt-3 pb-5">
      <v-pagination :length="6" v-model="page" circle></v-pagination>
    </div>
  </v-content>
</template>

<script>
import RecipeCard from './RecipeCard';

export default {
  name: 'SharedRecipes',
  components: { RecipeCard },
  data () {
    return {
      recipes: [
        {
          title: 'Spaghetti carbonara',
          author: 'Jamie Oliver',
          image: '/static/carbonara.jpeg',
          color: 'cyan darken-2',
          attributes: {
            time: '15m',
            difficulty: 'Easy',
            vegetarian: false
          },
        },
        {
          title: 'Butternut squash lasagne',
          author: 'Nigella Lawson',
          image: '/static/butternut-squash-lasagne.jpg',
          color: 'green',
          attributes: {
            time: '2h 30m',
            difficulty: 'Medium',
            vegetarian: true
          },
        },
        {
          title: 'Chocolate brownies',
          author: 'Mary Berry',
          image: '/static/brownies.jpg',
          color: 'pink lighten-2',
          attributes: {
            time: '1h 30m',
            difficulty: 'Easy',
            vegetarian: true,
            sweet: true
          },
        },
        {
          title: 'Classic Melton Mowbray pork pie',
          author: 'Hairy bikers',
          image: '/static/melton-mowbray.jpg',
          color: 'cyan darken-2',
          attributes: {
            time: '3h',
            difficulty: 'Advanced',
            vegetarian: false
          },
        },
      ],
      hover: true,
      page: 1,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
