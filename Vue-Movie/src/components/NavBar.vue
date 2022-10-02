<template>
  <div class="navbar">
    <i :v-show="$store.getters.getIsShowBack"></i>
    {{ title }}
  </div>
</template>

<script>
import { inject, reactive } from 'vue'
export default {
  setup () {
    const state = reactive({
      title: inject('title')
    })

    return { ...state }
  }
}
</script>

<style lang="sass" scoped></style>
