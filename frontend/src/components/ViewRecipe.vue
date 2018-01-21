<template>
  <v-content>
    <v-container fluid>
      <v-flex xs12 md12>
        <v-layout row wrap class="pb-2">
          <h2 class="mb-2 mr-4">{{ recipe.title }}</h2>
          <div>
            <v-chip
              color="grey darken-2"
              text-color="white"
              small
              disabled
            >
              {{ recipe.time }}
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
        <v-container grid-list-md text-xs-center>
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
        <v-btn
          v-show="showFabs"
          :to="editRecipeRoute"
          fixed
          dark
          fab
          bottom
          right
          color="pink"
          class="mb-4 left-fab"
        >
          <v-icon>create</v-icon>
        </v-btn>
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
</template>

<script>
export default {
  name: 'ViewRecipe',
  props: ['id'],
  data () {
    return {
      myRecipesRoute: '/recipes/myrecipes',
      active: null,
      showFabs: false
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
}
.recipe-card-underline {
  padding: 0;
  height: 2px;
}
</style>
