<template>
  <v-content>
    <v-container fluid>
      <v-flex xs12 md12>
        <v-form v-model="valid">
          <v-text-field
            label="Title"
            v-model="recipe.title"
            :rules="nameRules"
            :counter="100"
            required
          ></v-text-field>
          <v-text-field
            label="Author"
            v-model="recipe.author"
            required
          ></v-text-field>
          <v-select
            label="Time estimate"
            :items="difficultyLevels"
            v-model="recipe.time"
            required
          ></v-select>
          <v-select
            label="Difficulty level"
            :items="difficultyLevels"
            v-model="recipe.difficulty"
            item-value="text"
            required
          ></v-select>
        </v-form>
        <v-tabs v-model="active" lazy class="hidden-md-and-up">
          <v-tabs-bar class="cyan" dark>
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab.id"
              :href="'#' + tab.id"
              ripple
            >
              {{ tab.title}}
            </v-tabs-item>
            <v-tabs-slider color="yellow"></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content
              v-for="(tab, i) in tabs"
              :key="i"
              :id="'tab-' + i"
            >
              <v-card flat class="recipe-text">
                <v-card-text class='recipe-text'>
                  <textarea v-autosize="tab.text" v-model="tab.text" class="textarea-input"></textarea>
              </v-card-text>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap hidden-sm-and-down>
            <v-flex xs3>
              <v-card dark color="cyan">
                <v-card-text class="recipe-detail-card-header">ingredients</v-card-text>
                <div class="recipe-card-underline yellow"></div>
                <v-card-text class='recipe-text recipe-detail-card-text'>
                    <textarea
                      v-model="recipe.ingredients"
                      v-autosize="recipe.ingredients"
                      class="textarea-input"
                      placeholder="Ingredients here"
                    >
                        {{ recipe.ingredients }}
                    </textarea>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs9>
              <v-card dark color="cyan">
                <v-card-text class="recipe-detail-card-header">method</v-card-text>
                <div class="recipe-card-underline yellow"></div>
                <v-card-text class='recipe-text recipe-detail-card-text'>
                    <textarea
                      v-model="recipe.method"
                      v-autosize="recipe.method"
                      class="textarea-input"
                      placeholder="Method here"
                    ></textarea>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
        <v-fab-transition>
          <v-btn
            @click="saveChanges"
            v-show="showFabs"
            fixed
            dark
            fab
            bottom
            right
            color="pink"
            class="mb-4 left-fab"
          >
            <v-icon>done</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-fab-transition>
          <v-btn
            @click="cancelChanges"
            v-show="showFabs"
            fixed
            dark
            fab
            bottom
            right
            color="grey"
            class="mr-2 mb-4"
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-fab-transition>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditRecipe',
  props: ['id'],
  data () {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || 'Title is required',
        (v) => v.length <= 100 || 'Name must be less than 100 characters'
      ],
      difficulty: '',
      difficultyLevels: ['Easy', 'Easy/Medium', 'Medium', 'Medium/Advanced', 'Advanced'],
      myRecipesRoute: '/recipes/myrecipes',
      // recipe: {
      //   title: 'Sticky Kickin Chicken',
      //   ingredients: "Salad\n200g thin rice noodles sesame oil\n800g watermelon\n2 little gem lettuces\n1 handful of radishes\nHalf a bunch of fresh mint\nHalf a bunch of fresh coriander\n\nChicken\n8 skinless, boneless chicken thighs\n1 tbsp Chinese five-spice\nolive oil\n2 tbsp sweet chilli sauce\n2 tbsp sesame seeds\n\nDressing\n2 tbsp low-salt soy sauce\n1 tbsp fish sauce\nHalf a fresh red chilli\nHalf a thumb-sized piece of ginger\n2 spring onions\n2 limes\n1 small clove of garlic",
      //   method: "On a large sheet of greaseproof paper, toss the chicken with salt, pepper and the five-spice. Fold over the paper, then bash and flatten the chicken to 1.5cm thick with a rolling pin. Put into the large frying pan with 1 tablespoon of olive oil, turning after 3 or 4 minutes, until nicely charred and cooked through.\n\nDrain the noodles and toss with 1 tablespoon of sesame oil on a big serving platter. Put half of the noodles into the medium frying pan, tossing regularly until nice and crunchy.\n\nRemove the watermelon skin, cut the flesh into erratic chunks and add to the platter. Trim the lettuces and cut into small wedges, halve the radishes, finely slice the top leafy half of the mint and most of the top leafy half of the coriander, and scatter over the platter.\n\nPut the coriander stalks into the liquidizer with the soy and fish sauces, chilli, peeled ginger, trimmed spring onions, a splash of water, 1 tablespoon of sesame oil and the lime juice. Squash in the unpeeled garlic through a garlic crusher, then whiz until smooth.\n\nDrain away any excess fat from the chicken pan, put back on the heat, drizzle with the sweet chilli sauce and toss with the sesame seeds.",
      //   attributes: {
      //     time: '2h 30m',
      //     difficulty: 'Medium',
      //     vegetarian: true
      //   },
      // },
      active: null,
      autoGrow: true,
      showFabs: false
    }
  },
  computed: {
    recipe () {
      if (!this.isNewRecipe) {
        var recipeFromStore = this.$store.getters.getRecipeById(this.id);

        // clone the recipe from the store so we can edit it without
        // mutating the store's state
        return Object.assign({}, recipeFromStore);
      } else {
        // new recipe
        return { title: '', vegetarian: false, vegan: false, sweet: false };
      }    
    },
    tabs () {
      return [
        { 
          id: 'tab-0',
          title: 'ingredients',
          text: this.recipe.ingredients
        },
        { 
          id: 'tab-1',
          title: 'method',
          text: this.recipe.method
        }
      ]
    },
    isNewRecipe () {
      return typeof this.id === 'undefined';
    }
  },
  methods: {
    saveChanges () {
      this.$emit('set-loading', 'true');

      // TODO: get time & difficult from user
      this.recipe.time = 30;
      this.recipe.difficulty = 1;

      var self = this;
      axios.post('http://localhost:8000/api/recipes/add', self.recipe)
        .then(function (response) {

          if (response.data.status === 'success') {
            self.$router.push({ name: 'My Recipes' });
            self.$emit('show-toast', 'Recipe saved');
          }
        })
        .catch(function (error) {
            console.log('Failed to add recipe: ' + error.message);
            self.$emit('set-loading', false);
        });
    },
    cancelChanges () {
      if (this.isNewRecipe) {
        this.$router.push({ name: 'My Recipes' });
      } else {
        this.$router.push({ name: 'View Recipe', params: { id: this.id } });
      }
    },
  },
  mounted () {
    this.showFabs = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recipe-text {
  white-space: pre-wrap; 
  font-family: inherit;
}

.left-fab {
  margin-right: 80px;
}

.textarea-input {
  width: 100%;
  padding: 15px;
  border-style: dotted;
}

.textarea-input:focus {
  border-style: none;
}
.recipe-detail-card-header {
  height: 48px !important;
  text-transform: uppercase;
  text-align: left;
  padding-left: 30px;
}
.recipe-detail-card-text {
  background: white;
  color: rgba(0,0,0,0.87);
  text-align: left;
  font-size: 15px;
}
.recipe-card-underline {
  padding: 0;
  height: 2px;
}
</style>
