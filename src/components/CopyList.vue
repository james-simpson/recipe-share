<template>
  <div>
    <v-btn
      class="copy-button"
      tile
      dark
      :color="buttonColour"
      @click="copyListToClipboard"
    >
      <v-icon v-if="!this.copied" small left>content_copy</v-icon>
      <v-icon v-else small left>done</v-icon>
      {{ buttonText }}
    </v-btn>
    <div id="shopping-list-copy-text"></div>
  </div>
</template>

<script>
export default {
  name: "CopyList",
  props: ["ingredients"],
  data: () => ({
    copied: false,
  }),
  computed: {
    buttonText() {
      return this.copied ? "Copied to clipboard" : "Copy to clipboard"
    },
    buttonColour() {
      return this.copied ? "green" : "primary"
    },
    shoppingListCopyText() {
      return this.ingredients.join("\r\n")
    },
  },
  methods: {
    copyListToClipboard() {
      let textToBeCopied = this.shoppingListCopyText;
      let emptyArea = document.createElement("textarea");
      emptyArea.innerHTML = textToBeCopied;
      let parentElement = document.getElementById("shopping-list-copy-text");
      parentElement.appendChild(emptyArea);

      emptyArea.select();
      document.execCommand("copy");

      parentElement.removeChild(emptyArea);
      this.copied = true;
      setTimeout(() => (this.copied = false), 3000);
    },
  },
};
</script>
<style>
.copy-button {
  margin-left: 0px;
  margin-bottom: 10px;
  margin-top: 25px;
}
</style>