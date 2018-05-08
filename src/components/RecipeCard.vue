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
              {{ difficultyLabel }}
            </v-chip>
            <v-chip
              v-if="vegetarian && !vegan"
              color="grey darken-3"
              text-color="white"
              small
              disabled
            >
              Vegetarian
            </v-chip>
            <v-chip
              v-if="vegan"
              color="grey darken-3"
              text-color="white"
              small
              disabled
            >
              Vegan
            </v-chip>
          </div>
        </v-flex>
        <v-flex xs5>
          <v-card-media
            :src="image"
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
import { getRecipeDurationLabel, getDifficultyLabel } from '../utils.js'

export default {
  name: 'RecipeCard',
  data: function () {
    return {
      test: 'test'
    }
  },
  props: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: false },
    time: { type: Number, required: true },
    difficulty: { type: Number, required: true },
    difficultyLevels: { },
    vegetarian: { type: Boolean, required: true },
    vegan: { type: Boolean, required: true },
    sweet: { type: Boolean, required: true },
    to: { type: String, required: true }
  },
  computed: {
    color () {
      if (this.sweet) return 'pink lighten-2'
      if (this.vegetarian) return 'green'
      return 'cyan darken-1'
    },
    difficultyLabel () {
      return getDifficultyLabel(this.difficulty)
    },
    timeLabel () {
      return getRecipeDurationLabel(this.time)
    }
  }
}
</script>

<style >
.loading-icon {
  text-align: center;
}
</style>
