<template>
  <v-app>
    <v-navigation-drawer
      fixed
      clipped
      v-model="drawer"
      app
    >
      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          router
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left class="blue darken-3" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="appName" :style="$vuetify.breakpoint.smAndUp ? 'width: 260px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3"></v-toolbar-title>
      <v-text-field
        light
        solo
        prepend-icon="search"
        placeholder="Search recipes"
        style="max-width: 500px; min-width: 200px"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <transition name="page">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
  import RecipeCard from './components/RecipeCard';

  export default {
    components: { RecipeCard },
    data () {
      return {
        appName: 'Recipe Share',
        clipped: false,
        drawer: false,
        fixed: true,
        items: [
          {
            title: 'Shared recipes',
            route: '/recipes/shared',
            icon: 'people'
          },
          {
            title: 'My recipes',
            route: '/recipes/myrecipes',
            icon: 'favorite',
          },
          {
            title: 'Add recipe',
            route: '/recipes/add',
            icon: 'add',
          },
          {
            title: 'Settings',
            route: '/settings',
            icon: 'settings',
          }
        ],
        miniVariant: false,
        title: 'My Recipes',
      }
    }
  }
</script>

<style >
.page-enter-active, .page-leave-active {
  transition: opacity 0.1s;
}

.page-enter, .page-leave-to {
  opacity: 0;
}

.router-link-active {
  display: flex;
  align-items: center;
}
      
</style>
