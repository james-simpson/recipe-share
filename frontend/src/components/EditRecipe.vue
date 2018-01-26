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
          <v-layout row wrap>
            <v-flex xs2 mr-4>
              <v-select
                label="hours"
                :items="hoursOptions"
                v-model="hours"
                prepend-icon="hourglass_empty"
                required
              ></v-select>
            </v-flex>
            <v-flex xs2 mr-4>
              <v-select
              label="minutes"
              :items="minutesOptions"
              v-model="minutes"
              required
            ></v-select>
            </v-flex>
          </v-layout>
          <v-radio-group v-model="recipe.difficulty" row class="difficulty-levels-radio-group">
            <v-radio v-for="(level, i) in difficultyLevels" :label="level" :value="i" ></v-radio>
          </v-radio-group>
          <v-layout row wrap>
            <v-flex xs2>
              <v-checkbox label="Sweet" v-model="recipe.sweet" light></v-checkbox>
            </v-flex>
            <v-flex xs2>
              <v-checkbox label="Vegetarian" v-model="recipe.vegetarian" light></v-checkbox>
            </v-flex>
            <v-flex xs2 v-show="recipe.vegetarian">
              <v-checkbox label="Vegan" v-model="recipe.vegan" light></v-checkbox>
            </v-flex>
          </v-layout>
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
      recipe: { title: '', vegetarian: false, vegan: false, sweet: false },
      valid: false,
      nameRules: [
        (v) => !!v || 'Title is required',
        (v) => v.length <= 100 || 'Name must be less than 100 characters'
      ],
      difficulty: '',
      difficultyLevels: ['Easy', 'Easy/Med', 'Medium', 'Med/Adv', 'Advanced'],
      hoursOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 20, 24, 48],
      minutesOptions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      minutes: null,
      hours: null,
      myRecipesRoute: '/recipes/myrecipes',
      active: null,
      autoGrow: true,
      showFabs: false,
    }
  },
  computed: {
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
    },
  },
  methods: {
    saveChanges () {
      this.$emit('set-loading', 'true');

      this.recipe.time = this.hours * 60 + this.minutes;

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
  created () {
    if (!this.isNewRecipe) {
      var recipeFromStore = this.$store.getters.getRecipeById(this.id);

      // clone the recipe from the store so we can edit it without
      // mutating the store's state
      this.recipe =  Object.assign({}, recipeFromStore);
    } else {
      // new recipe
      return { title: '', vegetarian: false, vegan: false, sweet: false };
    } 

    this.hours = Math.floor(this.recipe.time / 60);
    this.minutes = this.recipe.time % 60;
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
.difficulty-levels-radio-group {
  width: 75%;
}
</style>
