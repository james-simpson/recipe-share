<template>
  <v-card :color="color" class="white--text" :to="editRecipeRoute" hover="hover">
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
              {{ attributes.time }}
            </v-chip>
            <v-chip
              color="grey darken-3"
              text-color="white"
              small
              disabled
            >
              {{ attributes.difficulty }}
            </v-chip>
            <v-chip
              v-if="attributes.vegetarian"
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
  export default {
    name: 'RecipeCard',
    props: ['title', 'author', 'image', 'attributes'],
    data: function() {
      return {
        editRecipeRoute: '/recipes/add'
      }
    },
    computed: {
      color: function() {
        if (this.attributes.sweet === true) {
          return 'pink lighten-2'
        }

        if (this.attributes.vegetarian === true) {
          return 'green';
        }

        return 'cyan darken-1';
      }
    }
  }
</script>
