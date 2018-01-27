import Vue from 'vue'
import Router from 'vue-router'
import MyRecipes from '@/components/MyRecipes'
import ViewRecipe from '@/components/ViewRecipe'
import EditRecipe from '@/components/EditRecipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recipes/my-recipes',
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
      component: EditRecipe,
    },
    {
      path: '/recipes/:id',
      name: 'View Recipe',
      component: ViewRecipe,
      props: true
    },
    {
      path: '/recipes/:id/edit',
      name: 'Edit Recipe',
      component: EditRecipe,
      props: true
    },
  ]
})
