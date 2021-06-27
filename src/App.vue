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

    <v-toolbar fixed app clipped-left height="54px" class="blue darken-3" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="appName" :style="$vuetify.breakpoint.mdAndUp ? 'width: 260px; min-width: 250px' : 'display: none'" class="ml-0 pl-3"></v-toolbar-title>
      <search-bar @set-loading=setLoading></search-bar>
      <v-flex class="text-xs-right" style="margin-right: 0;">
        <v-btn flat dark v-if="!authenticated" @click="login">Log in</v-btn>
        <v-btn flat dark v-if="authenticated" @click="logout">Log out</v-btn>
      </v-flex xs1>
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
        :key="$route.fullPath"
        :auth="auth"
        :authenticated="authenticated"
        @show-success-msg="displaySuccessMessage"
        @show-error-msg="displayErrorMessage"
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
      <v-icon v-if="!errorToast" color="green">done</v-icon>
      <v-icon v-if="errorToast" color="red">error</v-icon>
    </v-snackbar>
  </v-app>
</template>

<script>
  import './../static/css/main.css'
  import AuthService from './authentication/AuthService'
  import SearchBar from './components/SearchBar'

  const auth = new AuthService()
  const { login, logout, authenticated, authNotifier } = auth

  export default {
    components: { 'SearchBar': SearchBar },
    data () {
      return {
        appName: 'Recipe Share',
        auth,
        authenticated,
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
            icon: 'favorite'
          },
          {
            title: 'Add recipe',
            route: '/recipes/add',
            icon: 'add'
          },
          {
            title: 'Shopping list',
            route: '/shopping-list',
            icon: 'shopping_cart'
          }
        ],
        miniVariant: false,
        title: 'My Recipes',
        toastVisible: false,
        toastMessage: '',
        errorToast: false,
        loading: false
      }
    },

    created () {
      authNotifier.$on('authChange', authState => {
        this.authenticated = authState.authenticated
      })
      this.$store.dispatch('getShoppingListRecipesFromStorage')
    },
    computed: {
      shoppingListIds () {
        return this.$store.state.shoppingListIds
      }
    },
    methods: {
      login,
      logout,
      displaySuccessMessage (message) {
        this.toastMessage = message
        this.errorToast = false
        this.toastVisible = true
      },
      displayErrorMessage (message) {
        this.toastMessage = message
        this.errorToast = true
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
