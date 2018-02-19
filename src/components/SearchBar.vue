<template>
  <v-text-field
    v-model="searchTerm"
    @keyup.enter="search"
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
      this.$store.commit('clearRecipes')
      this.$emit('set-loading', true)

      let action = 'searchAllRecipes'
      if (this.searchTerm === '') {
        action = 'loadAllRecipes'
      }

      this.$store.dispatch(action, this.searchTerm)
      .then(() => {
        this.$emit('set-loading', false)
      }, () => {
        this.$emit('set-loading', false)
      })
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
