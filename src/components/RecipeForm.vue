<template>
  <v-form v-model="valid" ref="form" autofocus="true">
    <v-flex md6 sm8>
      <!-- title -->
      <v-text-field
        label="Title"
        v-model="recipe.title"
        :rules="nameRules"
        :counter="100"
        required
      />

      <!-- author -->
      <v-text-field
        label="Author"
        v-model="recipe.author"
      />
    </v-flex>
    <v-flex md5 sm6>
      <!-- image -->
      <image-upload :imageUrl="recipe.image" @image-changed="onImageChanged"/>

      <!-- duration -->
      <v-layout row wrap>
        <v-flex mr-4>
          <v-select
            label="hours"
            :items="hoursOptions"
            :rules="durationRules"
            :value="hours"
            @change="handleDurationChanged"
            prepend-icon="hourglass_empty"
            required
          ></v-select>
        </v-flex>
        <v-flex>
          <v-select
          label="minutes"
          :items="minutesOptions"
          :rules="durationRules"
          :value="minutes"
          @change="handleDurationChanged"
          required
        ></v-select>
        </v-flex>
      </v-layout>

      <!-- servings -->
      <v-text-field
        label="Serves"
        placeholder="Number of servings e.g. 3-4"
        v-model="recipe.servings"
        :rules="servingsRules"
        prepend-icon="people"
        required
      ></v-text-field>
    </v-flex>

    <!-- difficulty level -->
    <v-radio-group
      v-model="recipe.difficulty"
      :row="displayDifficultiesAsRow"
      :rules="difficultyRules"
      class="difficulty-levels-radio-group"
      required
    >
      <v-radio v-for="(level, i) in difficultyLevels" :label="level" :value="i"/>
    </v-radio-group>
    <v-layout row wrap>
      <v-flex xs12 md2>
        <v-checkbox label="Sweet" v-model="recipe.sweet" light/>
      </v-flex>
      <v-flex xs5 sm3 md2>
        <v-checkbox label="Vegetarian" v-model="recipe.vegetarian" light/>
      </v-flex>
      <v-flex xs5 sm3 md2 v-show="recipe.vegetarian">
        <v-checkbox label="Vegan" v-model="recipe.vegan" light/>
      </v-flex>
    </v-layout>

    <!-- Ingredients & method as tabs (smaller screens) -->
    <v-tabs v-model="active" lazy class="hidden-md-and-up">
      <v-tabs-bar class="cyan" dark>
        <v-tabs-item
          v-for="tab in tabs"
          :key="tab.id"
          :href="'#' + tab.id"
          ripple
        >
          {{ tab.title}}
        </v-tabs-item>
        <v-tabs-slider color="yellow"/>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          v-for="(tab, i) in tabs"
          :key="i"
          :id="'tab-' + i"
        >
          <v-card flat class="recipe-text">
            <v-card-text class='recipe-text'>
              <textarea
                v-autosize="tab.text"
                :value="tab.text"
                :id="'tab-text-' + i"
                class="textarea-input"
                @input="handleTextareaChanged"
              />
          </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>

    <!-- Recipe & ingredients side by side (larger screens) -->
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap hidden-sm-and-down>
        <v-flex xs3>
          <v-card dark color="cyan">
            <v-card-text class="recipe-detail-card-header">ingredients</v-card-text>
            <div class="recipe-card-underline yellow"/>
            <v-card-text class='recipe-text recipe-detail-card-text'>
                <textarea
                  v-model="recipe.ingredients"
                  v-autosize="recipe.ingredients"
                  class="textarea-input"
                  placeholder="Ingredients here"
                >
                    {{ recipe.ingredients }}
                </textarea>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card dark color="cyan">
            <v-card-text class="recipe-detail-card-header">method</v-card-text>
            <div class="recipe-card-underline yellow"></div>
            <v-card-text class='recipe-text recipe-detail-card-text'>
              <textarea
                v-model="recipe.method"
                v-autosize="recipe.method"
                class="textarea-input"
                placeholder="Method here"
              />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import ImageUpload from './ImageUpload'

export default {
  name: 'RecipeForm',
  props: {
    // TODO: Stop mutating this prop using v-model! Better to use one-way
    // binding e.g. :servings="recipe.servings", and listen for a change event
    // on the widget then emit the new value up to EditRecipe to update the
    // recipe object.
    recipe: { type: Object, required: true }
  },
  components: { ImageUpload },
  data () {
    return {
      valid: false,

      imageFile: '',
      imageChanged: false,

      // validation rules
      nameRules: [
        (v) => !!v || 'Title is required',
        (v) => v.length <= 100 || 'Name must be less than 100 characters'
      ],
      durationRules: [v => v >= 0 || 'Duration is required'],
      servingsRules: [v => !!v || 'Servings is required'],
      difficultyRules: [v => v !== null || 'Difficulty level is required'],

      difficultyLevels: ['Easy', 'Easy/Med', 'Medium', 'Med/Adv', 'Advanced'],
      hoursOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 20, 24, 48],
      minutesOptions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      active: null
    }
  },
  computed: {
    // hours part of the recipe duration
    hours () {
      const totalMins = this.recipe.time
      if (totalMins > 0) {
        return Math.floor(totalMins / 60)
      }
    },
    // minutes part of the recipe duration
    minutes () {
      const totalMins = this.recipe.time
      if (totalMins > 0) {
        return totalMins % 60
      }
    },
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
    displayDifficultiesAsRow () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return false
        case 'sm': return false
        default: return true
      }
    }
  },
  methods: {
    validate () {
      // TODO: if a field is invalid focus on it so the user knows what's wrong
      // straight away
      return this.$refs.form.validate()
    },

    onImageChanged (imageFile) {
      if (imageFile !== '') {
        // tell the parent component to upload the image if the recipe is saved
        this.$emit('imageChanged', imageFile)
      }
    },

    // When the user changs the expected recipe duration, convert this into
    // minutes and update recipe.time
    handleDurationChanged () {
      this.recipe.time = this.hours * 60 + this.minutes
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
  }
}
</script>

<style scoped>
.recipe-text {
  white-space: pre-wrap;
  font-family: inherit;
}

.textarea-input {
  width: 100%;
  padding: 15px;
  border-style: dotted;
}

.textarea-input:focus {
  border-style: none;
}
.recipe-detail-card-header {
  height: 48px !important;
  text-transform: uppercase;
  text-align: left;
  padding-left: 30px;
}
.recipe-detail-card-text {
  background: white;
  color: rgba(0,0,0,0.87);
  text-align: left;
  font-size: 15px;
}
.recipe-card-underline {
  padding: 0;
  height: 2px;
}
.difficulty-levels-radio-group {
  width: 75%;
}
</style>
