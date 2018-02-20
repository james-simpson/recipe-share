import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import AuthCallback from '@/components/AuthCallback'
import SharedRecipes from '@/components/SharedRecipes'
import MyRecipes from '@/components/MyRecipes'
import ViewRecipe from '@/components/ViewRecipe'
import EditRecipe from '@/components/EditRecipe'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth-callback',
      name: 'Auth Callback',
      component: AuthCallback
    },
    {
      path: '/recipes/shared',
      name: 'Shared Recipes',
      component: SharedRecipes
    },
    {
      path: '/recipes/my-recipes',
      name: 'My Recipes',
      component: MyRecipes
    },
    {
      path: '/recipes/add',
      name: 'Add Recipe',
      component: EditRecipe
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

    // Fallback route
    { path: '*', redirect: '/recipes/shared' }
  ]
})

router.beforeEach((to, from, next) => {
  // Ensure recipes are reloaded when switching between My Recipes & Shared Recipes
  if (to.name === 'Shared Recipes') {
    if (store.state.routeHistory.lastIndexOf('My Recipes') > store.state.routeHistory.lastIndexOf('Shared Recipes')) {
      store.commit('recipesShouldReload')
    }
  } else if (to.name === 'My Recipes') {
    if (store.state.routeHistory.lastIndexOf('Shared Recipes') > store.state.routeHistory.lastIndexOf('My Recipes')) {
      store.commit('recipesShouldReload')
    }
  }

  // Record each route we navigate to in an array in the central store. This
  // information is used to make more complex routing decisions e.g. where the
  // back button on the view recipe should direct to.
  store.commit('logRouteVisit', to.name)

  next()
})

export default router
