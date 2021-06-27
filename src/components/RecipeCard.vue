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
          <v-img
            :src="image"
            height="120px"
            contain
            center
          ></v-img>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn
      @click="toggleShoppingListRecipeIds($event, id)"
      fab
      top
      right
      dark
      :color="listButtonColor"
      class="shopping-list-button"
    >
      <v-icon v-if="inShoppingList" dark>done</v-icon>
      <v-icon v-else>add_shopping_cart</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { getRecipeDurationLabel, getDifficultyLabel } from '../utils.js'

export default {
  name: 'RecipeCard',
  props: [
    'id',
    'title',
    'author',
    'image',
    'time',
    'difficulty',
    'difficultyLevels',
    'vegetarian',
    'vegan',
    'sweet',
    'to',
    'shoppingListIds',
    'toggleShoppingListRecipeIds'
  ],
  computed: {
    color () {
      if (this.sweet === true) {
        return 'pink lighten-2'
      }

      if (this.vegetarian === true) {
        return 'green'
      }

      return 'cyan darken-1'
    },
    difficultyLevel () {
      return getDifficultyLabel(this.difficulty)
    },
    timeLabel () {
      return getRecipeDurationLabel(this.time)
    },
    inShoppingList () {
      return this.shoppingListIds.includes(this.id)
    },
    listButtonColor () {
      return this.inShoppingList ? 'green' : 'primary'
    }
  }
}
</script>

<style >
.loading-icon {
  text-align: center;
}
.shopping-list-button {
  position: absolute !important;
  top: 5px !important;
  right: 5px !important;
}
</style>
