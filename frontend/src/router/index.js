import Vue from 'vue'
import Router from 'vue-router'
import MyRecipes from '@/components/MyRecipes'
import AddRecipe from '@/components/AddRecipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recipes/myrecipes',
      name: 'My Recipes',
      component: MyRecipes
    },
    {
      path: '/recipes/shared',
      name: 'Shared Recipes',
      component: MyRecipes
    },
    {
      path: '/recipes/add',
      name: 'Add Recipe',
      component: AddRecipe
    },
    // {
    //   path: '/settings',
    //   name: 'Settings',
    //   component: SettingsPage
    // }
  ]
})
