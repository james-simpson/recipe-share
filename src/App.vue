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
    <!-- TODO: change toolbar colour. maybe #1055a4? -->
    <v-toolbar fixed app clipped-left class="indigo" dark>
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
    <div class="progress-bar" v-if="loading">
      <v-progress-linear
          v-bind:indeterminate="true"
          height="4"
          style="margin-top: 80px;"
          :class="{ loadingWithNav: drawer }"
      ></v-progress-linear>
    </div>
    <transition name="page">
      <router-view
        @show-toast=displayToast
        @set-loading=setLoading
        v-show="!loading"
      ></router-view>
    </transition>
    <v-snackbar
      :timeout="2000"
      top
      right
      v-model="toastVisible"
      class="toast"
    >
      {{ toastMessage }}
      <v-icon color="pink">done</v-icon>
    </v-snackbar>
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
            route: '/recipes/my-recipes',
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
        toastMessage: '',
        toastVisible: false,
        loading: false
      }
    },

    methods: {
      displayToast (message) {
        this.toastMessage = message
        this.toastVisible = true
      },
      setLoading (loading) {
        this.loading = loading
      }
    }
  }
</script>

<style >
.page-enter-active{
  transition: opacity 0.2s;
}

.page-enter {
  opacity: 0;
}

.router-link-active {
  display: flex;
  align-items: center;
}

.toast {
  margin-top: 65px;
}

.progress-bar {
  padding-left: 10px;
  padding-right: 10px;
}

.loadingWithNav {
  margin-left: 310px;
  width: calc(100% - 320px);
}   
</style>
