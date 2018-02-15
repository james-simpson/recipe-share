<template>
  <v-content>
    <v-container fluid>
      <v-layout row wrap class="header-layout">
        <div class="recipe-info">
          <h2 class="mb-2">{{ recipe.title }}</h2>
          <div class="recipe-author-text mb-2">{{ recipe.author }}</div>
          <div class="mb-2">Serves {{ recipe.servings }}</div>
          <v-layout row wrap class="mb-2">
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
              {{ difficultyLabel }}
            </v-chip>
            <v-chip
              v-if="recipe.vegetarian && !recipe.vegan"
              color="grey darken-2"
              text-color="white"
              small
              disabled
            >
              Vegetarian
            </v-chip>
            <v-chip
              v-if="recipe.vegan"
              color="grey darken-2"
              text-color="white"
              small
              disabled
            >
              Vegan
            </v-chip>
          </v-layout>
        </div>
        <img :src="recipe.image" class="recipe-image-large"/>
      </v-layout>

      <v-container grid-list-md id="recipeDetailsContainer">
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
              :class="{ 'fullscreen-text': fullscreen }"
            >
              <v-card flat class="recipe-text">
                <v-card-text>{{ tab.text }}</v-card-text>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
        <v-layout row wrap hidden-sm-and-down>
          <v-flex xs3>
            <v-card dark color="cyan">
              <v-card-text class="recipe-detail-card-header">ingredients</v-card-text>
              <div class="recipe-card-underline yellow"></div>
              <v-card-text
                class='recipe-text recipe-detail-card-text'
                :class="{ 'fullscreen-text': fullscreen }"
              >{{ recipe.ingredients }}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs9>
            <v-card dark color="cyan" :class="{ 'fullscreen-text': fullscreen }">
              <v-card-text class="recipe-detail-card-header">method</v-card-text>
              <div class="recipe-card-underline yellow"></div>
              <v-card-text
                class='recipe-text recipe-detail-card-text'
                :class="{ 'fullscreen-text': fullscreen }"
              >{{ recipe.method }}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

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
          @click="navigateBack"
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
import { getRecipeDurationLabel, getDifficultyLabel } from '../utils.js';

export default {
  name: 'ViewRecipe',
  props: ['id'],
  data () {
    return {
      myRecipesRoute: '/recipes/my-recipes',
      active: null,
      showFabs: false,
      fab: false,
      fullscreen: false
    }
  },
  computed: {
    recipe () {
      return this.$store.getters.getRecipeById(this.id);
    },
    editRecipeRoute () {
      return '/recipes/' + this.recipe.id + '/edit'
    },
    difficultyLabel () {
      return getDifficultyLabel(this.recipe.difficulty);
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
    // go back to my recipes or shared recipes, whichever we came from
    // TODO: actually do this - maybe use router.beforeEach to store recent
    // routes
    navigateBack () {
      this.$router.push({ name: 'My Recipes' });
    },

    handleDelete () {
      this.$emit('set-loading', 'true');
      this.$store.dispatch("deleteRecipe", this.recipe).then((response) => {
        this.$emit('set-loading', false);
        this.$router.push({ name: 'My Recipes' });
        this.$emit('show-toast', 'Recipe deleted');
      }, error => {
        console.log(error)
        this.$emit('set-loading', false);
        this.$emit('show-toast', 'Failed to delete recipe');
      })
    },

    // enter fullscreen mode, focusing on the ingredients and method
    requestFullscreen () {
      this.fullscreen = !this.fullscreen
      this.getRequestFullscreen().call(document.getElementById('recipeDetailsContainer'))
    },

    // get the supported function to request fullscreen
    getRequestFullscreen () {
      let root = document.documentElement
      return root.requestFullscreen || root.webkitRequestFullscreen || root.mozRequestFullScreen || root.msRequestFullscreen
    },
    addFullscreenListener () {
      document.addEventListener("fullscreenchange", this.onFullScreenChange, false);
      document.addEventListener("webkitfullscreenchange", this.onFullScreenChange, false);
      document.addEventListener("mozfullscreenchange", this.onFullScreenChange, false);
    },
    onFullScreenChange () {
      let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      if (fullscreenElement === null) {
        this.fullscreen = false;
      } else {
        this.fullscreen = true;
      }
    }
  },
  mounted () {
    this.showFabs = true;
    this.addFullscreenListener();
  }
}
</script>

<style scoped>

/* This ensures that there will be an 80px gap between
   the recipe header text (title, author etc.) and the image
   if they are displayed side by side. */
.header-layout {
  margin-left: -80px;
}
.header-layout > * {
  margin-left: 80px;
}

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
.recipe-author-text {
  font-size: 16px;
}
.recipe-image-large {
  height: 150px;
  margin-bottom: 10px;
}
.fullscreen-text {
  height: 90vh;
  overflow: auto;
}

@media(max-width:500px) {
  .recipe-text { font-size: 125% }
}
</style>
