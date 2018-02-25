<template>
  <v-flex>
    <v-text-field label="Select image (optional)" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
    <input
      type="file"
      style="display: none"
      ref="image"
      accept="image/*"
      @change="onFilePicked"
    >
    <img :src="imageUrlToShow" height="150" v-if="imageUrlToShow" id="recipeImage"/>
  </v-flex>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: ['imageUrl'],
  data: () => ({
    imageName: '',
    uploadedImageUrl: '',
    imageFile: ''
  }),

  computed: {
    imageUrlToShow () {
      if (this.uploadedImageUrl !== '') {
        return this.uploadedImageUrl
      }

      return this.imageUrl
    }
  },

  methods: {
    pickFile () {
      this.$refs.image.click()
    },

    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name

        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }

        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.uploadedImageUrl = fr.result
          this.imageFile = files[0]
          this.$emit('image-changed', this.imageFile)
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.uploadedImageUrl = ''
      }
    }
  }
}
</script>

<style>
#recipeImage {
  margin-left: 40px;
  margin-bottom: 10px;
}
</style>
