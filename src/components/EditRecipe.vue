<template>
  <v-content>
    <v-container>

      <!-- Only logged in users should see the recipe form -->
      <h2 class="login-prompt-text title text-xs-center" v-if="!authenticated">
        <a @click="auth.login">Log in</a> or
        <a @click="auth.login">sign up</a> to add recipes
      </h2>

      <recipe-form
        v-if="authenticated"
        :recipe="recipe"
        @imageChanged="onImageChanged"
        ref="recipeForm"
      />

      <v-fab-transition>
        <v-btn
          @click="cancelChanges"
          v-show="showFabs"
          dark
          fab
          bottom
          right
          color="grey"
          class="mr-0 mb-0 mt-4"
          style="position: relative; float: right;"
        >
          <v-icon>clear</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-fab-transition>
        <v-btn
          @click="handleSaveClick"
          v-show="showFabs"
          dark
          fab
          bottom
          right
          color="pink"
          class="mb-4 mt-4"
          style="position: relative; float: right;"
        >
          <v-icon>done</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
  </v-content>
</template>

<script>
import RecipeForm from './RecipeForm'
import ImageUpload from './ImageUpload'

export default {
  name: 'EditRecipe',
  props: {
    id: { type: Number, required: false },
    auth: { type: Object, required: true },
    authenticated: { type: Boolean, required: true }
  },
  components: { RecipeForm, ImageUpload },
  data () {
    return {
      recipe: {
        title: '',
        author: '',
        ingredients: '',
        method: '',
        servings: '',
        time: null,
        difficulty: null,
        vegetarian: false,
        vegan: false,
        sweet: false
      },

      // Whether or not the recipe image has changed. If it has, we need to
      // upload the image.
      imageChanged: false,
      imageFile: '',
      showFabs: false
    }
  },
  computed: {
    tabs () {
      return [
        {
          id: 'tab-0',
          title: 'ingredients',
          text: this.recipe.ingredients
        },
        {
          id: 'tab-1',
          title: 'method',
          text: this.recipe.method
        }
      ]
    },

    // TODO: pass this in as a boolean flag, we shouldn't need to check the ID
    isNewRecipe () {
      return typeof this.id === 'undefined'
    }
  },
  methods: {
    handleSaveClick () {
      if (!this.$refs.recipeForm.validate()) return

      this.$emit('set-loading', 'true')

      // if the recipe has an image, upload it then set the newly created image
      // URL on the recipe and save the recipe
      if (this.imageChanged) {
        this.uploadImage()
          .then(response => {
            this.recipe.image = response.data.imageUrl
            this.saveRecipe()
          })
      } else {
        this.saveRecipe()
      }
    },

    // add a new recipe or update an existing one
    saveRecipe () {
      const action = this.isNewRecipe ? 'addRecipe' : 'updateRecipe'
      this.$store.dispatch(action, this.recipe).then((response) => {
        this.$emit('set-loading', false)
        this.$router.push({ name: 'My Recipes' })
        this.$emit('show-success-msg', 'Recipe saved')
      }, () => {
        this.$emit('set-loading', false)
        this.$emit('show-error-msg', 'Failed to save recipe')
      })
    },

    uploadImage () {
      let formData = new FormData()
      formData.append('file', this.imageFile)
      return this.$store.dispatch(
        'uploadImage',
        { id: this.recipe.id, formData: formData }
      )
    },

    cancelChanges () {
      if (this.isNewRecipe) {
        this.$router.push({ name: 'My Recipes' })
      } else {
        this.$router.push({ name: 'View Recipe', params: { id: this.id } })
      }
    },

    onImageChanged (imageFile) {
      this.imageFile = imageFile
      this.imageChanged = true
    },

    // Update the ingredients and method whenever those textareas are changed.
    // This was added as v-model didn't seem to work on a computed property
    // which is an array of objects.
    handleTextareaChanged (event) {
      if (event.target.id === 'tab-text-0') {
        this.recipe.ingredients = event.target.value
      } else if (event.target.id === 'tab-text-1') {
        this.recipe.method = event.target.value
      }
    }
  },
  created () {
    if (!this.isNewRecipe) {
      let recipeFromStore = this.$store.getters.getRecipeById(this.id)

      // clone the recipe from the store so we can edit it without
      // mutating the store's state
      this.recipe = Object.assign({}, recipeFromStore)
    }
  },
  mounted () {
    // this will animate the floating buttons when the view is loaded
    this.showFabs = true
  }
}
</script>

<style scoped>
.left-fab { margin-right: 80px; }
</style>
