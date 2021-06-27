<template>
  <v-content>
    <v-container fluid>
      <div v-if="showShoppingList">
          <h2>Selected recipes</h2>
          <li v-for="recipe in shoppingListTitles">
              {{ recipe }}
          </li>
          <copy-list :ingredients="shoppingList" />
          <h2>Ingredients</h2>
          <li v-for="item in shoppingList">
              {{ item }}
          </li>
      </div>
      <div v-else>
        You haven't selected any recipes for your shopping list.
      </div>
    </v-container>
  </v-content>
</template>

<script>
import {} from '../utils.js'
import CopyList from './CopyList'

export default {
  name: 'ShoppingList',
  components: { CopyList },
  props: ['ids'],
  computed: {
    shoppingListTitles () {
      return this.$store.state.shoppingListTitles
    },
    shoppingList () {
      return this.$store.state.shoppingList
    },
    showShoppingList () {
      return this.$store.state.shoppingList.length > 0
    }
  },
  mounted () {
    this.$store.dispatch('getShoppingListIngredients')
  }
}
</script>
<style>
 h2 {
   margin-bottom: 20px;
 }
</style>