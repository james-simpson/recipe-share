<template>
  <h1>Loading...</h1>
</template>

<script>
  export default {
    name: 'AuthCallback',
    props: ['auth'],
    data () {
      this.auth.handleAuthentication()
      return {}
    }
  }
</script>
