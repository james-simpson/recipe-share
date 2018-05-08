<template>
  <v-text-field
    v-model="searchTerm"
    @keyup.enter="search"
    id="searchBar"
    light
    solo
    prepend-icon="search"
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

      let route = { path: '/recipes/shared' }

      if (this.searchTerm !== '') {
        route['query'] = { search: this.searchTerm }
      }

      this.$router.push(route)
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

.toolbar .search-field .input-group__input {
  padding-top: 4px;
  padding-bottom: 4px;
}

.search-field-small {
  margin-left: 10px;
}
</style>
