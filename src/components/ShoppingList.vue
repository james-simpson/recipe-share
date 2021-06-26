<template>
  <v-content>
    <v-container fluid>
      <div v-if="showShoppingList">
          <h2>Showing ingredients for the following recipes:</h2>
          <br>
          <p v-for="recipe in shoppingListTitles">
              {{ recipe }}
          </p>
          <br>
          <h2>Ingredients:</h2>
          <br>
          <p v-for="item in shoppingList">
              {{ item }}
          </p>
      </div>
      <div v-else>
        You haven't selected any recipes for your shopping list.
      </div>
    </v-container>
  </v-content>
</template>

<script>
import {  } from '../utils.js'

export default {
  name: 'ShoppingList',
  props: ['ids'],
  data () {
    return {
    }
  },
  computed: {
    shoppingListTitles() {
        return this.$store.state.shoppingListTitles;
    },
    shoppingList() {
        return this.$store.state.shoppingList;
    },
    showShoppingList()
    {
      return this.$store.state.shoppingList.length > 0;
    }
  },
  mounted() {
    this.$store.commit('getShoppingList');
  }
}
</script>

<style scoped>

</style>
