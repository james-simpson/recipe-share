<template>
    <v-text-field
      v-model="searchTerm"
      @keyup.enter="search"
      id="searchBar"
      light
      solo
      prepend-inner-icon="search"
      placeholder="Search recipes"
      class="search-field"
      :class="{ 'search-field-small': $vuetify.breakpoint.smAndDown }"
    ></v-text-field>
</template>

<script>
export default {
  name: 'SearchBar',
  data: () => ({
    searchTerm: ''
  }),
  methods: {
    search () {
      // If on a small screen, remove focus from the search bar.
      // This should hide the keyboard on mobile devices.
      if (this.$vuetify.breakpoint.smAndDown) {
        document.getElementById('searchBar').blur()
      }

      this.$store.commit('recipesShouldReload')

      let route = {
        path: '/recipes/shared'
      }
      if (this.searchTerm !== '') {
        route['query'] = { search: this.searchTerm }
      }

      this.$router.push(route)

      // console.log(this.$router.currentRoute)
      // if (route.path === this.$router.currentRoute.path && route.query === this.$router.currentRoute.query) {
      //   this.$router.go(route)
      // } else {
      //   this.$router.push(route)
      // }
    }
  }
}
</script>

<style >
.search-field {
  min-width: 190px;
  max-width: 500px;
  min-height: unset !important;
}

.search-field .v-input__slot {
  padding-top: 4px;
  padding-bottom: 4px;
}

.search-field-small {
  margin-left: 10px;
}
</style>
