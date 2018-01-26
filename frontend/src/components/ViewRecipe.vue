<template>
  <v-content>
    <v-container fluid>
      <v-flex xs12 md12>
        <h2 class="mb-2 mr-4">{{ recipe.title }}</h2>
        <v-layout row wrap class="mb-2">
          <p class="recipe-author-text mr-4">{{ recipe.author }}</p>
          <div>
            <v-chip
              color="grey darken-2"
              text-color="white"
              small
              disabled
            >
              {{ timeLabel }}
            </v-chip>
            <v-chip
              color="grey darken-2"
              text-color="white"
              small
              disabled
            >
              {{ recipe.difficulty }}
            </v-chip>
            <v-chip
              v-if="recipe.vegetarian"
              color="grey darken-2"
              text-color="white"
              small
              disabled
            >
              Vegetarian
            </v-chip>
          </div>
        </v-layout>
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
                <v-card-text>{{ tab.text }}</v-card-text>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
        <v-container grid-list-md text-xs-center id="recipeDetailsContainer">
          <v-layout row wrap hidden-sm-and-down>
            <v-flex xs3>
              <v-card dark color="cyan">
                <v-card-text class="recipe-detail-card-header">ingredients</v-card-text>
                <div class="recipe-card-underline yellow"></div>
                <v-card-text class='recipe-text recipe-detail-card-text'>{{ recipe.ingredients }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs9>
              <v-card dark color="cyan">
                <v-card-text class="recipe-detail-card-header">method</v-card-text>
                <div class="recipe-card-underline yellow"></div>
                <v-card-text class='recipe-text recipe-detail-card-text'>{{ recipe.method }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-fab-transition>
        <v-speed-dial
          v-show="showFabs"
          v-model="fab"
          fixed
          dark
          fab
          bottom
          right
          color="pink"
          :hover="true"
        >
          <v-btn
            slot="activator"
            color="pink"
            dark
            fab
            hover
            v-model="fab"
            class="mb-4 left-fab"
          >
            <v-icon>more_vert</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn
            :to="editRecipeRoute"
            fab
            dark
            small
            color="indigo"
            class="left-fab"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            @click="handleDelete"
            fab
            dark
            small
            color="red"
            class="left-fab"
          >
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn
            @click="requestFullscreen"
            fab
            dark
            small
            color="green"
            class="left-fab"
          >
            <v-icon>fullscreen</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-fab-transition>
      <v-fab-transition>
        <v-btn
          v-show="showFabs"
          :to="myRecipesRoute"
          fixed
          dark
          fab
          bottom
          right
          color="grey"
          class="mr-2 mb-4"
        >
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
  </v-content>
  </fullscreen>
</template>

<script>
import axios from 'axios'
import { getRecipeDurationLabel } from '../utils.js';

export default {
  name: 'ViewRecipe',
  props: ['id'],
  data () {
    return {
      myRecipesRoute: '/recipes/myrecipes',
      active: null,
      showFabs: false,
      fab: false,
      fullscreen: true
    }
  },
  computed: {
    recipe () {
      return this.$store.getters.getRecipeById(this.id);
    },
    editRecipeRoute () {
      return '/recipes/' + this.recipe.id + '/edit'
    },
    difficulty () {
      return this.recipe
    },
    timeLabel () {
      return getRecipeDurationLabel(this.recipe.time);
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
    }
  },
  methods: {
    handleDelete () {
      this.$emit('set-loading', 'true');
      var self = this;
      axios.delete('http://localhost:8000/api/recipes/' + this.recipe.id + '/delete')
        .then(function (response) {
          console.log(response.data)
          if (response.data.status === 'success') {
            self.$router.push({ name: 'My Recipes' })
            self.$emit('show-toast', 'Recipe deleted');
          }
        })
        .catch(function (error) {
            console.log('Failed to add recipe: ' + error.message);
        });
    },

    // enter fullscreen mode, focusing on the ingredients and method
    requestFullscreen () {
      this.fullscreen = !this.fullscreen
      this.getreqfullscreen().call(document.getElementById('recipeDetailsContainer')) 
    },

    // get the supported function to request fullscreen
    getreqfullscreen(){
      var root = document.documentElement
      return root.requestFullscreen || root.webkitRequestFullscreen || root.mozRequestFullScreen || root.msRequestFullscreen
    }
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
  /* TODO: add line-height property for ingredients */
}
.recipe-card-underline {
  padding: 0;
  height: 2px;
}
.recipe-author-text {
  font-size: 16px;
}
</style>
