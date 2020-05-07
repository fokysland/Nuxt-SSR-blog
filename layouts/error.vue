<template>
  <div class="error-layout">
    <div class="error-content">
      <h1 class="error-title">404</h1>
      <nuxt-link to="/">Comeback to main page</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty"
};
</script>

<style lang="sass" scoped>
.error-layout
  display: flex
  justify-content: center
  align-items: center
  width: 100%

.error-content
  display: flex
  flex-direction: column
  align-items: center

.error-title
  color: rgb(145, 6, 6)
  margin-bottom: 1rem
</style>
