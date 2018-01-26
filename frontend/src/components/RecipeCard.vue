<template>
  <v-card :color="color" class="white--text" :to="to" hover="hover">
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex xs7>
          <div>
            <div class="title">{{ title }}</div>
            <div class="pb-2">{{ author }}</div>
            <v-chip
              color="grey darken-3"
              text-color="white"
              small
              disabled
            >
              {{ timeLabel }}
            </v-chip>
            <v-chip
              color="grey darken-3"
              text-color="white"
              small
              disabled
            >
              {{ difficultyLevel }}
            </v-chip>
            <v-chip
              v-if="vegetarian"
              color="grey darken-3"
              text-color="white"
              small
              disabled
            >
              Vegetarian
            </v-chip>
          </div>
        </v-flex>
        <v-flex xs5>
          <v-card-media
            :src="imagePath"
            height="120px"
            contain
            center
          ></v-card-media>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import { getRecipeDurationLabel } from '../utils.js';

  export default {
    name: 'RecipeCard',
    props: [
      'title',
      'author',
      'image',
      'time',
      'difficulty',
      'difficultyLevels',
      'vegetarian',
      'vegan',
      'sweet',
      'to'
    ],
    computed: {
      color: function() {
        if (this.sweet === true) {
          return 'pink lighten-2'
        }

        if (this.vegetarian === true) {
          return 'green';
        }

        return 'cyan darken-1';
      },
      imagePath: function() {
        return '/static/' + this.image;
      },
      difficultyLevel: function() {
        return this.difficultyLevels[this.difficulty];
      },
      timeLabel () {
        return getRecipeDurationLabel(this.time);
      }
    }
  }
</script>

<style >
.loading-icon {
  text-align: center;
}      
</style>
